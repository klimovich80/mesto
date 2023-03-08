import Card from "../components/Card.js";
import Api from "../components/Api.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
  validationConfig,
  elements,
  template,
  profileName,
  profileCredentials,
  profileAvatar,
  editAvatar,
  editPofilePopup,
  editProfileName,
  editProfileCredentials,
  confirmPopup,
  addCardPopup,
  imagePopup,
  imageSource,
  imageCaption,
  profileEditButton,
  addCardButton,
  connectionConfig,
} from "../utils/constants.js";
import "../pages/index.css";

//экземпляр ProfileApi для контроля информации пользователя
const api = new Api(connectionConfig);
let cardId = "";
let profileId = "";
//функциии валидации форм
const editProfileValidation = new FormValidator(
  validationConfig,
  editPofilePopup
);
const addCardValidation = new FormValidator(validationConfig, addCardPopup);
//экземпляры попапа с формой
const addPopup = new PopupWithForm(
  {
    submitHandler: (formData) => {
      api
        .postNewCard(formData.place, formData.url)
        .then((res) => res.json())
        .then((result) => console.log(result));
      renderCards.addItem(
        createCard({ name: formData.place, link: formData.url }, profileId),
        false
      );
      addPopup.close();
    },
  },
  addCardPopup,
  validationConfig.inputSelector,
  validationConfig.formSelector
);

const editPopup = new PopupWithForm(
  {
    submitHandler: (formData) => {
      api
        .editProfileInfo(formData.name, formData.credentials)
        .then((res) => res.json());
      userInfo.setUserInfo({
        name: formData.name,
        info: formData.credentials,
      });
      editPopup.close();
    },
  },
  editPofilePopup,
  validationConfig.inputSelector,
  validationConfig.formSelector
);
//экземпляры попапа с картинкой
const popupWithImage = new PopupWithImage(
  imageSource,
  imageCaption,
  imagePopup
);
//экземпляр UserInfo с селекторами профиля
const userInfo = new UserInfo(
  {
    nameSelector: profileName,
    infoSelector: profileCredentials,
    avatarElement: profileAvatar,
  },
  api
);
//функция открытия формы добавления карточки
function openAddCardPopup() {
  addCardValidation.clearValidation();
  addPopup.open();
}
//функция открытия формы редактирования профиля
function openEditProfilePopup() {
  //валидируем инпуты
  editProfileValidation.clearValidation();
  //получаем данные профиля
  const getUserInfo = userInfo.getUserInfo();
  //присваиваем соответвующие значения форме
  editProfileName.value = getUserInfo.name;
  editProfileCredentials.value = getUserInfo.info;
  //открываем экземпляр попапа с формой
  editPopup.open();
}
//рендерим карточки
const renderCards = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      renderCards.addItem(cardElement, true);
    },
  },
  elements
);
//функция всплытия отдельным попапом нажатой карточки
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

const confirmForm = new PopupWithForm(
  {
    submitHandler: () => {
      fetch(
        `${connectionConfig.url}/v1/${connectionConfig.groupId}/cards/${cardId}`,
        {
          method: "DELETE",
          headers: {
            authorization: connectionConfig.token,
          },
        }
      ).then((res) =>
        res
          .json()
          .then((response) => {
            console.log(response);
          })
          .catch((err) => console.log(err))
      );
    },
  },
  confirmPopup,
  validationConfig.inputSelector,
  validationConfig.formSelector
);

function handleDeleteCard(data) {
  cardId = data._id;
  confirmForm.open();
}

function handleLikeCard(id, buttonElement, counterElement) {
  const likeClassSelector = "element__like_checked";
  //eсли карточка отмечена
  if (buttonElement.classList.contains(likeClassSelector)) {
    //уберем лайк
    fetch(
      `${connectionConfig.url}/v1/${connectionConfig.groupId}/cards/${id}/likes`,
      {
        method: "DELETE",
        headers: {
          authorization: connectionConfig.token,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        buttonElement.classList.remove(likeClassSelector);
        counterElement.textContent = res.likes.length;
      });
  } else {
    //добавим лайк
    fetch(
      `${connectionConfig.url}/v1/${connectionConfig.groupId}/cards/${id}/likes`,
      {
        method: "PUT",
        headers: {
          authorization: connectionConfig.token,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        buttonElement.classList.add(likeClassSelector);
        counterElement.textContent = res.likes.length;
      });
  }
}
//функция создания карточки
function createCard(item) {
  return new Card(
    item,
    profileId,
    template,
    handleCardClick,
    handleDeleteCard,
    handleLikeCard
  ).getCard();
}
//включаем валидацию форм
editProfileValidation.enableValidation();
addCardValidation.enableValidation();

//--обработчики событий--
// нажатие кнопки редактирования профиля
profileEditButton.addEventListener("click", openEditProfilePopup);
//нажатие кнопки добавления карточки
addCardButton.addEventListener("click", openAddCardPopup);
//
editAvatar.addEventListener("click", () => {
  alert("changing avatar");
});

//отображаем информацию о пользователе на странице
//и рендерим карточки
Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([profileInfo, cards]) => {
    profileId = profileInfo._id;
    userInfo.setUserInfo({
      name: profileInfo.name,
      info: profileInfo.about,
    });
    userInfo.setUserAvatar({ avatarUrl: profileInfo.avatar });
    renderCards.renderItems(cards);
    console.log("cards: ", cards);
  })
  .catch((err) => console.log(err));

//TODO
//1.Fix double click on forms
//2.Remove card after fetch done trough promise
//3.Redo all the fetch requests to Api
//4.Try promises use when applicable
//5.Make the connection window as the reaction to fetch and as a part of API
//6.Do the avatar change JS
//7.Fix avatar css
//8.Fix new windows css
//9.Fix likes count css

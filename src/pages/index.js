import Card from "../components/Card.js";
import CardsApi from "../components/CardsApi.js";
import ProfileApi from "../components/ProfileApi.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
  initialCards,
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
      cardsApi
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
      profileApi
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
//экземпляр ProfileApi для контроля информации пользователя
const profileApi = new ProfileApi(connectionConfig);
//экземпляр CardsApi для контроля за карточчками
const cardsApi = new CardsApi(connectionConfig);
//экземпляр UserInfo с селекторами профиля
const userInfo = new UserInfo(
  {
    nameSelector: profileName,
    infoSelector: profileCredentials,
    avatarElement: profileAvatar,
  },
  profileApi
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

function handleDeleteCard(id) {
  cardId = id;
  confirmForm.open();
}

function handleLikeCard(id, buttonElement, counterElement) {
  console.log("counterElement: ", counterElement.textContent);
  const likeClassSelector = "element__like_checked";
  const count = Number(counterElement.textContent);
  console.log("count: ", count);
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
    ).then(() => {
      buttonElement.classList.remove(likeClassSelector);
      counterElement.textContent = count - 1;
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
    ).then(() => {
      buttonElement.classList.add(likeClassSelector);
      counterElement.textContent = count + 1;
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
Promise.all([profileApi.getProfileInfo(), cardsApi.getInitialCards()])
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
//3.Redo all the fetch requests to Api
//4.Try promises use when applicable
//5.Make the connection window as the reaction to fetch and as a part of API
//6.Do the avatar change JS
//7.Fix avatar css
//8.Fix new windows css
//9.Fix likes count css

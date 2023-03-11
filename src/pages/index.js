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
  editAvatarPopup,
  editAvatarButton,
  editAvatarUrl,
  changeAvatarButton,
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
let profileId = "";
let cardData;

//функциии валидации форм:
//валидация редактирования аватара
const editAvatarValidation = new FormValidator(
  validationConfig,
  editAvatarPopup
);
//валидация редактирования профиля
const editProfileValidation = new FormValidator(
  validationConfig,
  editPofilePopup
);
//валидация добавление карточки
const addCardValidation = new FormValidator(validationConfig, addCardPopup);

//экземпляры классов
//экземпляр попапа добавления карточки с формой
const addPopup = new PopupWithForm(
  {
    submitHandler: (formData) => {
      api.postNewCard(formData.place, formData.url).then((result) => {
        renderCards.addItem(createCard(result, profileId), false);
      });
      addPopup.close();
    },
  },
  addCardPopup,
  validationConfig.inputSelector,
  validationConfig.formSelector
);
//экземпляр попапа редактирования профиля
const editPopup = new PopupWithForm(
  {
    submitHandler: (formData) => {
      api.editProfileInfo(formData.name, formData.credentials).then((res) => {
        userInfo.setUserInfo({
          name: res.name,
          info: res.about,
        });
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
//экземпляр попапа подтверждения действия
const confirmForm = new PopupWithForm(
  {
    submitHandler: () => {
      api
        .confirmSubmit(cardData._id)
        .then((response) => {
          cardData._element.remove();
          return response;
        })
        .catch((err) => console.log(err));
      confirmForm.close();
    },
  },
  confirmPopup,
  validationConfig.inputSelector,
  validationConfig.formSelector
);
//экземпляр попапа редактирования аватара
const editAvatarForm = new PopupWithForm(
  {
    submitHandler: (data) => {
      api
        .editProfileAvatar(data.avatar)
        .then((response) => {
          profileAvatar.src = response.avatar;
          editAvatarForm.close();
        })
        .catch((err) => console.log(err));
    },
  },
  editAvatarPopup,
  validationConfig.inputSelector,
  validationConfig.formSelector
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
//экземпляр Секции рендеринга карточек
const renderCards = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      renderCards.addItem(cardElement, true);
    },
  },
  elements
);
//Функции открытия форм
//открытие формы добавления карточки
function openAddCardPopup() {
  addCardValidation.clearValidation();
  addPopup.open();
}
//открытие формы редактирования профиля
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
//открытие формы редактирования аватарки
function openEditAvatarPopup() {
  editAvatarValidation.clearValidation();
  //присваиваем полю формы адрес ссылки редактируемого аватару
  editAvatarUrl.value = profileAvatar.src;
  //открываем заполненную формц
  editAvatarForm.open();
}

//функция всплытия карточки отдельным попапом
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}
//функция удаления карточки
function handleDeleteCard(data) {
  cardData = data;
  cardId = data._id;
  confirmForm.open();
}
//функция обработки лайка карточки
function handleLikeCard(id, buttonElement, counterElement) {
  const likeSelector = "element__like_checked";
  //eсли карточка отмечена
  if (buttonElement.classList.contains(likeSelector)) {
    //уберем лайк
    api.deleteLike(id).then((res) => {
      buttonElement.classList.remove(likeSelector);
      counterElement.textContent = res.likes.length;
    });
  } else {
    //добавим лайк
    api.addLike(id).then((res) => {
      buttonElement.classList.add(likeSelector);
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
editAvatarValidation.enableValidation();

//--обработчики событий--
// нажатие кнопки редактирования профиля
profileEditButton.addEventListener("click", openEditProfilePopup);
//нажатие кнопки добавления карточки
addCardButton.addEventListener("click", openAddCardPopup);
//нажатие кнопки редактирования профиля
changeAvatarButton.addEventListener("click", openEditAvatarPopup);

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
//5.Make the connection window as the reaction to fetch and as a part of API
//7.Fix avatar css
//8.Fix new windows css
//9.Fix likes count css
//10.Add 'loading...' to the button

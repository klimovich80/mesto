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
  likeCheckedSelector,
} from "../utils/constants.js";
import "../pages/index.css";
//временные переменные
//для храннения данных профиля
let profileId = "";
//для хранения данных картички
let cardData;

//экземпляр ProfileApi для контроля информации пользователя
const api = new Api(connectionConfig);

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
//валидация окна подтверждения (для активации/дезактивации) кнопки
const confirmPopupValidation = new FormValidator(
  validationConfig,
  confirmPopup
);

//экземпляры классов
//экземпляр попапа добавления карточки с формой
const addPopup = new PopupWithForm(
  {
    submitHandler: (formData) => {
      addCardValidation.disableButton();
      api
        .postNewCard(formData.place, formData.url)
        .then((result) => {
          renderCards.addItem(createCard(result, profileId), false);
          addPopup.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          addPopup.changeToOriginalText();
          addCardValidation.enableButton();
        });
    },
  },
  addCardPopup,
  validationConfig
);
//экземпляр попапа редактирования профиля
const editPopup = new PopupWithForm(
  {
    submitHandler: (formData) => {
      editProfileValidation.disableButton();
      api
        .editProfileInfo(formData.name, formData.credentials)
        .then((res) => {
          userInfo.setUserInfo({
            name: res.name,
            info: res.about,
          });
          editPopup.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          editPopup.changeToOriginalText();
          editProfileValidation.enableButton();
        });
    },
  },
  editPofilePopup,
  validationConfig
);
//экземпляр попапа подтверждения действия
const confirmForm = new PopupWithForm(
  {
    submitHandler: () => {
      confirmPopupValidation.disableButton();
      api
        .confirmSubmit(cardData._id)
        .then((response) => {
          cardData._element.remove();
          confirmForm.close();
          return response;
        })
        .catch((err) => console.log(err))
        .finally(() => {
          confirmForm.changeToOriginalText();
          confirmPopupValidation.enableButton();
        });
    },
  },
  confirmPopup,
  validationConfig
);
//экземпляр попапа редактирования аватара
const editAvatarForm = new PopupWithForm(
  {
    submitHandler: (data) => {
      editAvatarValidation.disableButton();
      api
        .editProfileAvatar(data.avatar)
        .then((response) => {
          profileAvatar.src = response.avatar;
          editAvatarForm.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          editAvatarForm.changeToOriginalText();
          editAvatarValidation.enableButton();
        });
    },
  },
  editAvatarPopup,
  validationConfig
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
  confirmForm.open();
}
//функция обработки лайка карточки
function handleLikeCard(card, likeButton) {
  //eсли карточка уже отмечена
  if (likeButton.classList.contains(likeCheckedSelector)) {
    //уберем лайк
    api
      .deleteLike(card._id)
      .then((res) => {
        //меняем лайк на неотмеченный
        card.like(false);
        //отображаем количество лайков
        card.setLikesCount(res.likes.length);
      })
      .catch((err) => console.log(err));
  } else {
    //добавим лайк
    api
      .addLike(card._id)
      .then((res) => {
        //меняем лайк на отмеченный
        card.like(true);
        //отображаем количество лайков
        card.setLikesCount(res.likes.length);
      })
      .catch((err) => console.log(err));
  }
}
//функция создания карточки
function createCard(item) {
  return new Card(
    item,
    profileId,
    template,
    likeCheckedSelector,
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
// включаем события всех попапов
addPopup.setEventListeners();
editPopup.setEventListeners();
popupWithImage.setEventListeners();
confirmForm.setEventListeners();
editAvatarForm.setEventListeners();
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
  })
  .catch((err) => console.log(err));

//TODO
//1.fix submits prevent default

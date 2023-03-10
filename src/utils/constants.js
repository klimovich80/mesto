//карточки дефолтной начальной загрузки
//TODO надо удалить
export const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
//конфигурация валидации формы
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const elements = document.querySelector(".elements__items"); // место вставки карточек
export const template = document //шаблон карточки
  .querySelector(".template")
  .content.querySelector(".element"); //шаблон карточки
export const profileName = document.querySelector(".profile__title"); //имя профиля
export const profileCredentials = document.querySelector(".profile__subtitle"); //описание профиля
export const profileAvatar = document.querySelector(".profile__avatar"); //аватар профиля
export const editAvatarPopup = document.querySelector(".popup_edit-avatar"); //попап редактирования профиля
//TODO fix button and url to popup
export const editAvatarButton = editAvatarPopup.querySelector(".popup__button"); //кнопка редактирования аватара в попапе редактирования
export const editAvatarUrl = editAvatarPopup.querySelector(
  ".popup__input_type_edit"
); //поле ссылки на картинку аватара в попапе редактирования
export const changeAvatarButton = document.querySelector(
  ".avatar__edit-button"
); //кнопка редактирования фотографии в документе
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
); //кнопка редактирования профиля
export const editPofilePopup = document.querySelector(".popup_edit-profile"); //попап редактирования формы
export const editProfileName = editPofilePopup.querySelector(
  ".popup__input_type_name"
); //поле имени попапа редактирования формы
export const editProfileCredentials = editPofilePopup.querySelector(
  ".popup__input_type_credentials"
); //поле информации попапа редактирования профиля
export const confirmPopup = document.querySelector(".popup_confirm"); //попап подтверждения удаления карточки
export const addCardPopup = document.querySelector(".popup_add-card"); //попап добавления карточки
export const addCardButton = document.querySelector(".profile__add-button"); //кнопка добавления карточки
export const imagePopup = document.querySelector(".popup_open-image"); //попап открытой карточки
export const imageSource = imagePopup.querySelector(".popup__image"); //поле ссылки на картинку попапа открытой карточки
export const imageCaption = imagePopup.querySelector(".popup__caption"); //поле информации о картинке попапа открытой карточки

//конфигурация API для подключения к бэкэнду
export const connectionConfig = {
  token: "ec0a3331-3b70-4ae3-9ae6-450b13b2e789",
  groupId: "cohort-61",
  url: "https://mesto.nomoreparties.co",
};

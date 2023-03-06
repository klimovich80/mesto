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

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const elements = document.querySelector(".elements__items"); // место вставки карточек
export const template = document
  .querySelector(".template")
  .content.querySelector(".element"); //шаблон карточки
export const profileName = document.querySelector(".profile__title"); //имя профиля
export const profileCredentials = document.querySelector(".profile__subtitle"); //описание профиля
export const profileAvatar = document.querySelector(".profile__avatar");
export const editAvatar = document.querySelector(".avatar__edit-button");
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
); //кнопка редактирования профиля
export const editPofilePopup = document.querySelector(".popup_edit-profile");
export const editProfileName = editPofilePopup.querySelector(
  ".popup__input_type_name"
);
export const editProfileCredentials = editPofilePopup.querySelector(
  ".popup__input_type_credentials"
);
export const confirmPopup = document.querySelector(".popup_confirm");
export const addCardPopup = document.querySelector(".popup_add-card");
export const addCardButton = document.querySelector(".profile__add-button"); //кнопка добавления карточки
export const imagePopup = document.querySelector(".popup_open-image");
export const imageSource = imagePopup.querySelector(".popup__image");
export const imageCaption = imagePopup.querySelector(".popup__caption");

export const connectionConfig = {
  token: "ec0a3331-3b70-4ae3-9ae6-450b13b2e789",
  groupId: "cohort-61",
  url: "https://mesto.nomoreparties.co",
};

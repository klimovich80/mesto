import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards, validationConfig } from "./constants.js";

//--переменные--
const elements = document.querySelector(".elements__items"); // место вставки карточек
const template = document
  .querySelector(".template")
  .content.querySelector(".element"); //шаблон карточки
const profileName = document.querySelector(".profile__title"); //имя профиля
const profileCredentials = document.querySelector(".profile__subtitle"); //описание профиля
const profileEditButton = document.querySelector(".profile__edit-button"); //кнопка редактирования профиля
const editPofilePopup = document.querySelector(".popup_edit-profile");
const editProfileName = editPofilePopup.querySelector(
  ".popup__input_type_name"
);
const editProfileCredentials = editPofilePopup.querySelector(
  ".popup__input_type_credentials"
);
const addCardPopup = document.querySelector(".popup_add-card");
const addCardPlace = addCardPopup.querySelector(".popup__input_type_place");
const addCardUrl = addCardPopup.querySelector(".popup__input_type_url");
const addCardButton = document.querySelector(".profile__add-button"); //кнопка добавления карточки
export const imagePopup = document.querySelector(".popup_open-image");
export const imageSource = imagePopup.querySelector(".popup__image");
export const imageCaption = imagePopup.querySelector(".popup__caption");
const overlays = document.querySelectorAll(".popup__overlay");
const closeButtons = document.querySelectorAll(".close-button");
const editProfileValidation = new FormValidator(
  validationConfig,
  editPofilePopup
);
const addCardValidation = new FormValidator(validationConfig, addCardPopup);
//включаем валидацию форм
//--функции--
editProfileValidation.enableValidation();
addCardValidation.enableValidation();
//универсальная функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_active");
  document.removeEventListener("keydown", handleEsc);
  const form = popup.querySelector(".popup__form");
}
//универсальная функция закрытия попапа по нажатию ESC
const handleEsc = (event) => {
  if (event.key === "Escape") {
    const activePopup = document.querySelector(".popup_active");
    closePopup(activePopup);
  }
};
//универсальная функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_active");
  document.addEventListener("keydown", handleEsc);
}
//функция открытия формы добавления карточки
function openAddCardPopup() {
  addCardValidation.clearValidation();
  openPopup(addCardPopup);
}
//функция открытия формы редактирования профиля
function openEditProfilePopup() {
  editProfileValidation.clearValidation();
  editProfileName.value = profileName.textContent;
  editProfileCredentials.value = profileCredentials.textContent;
  openPopup(editPofilePopup);
}
//универсальная функция отправки формы
function submitForm(event) {
  event.preventDefault();
  closePopup(event.target.closest(".popup"));
}
//функция отправки формы редактирования профиля
function submitEditForm(event) {
  profileName.textContent = editProfileName.value;
  profileCredentials.textContent = editProfileCredentials.value;
  submitForm(event);
}
//функция отправки формы добавления карточки
function submitAddForm(event) {
  submitForm(event);
  elements.prepend(
    createCard({ name: addCardPlace.value, link: addCardUrl.value })
  );
}
//рендерим карточки
(function renderInitialCards() {
  const cards = initialCards.map((card) => {
    //делаем карточку на основе класса
    return createCard(card);
  });
  //отрисовываем где нужно
  elements.append(...cards);
})();
//функция созданя карточки
function createCard(item) {
  return new Card(item, template, openPopup).getCard();
}
//--обработчики событий--
//отправка форм
editPofilePopup.addEventListener("submit", (event) => submitEditForm(event));
addCardPopup.addEventListener("submit", (event) => submitAddForm(event));
//редактирование профиля
profileEditButton.addEventListener("click", () => {
  openEditProfilePopup();
});
//добавление карточек
addCardButton.addEventListener("click", openAddCardPopup);
//закрытие попапа по клику на оверлей
overlays.forEach((overlay) =>
  overlay.addEventListener("click", (event) =>
    closePopup(event.target.closest(".popup"))
  )
);
//закрытие попапа по клику на крестик
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

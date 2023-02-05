import { Card } from "./Card.js";
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
const editProfileCloseButton = editPofilePopup.querySelector(
  ".close-button_type_edit"
);
const editProfileName = editPofilePopup.querySelector(
  ".popup__input_type_name"
);
const editProfileCredentials = editPofilePopup.querySelector(
  ".popup__input_type_credentials"
);
const addCardPopup = document.querySelector(".popup_add-card");
const addCardCloseButton = addCardPopup.querySelector(".close-button_type_add");
const addCardPlace = addCardPopup.querySelector(".popup__input_type_place");
const addCardUrl = addCardPopup.querySelector(".popup__input_type_url");
const addCardButton = document.querySelector(".profile__add-button"); //кнопка добавления карточки
const imagePopup = document.querySelector(".popup_open-image");
const imageCloseButton = imagePopup.querySelector(".close-button_type_image");
const imageSource = imagePopup.querySelector(".popup__image");
const imageCaption = imagePopup.querySelector(".popup__caption");
const overlays = document.querySelectorAll(".popup__overlay");
//--функции--
//закрытие попапа
function closePopup(popup) {
  popup.classList.remove("popup_active");
  document.removeEventListener("keydown", handleEsc);
  const form = popup.querySelector(".popup__form");
  if (form) {
    form.reset();
    clearValidation(form, validationConfig); //TODO fix it
  }
}
//закрытие попапа по нажатию ESC
const handleEsc = (event) => {
  if (event.key === "Escape") {
    const activePopup = document.querySelector(".popup_active");
    closePopup(activePopup);
  }
};
//открытие попапа
function openPopup(popup) {
  popup.classList.add("popup_active");
  document.addEventListener("keydown", handleEsc);
}
function openAddCardPopup() {
  openPopup(addCardPopup);
}
function openEditProfilePopup() {
  editProfileName.value = profileName.textContent;
  editProfileCredentials.value = profileCredentials.textContent;
  openPopup(editPofilePopup);
}
//попдписка на заполнение формы
function submitForm(event) {
  event.preventDefault();
  closePopup(event.target.closest(".popup"));
}
function submitAddForm(event) {
  const nameValue = addCardPlace.value;
  const urlValue = addCardUrl.value;
  const newCard = getCard({ name: nameValue, link: urlValue });
  elements.prepend(newCard);
  submitForm(event);
}
function submitEditForm(event) {
  profileName.textContent = editProfileName.value;
  profileCredentials.textContent = editProfileCredentials.value;
  submitForm(event);
}
//рендерим карточки
(function renderInitialCards() {
  const cards = initialCards.map((card) => {
    //делаем карточку на основе класса
    const newCard = new Card(card, template);
    //получаем готовую карточку
    return newCard.getCard();
  });
  //отрисовываем где нужно
  elements.append(...cards);
})();
//--обработчики событий--
//отправка форм
editPofilePopup.addEventListener("submit", (event) => submitEditForm(event));
addCardPopup.addEventListener("submit", (event) => submitAddForm(event));
//редактирование профиля
profileEditButton.addEventListener("click", () => {
  openEditProfilePopup();
});
//закрытие попапов
editProfileCloseButton.addEventListener("click", () =>
  closePopup(editPofilePopup)
);

addCardCloseButton.addEventListener("click", () => {
  closePopup(addCardPopup);
});

imageCloseButton.addEventListener("click", () => closePopup(imagePopup));
//добавление карточек
addCardButton.addEventListener("click", openAddCardPopup);
//закрытие попапа по клику на оверлей
overlays.forEach((overlay) =>
  overlay.addEventListener("click", (event) =>
    closePopup(event.target.closest(".popup"))
  )
);

//renderInitialCards(); //заменен на IIFE

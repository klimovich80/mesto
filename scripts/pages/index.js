import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {
  initialCards,
  validationConfig,
  elements,
  template,
  profileName,
  profileCredentials,
  profileEditButton,
  editPofilePopup,
  editProfileName,
  editProfileCredentials,
  addCardPopup,
  addCardPlace,
  addCardUrl,
  addCardButton,
  imagePopup,
  imageSource,
  imageCaption,
  overlays,
  closeButtons,
} from "../utils/constants.js";

//--переменные--
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
const renderInitialCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      renderInitialCards.addItem(cardElement);
    },
  },
  elements
);
//
function handleCardClick(name, link) {
  imageSource.src = link;
  imageSource.alt = name;
  imageCaption.textContent = name;
  openPopup(imagePopup);
}
//функция созданя карточки
function createCard(item) {
  return new Card(item, template, handleCardClick).getCard();
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

renderInitialCards.renderItems();

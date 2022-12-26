//--переменные--
const root = document.querySelector(".root");
const main = root.querySelector(".main"); //место вставки попапов
const elements = root.querySelector(".elements__items"); // место вставки карточек
const templateCard = root
  .querySelector("#templateCard")
  .content.querySelector(".element"); //шаблон карточки
//const popup = document.querySelector(".popup");
const editPofilePopup = document.querySelector(".popup_edit-profile");
const popupCloseIcon = document.querySelector(".popup__close-icon");
const profileName = root.querySelector(".profile__title"); //имя профиля
const profileCredentials = root.querySelector(".profile__subtitle"); //описание профиля
const editProfileButton = document.querySelector(".profile__edit-button"); //кнопка редактирования профиля
const addCardButton = document.querySelector(".profile__add-button"); //кнопка добавления карточки
const editProfileName = document.querySelector(".popup__input_type_name");
const editProfileCredentials = document.querySelector(
  ".popup__input_type_credentials"
);
//--функции--
//закрытие попапа
function closePopup(popup) {
  popup.classList.remove("popup_active");
}
//открытие попапа
function openPopup(popup) {
  popup.classList.add("popup_active");
}
//попдписка на заполнение формы
function submitForm(element) {
  element.preventDefault();
  element.target.reset();
  closePopup(element.target.closest(".popup"));
}
//создание карточек
function createCard(source) {
  source.forEach((item) => {
    const card = templateCard.cloneNode(true);
    card.querySelector(".element__image").src = item.link;
    card.querySelector(".element__image").alt = item.name;
    card.querySelector(".element__caption").textContent = item.name;
    card
      .querySelector(".element__trash")
      .addEventListener("click", (element) =>
        deleteCard(element.target.closest(".element"))
      );
    card
      .querySelector(".element__like")
      .addEventListener("click", (element) => likeCard(element.target));
    card
      .querySelector(".element__image")
      .addEventListener("click", (element) =>
        createPhotoPopup(templateImagePopup, element)
      ); //
    renderCard(card);
  });
}
//отрисовка карточки
function renderCard(card) {
  elements.prepend(card);
}
//удаление карточки
function deleteCard(card) {
  card.remove();
}
//лайк
function likeCard(card) {
  card.classList.toggle("element__like_checked");
}
//--создание попапов--
function createPhotoPopup(template, element) {
  const window = template.cloneNode(true);
  window
    .querySelector(".popup__close-icon")
    .addEventListener("click", (element) => closePopup(element));
  window.querySelector(".popup__image").src = element.target.src;
  window.querySelector(".popup__image").alt = element.target.alt;
  window.querySelector(".popup__caption").textContent = element.target.alt;
  openPopup(window);
}
function createAddPopup(template) {
  const window = template.cloneNode(true);
  window
    .querySelector(".popup__close-icon")
    .addEventListener("click", (element) => closePopup(element));
  window
    .querySelector(".popup__form")
    .addEventListener("submit", (event) => submitAddForm(event));
  openPopup(window);
}
function createEditPopup() {
  editProfileName.value = profileName.textContent;
  editProfileCredentials.value = profileCredentials.textContent;
  openPopup(editPofilePopup);
}
//зполнение форм
function submitAddForm(event) {
  const card = [
    {
      name: "test",
      link:
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/30b97543333915.57eb79961a3de.png",
    },
  ];
  card[0].name = event.target[0].value;
  card[0].link = event.target[1].value;
  createCard(card);
  submitForm(event);
}
function submitEditForm(event) {
  profileName.textContent = editProfileName.value;
  profileCredentials.textContent = editProfileCredentials.value;
  submitForm(event);
}
//--обработчики событий--
//редактирование профиля
editPofilePopup.addEventListener("submit", (event) => submitEditForm(event));
editProfileButton.addEventListener("click", () => {
  createEditPopup();
});
popupCloseIcon.addEventListener("click", (event) =>
  closePopup(event.target.closest(".popup"))
);
//добавление карточки
addCardButton.addEventListener("click", () => createAddPopup(templateAddPopup));
//создаем карточки из имеющегося массива
createCard(initialCards);

//--переменные--
const root = document.querySelector(".root");
const main = root.querySelector(".main"); //место вставки попапов
const elements = root.querySelector(".elements__items"); // место вставки карточек
const templateCard = root
  .querySelector("#templateCard")
  .content.querySelector(".element"); //шаблон карточки
const templateEditPopup = root
  .querySelector("#templateEditPopup")
  .content.querySelector(".popup_edit-profile"); //шаблон формы редактора профиля
const templateAddPopup = root
  .querySelector("#templateAddPopup")
  .content.querySelector(".popup_add-card"); //шаблон формы добавления карточки
const templateImagePopup = root
  .querySelector("#templateImagePopup")
  .content.querySelector(".popup_image"); //шаблон всплывающей картинки
const profileName = root.querySelector(".profile__title"); //имя профиля
const profileCredentials = root.querySelector(".profile__subtitle"); //описание профиля
const editProfileButton = document.querySelector(".profile__edit-button"); //кнопка редактирования профиля
const addCardButton = document.querySelector(".profile__add-button"); //кнопка добавления карточки
//--функции--
//удаление попапа
function closePopup(popup) {
  popup.classList.remove("fade-in");
  popup.classList.add("fade-out");
  popup.addEventListener("animationend", () => popup.remove());
}
//появление попапа
function openPopup(popup) {
  main.append(popup);
}
//попдписка на заполнение формы
function handleFormSubmit(e) {
  e.preventDefault();
  alert("SUBMIT");
}
//отображение карточек
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
      .addEventListener("click", () => createPhotoPopup(templateImagePopup)); //
    renderCard(card);
  });
}
//функция добавления начальных карточек
function renderCard(card) {
  elements.prepend(card);
}
//удаление карточек
function deleteCard(card) {
  card.remove();
}
//лайк
function likeCard(card) {
  card.classList.toggle("element__like_checked");
}

function createPhotoPopup(template) {
  const window = template.cloneNode(true);
  window
    .querySelector(".popup__close-icon")
    .addEventListener("click", (element) =>
      closePopup(element.target.closest(".popup"))
    );
  openPopup(window);
}
function createAddPopup(template) {
  const window = template.cloneNode(true);
  window
    .querySelector(".popup__close-icon")
    .addEventListener("click", (element) =>
      closePopup(element.target.closest(".popup"))
    );
  window
    .querySelector(".popup__form")
    .addEventListener("submit", (event) => submitEditForm(event));
  openPopup(window);
}
function createEditPopup(template) {
  const window = template.cloneNode(true);
  window.querySelector(".popup__input_type_name").value =
    profileName.textContent;
  window.querySelector(".popup__input_type_credentials").value =
    profileCredentials.textContent;
  window
    .querySelector(".popup__close-icon")
    .addEventListener("click", (element) =>
      closePopup(element.target.closest(".popup"))
    );
  window
    .querySelector(".popup__form")
    .addEventListener("submit", (event) => submitEditForm(event));
  openPopup(window);
}

function submitAddForm(event) {
  handleFormSubmit(event);
}
function submitEditForm(event) {
  handleFormSubmit(event);
}
//--обработчики событий--
//редактирование профиля
editProfileButton.addEventListener("click", () =>
  createEditPopup(templateEditPopup)
);
//добавление карточки
addCardButton.addEventListener("click", () => createAddPopup(templateAddPopup));
//создаем карточки из имеющегося массива
createCard(initialCards);

//сделать:
// * заполнение попапов по клику а потом передать на функцию открытия
// * вызов общей функции обработчика сабмит с распределением по функциям заполнения

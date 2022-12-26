//--переменные--
const root = document.querySelector(".root");
const main = root.querySelector(".main"); //место вставки попапов
const elements = root.querySelector(".elements__items"); // место вставки карточек
const template = root
  .querySelector(".template")
  .content.querySelector(".element"); //шаблон карточки
console.log("template: ", template);
const editPofilePopup = document.querySelector(".popup_edit-profile");
const addCardPopup = document.querySelector(".popup_add-card");
const imagePopup = document.querySelector(".popup_open-image");
const popupCloseIcon = document.querySelectorAll(".popup__close-icon");
const profileName = root.querySelector(".profile__title"); //имя профиля
const profileCredentials = root.querySelector(".profile__subtitle"); //описание профиля
const addCardPlace = document.querySelector(".popup__input_type_place");
const addCardUrl = document.querySelector(".popup__input_type_url");
const addCardButton = document.querySelector(".profile__add-button"); //кнопка добавления карточки
const editProfileButton = document.querySelector(".profile__edit-button"); //кнопка редактирования профиля
const editProfileName = document.querySelector(".popup__input_type_name");
const editProfileCredentials = document.querySelector(
  ".popup__input_type_credentials"
);
const imageSource = document.querySelector(".popup__image");
const imageCaption = document.querySelector(".popup__caption");
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
// function createCard(source) {
//   source.forEach((item) => {
//     const card = templateCard.cloneNode(true);
//     card.querySelector(".element__image").src = item.link;
//     card.querySelector(".element__image").alt = item.name;
//     card.querySelector(".element__caption").textContent = item.name;
//     card
//       .querySelector(".element__trash")
//       .addEventListener("click", (element) =>
//         deleteCard(element.target.closest(".element"))
//       );
//     card
//       .querySelector(".element__like")
//       .addEventListener("click", (element) => likeCard(element.target));
//     card
//       .querySelector(".element__image")
//       .addEventListener("click", (element) => openPhotoPopup(element)); //
//     renderCard(card);
//   });
// }
// //отрисовка карточки
// function renderCard(card) {
//   elements.prepend(card);
// }
// //удаление карточки
// function deleteCard(card) {
//   card.remove();
// }
// //лайк
// function likeCard(card) {
//   card.classList.toggle("element__like_checked");
// }
//--создание попапов--
function openPhotoPopup(element) {
  imageSource.src = element.target.src;
  imageSource.alt = element.target.alt;
  imageCaption.textContent = element.target.alt;
  openPopup(imagePopup);
}
function createAddPopup() {
  openPopup(addCardPopup);
}
function createEditPopup() {
  editProfileName.value = profileName.textContent;
  editProfileCredentials.value = profileCredentials.textContent;
  openPopup(editPofilePopup);
}
//зполнение форм
function submitAddForm(event) {
  console.log("event: ", event);
  const card = {
    name: "test",
    link:
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/30b97543333915.57eb79961a3de.png",
  };
  card.name = addCardPlace.value;
  card.link = addCardUrl.value;
  console.log("card: ", card);
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

popupCloseIcon.forEach((item) =>
  item.addEventListener("click", (event) => {
    closePopup(event.target.closest(".popup"));
  })
);
//добавление карточки
addCardButton.addEventListener("click", () => createAddPopup());
addCardPopup.addEventListener("submit", (event) => submitAddForm(event));
//создаем карточки из имеющегося массива
//createCard(initialCards);

function render() {
  const html = initialCards.map(getCard);
  elements.append(...html);
}

function getCard(item) {
  const cardTemplate = template.cloneNode(true);
  console.log('cardTemplate: ', cardTemplate);
  const image = cardTemplate.querySelector(".element__image");
  image.src = item.link;
  image.alt = item.name;
  const caption = cardTemplate.querySelector(".element__caption");
  caption.textContent = item.name;
  return cardTemplate;
}
render();

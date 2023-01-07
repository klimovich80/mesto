//--переменные--
const popup = document.querySelectorAll(".popup");
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
const overlay = document.querySelectorAll(".popup__overlay");
//--функции--
//закрытие попапа
function closePopup(popup) {
  popup.classList.remove("popup_active");
}
//открытие попапа
function openPopup(popup) {
  popup.classList.add("popup_active");
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
function submitForm(element) {
  element.preventDefault();
  element.target.reset();
  closePopup(element.target.closest(".popup"));
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
//создание карточек
function getCard(item) {
  //определяем переменные
  const cardTemplate = template.cloneNode(true);
  const image = cardTemplate.querySelector(".element__image");
  const caption = cardTemplate.querySelector(".element__caption");
  const trashcan = cardTemplate.querySelector(".element__trash");
  const like = cardTemplate.querySelector(".element__like");
  //присваиваем значения
  image.src = item.link;
  image.alt = item.name;
  caption.textContent = item.name;
  //вешаем события
  //удаления
  trashcan.addEventListener("click", (event) =>
    removeCard(event.target.closest(".element"))
  );
  //лайк
  like.addEventListener("click", (event) => likeCard(event.target));
  //открытие поапа карточки
  image.addEventListener("click", () => {
    imageSource.src = item.link;
    imageSource.alt = item.name;
    imageCaption.textContent = item.name;
    openPopup(imagePopup);
  });
  //функции
  //удаления
  function removeCard(card) {
    card.remove();
  }
  //лайка
  function likeCard(card) {
    card.classList.toggle("element__like_checked");
  }
  return cardTemplate;
}
//рендерим
function renderInitialCards() {
  const cards = initialCards.map(getCard);
  elements.append(...cards);
}
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
  const form = addCardPopup.querySelector(".popup__form");
  //TODO убрать класс проверки ошибки
  form.reset();
  closePopup(addCardPopup);
});
imageCloseButton.addEventListener("click", () => closePopup(imagePopup));
//добавление карточек
addCardButton.addEventListener("click", () => openAddCardPopup());

overlay.forEach((item) =>
  item.addEventListener("click", (event) =>
    closePopup(event.target.closest(".popup"))
  )
);
//TODO fix function to close popup by clicking ESC button
popup.forEach((item) =>
  item.addEventListener("keydown", (event) => {
    console.log(event.key);
    if (event.key === "Escape") {
      closePopup(event.target.closest(".popup"));
    }
  })
);

renderInitialCards();

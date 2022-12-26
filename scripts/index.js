//--переменные--
const root = document.querySelector(".root");
const main = root.querySelector(".main"); //место вставки попапов
const elements = root.querySelector(".elements__items"); // место вставки карточек
const template = root
  .querySelector(".template")
  .content.querySelector(".element"); //шаблон карточки
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
const imageSource = imagePopup.querySelector(".popup__image");
const imageCaption = imagePopup.querySelector(".popup__caption");
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
  nameValue = addCardPlace.value;
  urlValue = addCardUrl.value;
  const newCard=getCard({name: nameValue, link: urlValue});
  elements.prepend(newCard);
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
  const html = initialCards.map(getCard).reverse();
  elements.append(...html);
}

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
  //
  image.addEventListener("click", ()=>{
    imageSource.src=item.link;
    imageSource.alt=item.name;
    imageCaption.textContent=item.name;
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

render();

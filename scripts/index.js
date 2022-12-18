//блок переменных
const root = document.querySelector(".root");
const trashButton = root.querySelector(".element__trash"); //кнопка удаления карточки
const templateElement = root.querySelector("#tempElement").content; //содержиое шаблона
const elements=root.querySelector('.elements__items');
const popup = root.querySelector(".popup"); //попап окно
const form = popup.querySelector(".popup__form"); //попап форма
const formName = form.querySelector(".popup__input_type_name"); //поле редактирования имени в форме
const formCredentials = form.querySelector(".popup__input_type_credentials"); //поле редактирования описания в форме
const closeIcon = root.querySelector(".popup__close-icon"); //иконка закрытия формы
const profileEditButton = root.querySelector(".profile__edit-button"); //кнопка редактирования профиля
const profileName = root.querySelector(".profile__title"); //имя профиля
const profileCredentials = root.querySelector(".profile__subtitle"); //описание профиля
const initialCards = [
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

//скрываем попап
function hidePopup() {
  //убираем класс отображения из элемента
  popup.classList.remove("popup_opened");
}
//показываем попап
function showPopup() {
  //добавляем класс отображения в элемент
  popup.classList.add("popup_opened");
  //копируем значения имени и описания из профиля в форму
  formName.value = profileName.textContent;
  formCredentials.value = profileCredentials.textContent;
}

function handleFormSubmit(e) {
  e.preventDefault();
  //копируем значения полей из формы в профиль
  profileName.textContent = formName.value;
  profileCredentials.textContent = formCredentials.value;
  //прячем форму
  hidePopup();
}

function diplayCard(source) {
  source.forEach(item => {
    // клонируем содержимое тега template
  const card = templateElement.cloneNode(true);
  // наполняем содержимым
  card.querySelector('.element__image').src=item.link;
  card.querySelector('.element__caption').textContent=item.name;
  // отображаем на странице
  elements.prepend(card);
  });
  
}

closeIcon.addEventListener("click", hidePopup);
//клик на кнопке редактирования
profileEditButton.addEventListener("click", showPopup);
//сохраняем и закрываем заполненную форму при нажатии кнопки
form.addEventListener("submit", handleFormSubmit);
//показ карточек на загрузке страницы
document.addEventListener("DOMContentLoaded", ()=>{diplayCard(initialCards);});

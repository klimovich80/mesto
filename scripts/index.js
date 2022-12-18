//блок переменных
const root = document.querySelector(".root");
const main= root.querySelector(".main");
const templateElement = root.querySelector("#tempElement").content; //шаблон картинки
const templatePopup = root.querySelector("#templatePopup").content; //шаблон вслывающего окна
const elements = root.querySelector(".elements__items");
const popup = root.querySelector(".popup"); //попап окно
//const form = popup.querySelector(".popup__form"); //попап форма
//const formName = form.querySelector(".popup__input_type_name"); //поле редактирования имени в форме
//const formCredentials = form.querySelector(".popup__input_type_credentials"); //поле редактирования описания в форме
const closeIcon = root.querySelector(".popup__close-icon"); //иконка закрытия формы
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
function showPopup(elem,title,name,value,button_text) {
  // //добавляем класс отображения в элемент
  // popup.classList.add("popup_opened");
  // //копируем значения имени и описания из профиля в форму
  // formName.value = profileName.textContent;
  // formCredentials.value = profileCredentials.textContent;
  alert('showing popup');
  const pUp=templatePopup.cloneNode(true);
  pUp.querySelector('.popup__title').textContent=title;
  pUp.querySelector('.popup__input_type_name').setAttribute('placeholder',name);//placeholder=name;
  pUp.querySelector('.popup__input_type_credentials').setAttribute('placeholder',value);
  pUp.querySelector('.popup__button').setAttribute('value',button_text);
  pUp.querySelector('.popup__button').textContent=button_text;
  pUp.querySelector('.popup').classList.add("popup_opened");
  main.append(pUp);
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
  //const trashButton = root.querySelector(".element__trash"); //кнопка удаления карточки
  //const likeButton = root.querySelector(".element__like");
  source.forEach((item) => {
    // клонируем содержимое тега template
    const card = templateElement.cloneNode(true);
    // наполняем содержимым
    card.querySelector(".element__image").src = item.link;
    card.querySelector(".element__caption").textContent = item.name;
    // отображаем на странице
    elements.prepend(card);
  });
}

function deleteCard(elem) {
  elem.closest(".element").remove();
}

function likeCard(elem) {
  elem.classList.toggle("element__like_checked");
}

//closeIcon.addEventListener("click", hidePopup);
//клик на кнопке редактирования
//profileEditButton.addEventListener("click", showPopup);
//сохраняем и закрываем заполненную форму при нажатии кнопки
//form.addEventListener("submit", handleFormSubmit);
//показ карточек на загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  diplayCard(initialCards);
});

root.addEventListener("click", (e) => {
  // switch case?
  if (e.target.classList.contains("element__like")) {
    likeCard(e.target);
  } else if (e.target.classList.contains("element__trash")) {
    deleteCard(e.target);
  } else if (e.target.classList.contains("profile__add-button")) {
    alert("add card");
    showPopup(e.target);
  } else if (e.target.classList.contains("profile__edit-button")) {
    alert("edit profile");
    showPopup(e.target,'Редактировать профиль','Введите имя','Немного о себе','Сохранить');
  }else{
    alert(e.target);
  }
});
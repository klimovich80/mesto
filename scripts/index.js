//блок переменных
const root = document.querySelector(".root");
const main = root.querySelector(".main");
const templateElement = root.querySelector("#tempElement").content; //шаблон картинки
const templatePopup = root.querySelector("#templatePopup").content; //шаблон вслывающего окна
const templatePopupImage = root.querySelector("#templatePopupImage").content;
const elements = root.querySelector(".elements__items");
const popup = root.querySelector(".popup"); //попап окно
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

//удаляем попап
function hidePopup(elem) {
  elem.closest(".popup").remove();
}
//показываем попап
function showPopup(title, name, value, button_text, nameContent, valueContent) {
  // //добавляем класс отображения в элемент
  // //копируем значения имени и описания из профиля в форму
  const pUp = templatePopup.cloneNode(true);
  pUp.querySelector(".popup__title").textContent = title;
  pUp
    .querySelector(".popup__input_type_name")
    .setAttribute("placeholder", name);
  pUp.querySelector(".popup__input_type_name").value = nameContent;
  pUp
    .querySelector(".popup__input_type_credentials")
    .setAttribute("placeholder", value);
  pUp.querySelector(".popup__input_type_credentials").value = valueContent;
  pUp.querySelector(".popup__button").setAttribute("value", button_text);
  pUp.querySelector(".popup__button").textContent = button_text;
  main.append(pUp);
}

function handleFormSubmit(e) {
  e.preventDefault();
  if (e.target.querySelector(".popup__button").value === "Сохранить") {
    //копируем значения полей из формы в профиль
    profileName.textContent = e.target.querySelector(
      ".popup__input_type_name"
    ).value;
    profileCredentials.textContent = e.target.querySelector(
      ".popup__input_type_credentials"
    ).value;
    //прячем форму
  } else {
    const addCard = [
      {
        name: e.target.querySelector(".popup__input_type_name").value,
        link: e.target.querySelector(".popup__input_type_credentials").value,
      },
    ];
    diplayCard(addCard);
  }
  hidePopup(e.target);
}

function diplayCard(source) {
  source.forEach((item) => {
    // клонируем содержимое тега template
    const card = templateElement.cloneNode(true);
    // наполняем содержимым
    card.querySelector(".element__image").src = item.link;
    card.querySelector(".element__image").alt = item.name;
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

//сохраняем и закрываем заполненную форму при нажатии кнопки
root.addEventListener("submit", handleFormSubmit);
//показ карточек на загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  diplayCard(initialCards);
});

function showPicture(elem) {
  const pImage = templatePopupImage.cloneNode(true);
  pImage.querySelector(".popup__image").src = elem.src;
  pImage.querySelector(".popup__image").alt = elem.alt;
  pImage.querySelector(".popup__caption").textContent = elem.alt;
  main.append(pImage);
}

root.addEventListener("click", (e) => {
  // switch case?
  if (e.target.classList.contains("element__like")) {
    likeCard(e.target);
  } else if (e.target.classList.contains("element__trash")) {
    deleteCard(e.target);
  } else if (e.target.classList.contains("profile__add-button")) {
    showPopup(
      "Новое место",
      "Название",
      "Ссылка на картинку",
      "Создать",
      "",
      ""
    );
  } else if (e.target.classList.contains("profile__edit-button")) {
    showPopup(
      "Редактировать профиль",
      "Введите имя",
      "Немного о себе",
      "Сохранить",
      profileName.textContent,
      profileCredentials.textContent
    );
  } else if (e.target.classList.contains("popup__close-icon")) {
    hidePopup(e.target);
  } else if (e.target.classList.contains("element__image")) {
    showPicture(e.target);
  } else if (e.target.classList.contains("popup__image_close-icon")) {
    hidePopup(e.target);
  } else {
    console.log(e.target);
  }
});

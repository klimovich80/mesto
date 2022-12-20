//--переменные--
const root = document.querySelector(".root");
const main = root.querySelector(".main");
const templateElement = root.querySelector("#tempElement").content; //шаблон картинки
const templatePopup = root.querySelector("#templatePopup").content; //шаблон вслывающего окна
const templatePopupImage = root.querySelector("#templatePopupImage").content;
const elements = root.querySelector(".elements__items");
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
//--функции--
//удаление попап
function hidePopup(elem) {
  const popup = elem.closest(".popup");
  popup.classList.remove("fade-in");
  popup.classList.add("fade-out");
  popup.addEventListener("animationend", () => {
    popup.remove();
  });
}
//появление попапа
function showPopup(
  elem,
  title,
  namePlaceholder,
  infoPlaceholder,
  button_text,
  nameContent,
  infoContent
) {
  const pUp = templatePopup.cloneNode(true);
  pUp.querySelector(".popup__title").textContent = title;
  pUp.querySelector(".popup__input_type_name").placeholder = namePlaceholder;
  pUp.querySelector(".popup__input_type_name").value = nameContent;
  pUp.querySelector(".popup__button").value = button_text;
  pUp.querySelector(".popup__button").textContent = button_text;
  pUp.querySelector(".popup__input_type_credentials").value = infoContent;
  pUp.querySelector(
    ".popup__input_type_credentials"
  ).placeholder = infoPlaceholder;
  if (elem.classList.contains("profile__add-button")) {
    pUp.querySelector(".popup__input_type_credentials").type = "url";
  }
  main.append(pUp);
}
//попдписка на заполнение формы
function handleFormSubmit(e) {
  e.preventDefault();
  //если форма вызвана для редактирования профиля
  if (e.target.querySelector(".popup__button").value === "Сохранить") {
    //заполняем поля профиля данными
    profileName.textContent = e.target.querySelector(
      ".popup__input_type_name"
    ).value;
    profileCredentials.textContent = e.target.querySelector(
      ".popup__input_type_credentials"
    ).value;
  } else {
    //иначе считаем это формой добавления карточки
    const addCard = [
      {
        name: e.target.querySelector(".popup__input_type_name").value,
        link: e.target.querySelector(".popup__input_type_credentials").value,
      },
    ];
    //добавляем новую карточку с нужными данными
    diplayCard(addCard);
  }
  hidePopup(e.target);
}
//отображение карточек
function diplayCard(source) {
  source.forEach((item) => {
    const card = templateElement.cloneNode(true);
    card.querySelector(".element__image").src = item.link;
    card.querySelector(".element__image").alt = item.name;
    card.querySelector(".element__caption").textContent = item.name;
    elements.prepend(card);
  });
}
//удаление карточек
function deleteCard(elem) {
  elem.closest(".element").remove();
}
//лайк
function likeCard(elem) {
  elem.classList.toggle("element__like_checked");
}
//появление попапа с картинкой
function showPicture(elem) {
  const pImage = templatePopupImage.cloneNode(true);
  pImage.querySelector(".popup__image").src = elem.src;
  pImage.querySelector(".popup__image").alt = elem.alt;
  pImage.querySelector(".popup__caption").textContent = elem.alt;
  main.append(pImage);
}
//--обработчики событий--
//показ карточек при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  diplayCard(initialCards);
});
//сохранение заполненной формы
root.addEventListener("submit", handleFormSubmit);
//обработка кликов
root.addEventListener("click", (e) => {
  const elem = e.target;
  if (elem.classList.contains("element__like")) {
    likeCard(elem);
  } else if (elem.classList.contains("element__trash")) {
    deleteCard(elem);
  } else if (elem.classList.contains("profile__add-button")) {
    showPopup(
      elem,
      "Новое место",
      "Название",
      "Ссылка на картинку",
      "Создать",
      "",
      ""
    );
  } else if (elem.classList.contains("profile__edit-button")) {
    showPopup(
      elem,
      "Редактировать профиль",
      "Введите имя",
      "Немного о себе",
      "Сохранить",
      profileName.textContent,
      profileCredentials.textContent
    );
  } else if (elem.classList.contains("popup__close-icon")) {
    hidePopup(elem);
  } else if (elem.classList.contains("element__image")) {
    showPicture(elem);
  } else if (elem.classList.contains("popup__image_close-icon")) {
    hidePopup(elem);
  }
});

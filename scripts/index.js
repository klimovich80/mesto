//--переменные--
const root = document.querySelector(".root");
const templateCard = root.querySelector("#templateCard").content.querySelector('.element');
const templateEditPopup = root.querySelector("#templateEditPopup").content; //шаблон окна редактирования профиля
const templateAddPopup = root.querySelector("#templateAddPopup").content; //шаблон онка добавления карточки
const templateImagePopup = root.querySelector("#templateImagePopup").content; //шаблон окна картинки
const profileName = root.querySelector(".profile__title"); //имя профиля
const profileCredentials = root.querySelector(".profile__subtitle"); //описание профиля
const elements=root.querySelector(".elements__items");
//--функции--
//удаление попап
function closePopup(popup) {
  popup.classList.remove("fade-in");
  popup.classList.add("fade-out");
  popup.addEventListener("animationend", () => {
    popup.remove();
  });
}
//появление попапа
function openPopup(popup) {
  const pUp = templatePopup.cloneNode(true);
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
function createCard(source) {
  source.forEach((item) => {
    const card = templateCard.cloneNode(true);
    card.querySelector(".element__image").src = item.link;
    card.querySelector(".element__image").alt = item.name;
    card.querySelector(".element__caption").textContent = item.name;
    card.querySelector(".element__trash").addEventListener('click', element=>deleteCard(element));
    card.querySelector(".element__like").addEventListener('click', element=>likeCard(element));
    renderCard(card);
  });
}
//функция добавления начальных карточек
function renderCard(card){
  elements.prepend(card);
}
//удаление карточек
function deleteCard(card) {
  card.target.closest(".element").remove();
}
//лайк
function likeCard(card) {
  card.target.classList.toggle("element__like_checked");
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
  createCard(initialCards);
});
//обработка кликов
root.addEventListener("click", (e) => {
  const elem = e.target;
  if (elem.classList.contains("profile__add-button")) {
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

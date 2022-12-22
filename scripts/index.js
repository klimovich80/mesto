//--переменные--
const root = document.querySelector(".root");
const main = root.querySelector(".main");
const templateCard = root
  .querySelector("#templateCard")
  .content.querySelector(".element");
const templateEditPopup = root
  .querySelector("#templateEditPopup")
  .content.querySelector(".popup_edit-profile"); //шаблон окна редактирования профиля
const templateAddPopup = root
  .querySelector("#templateAddPopup")
  .content.querySelector(".popup_add-card"); //шаблон онка добавления карточки
const templateImagePopup = root
  .querySelector("#templateImagePopup")
  .content.querySelector(".popup_image"); //шаблон окна картинки
const profileName = root.querySelector(".profile__title"); //имя профиля
const profileCredentials = root.querySelector(".profile__subtitle"); //описание профиля
const elements = root.querySelector(".elements__items");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
//--функции--
//удаление попапа
function closePopup(popup) {
  popup.classList.remove("fade-in");
  popup.classList.add("fade-out");
  popup.addEventListener("animationend", () => popup.remove());
}
//появление попапа
function openPopup(popup) {
  const window = popup.cloneNode(true);
  window
    .querySelector(".popup__close-icon")
    .addEventListener("click", (element) =>
      closePopup(element.target.closest(".popup"))
    );
  main.append(window);
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
      .addEventListener("click", () => openPopup(templateImagePopup)); //
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
//--обработчики событий--
//редактирование профиля
editProfileButton.addEventListener("click", () => openPopup(templateEditPopup));
//добавление карточки
addCardButton.addEventListener("click", () => openPopup(templateAddPopup));
//создаем карточки из имеющегося массива
createCard(initialCards);

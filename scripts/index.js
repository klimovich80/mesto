//блок переменных
const popup = document.querySelector(".popup"); //попап окно
const form = popup.querySelector(".popup__form"); //попап форма
const formName = form.querySelector(".popup__input_type_name"); //поле редактирования имени в форме
const formCredentials = form.querySelector(".popup__input_type_credentials"); //поле редактирования описания в форме
const closeIcon = document.querySelector(".popup__close-icon"); //иконка закрытия формы
const profileEditButton = document.querySelector(".profile__edit-button"); //кнопка редактирования профиля
const profileName = document.querySelector(".profile__title"); //имя профиля
const profileCredentials = document.querySelector(".profile__subtitle"); //описание профиля

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

closeIcon.addEventListener("click", hidePopup);
//клик на кнопке редактирования
profileEditButton.addEventListener("click", showPopup);
//сохраняем и закрываем заполненную форму при нажатии кнопки
form.addEventListener("submit", handleFormSubmit);

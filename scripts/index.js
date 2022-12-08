//блок переменных
const popup = document.querySelector('.popup');                              //попап окно
const form=popup.querySelector('.popup__form');                              //попап форма
const formName = form.querySelector('.popup__input_type_name');              //поле редактирования имени в форме
const formCredentials = form.querySelector('.popup__input_type_credentials');//поле редактирования описания в форме
const formSubmit = form.querySelector('.popup__button');                     //кнопка сохранения формы
const closeIcon = document.querySelector('.popup__close-icon');              //иконка закрытия формы
const profileEditButton = document.querySelector('.profile__edit-button');   //кнопка редактирования профиля
const profileTitle = document.querySelector('.profile__title');              //имя профиля
const profileSubitle = document.querySelector('.profile__subtitle');         //описание профиля
//скрываем попап
function hidePopup(item){
  //убираем класс отображения из элемента
  item.classList.add('popup');
  item.classList.remove('popup_opened');
  }
//показываем попап
function showPopup(item) {
  //добавляем класс отображения в элемент
  item.classList.add('popup_opened');
  item.classList.remove('popup');
  //копируем значения имени и описания из профиля в форму
  formName.value = profileTitle.textContent;
  formCredentials.value = profileSubitle.textContent;
}
// клик по иконке
closeIcon.onclick=function() {
  //прячем форму
  hidePopup(popup);
};
//клик на кнопке редактирования
profileEditButton.onclick = function () {
  //показываем форму
  showPopup(popup);
};
//сохраняем и закрываем заполненную форму при нажатии кнопки
formSubmit.onclick = function(e){
  //сбрасываем действие кнопки по умолчнию
  e.preventDefault();
  //копируем значения полей из формы в профиль
  profileTitle.textContent = formName.value;
  profileSubitle.textContent = formCredentials.value;
  //прячем форму
  hidePopup(popup);
};
//охраняем и закрываем заполненную форму при нажатии Enter
popup.addEventListener('keydown', function(e){
  if(e.keyCode === 13) {
    //копируем значения полей из формы в профиль
    profileTitle.innerText = formName.value;
    profileSubitle.innerText = formCredentials.value;
    //прячем форму
    hidePopup(popup);
  }
});



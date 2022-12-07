//блок переменных
let popup = document.querySelector('.popup');                            //попап окно
let form=popup.querySelector('.popup__container');                       //попап форма
let input = form.querySelectorAll('.popup__input');                      //инпуты формы
let formName=input[0];                                                   //поле редактирования имени в форме
let formCredentials = input[1];                                          //поле редактирования описания в форме
let formSubmit = form.querySelector('.popup__button');                   //кнопка сохранения формы
let closeIcon = document.querySelector('.popup__close-icon');            //иконка закрытия формы
let profileEditButton = document.querySelector('.profile__edit-button'); //кнопка редактирования профиля
let profileTitle = document.querySelector('.profile__title');            //имя профиля
let profileSubitle = document.querySelector('.profile__subtitle');       //описание профиля
//скрываем попап
function hidePopup(item){
  //убираем класс отображения из элемента
    item.classList.remove('popup__opened');
  }
//показываем попап
function showPopup(item) {
  //добавляем класс отображения в элемент
  item.classList.add('popup__opened');
  //копируем значения имени и описания из профиля в форму
  formName.setAttribute('value', profileTitle.innerText);
  formCredentials.setAttribute('value', profileSubitle.innerText);
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
  profileTitle.innerText = formName.value;
  profileSubitle.innerText = formCredentials.value;
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



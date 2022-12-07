
let popup = document.querySelector('.popup');
let form=popup.querySelector('.popup__container');
let input = form.querySelectorAll('.popup__input');
let formName=input[0];
let formCredentials = input[1];
let formSubmit = form.querySelector('.popup__button');
let closeIcon = document.querySelector('.popup__close-icon');
let profileEditButton = document.querySelector('.profile__edit-button'); 
let profileTitle = document.querySelector('.profile__title');
let profileSubitle = document.querySelector('.profile__subtitle');

function hidePopup(item){
    item.classList.remove('popup__opened');
  }

function showPopup(item) {
  item.classList.add('popup__opened');
  formName.setAttribute('value', profileTitle.innerText);
  formCredentials.setAttribute('value', profileSubitle.innerText);
}

closeIcon.onclick=function() {
  hidePopup(popup);
};

profileEditButton.onclick = function () {
  showPopup(popup);
};

formSubmit.onclick = function(e){
  e.preventDefault();
  profileTitle.innerText = formName.value;
  profileSubitle.innerText = formCredentials.value;
  hidePopup(popup);
  console.log('form submitted');
};



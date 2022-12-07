
let popup = document.querySelector('.popup');
let form=popup.querySelector('.popup__form');
// let input = form.querySelectorAll('.popup__input');
let popupOpened = document.querySelector('.popup__opened'); 
let closeIcon = document.querySelector('.popup__close-icon');
let profileEditButton = document.querySelector('.profile__edit-button'); 

function hidePopup(item){
    item.classList.remove('popup__opened');
  }

function showPopup(item) {
  item.classList.add('popup__opened');
}

closeIcon.onclick=function() {
  hidePopup(popup);
};

profileEditButton.onclick = function () {
  showPopup(popup);
};



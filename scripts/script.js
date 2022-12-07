
let popup = document.querySelector('.popup');
let popupOpened = document.querySelectorAll('.popup__opened'); 
let closeIcon = document.querySelector('.popup__close-icon');
let profileEditButton = document.querySelector('.profile__edit-button'); 

function hidePopup(arr){
  arr.forEach(function(item){
    item.classList.remove('popup__opened');
  item.classList.add('popup');
  });
  
}

function showPopup(arr) {
  item.classList.remove('popup');
  item.classList.add('popup__opened');
}

closeIcon.onclick=function() {
  hidePopup(popupOpened);
};

profileEditButton.onclick = function () {
  console.log(profileEditButton);
  showPopup(popup);
};




let popup = document.querySelector('.popup');
let popupOpened = document.querySelectorAll('.popup__opened'); 
let closeIcon = document.querySelector('.popup__close-icon');
let profileEditButton = document.querySelector('.profile__edit-button'); 

function hidePopup(arr){
  arr.forEach(function(item){
    item.classList.remove('popup__opened');
  });
  
}

function showPopup(arr) {
  // item.classList.remove('popup');
  // item.classList.add('popup__opened');
  console.log(popupOpened);
  alert('show popup');
}

closeIcon.onclick=function() {
  hidePopup(popupOpened);
};

profileEditButton.onclick = function () {
  showPopup(popup);
};



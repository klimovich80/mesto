import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
  initialCards,
  validationConfig,
  elements,
  template,
  profileName,
  profileCredentials,
  profileEditButton,
  editPofilePopup,
  editProfileName,
  editProfileCredentials,
  addCardPopup,
  addCardPlace,
  addCardUrl,
  addCardButton,
  imagePopup,
  imageSource,
  imageCaption,
} from "../utils/constants.js";

//--переменные--
const editProfileValidation = new FormValidator(
  validationConfig,
  editPofilePopup
);
const addCardValidation = new FormValidator(validationConfig, addCardPopup);
//включаем валидацию форм
//--функции--
editProfileValidation.enableValidation();
addCardValidation.enableValidation();
//функция открытия формы добавления карточки
function openAddCardPopup() {
  addCardValidation.clearValidation();
  const addPopup = new PopupWithForm(
    {
      submitHandler: (formData) => {
        console.log("formData addPopup: ", formData);
        elements.prepend(
          createCard({ name: addCardPlace.value, link: addCardUrl.value })
        );
      },
    },
    addCardPopup,
    validationConfig.inputSelector,
    validationConfig.formSelector
  );
  addPopup.open();
}
//функция открытия формы редактирования профиля
function openEditProfilePopup() {
  editProfileValidation.clearValidation();
  //const userInfo= new UserInfo()
  editProfileName.value = profileName.textContent;
  editProfileCredentials.value = profileCredentials.textContent;
  const editPopup = new PopupWithForm(
    {
      submitHandler: (formData) => {
        console.log("formData edit Popup: ", formData);
      },
    },
    editPofilePopup,
    validationConfig.inputSelector,
    validationConfig.formSelector
  );
  editPopup.open();
}
//рендерим карточки
const renderInitialCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      renderInitialCards.addItem(cardElement);
    },
  },
  elements
);
//функция всплытия отдельным попапом нажатой карточки
function handleCardClick(name, link) {
  const popupWithImage = new PopupWithImage(
    { name: name, link: link },
    imageSource,
    imageCaption,
    imagePopup
  );
  popupWithImage.open();
}
//функция созданя карточки
function createCard(item) {
  return new Card(item, template, handleCardClick).getCard();
}
//--обработчики событий--
// нажатие кнопки редактирования профиля
profileEditButton.addEventListener("click", () => {
  openEditProfilePopup();
});
//нажатие кнопки добавления карточки
addCardButton.addEventListener("click", openAddCardPopup);

renderInitialCards.renderItems();

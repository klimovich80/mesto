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
        elements.prepend(
          createCard({ name: formData.place, link: formData.url })
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
  const userInfo = new UserInfo({
    nameSelector: profileName,
    infoSelector: profileCredentials,
  });
  const getUserInfo = userInfo.getUserInfo({
    name: profileName.innerHTML,
    info: profileCredentials.innerHTML,
  });
  editProfileName.value = getUserInfo.name;
  editProfileCredentials.value = getUserInfo.info;
  const editPopup = new PopupWithForm(
    {
      submitHandler: (formData) => {
        userInfo.setUserInfo({
          name: formData.name,
          info: formData.credentials,
        });
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

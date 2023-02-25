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
  editPofilePopup,
  editProfileName,
  editProfileCredentials,
  addCardPopup,
  imagePopup,
  imageSource,
  imageCaption,
  profileEditButton,
  addCardButton,
} from "../utils/constants.js";
import "../pages/index.css";

//функциии валидации форм
const editProfileValidation = new FormValidator(
  validationConfig,
  editPofilePopup
);

const addCardValidation = new FormValidator(validationConfig, addCardPopup);
//экземпляры попапа с формой
const addPopup = new PopupWithForm(
  {
    submitHandler: (formData) => {
      renderCards.addItem(
        createCard({ name: formData.place, link: formData.url }),
        false
      );
      addPopup.close();
    },
  },
  addCardPopup,
  validationConfig.inputSelector,
  validationConfig.formSelector
);

const editPopup = new PopupWithForm(
  {
    submitHandler: (formData) => {
      userInfo.setUserInfo({
        name: formData.name,
        info: formData.credentials,
      });
      editPopup.close();
    },
  },
  editPofilePopup,
  validationConfig.inputSelector,
  validationConfig.formSelector
);
//экземпляры попапа с картинкой
const popupWithImage = new PopupWithImage(
  imageSource,
  imageCaption,
  imagePopup
);
//экземпляр UserInfo с селекторами профиля
const userInfo = new UserInfo({
  nameSelector: profileName,
  infoSelector: profileCredentials,
});
//функция открытия формы добавления карточки
function openAddCardPopup() {
  addCardValidation.clearValidation();
  addPopup.open();
}
//функция открытия формы редактирования профиля
function openEditProfilePopup() {
  //валидируем инпуты
  editProfileValidation.clearValidation();
  //получаем данные профиля
  const getUserInfo = userInfo.getUserInfo();
  //присваиваем соответвующие значения форме
  editProfileName.value = getUserInfo.name;
  editProfileCredentials.value = getUserInfo.info;
  //открываем экземпляр попапа с формой
  editPopup.open();
}
//рендерим карточки
const renderCards = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      renderCards.addItem(cardElement, true);
    },
  },
  elements
);
//функция всплытия отдельным попапом нажатой карточки
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}
//функция создания карточки
function createCard(item) {
  return new Card(item, template, handleCardClick).getCard();
}
//включаем валидацию форм
editProfileValidation.enableValidation();
addCardValidation.enableValidation();

//--обработчики событий--
// нажатие кнопки редактирования профиля
profileEditButton.addEventListener("click", openEditProfilePopup);
//нажатие кнопки добавления карточки
addCardButton.addEventListener("click", openAddCardPopup);
//рендерим карточки
renderCards.renderItems(initialCards);

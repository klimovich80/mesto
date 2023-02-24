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
} from "./constants.js";
//функциии валидации форм
const editProfileValidation = new FormValidator(
  validationConfig,
  editPofilePopup
);

const addCardValidation = new FormValidator(validationConfig, addCardPopup);
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
  //валидируем инпуты
  editProfileValidation.clearValidation();
  //объявляем экземпляр UserInfo с селекторами профиля
  const userInfo = new UserInfo({
    nameSelector: profileName,
    infoSelector: profileCredentials,
  });
  //получаем данные профиля
  const getUserInfo = userInfo.getUserInfo();
  //присваиваем соответвующие значения форме
  editProfileName.value = getUserInfo.name;
  editProfileCredentials.value = getUserInfo.info;
  //объявляем экземпляр попапа с формой
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
  //открываем экземпляр попапа с формой
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
//функция создания карточки
function createCard(item) {
  return new Card(item, template, handleCardClick).getCard();
}

export {
  editProfileValidation,
  addCardValidation,
  renderInitialCards,
  openAddCardPopup,
  openEditProfilePopup,
};

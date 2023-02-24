import {
  editProfileValidation,
  addCardValidation,
  renderInitialCards,
  openAddCardPopup,
  openEditProfilePopup,
} from "../utils/utils.js";
import { profileEditButton, addCardButton } from "../utils/constants.js";

//--переменные--
//включаем валидацию форм
//--функции--
editProfileValidation.enableValidation();
addCardValidation.enableValidation();

//--обработчики событий--
// нажатие кнопки редактирования профиля
profileEditButton.addEventListener("click", openEditProfilePopup);
//нажатие кнопки добавления карточки
addCardButton.addEventListener("click", openAddCardPopup);

renderInitialCards.renderItems();

import "../../pages/index.css";
import {
  editProfileValidation,
  addCardValidation,
  renderInitialCards,
  openAddCardPopup,
  openEditProfilePopup,
} from "../utils/utils.js";
import {
  profileEditButton,
  addCardButton,
  initialCards,
} from "../utils/constants.js";

//включаем валидацию форм
editProfileValidation.enableValidation();
addCardValidation.enableValidation();

//--обработчики событий--
// нажатие кнопки редактирования профиля
profileEditButton.addEventListener("click", openEditProfilePopup);
//нажатие кнопки добавления карточки
addCardButton.addEventListener("click", openAddCardPopup);
//рендерим карточки
renderInitialCards.renderItems(initialCards);

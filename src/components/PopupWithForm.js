import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ submitHandler }, popupElement, config) {
    super(popupElement);
    this._submitHandler = submitHandler;
    this._form = popupElement.querySelector(config.formSelector);
    this._inputList = Array.from(
      this._element.querySelectorAll(config.inputSelector)
    );
    this._submitButton = this._form.querySelector(".popup__button");
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._formValues = {};
  }
  //приватный метод собирающий значения полей
  _getInputValues() {
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  //публичный метод перезаписывающий метод класаа Popup и обрабатывающий submit
  setEventListeners() {
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._changeToLoadingText();
      this._submitHandler(this._getInputValues(this));
    });
    super.setEventListeners();
  }
  //перезаписанный публичный метод закрытия попапа
  close() {
    //очистка формы
    this._form.reset();
    super.close();
  }
  _changeToLoadingText() {
    this._submitButton.textContent = "Зaгрузка...";
  }
  //функция замены надписи на кнопке формы
  changeToOriginalText() {
    this._submitButton.textContent = this._submitButton.value;
  }
}

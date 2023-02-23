import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ submitHandler }, popupSelector, inputSelector, formSelector) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._formSelector = popupSelector.querySelector(formSelector);
    this._inputList = Array.from(
      this._selector.querySelectorAll(inputSelector)
    );
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
    this._formSelector.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitHandler(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }
  //перезаписанный публичный метод закрытия попапа
  close() {
    //очистка формы
    this._formSelector.reset();
    super.close();
  }
}

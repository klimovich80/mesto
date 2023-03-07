import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ submitHandler }, popupElement, inputSelector, formSelector) {
    super(popupElement);
    this._submitHandler = submitHandler;
    this._form = popupElement.querySelector(formSelector);
    this._inputList = Array.from(this._element.querySelectorAll(inputSelector));
    this._formValues = {};
  }
  //приватный метод собирающий значения полей
  _getInputValues(event) {
    console.log('getting input values from event :', event);
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  //публичный метод перезаписывающий метод класаа Popup и обрабатывающий submit
  setEventListeners() {
    this._form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        this._submitHandler(this._getInputValues(this));
      },
      { once: true }
    );
    super.setEventListeners();
  }
  //перезаписанный публичный метод закрытия попапа
  close() {
    //TODO remove eventListeners
    //очистка формы
    this._form.reset();
    super.close();
  }
}

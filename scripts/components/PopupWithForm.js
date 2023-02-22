import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(submitHandler, popupSelector) {
    super(popupSelector);
    this._submitHandler = submitHandler;
  }
  //приватный метод собирающий значения полей
  _getInputValues() {}
  //публичный метод перезаписывающий метод класаа Popup и обрабатывающий submit
  setEventListeners() {
    //+form submit
    console.log("class PopupWithForm submit on : ", this._selector);
    console.log("class PopupWithForm event : ", event);
    event.preventDefault();
    super.setEventListeners();
  }
  //перезаписанный публичный метод закрытия попапа
  close() {
    //очистка формы
    //this._getInputValues();
    super.close();
  }
}

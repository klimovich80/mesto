import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({submitHandler}, popupSelector) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    //this._submitHandler = this._submitHandler.bind(this);
  }
  //приватный метод собирающий значения полей
  _getInputValues() {}
  //публичный метод перезаписывающий метод класаа Popup и обрабатывающий submit
  setEventListeners() {
    this._selector.addEventListener("submit", this._submitHandler);
    super.setEventListeners();
  }
  //перезаписанный публичный метод закрытия попапа
  close() {
    //очистка формы
    //this._getInputValues();
    this._selector.removeEventListener("submit", this._submitHandler);
    super.close();
  }
}

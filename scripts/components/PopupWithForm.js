import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(submitHandler, popupSelector) {
    super(popupSelector);
    this._submitHandler = submitHandler;
  }
  //приватный метод собирающий значения полей
  _getInputValues() {
  }
  //публичный метод 
  //перезаписывающий метод класаа Popup
  //обрабатывающий submit
  setEventListeners() {
    //+form submit
    super.setEventListeners();
  }
  //перезаписанный публичный метод закрытия попапа
  close() {
    //очистка формы
    //this._getInputValues();
    super.close();
  }
}

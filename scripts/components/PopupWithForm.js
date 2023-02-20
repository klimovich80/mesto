import Popup from "./Popup.js";

export default class PopupWithForm extends Popup() {
  constructor(submitHandler, popupSelector) {
    super(popupSelector);
    this._submitHandler = submitHandler;
  }
  //приватный метод собирания занчений полей
  _getInputValues() {}
  //перезаписанный публичный метод навешивания событий
  setEventListeners(){
    //default actions
    //+form submit
  }
//перезаписанный публичный метод закрытия попапа
close(){
  //очистка формы
  super.close();
}
}

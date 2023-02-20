import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(submitHandler, popupSelector) {
    super(popupSelector);
    this._submitHandler = submitHandler;
  }
  //приватный метод собирания значений полей
  _getInputValues() {}
  //перезаписанный публичный метод навешивания событий
  setEventListeners() {
    //+form submit
    super.setEventListeners();
  }
  //перезаписанный публичный метод закрытия попапа
  close() {
    //очистка формы
    super.close();
  }
}

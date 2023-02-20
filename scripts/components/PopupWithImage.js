import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ name, link }, imageSource, imageCaption, popupSelector) {
    super(popupSelector);
    this._name = name;
    this._link = link;
    this._imageSource = imageSource;
    this._imageCaption = imageCaption;
  }
  //перезаписанный метод открытия попапа с нужной картинкой и подписью
  open() {
    this._imageSource.src = this._link;
    this._imageSource.alt = this._name;
    this._imageCaption.textContent = this._name;
    super.open();
  }
}

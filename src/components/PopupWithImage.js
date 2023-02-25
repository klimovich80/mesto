import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(imageSource, imageCaption, popupElement) {
    super(popupElement);
    this._imageSource = imageSource;
    this._imageCaption = imageCaption;
  }
  //перезаписанный метод открытия попапа с нужной картинкой и подписью
  open(name, link) {
    this._imageSource.src = link;
    this._imageSource.alt = name;
    this._imageCaption.textContent = name;
    super.open();
  }
}

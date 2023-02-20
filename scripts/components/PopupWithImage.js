import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ name, link }, popupSelector) {
    super(popupSelector);
    this._name = name;
    this._link = link;
  }
  open() {
    const imageSource = this._selector.querySelector(".popup__image"); //находим класс картинки в документе
    const imageCaption = this._selector.querySelector(".popup__caption"); //находим класс надписи в документе
    imageSource.src = this._link;
    imageSource.alt = this._name;
    imageCaption.textContent = this._name;
    super.open();
  }
}

//TODO fix ESC

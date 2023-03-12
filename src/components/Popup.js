export default class Popup {
  constructor(popupElement) {
    this._element = popupElement;
    this._overlay = this._element.querySelector(".popup__overlay");
    this._closeButton = this._element.querySelector(".close-button");
    //жесткая привязка функций к контексту
    //помогает со слушателями событий
    this._handleEscClose = this._handleEscClose.bind(this);
    this.close = this.close.bind(this);
  }
  //публичный метод открытия попапа
  open() {
    //нажатие ESC
    document.addEventListener("keydown", this._handleEscClose);
    this._element.classList.add("popup_active");
  }
  //публичный метод закрытия попапа
  close() {
    //removing event listeners
    document.removeEventListener("keydown", this._handleEscClose);
    this._element.classList.remove("popup_active");
  }
  //приватный метод закрытия по нажатии ESC
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
  //публичный метод навешивания слушателей
  setEventListeners() {
    //клик по оверлею
    this._overlay.addEventListener("click", this.close);
    //клик по крестику
    this._closeButton.addEventListener("click", this.close);
  }
}

export default class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
    this._overlay = this._selector.querySelector(".popup__overlay");
    this._closeButton = this._selector.querySelector(".close-button");
    //жесткая привязка функций к контексту
    //помогает со слушателями событий
    this._handleEscClose = this._handleEscClose.bind(this);
    this.close = this.close.bind(this);
  }
  //публичный метод открытия попапа
  open() {
    this.setEventListeners();
    this._selector.classList.add("popup_active");
  }
  //публичный метод закрытия попапа
  close() {
    //removing event listeners
    this._closeButton.removeEventListener("click", this.close);
    this._overlay.removeEventListener("click", this.close);
    this._selector.classList.remove("popup_active");
  }
  //приватный метод закрытия по нажатии ESC
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
    document.removeEventListener("keydown", this._handleEscClose);
  }
  //публичный метод навешивания слушателей
  setEventListeners() {
    //клик по оверлею
    this._overlay.addEventListener("click", this.close);
    //клик по крестику
    this._closeButton.addEventListener("click", this.close);
    //нажатие ESC
    document.addEventListener("keydown", this._handleEscClose);
  }

  //TODO refactor querySelectors
}

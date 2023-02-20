export default class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
  }
  //публичный метод открытия попапа
  open() {
    this._selector.classList.add("popup_active");
    document.addEventListener("keydown", (event) =>
      this._handleEscClose(event)
    );
  }
  //публичный метод закрытия попапа
  close() {
    this._selector.classList.remove("popup_active");
    document.removeEventListener("keydown", (event) =>
      this._handleEscClose(event)
    );
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
    const overlay = this._selector.querySelector(".popup__overlay");
    overlay.addEventListener("click", this.close());
    //клик по крестику
    const closeButton = this._selector.querySelector(".close-button");
    closeButton.addEventListener("click", this.close());
  }
}

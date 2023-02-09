import { openPopup } from "./index.js";
export class Card {
  //инициируем приватные переменные
  constructor(data, templateSelector, openPopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openPopup = openPopup;
  }

  //копируем разметку
  _getTemplate() {
    const _cardElement = this._templateSelector.cloneNode(true);
    return _cardElement;
  }
  //публичный метод создания карточки
  getCard() {
    //определяем переменную
    this._element = this._getTemplate();
    //навешиваем события
    this._setEventListeners();
    //присваиваем значения
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    this._element.querySelector(".element__caption").textContent = this._name;
    //взвращаем готовую карточку
    return this._element;
  }
  //приватный метод навешивания событий
  _setEventListeners() {
    //клик на мусорке
    this._element
      .querySelector(".element__trash")
      .addEventListener("click", () => this._removeCard(this._element));
    //клик на сердечке
    this._element
      .querySelector(".element__like")
      .addEventListener("click", (event) => this._likeCard(event.target));
    //клика на карточке
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        const _popupImage = document.querySelector(".popup__image");
        const _popupCaption = document.querySelector(".popup__caption");
        const _popup = document.querySelector(".popup_open-image");
        _popupImage.src = this._link;
        _popupImage.alt = this._name;
        _popupCaption.textContent = this._name;
        this._openPopup(_popup);
      });
  }
  //приватный метод удаления карточки
  _removeCard() {
    this._element.remove();
  }
  //приватный метод обработки лайка
  _likeCard() {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_checked");
  }
}
//TODO проверить закрытие картинки попапа карты по клику на крестике

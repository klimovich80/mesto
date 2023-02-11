import { imagePopup, imageSource, imageCaption } from "./index.js";

export class Card {
  //инициируем приватные переменные
  constructor(data, templateSelector, openPopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openPopup = openPopup;
    this._imagePopup = imagePopup;
    this._imageSource = imageSource;
    this._imageCaption = imageCaption;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".element__like");
    this._cardImage = this._element.querySelector(".element__image");
    this._cardCaption = this._element.querySelector(".element__caption");
  }

  //копируем разметку
  _getTemplate() {
    const _cardElement = this._templateSelector.cloneNode(true);
    return _cardElement;
  }
  //публичный метод создания карточки
  getCard() {
    //навешиваем события
    this._setEventListeners();
    //присваиваем значения
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardCaption.textContent = this._name;
    //взвращаем готовую карточку
    return this._element;
  }
  //приватный метод навешивания событий
  _setEventListeners() {
    //клик на мусорке
    this._element
      .querySelector(".element__trash")
      .addEventListener("click", () => this._removeCard());
    //клик на сердечке
    this._likeButton.addEventListener("click", (event) =>
      this._likeCard(event.target)
    );
    //клика на карточке
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleImageClick();
      });
  }
  //приватный метод удаления карточки
  _removeCard() {
    this._element.remove();
  }
  //приватный метод обработки лайка
  _likeCard() {
    this._likeButton.classList.toggle("element__like_checked");
  }

  _handleImageClick() {
    this._imageSource.src = this._link;
    this._imageSource.alt = this._name;
    this._imageCaption.textContent = this._name;
    this._openPopup(this._imagePopup);
  }
}

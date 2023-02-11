import { imagePopup, imageSource, imageCaption } from "./index.js";
//TODO
// с 8го спринта нельзя будет использовать снаружи класса или импортировать в файлы с классами что-либо (только класс Popup можно для наследования). Нужно использовать только мягкое связывание
// Это надо будет делать уже через конструктор. Давайте это и сделаем.
// Нужно сделать отдельную функцию под названием handleCardClick в index.js - она будет получать на вход данные карточки:
// function handleCardClick(name, link) {
//   устанавливаем ссылку
//   устанавливаем подпись картинке
//   открываем попап универсальной функцией, которая навешивает обработчик Escape внутри себя
// }
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
      .addEventListener("click", () => this._removeCard());
    //клик на сердечке
    this._element
      .querySelector(".element__like")
      .addEventListener("click", (event) => this._likeCard(event.target));
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
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_checked");
  }

  _handleImageClick() {
    this._imageSource.src = this._link;
    this._imageSource.alt = this._name;
    this._imageCaption.textContent = this._name;
    this._openPopup(this._imagePopup);
  }
}

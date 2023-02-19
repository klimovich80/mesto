export default class Card {
  //инициируем приватные переменные
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".element__like");
    this._cardImage = this._element.querySelector(".element__image");
    this._cardCaption = this._element.querySelector(".element__caption");
    this._cardTrashcan = this._element.querySelector(".element__trash");
    this._handleCardClick = handleCardClick;
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
    this._cardTrashcan.addEventListener("click", () => this._removeCard());
    //клик на сердечке
    this._likeButton.addEventListener("click", (event) =>
      this._likeCard(event.target)
    );
    //клика на карточке
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
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
}

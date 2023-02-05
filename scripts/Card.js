export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }
  _getTemplate() {
    const _cardElement = this._templateSelector.cloneNode(true);
    return _cardElement;
  }
  getCard() {
    //определяем переменные
    this._element = this._getTemplate();
    //вызываем обработчик событий
    this._setEventListeners();
    //присваиваем значения
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    this._element.querySelector(".element__caption").textContent = this._name;
    //взвращаем готовую карточку
    return this._element;
  }

  _setEventListeners() {
    //удаления
    this._element
      .querySelector(".element__trash")
      .addEventListener("click", () => _removeCard(card));
    //лайк
    this._element
      .querySelector(".element__like")
      .addEventListener("click", (event) => _likeCard(event.target));
    //открытие поапа карточки
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._element.querySelector(".popup__image").src = this._link;
        this._element.querySelector(".popup__image").alt = this._name;
        this._element.querySelector(".popup__caption").textContent = this._name;
        openPopup(this._element.querySelector(".popup_open-image"));
      });
  }
  //удаления
  _removeCard() {
    this._element.remove();
  }
  //лайка
  _likeCard() {
    this._element.classList.toggle("element__like_checked");
  }
}

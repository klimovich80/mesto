export class Card {
  //инициируем приватные переменные
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
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
    console.log('this._element: ', this._element);
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
        this._element.querySelector(".popup__image").src = this._link;
        this._element.querySelector(".popup__image").alt = this._name;
        this._element.querySelector(".popup__caption").textContent = this._name;
        openPopup(this._element.querySelector(".popup_open-image"));
      });
  }
  //приватный метод удаления карточки
  _removeCard() {
    this._element.remove();
  }
  //приватный метод обработки лайка
  _likeCard() {
    this._element.querySelector('.element__like').classList.toggle("element__like_checked");
  }
}
//TODO проверить закрытие картинки попапа карты по клику на крестике

export default class Card {
  //инициируем приватные переменные
  constructor(
    data,
    profileId,
    templateSelector,
    handleCardClick,
    handleDeleteCard,
    handleLikeCard
  ) {
    this._id = data._id;
    this._profileId = profileId;
    this._cardOwner = data.owner._id;
    this._isOwner = this._cardOwner === this._profileId;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".element__like");
    this._likeCounts = this._element.querySelector(".element__count");
    this._cardImage = this._element.querySelector(".element__image");
    this._cardCaption = this._element.querySelector(".element__caption");
    this._cardTrashcan = this._element.querySelector(".element__trash");
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
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
    //отображаем лайк
    this._setLikeFlag();
    //показываем корзину только на наших карточках
    this._setTrashcan();
    //присваиваем значения
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardCaption.textContent = this._name;
    this._likeCounts.textContent = this._likes.length;
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
    this._handleDeleteCard(this);
  }
  //приватный метод обработки лайка
  _likeCard() {
    this._handleLikeCard(this._id, this._likeButton, this._likeCounts);
  }

  _setLikeFlag() {
    this._likes.forEach((like) => {
      if (like._id === this._profileId) {
        this._likeButton.classList.add("element__like_checked");
      }
    });
  }

  _setTrashcan() {
    if (!this._isOwner) {
      this._cardTrashcan.classList.add("element__trash_hidden");
    }
  }
}

export default class Card {
  //инициируем приватные переменные
  constructor(
    data,
    profileId,
    templateSelector,
    likeCheckedSelector,
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
    this._likeSelector = likeCheckedSelector;
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
    //отображаем лайк, если он нами поставлен
    this._setLikeFlag();
    //показываем корзину только на наших карточках
    this._setTrashcan();
    //присваиваем значения
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardCaption.textContent = this._name;
    //отображаем количество лайков
    this.setLikesCount(this._likes.length);
    //взвращаем готовую карточку
    return this._element;
  }
  setLikesCount(count) {
    this._likeCounts.textContent = count;
  }
  //приватный метод навешивания событий
  _setEventListeners() {
    //клик на мусорке
    this._cardTrashcan.addEventListener("click", () => this._removeCard());
    //клик на сердечке
    this._likeButton.addEventListener("click", (event) =>
      this._likeCard(event.target)
    );
    //клик на карточке
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
    this._handleLikeCard(this, this._likeButton);
  }
  //приватный метод отображения лайка, если он нами поставлен
  _setLikeFlag() {
    this._likes.forEach((like) => {
      if (like._id === this._profileId) {
        this.like(true);
      }
    });
  }
  like(bool) {
    if (bool) {
      this._likeButton.classList.add(this._likeSelector);
    } else {
      this._likeButton.classList.remove(this._likeSelector);
    }
  }
  //приватный метод отображения корзины только на собственных карточках
  _setTrashcan() {
    if (!this._isOwner) {
      this._cardTrashcan.classList.add("element__trash_hidden");
    }
  }
}

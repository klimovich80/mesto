export default class Api {
  constructor(config) {
    this._token = config.token;
    this._groupId = config.groupId;
    this._url = config.url;
    this._cardsPage = `${this._url}/v1/${this._groupId}/cards`;
    this._profilePage = `${this._url}/v1/${this._groupId}/users/me`;
  }

  _answer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getResponse(url) {
    return fetch(url, {
      headers: {
        authorization: this._token,
      },
    });
  }
  //Cards methods
  getInitialCards() {
    return this._getResponse(this._cardsPage).then(this._answer);
  }

  postNewCard(name, link) {
    return fetch(this._cardsPage, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._answer);
  }

  deleteLike(id) {
    return fetch(`${this._cardsPage}/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._answer);
  }

  addLike(id) {
    return fetch(`${this._cardsPage}/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    }).then(this._answer);
  }

  deleteCard(cardId) {
    return fetch(`${this._cardsPage}/${cardId}`, {
      method: "DELETE",
    }).then(this._answer);
  }
  //profile methods
  getProfileInfo() {
    return this._getResponse(this._profilePage).then(this._answer);
  }

  editProfileInfo(name, about) {
    return fetch(this._profilePage, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._answer);
  }

  editProfileAvatar(url) {
    return fetch(`${this._profilePage}/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: url,
      }),
    }).then(this._answer);
  }

  //submit methods
  confirmSubmit(cardId) {
    return fetch(`${this._cardsPage}/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._answer);
  }
}

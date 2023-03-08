export default class Api {
  constructor(config) {
    this._token = config.token;
    this._groupId = config.groupId;
    this._url = config.url;
    this._cargsPage = "cards";
    this._profilePage = "users/me";
  }

  _getResponse(page) {
    return fetch(`${this._url}/v1/${this._groupId}/${page}`, {
      headers: {
        authorization: this._token,
      },
    });
  }
  //Cards methods
  getInitialCards() {
    return this._getResponse(this._cargsPage).then((response) =>
      response.json()
    );
  }

  postNewCard(name, link) {
    return fetch(`${this._url}/v1/${this._groupId}/${this._cargsPage}`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  deleteCard(cardId) {
    return fetch(
      `${this._url}/v1/${this._groupId}/${this._cargsPage}/${cardId}`,
      {
        method: "DELETE",
      }
    );
  }
  //profile methods
  getProfileInfo() {
    return this._getResponse(this._profilePage).then((response) =>
      response.json()
    );
  }

  editProfileInfo(name, about) {
    return fetch(`${this._url}/v1/${this._groupId}/${this._profilePage}`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }
}

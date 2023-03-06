import Api from "./Api.js";

export default class CardsApi extends Api {
  constructor(config) {
    super(config);
    this._page = "cards";
  }
  getInitialCards() {
    return super._getResponse(this._page);
  }
  postNewCard(name, link) {
    return fetch(`${this._url}/v1/${this._groupId}/${this._page}`, {
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
}

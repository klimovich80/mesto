import Api from "./Api.js";

export default class CardsApi extends Api {
  getInitialCards() {
    return super._getResponse("cards");
  }
  postNewCard(name, link) {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-61/cards", {
      method: "POST",
      headers: {
        authorization: "ec0a3331-3b70-4ae3-9ae6-450b13b2e789",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }
}

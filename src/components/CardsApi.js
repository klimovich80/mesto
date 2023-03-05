import Api from "./Api.js";

export default class CardsApi extends Api {
  getInitialCards() {
    return super._getResponse("cards");
  }
}

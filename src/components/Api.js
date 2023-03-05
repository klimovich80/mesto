import { groupId, url, token } from "../utils/constants.js";
export default class Api {
  constructor() {
    this._token = token;
    this._groupId = groupId;
    this._url = url;
  }

  _getResponse(page) {
    return fetch(`${this._url}/v1/${this._groupId}/${page}`, {
      headers: {
        authorization: this._token,
      },
    });
  }
}

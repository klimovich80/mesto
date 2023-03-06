
export default class Api {
  constructor(config) {
    this._token = config.token;
    this._groupId = config.groupId;
    this._url = config.url;
  }

  _getResponse(page) {
    return fetch(`${this._url}/v1/${this._groupId}/${page}`, {
      headers: {
        authorization: this._token,
      },
    });
  }
}

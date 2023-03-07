import Api from "../components/Api.js";

export default class ProfileApi extends Api {
  constructor(config) {
    super(config);
    this._page = "users/me";
  }
  getProfileInfo() {
    return super._getResponse(this._page).then((response) => response.json());
  }
  editProfileInfo(name, about) {
    return fetch(`${this._url}/v1/${this._groupId}/${this._page}`, {
      method: "PATCH",
      headers: {
        //authorization: super._token,
        authorization: "ec0a3331-3b70-4ae3-9ae6-450b13b2e789", //TODO fix it using const
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }
}

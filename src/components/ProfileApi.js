import Api from "../components/Api.js";

export default class ProfileApi extends Api {
  getProfileInfo() {
    return super._getResponse("users/me");
  }
  editProfileInfo(name, about) {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-61/users/me", {
      method: "PATCH",
      headers: {
        authorization: "ec0a3331-3b70-4ae3-9ae6-450b13b2e789",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }
}

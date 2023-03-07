export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatar }, profileApi) {
    this._nameSelector = nameSelector;
    this._infoSelector = infoSelector;
    this._avatar = avatar;
    this._profileApi = profileApi;
  }
  //публичный метод возвращает объект с данными пользователя
  getUserInfo() {
    const userData = {
      name: this._nameSelector.innerHTML,
      info: this._infoSelector.innerHTML,
    };
    return userData;
  }
  //публичный метод который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ name, info }) {
    this._nameSelector.textContent = name;
    this._infoSelector.textContent = info;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}

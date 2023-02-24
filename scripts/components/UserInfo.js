export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._nameSelector = nameSelector;
    this._infoSelector = infoSelector;
  }
  //публичный метод возвращает объект с данными пользователя
  getUserInfo({ name, info }) {
    const userData = { name: name, info: info };
    return userData;
  }
  //публичный метод который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({name, info}) {
    this._nameSelector.textContent=name;
    this._infoSelector.textContent=info;
  }

}

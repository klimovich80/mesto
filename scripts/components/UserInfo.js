export default class UserInfo {
  constructor(nameSelectorElement, infoSelectorElement) {
    this._nameSelector = nameSelectorElement;
    this._infoSelector = infoSelectorElement;
  }
  //публичный метод возвращает объект с данными пользователя
  getUserInfo() {
    //Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии
    const userData = { name: this._nameSelector, info: this._infoSelector };
    return userData;
  }
  //публичный метод который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo() {
    console.log("setting new user data");
  }
}

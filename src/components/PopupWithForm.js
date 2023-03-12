import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(
    { submitHandler },
    popupElement,
    inputSelector,
    formSelector,
    inactiveButtonClass
  ) {
    super(popupElement);
    this._submitHandler = submitHandler;
    this._form = popupElement.querySelector(formSelector);
    this._inputList = Array.from(this._element.querySelectorAll(inputSelector));
    this._submitButton = this._form.querySelector(".popup__button");
    this._inactiveButtonClass = inactiveButtonClass;
    this._formValues = {};
  }
  //приватный метод собирающий значения полей
  _getInputValues() {
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  //публичный метод перезаписывающий метод класаа Popup и обрабатывающий submit
  setEventListeners() {
    this._form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        this._changeToLoadingText();
        this._submitHandler(this._getInputValues(this));
      },
      { once: true }
    );
    super.setEventListeners();
  }
  //перезаписанный публичный метод закрытия попапа
  close() {
    //очистка формы
    this._changeToOriginalText();
    this._form.reset();
    super.close();
  }
  _changeToLoadingText() {
    this._submitButton.textContent = "Зaгрузка...";
    this._disableButton();
  }
  //функция замены надписи на кнопке формы
  _changeToOriginalText() {
    this._enableButton();
    this._submitButton.textContent = this._submitButton.value;
  }

  //метод отключения кнопки
  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }
  //метод включения кнопки
  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }
}

export default class FormValidator {
  constructor(validationConfig, validationElement) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._validationForm = validationElement.querySelector(this._formSelector);
    this._submitButton = this._validationForm.querySelector(
      this._submitButtonSelector
    );
    this._inputArray = Array.from(
      this._validationForm.querySelectorAll(this._inputSelector)
    );
  }
  //метод инициации валидации формы
  enableValidation() {
    //вешаем события
    this._setEventListeners();
  }
  //метод очистки формы от показанных ошибок при открытии формы
  clearValidation() {
    //очищаем форму от предыдущих данных
    this._validationForm.reset();
    this._inputArray.forEach((_input) => {
      //прячем ошибки
      this._hideInputError(_input, this._getErrorElement(_input));
    });
    //изменяем состояние кнопки на соответсвующее
    this._toggleButtonState();
  }
  //метод навешивания слушателей событий
  _setEventListeners() {
    //изменяем состояние кнопки на соответсвующее
    this._toggleButtonState();
    //проверяем каждого валидность поля
    this._inputArray.forEach((_input) => {
      _input.addEventListener("input", () => {
        this._checkInputValidity(_input);
        //изменяем состояние кнопки на соответсвующее
        this._toggleButtonState();
      });
    });
  }
  //метод проверки валидности поля
  _hasInvalidInput() {
    return this._inputArray.some((_input) => {
      return !_input.validity.valid;
    });
  }
  //метод установки активности/неактивности для кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  }
  //метод определяющий показ/скрытие ошибок
  _checkInputValidity(_input) {
    if (!_input.validity.valid) {
      this._showInputError(_input, this._getErrorElement(_input));
    } else {
      this._hideInputError(_input, this._getErrorElement(_input));
    }
  }
  //метод показа ошибок
  _showInputError(_input, _errorElement) {
    _input.classList.add(this._inputErrorClass);
    _errorElement.textContent = _input.validationMessage;
    _errorElement.classList.add(this._errorClass);
  }
  //метод скрытия ошибок
  _hideInputError(_input, _errorElement) {
    _input.classList.remove(this._inputErrorClass);
    _errorElement.textContent = "";
    _errorElement.classList.remove(this._errorClass);
  }
  //метод отключения кнопки
  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }
  //метод включения кнопки
  enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }
  //метод определения места где ошибки показываются
  _getErrorElement(_input) {
    return this._validationForm.querySelector(`.${_input.id}-error`);
  }
}

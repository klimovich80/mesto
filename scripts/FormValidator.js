export class FormValidator {
  constructor(validationConfig, validationElement) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._validationElement = validationElement.querySelector(this._formSelector);

    this._submitButton=this._validationElement.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners();
  }

  clearValidation() {
    const _inputArray=Array.from(this._validationElement).querySelectorAll(this._inputSelector);
    _inputArray.forEach(_input=>{
      this._hideInputError();
    });
    this._toggleButtonState();
  }

  _setEventListeners() {
    const _inputArray = Array.from(this._validationElement.querySelectorAll(this._inputSelector)
    );

    //проверить нечальное состояние кнопки
    this._toggleButtonState(_inputArray);

    _inputArray.forEach((_input) => {
      _input.addEventListener("input", () => {
        this._checkInputValidity(_input);
        this._toggleButtonState(_inputArray);
      });
    });
  }

  _hasInvalidInput(_inputArray) {
    return _inputArray.some((_input) => {
      return !_input.validity.valid;
    });
  }

  _toggleButtonState(_inputArray) {
    if (this._hasInvalidInput(_inputArray)) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }
  _checkInputValidity(_input) {
    if (!_input.validity.valid) {
      this._showInputError(_input);
    } else {
      this._hideInputError(_input);
    }
  }

  _showInputError(_input) {
    const _errorElement = this._validationElement.querySelector(
      `.${_input.id}-error`
    );
    _errorElement.classList.add(this._inputErrorClass);
    _errorElement.textContent = _input.validationMessage;
    _errorElement.classList.add(this._errorClass);
  }
  _hideInputError(_input) {
    const _errorElement = this._validationElement.querySelector(
      `.${_input.id}-error`
    );
    _errorElement.classList.remove(this._inputErrorClass);
    _errorElement.textContent = "";
    _errorElement.classList.remove(this._errorClass);
  }

  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    console.log('this._submitButtonSelector: ', this._submitButtonSelector);
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }
}

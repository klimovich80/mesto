class FormValidator {
  constructor(validationConfig, validationElement) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    const _formArray = Array.from(
      document.querySelectorAll(this._formSelector)
    );
    _formArray.forEach((form) => {
      const _inputArray = Array.from(
        form.querySelectorAll(this._inputSelector)
      );
      //проверить нечальное состояние кнопки
      this._toggleButtonState(
        form,
        _inputArray,
        this._submitButtonSelector,
        this._inactiveButtonClass
      );

      _inputArray.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._checkInputValidity(form, inputElement);
          this._toggleButtonState(
            form,
            _inputArray,
            this._submitButtonSelector,
            this._inactiveButtonClass
          );
        });
      });
    });
  }

  _toggleButtonState() {}
  _checkInputValidity() {}
}


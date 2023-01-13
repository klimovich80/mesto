//функция отображения ошибок
const showInputError = (input, message) => {
  const formElement = input.closest(settings.formSelector);
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  input.classList.add(settings.inputErrorClass);
  errorElement.textContent = message;
  errorElement.classList.add(settings.errorClass);
};

//функция скрытия ошибок
const hideInputError = (input) => {
  const formElement = input.closest(settings.formSelector);
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  input.classList.remove(settings.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(settings.errorClass);
};

//функция поверки валидности инпута
//преверяет на валидность и вызывает
//функции показа/скрытия ошибок
const checkInputValidity = (input) => {
  if (!input.validity.valid) {
    showInputError(input, input.validationMessage);
  } else {
    hideInputError(input);
  }
};

//функция устновки слушателей ввода
//настраивает отображение кнопки формы
//вызывает функцию проверки валидности
// TODO remove event listener
const setEventListeners = (
  formElement,
  { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }
) => {
  const formArray = Array.from(document.querySelectorAll(formElement));
  formArray.forEach((form) => {
    const inputArray = Array.from(form.querySelectorAll(inputSelector));
    //проверить нечальное состояние кнопки
    toggleButtonState(
      form,
      inputArray,
      submitButtonSelector,
      inactiveButtonClass
    );

    inputArray.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(inputElement);
        console.log("Setting button state on fly");
        toggleButtonState(
          form,
          inputArray,
          submitButtonSelector,
          inactiveButtonClass
        );
      });
    });
  });
};

//булевая функция проверки валидности для кнопки
//принимает на вход список инпутов
const hasInvalidInput = (inputArray) => {
  return inputArray.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//функция активации/дезактивации кнопки формы
//принимают на вход массив инпутов и кнопку
//вызвает функцию проверки валидности
// и активирует/дезактивирует кнопку
//TODO решить проблему дезактивации кнопки формы редактирования
//профиля (она не активна при заполненом профиле на первом вызове)
const toggleButtonState = (
  form,
  inputArray,
  submitButtonSelector,
  inactiveButtonClass
) => {
  //if form inputs are invalid disactivate button
  //and vice versa
  const submitButton = form.querySelector(submitButtonSelector);
  console.log("submitButton: ", submitButton);
  console.log("inputArray: ", inputArray);

  if (hasInvalidInput(inputArray)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
};

//получает весь список форм
//отключает у каждой поведение по умолчанию
//у каждой формы получает список филдсетов и
//вызывает им функцию установки слушателей
const enableValidation = ({ formSelector, ...rest }) => {
  //вызываем функцию навешиваем слушатели на каждый
  setEventListeners(formSelector, rest);
};
// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
//TODO Требования к валидации форм.
//Разбейте код валидации на функции.
//Вы уже делали это в теме «Валидация форм».
//Сделайте функцию enableValidation ответственной за включение валидации всех форм.
//Пусть она принимает как объект настроек все нужные функциям классы и селекторы элементов

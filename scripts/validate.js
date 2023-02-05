import {validationConfig} from './constants.js';
//функция отображения ошибок
const showInputError = (
  form,
  inputElement,
  message,
  errorClass,
  inputErrorClass
) => {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = message;
  errorElement.classList.add(errorClass);
};

//функция скрытия ошибок
const hideInputError = (form, inputElement, errorClass, inputErrorClass) => {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
};

//функция поверки валидности инпута
//преверяет на валидность и вызывает
//функции показа/скрытия ошибок
const checkInputValidity = (
  form,
  inputElement,
  { errorClass, inputErrorClass, ...rest }
) => {
  if (!inputElement.validity.valid) {
    showInputError(
      form,
      inputElement,
      inputElement.validationMessage,
      errorClass,
      inputErrorClass
    );
  } else {
    hideInputError(form, inputElement, errorClass, inputErrorClass);
  }
};

//функция устновки слушателей ввода
//настраивает отображение кнопки формы
//вызывает функцию проверки валидности
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
        checkInputValidity(form, inputElement, rest);
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
const toggleButtonState = (
  form,
  inputArray,
  submitButtonSelector,
  inactiveButtonClass
) => {
  //if form inputs are invalid disactivate button
  //and vice versa
  const submitButton = form.querySelector(submitButtonSelector);

  if (hasInvalidInput(inputArray)) {
    disableButton(submitButton, inactiveButtonClass);
  } else {
    enableButton(submitButton, inactiveButtonClass);
  }
};
//блокировка сабмит кнопки
const disableButton = (button, inactiveButtonClass) => {
  button.classList.add(inactiveButtonClass);
  button.disabled = true;
};
//разблокировка сабмит кнопки
const enableButton = (button, inactiveButtonClass) => {
  button.classList.remove(inactiveButtonClass);
  button.disabled = false;
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

function clearValidation(
  form,
  {
    errorClass,
    inputErrorClass,
    submitButtonSelector,
    inactiveButtonClass
  }
) {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  //hide inputs errors
  inputList.forEach((input) =>
    hideInputError(form, input, errorClass, inputErrorClass)
  );
  //change button state
  toggleButtonState(form, inputList, submitButtonSelector, inactiveButtonClass);
}

enableValidation(validationConfig);

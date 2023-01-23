//создаем файл конфигурации
let configuration = {};
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
  console.log("valuidating");
  configuration = { formSelector, ...rest };
  //вызываем функцию навешиваем слушатели на каждый
  setEventListeners(formSelector, rest);
};
// включение валидации вызовом enableValidation
// все настройки передаются при вызове

function clearValidation(form) {
  const inputList = Array.from(form.querySelectorAll(".popup__input"));
  //hide inputs errors
  inputList.forEach((input) =>
    hideInputError(
      form,
      input,
      configuration.errorClass,
      configuration.inputErrorClass
    )
  );
  //change button state
  toggleButtonState(
    form,
    inputList,
    configuration.submitButtonSelector,
    configuration.inactiveButtonClass
  );
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

//функция отображения ошибок
const showInputError = () => {};

//функция скрытия ошибок
const hideInputError = () => {};

//функция поверки валидности инпута
//преверяет на валидность и вызывает
//функции показа/скрытия ошибок
const checkInputValidity = () => {};

//функция устновки слушателей ввода
//настраивает отображение кнопки формы
//вызывает функцию проверки валидности
const setEventListeners = (inputArray, button, inactiveButton) => {
  //проверить нечальное состояние кнопки
  toggleButtonState(inputArray, button, inactiveButton);
};

//булевая функция проверки валидности для кнопки
//принимает на вход список инпутов
const hasInvalidInput = (input) => {
  console.log("validating input :", input);
  return false;
};

//функция активации/дезактивации кнопки формы
//принимают на вход массив инпутов и кнопку
//вызвает функцию проверки валидности
// и активирует/дезактивирует кнопку
const toggleButtonState = (input, button, inactiveButton) => {
  //if form inputs are invalid disactivate button
  //and vice versa
  if (hasInvalidInput(input)) {
    button.classList.add(inactiveButton);
    button.disabled = true;
  } else {
    button.classList.remove(inactiveButton);
    button.disabled = false;
  }
};

//получает весь список форм
//отключает у каждой поведение по умолчанию
//у каждой формы получает список филдсетов и
//вызывает им функцию установки слушателей
const enableValidation = (obj) => {
  //массив всех форм на странице
  const formArray = Array.from(document.querySelectorAll(obj.formSelector));
  //работаем с каждой формой
  formArray.forEach((item) => {
    //выделяем поля ввода в массив
    const inputArray = Array.from(item.querySelectorAll(obj.inputSelector));
    const button = item.querySelector(obj.submitButtonSelector);
    const inactiveButton = obj.inactiveButtonClass;
    //вызываем функцию навешиваем слушатели на каждый
    setEventListeners(inputArray, button, inactiveButton);
  });
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

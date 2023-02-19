export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }
  //публичный метод, который отвечает за отрисовку всех элементов
  renderItems() {
    this._clear();
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
  //публичный метод, который принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.append(element);
  }
  //приватный метод, который очищает разметку перед ее отрисовку
  _clear() {
    this._container.innerHTML = "";
  }
}

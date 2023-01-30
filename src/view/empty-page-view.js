import {createElement} from '../render.js';

const createEmptyPageTemplate = () => (
  `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );

export default class EmptyPageView {
  #element = null;

  get template() {
    return createEmptyPageTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
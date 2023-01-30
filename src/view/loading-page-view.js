import {createElement} from '../render.js';

const createLoadingPageTemplate = () => (
  `<p class="trip-events__msg">Loading...</p>`
  );

export default class LoadingPageView {
  #element = null;

  get template() {
    return createLoadingPageTemplate();
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
import {createElement} from '../render.js';

const createLoadingPageTemplate = () => (
  `<p class="trip-events__msg">Loading...</p>`
  );

export default class LoadingPageView {
  getTemplate() {
    return createLoadingPageTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
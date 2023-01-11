import {createFormHeaderTemplate} from '';
import {createEventDetailsTemplate} from '';
import {createElement} from '../render.js';

const createFormPopupTemplate = () => (
  `<form class="event event--edit" action="#" method="post">

  ${createFormHeaderTemplate()}
  
  ${createEventDetailsTemplate()}

</form>`
  );

export default class FormPopupView {
  getTemplate() {
    return createFormPopupTemplate();
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
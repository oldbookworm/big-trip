import {createFormHeaderTemplate} from './form-header-template.js';
import {createEventDetailsTemplate} from './form-event-details-template';
import {createElement} from '../../render.js';

const createFormPopupTemplate = () => (
  `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">

  ${createFormHeaderTemplate()}
  
  ${createEventDetailsTemplate()}

    </form> 
  </li>`
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
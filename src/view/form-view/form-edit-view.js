import {createFormHeaderTemplate} from './form-header-template.js';
import {createEventDetailsTemplate} from './form-event-details-template';
import {createElement} from '../../render.js';

const createFormPopupTemplate = (point) => {

  return (
  `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">

  ${createFormHeaderTemplate(point, 'Delete')}
  
  ${createEventDetailsTemplate(point)}

    </form> 
  </li>`
  );
}

export default class FormEditView {
  #element = null;
  #point = null;

  constructor(point) {
    this.#point = point;
  }

  get template() {
    return createFormPopupTemplate(this.#point);
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
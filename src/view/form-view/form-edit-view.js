import {createFormHeaderTemplate} from './form-header-template.js';
import {createEventDetailsTemplate} from './form-event-details-template';
import AbstractView from '../../framework/view/abstract-view.js';

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

export default class FormEditView extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createFormPopupTemplate(this.#point);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit();
  };

  setFormCloseBtnClickHandler = (callback) => {
    this._callback.formCloseClick = callback;
    this.element.querySelector('form .event__rollup-btn').addEventListener('click', this.#formCloseBtnClickHandler);
  };

  #formCloseBtnClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.formCloseClick();
  };

}
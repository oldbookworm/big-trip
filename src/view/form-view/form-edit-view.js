import {createFormHeaderTemplate} from './form-header-template.js';
import {createEventDetailsTemplate} from './form-event-details-template';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';

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

export default class FormEditView extends AbstractStatefulView {
  #point = null;

  constructor(point) {
    super();
    this._state = FormEditView.parsePointToState(point);
    this.#setInnerHandlers();
  }

  get template() {
    return createFormPopupTemplate(this._state);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form .event__save-btn').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(FormEditView.parseStateToPoint(this._state));
  };

  setFormCloseBtnClickHandler = (callback) => {
    this._callback.formCloseClick = callback;
    this.element.querySelector('form .event__rollup-btn').addEventListener('click', this.#formCloseBtnClickHandler);
  };

  #formCloseBtnClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.formCloseClick();
  };

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.event__type-item').forEach((elem) => {
	    elem.addEventListener('click', this.#eventTypeChangeHandler);
    });
  }


  #eventTypeChangeHandler = (evt) => {
    this.updateElement({
      type: evt.currentTarget.querySelector('input').value,
    });
  };


  static parsePointToState = (point) => ({...point});

  static parseStateToPoint = (state) => {
    const point = {...point};
    return point;
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormCloseBtnClickHandler(this._callback.formCloseClick);	
   };

}
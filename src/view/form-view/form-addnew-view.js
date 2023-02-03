import {createFormHeaderTemplate} from './form-header-template.js';
import {createEventDetailsTemplate} from './form-event-details-template';
import AbstractView from '../../framework/view/abstract-view.js';

const BASIC_POINT = {
  basePrice: '',
  dateFrom: '2023-07-10T22:55:56.845Z',
  dateTo: "2023-07-11T11:22:13.375Z",
  destination: {
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
    name: 'Amsterdam',
    pictures: [],
  },
  id: 1,
  offers: [],
  type:  'taxi',     
 }


const createFormPopupTemplate = (point) => (
  `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">

  ${createFormHeaderTemplate(point, 'Cancel')}
  
  ${createEventDetailsTemplate(point)}

    </form> 
  </li>`
  );



export default class FormAddNewView extends AbstractView {
  #point = null;

  constructor(point = BASIC_POINT) {
    super();
    this.#point = point;
  }

  get template() {
    return createFormPopupTemplate(this.#point);
  }

  setRollupBtnClickHandler = (callback) => {
    this._callback.rollupBtnClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupBtnClickHandler);
  };
  
  #rollupBtnClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.rollupBtnClick();
  };

  setCancelBtnClickHandler = (callback) => {
    this._callback.cancelBtnClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#cancelBtnClickHandler);
  };
  
  #cancelBtnClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.cancelBtnClick();
  };

}
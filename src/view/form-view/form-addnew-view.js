import {createFormHeaderTemplate} from './form-header-template.js';
import {createEventDetailsTemplate} from './form-event-details-template';
// import { DESTINATIONS } from '../../mock/mock-data.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';

import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// const BASIC_POINT = {
//   basePrice: '',
//   dateFrom: '2023-07-10T22:55:56.845Z',
//   dateTo: "2023-07-11T11:22:13.375Z",
//   destination: DESTINATIONS[0],
//   id: 1,
//   offers: [],
//   type:  'taxi',     
//  }



const createFormPopupTemplate = (point) => (
  `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">

  ${createFormHeaderTemplate(point, 'Cancel')}
  
  ${createEventDetailsTemplate(point)}

    </form> 
  </li>`
  );



export default class FormAddNewView extends AbstractStatefulView {
  #datepicker = null;
  #allOffers = null;
  #destinations = null;
  
  constructor(point = BASIC_POINT, allOffers, destinations) {
    super();
    this.#allOffers = allOffers;
    this.#destinations = destinations;
    this._state = FormAddNewView.parsePointToState(point);
    this.#setInnerHandlers();
    this.#setDatepicker();
  }

  get template() {
    return createFormPopupTemplate(this._state);
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


  // добавление новой точки
  setSubmitNewPointHandler = (callback) => {
    this._callback.submitNewPoint = callback;
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#submitNewPointHandler);
  };
  
  #submitNewPointHandler = (evt) => {
    evt.preventDefault();
    this._callback.submitNewPoint(FormAddNewView.parseStateToPoint(this._state));
  };



  #dueDateChangeHandler = (start, end) => {
    this.updateElement({
      dateFrom: start.toISOString(),
      dateTo: end.toISOString(),
    });
  };

  #setDatepicker = () => {
    const endDateInput = this.element.querySelector('#event-end-time-1');
    
    this.#datepicker = flatpickr(
        this.element.querySelector('#event-start-time-1'),
        {
          plugins: [new rangePlugin({ input: endDateInput})],
          mode: "range",
          dateFormat: 'd/m/Y H:i',
          enableTime: true,
          time_24hr: true,
          onClose: (dates) => {
            if (dates.length == 2) {
                this.#dueDateChangeHandler(dates[0], dates[1]);
            } 
          },
        }
      );   
  };

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.event__type-item').forEach((elem) => {
	    elem.addEventListener('click', this.#eventTypeChangeHandler);
    });

    this.element.querySelector('.event__input--destination').addEventListener('change', this.#eventDestinationChangeHandler);
  }

  #eventTypeChangeHandler = (evt) => {
    this.updateElement({
      type: evt.currentTarget.querySelector('input').value,
    });
  };

  #eventDestinationChangeHandler = (evt) => {
    const newDestination = DESTINATIONS.find((elem) => elem.name === evt.target.value);
    
    this.updateElement({
      destination: {
        name: newDestination.name,
        description: newDestination.description,
        pictures: newDestination.pictures, 	
      },
    });
  };

  static parsePointToState = (point) => ({...point});

  static parseStateToPoint = (state) => {
    const point = {...state};
    return point;
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepicker();
    this.setRollupBtnClickHandler(this._callback.rollupBtnClick);
    this.setCancelBtnClickHandler(this._callback.cancelBtnClick);
    this.setSubmitNewPointHandler(this._callback.submitNewPoint);
   }; 

}
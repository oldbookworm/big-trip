import {createFormHeaderTemplate} from './form-header-template.js';
import {createEventDetailsTemplate} from './form-event-details-template';
import { DESTINATIONS } from '../../mock/mock-data.js';
import { OFFER_BY_TYPE } from '../../mock/mock-data.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';

import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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
  #datepicker = null;

  constructor(point) {
    super();
    this._state = FormEditView.parsePointToState(point);
    this.#setInnerHandlers();
    this.#setDatepicker();
  }

  get template() {
    return createFormPopupTemplate(this._state);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  };

  reset = (point) => {
    this.updateElement(
      FormEditView.parsePointToState(point),
    );
  };

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

  setDeleteBtnClickHandler = (callback) => {
    this._callback.deleteBtnClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteBtnClickHandler);
  };

  #deleteBtnClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteBtnClick();
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

    this.element.querySelectorAll('.event__offer-label').forEach((elem) => {
	    elem.addEventListener('click', (evt) => {
        evt.preventDefault();
        this.#offerCheckHandler(evt);
      });
    });

    this.element.querySelector('.event__input--destination').addEventListener('change', this.#eventDestinationChangeHandler);
  }

#offerCheckHandler = (evt) => { 
    const checkedOfferId =  evt.currentTarget.getAttribute('data-id');
    const offers = this._state.offers;
    const newOffers = this.#changeOffersArr(offers, checkedOfferId);
    
    this.updateElement({
      offers: newOffers,
    });
}

#changeOffersArr = (offers, checkedOfferId) => {
  let newArray = offers;
  const offerInArr = offers.find((elem) => elem === +checkedOfferId);
    if(offerInArr) { 
      let index = offers.indexOf(offerInArr);
      if (index !== -1) {
        newArray.splice(index, 1);
      }
    } else {
      newArray.push(+checkedOfferId);
  }
  return newArray;
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
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormCloseBtnClickHandler(this._callback.formCloseClick);
    this.setDeleteBtnClickHandler(this._callback.deleteBtnClick);	
   }; 

}
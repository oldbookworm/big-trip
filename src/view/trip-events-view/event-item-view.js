import AbstractView from '../../framework/view/abstract-view.js';
import { getFullDate, getEventDate, getTime, getDateTime, getDateDifference, } from '../../util/date-util.js';
import { getOfferById } from '../../util/offers-util.js';


const createOfferTemplate = (id, type, allOffers) => {
  const offer = getOfferById(id, type, allOffers);
  const {title, price} = offer;
  return (
  `<li class="event__offer">
       <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
       <span class="event__offer-price">${price}</span>
    </li>`
  )
};


const createEventItemTemplate = (point, allOffers) => { 
  const {basePrice, dateFrom, dateTo, destination: {name}, type, offers, isFavorite} = point;

  const duration = getDateDifference(dateFrom, dateTo);
  

  return (
  `<li class="trip-events__item">
    <div class="event">

      <time class="event__date" datetime="${getFullDate(dateFrom)}">${getEventDate(dateFrom)}</time>

      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>

      <h3 class="event__title">${type} ${name}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${getDateTime(dateFrom)}">${getTime(dateFrom)}</time>
          &mdash;
          <time class="event__end-time" datetime="${getDateTime(dateTo)}">${getTime(dateTo)}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${offers.length === 0 ?
        '' :
        offers.map((id) => createOfferTemplate(id, type, allOffers)).join('')}
      </ul>

      <button class="event__favorite-btn ${(isFavorite) ? 'event__favorite-btn--active' : ''}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    
    </div>
  </li>`
  )
};
export default class EventItemView extends AbstractView {
  #point = null;
  #allOffers = null;

  constructor(point, allOffers) {
    super();
    this.#point = point;
    this.#allOffers = allOffers;
  }

  get template() {
    return createEventItemTemplate(this.#point, this.#allOffers);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };
  
  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  
 #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

}
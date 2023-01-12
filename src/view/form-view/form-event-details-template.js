import {createEventOffersTemplate} from './event-offers-template.js';
import {createEventDestinationTemplate} from './event-destination-template.js';

export const createEventDetailsTemplate = () => {
	return (
	`<section class="event__details">

    ${createEventOffersTemplate()}

    ${createEventDestinationTemplate()}
  </section>`
);
  }
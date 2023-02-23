import {createEventOffersTemplate} from './event-offers-template.js';
import {createEventDestinationTemplate} from './event-destination-template.js';

export const createEventDetailsTemplate = (point) => {
  const {destination: {description, pictures}, type, allOffers} = point;
  
	return (
	`<section class="event__details">

    ${createEventOffersTemplate(allOffers, type)}

    ${createEventDestinationTemplate(description, pictures)}
  </section>`
);
  }
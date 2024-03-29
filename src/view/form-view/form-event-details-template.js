import {createEventOffersTemplate} from './event-offers-template.js';
import {createEventDestinationTemplate} from './event-destination-template.js';

export const createEventDetailsTemplate = (point, allOffers) => {
  const {destination: {description, pictures}, type, offers} = point;
  
	return (
	`<section class="event__details">

    ${createEventOffersTemplate(offers, type, allOffers)}

    ${createEventDestinationTemplate(description, pictures)}
  </section>`
);
  }
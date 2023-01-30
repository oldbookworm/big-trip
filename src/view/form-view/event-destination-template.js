import {createEventPhotosTemplate} from './event-photos-template.js';


export const createEventDestinationTemplate = (description, pictures) => {
	return (
	`<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>

      ${createEventPhotosTemplate(pictures)}
      
    </section>`
	);
  }	
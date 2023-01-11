import {createEventOffersTemplate} from '';
import {createEventDestinationTemplate} from '';

export const createEventDetailsTemplate = () => {
	return (
	`<section class="event__details">

    // доп предложения
    ${createEventOffersTemplate()}

    // описание направления
    ${createEventDestinationTemplate()}
  </section>`
);
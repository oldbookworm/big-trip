import { OFFER_BY_TYPE } from "../../mock/mock-data";

const createEventOffer = (type, offers) => {
  const allOffers = OFFER_BY_TYPE.find((offer) => offer.type === type);
  const offersArr = [];

  allOffers.offers.map((offer) => {
    const checked = offers.includes(offer.id) ? 'checked' : '';
    const elem = `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.type}-${offer.id}" type="checkbox" name="event-offer-${offer.type}" ${checked}>
    <label class="event__offer-label" for="event-offer-${offer.type}-${offer.id}" data-id=${offer.id}>
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`;
  offersArr.push(elem);
  });
  
  return offersArr;
}


export const createEventOffersTemplate = (offers, type) => {
	return (
	`<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
      ${createEventOffer(type, offers).join('')}
      </div>
    </section>`
	);
  }





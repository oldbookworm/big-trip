import { OFFER_BY_TYPE } from "../../mock/mock-data";

// const createEventOffer = (type, offers) => {
//   const allOffers = OFFER_BY_TYPE.find((offer) => offer.type === type);
//   const offersArr = [];

//   allOffers.offers.map((offer) => {
//     const checked = offers.includes(offer.id) ? 'checked' : '';
//     const elem = `<div class="event__offer-selector">
//     <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage"  ${checked}>
//     <label class="event__offer-label" for="event-offer-luggage-1">
//       <span class="event__offer-title">${offer.title}</span>
//       &plus;&euro;&nbsp;
//       <span class="event__offer-price">${offer.price}</span>
//     </label>
//   </div>`;
//   offersArr.push(elem);
//   });
  
//   return offersArr;
// }


// export const createEventOffersTemplate = (offers, type) => {
// 	return (
// 	`<section class="event__section  event__section--offers">
//       <h3 class="event__section-title  event__section-title--offers">Offers</h3>

//       <div class="event__available-offers">
//       ${createEventOffer(type, offers).join('')}
//       </div>
//     </section>`
// 	);
//   }

const createEventOffer = (offer) => {
  const {id, title, price, isChecked} = offer;
  
  return (
    `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-${id}" type="checkbox" name="event-offer-luggage"  ${isChecked ? 'checked' : ''} data-offer-id="${id}" data-offer-checked="${isChecked}">
    <label class="event__offer-label" for="event-offer-${title}-${id}" data-offer-id="${id}" data-offer-checked="${isChecked}">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`
  );
}

export const createEventOffersTemplate = (allOffers) => {
  console.log(allOffers);
	return (
	`<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
      ${allOffers.map((offer) => createEventOffer(offer)).join('')}
      </div>
    </section>`
	);
  }


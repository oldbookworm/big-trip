import { OFFER_BY_TYPE } from "../mock/mock-data";

// работа с офферами


// берет все айдишники по определенному типу
const getAllOffersIdByType = (type) => {
    const offers = [];
      const allOffersByType = OFFER_BY_TYPE.find((offer) => offer.type === type); 
      for (const offer of  allOffersByType.offers) {
         offers.push(offer.id);
      }
      return offers;
  }

//   получает айдишник, возвращает нужный оффер
  const getOfferById = (id, type) => {
    const offersByType =  OFFER_BY_TYPE.find((offer) => offer.type === type);
    const offerById = offersByType.offers.find((elem) => elem.id === id);
    return offerById;
  }

  export {getAllOffersIdByType, getOfferById};
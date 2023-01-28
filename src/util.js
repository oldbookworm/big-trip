import { OFFER_BY_TYPE } from "./mock/mock-data";
import dayjs from "dayjs";
// Работа с датами

const DATE_MONTHS = {
    '01': 'JAN',
    '02': 'FEB',
    '03': 'MAR',
    '04': 'APR',
    '05': 'MAY',
    '06': 'JUN',
    '07': 'JUL',
    '08': 'AUG',
    '09': 'SEP',
    '10': 'OCT',
    '11': 'NOV',
    '12': 'DEC',
};

const getEventDate = (data) => {
    const month = DATE_MONTHS[data.slice(5, 7)];
    const day = data.slice(8, 10);
    return `${month} ${day}`;
}

const getDateDifference = (start, end) => {
    const date1 = dayjs(start);
    const date2 = dayjs(end);

    const difference = date2.diff(date1, 'minute');
    const hours = `${Math.trunc(difference / 60)}H`;
    const minutes = `${difference % 60}M`;

    return `${hours == 0 ? '': hours} ${minutes}`;
}

// красивое отображение даты в попапе
const beautifyDate = (data) => {
    const year = data.slice(2, 4);
    const month = data.slice(5, 7);
    const day = data.slice(8, 10);
    const date = `${year}/${month}/${day}`;
    const time = data.slice(11, 16);
    return `${date} ${time}`
  }



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

export {getEventDate, getDateDifference, getAllOffersIdByType, getOfferById, beautifyDate};
import { getRandomArrayElement, getRandomInteger, getRandomArray, getRandomDates } from "./mock-util";
import { POINTS_COUNT, POINT_TYPE, DESTINATIONS, getPointDescription} from "./mock-data";
import { getAllOffersIdByType } from "../util/offers-util";


  // Функция получающая массив рандомных офферов на основании массива всех офферов
  const getRandomOffers = (arr) => {
    let randomOffers = [];
    const isOffers = Boolean(getRandomInteger(0, 1));
    if(isOffers){
      randomOffers = getRandomArray(arr, arr.length); 
    }
    return randomOffers;
  }

  // массив с рандомными датами
  const mockDatesArr = getRandomDates(POINTS_COUNT);

  
  export const generatePoints = () => {
    const points = Array.from({length: POINTS_COUNT});
    
    return points.map((point, index) => {
      const pointType = getRandomArrayElement(POINT_TYPE);
    
      return {
        basePrice: getRandomInteger(10, 200),
        dateFrom: `2023-07-11T22:55:56.845Z`,
        dateTo: `2023-07-12T11:22:13.375Z`,
        destination: getRandomArrayElement(DESTINATIONS),
        id: index + 1,
        isFavorite: Boolean(getRandomInteger(0, 1)),
        offers: getRandomOffers(getAllOffersIdByType(pointType)),
        type:  pointType,     
       }
    });
  };
  

  
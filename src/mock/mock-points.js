import { getRandomArrayElement, getRandomInteger, getRandomArray, getRandomDates } from "./mock-util";
import { CITIES, PICS_DESCRIPTION, POINTS_COUNT, POINT_TYPE, getPointDescription} from "./mock-data";
import { getAllOffersIdByType } from "../util/offers-util";


const generateDestinationPics = () => {
    let pics = [];
    let picsCount = getRandomInteger(1, 5);
    
    for (let i = 0; i < picsCount; i++) {
      let pic = {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
        description: getRandomArrayElement(PICS_DESCRIPTION),   
      }
      pics.push(pic);
    }
    return pics;
  }
  
  
  const generateDestination = () => {
    return {
      description: getPointDescription(),
      name: getRandomArrayElement(CITIES),
      pictures: generateDestinationPics(),
    }
  }


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
      // let {fromDate, toDate} = mockDatesArr[index];
      // toDate < 10 ? toDate = '0' + toDate : toDate;
      // fromDate < 10 ? fromDate = '0' + fromDate : fromDate;
      
      return {
        basePrice: getRandomInteger(10, 200),
        dateFrom: `2023-07-11T22:55:56.845Z`,
        dateTo: `2023-07-12T11:22:13.375Z`,
        destination: generateDestination(),
        id: index + 1,
        isFavorite: Boolean(getRandomInteger(0, 1)),
        offers: getRandomOffers(getAllOffersIdByType(pointType)),
        type:  pointType,     
       }
    });
  };
  
  
  
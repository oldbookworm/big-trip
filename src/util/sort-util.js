import { getDuration } from "./date-util.js";


const SORT_TYPE = {
    DEFAULT: 'default',
    PRICE: 'price',
    TIME: 'time',
  };

  const sortByTime = (pointA, pointB) => {
    const paramA = getDuration(pointA.dateFrom, pointA.dateTo);
    const paramB = getDuration(pointB.dateFrom, pointB.dateTo);
    
    return paramB - paramA;
  }

  const sortByPrice = (pointA, pointB) => {  
    return pointB.basePrice - pointA.basePrice;
  }
  

  export {SORT_TYPE, sortByTime, sortByPrice};
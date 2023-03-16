import { isFuturePoint, isPastPoint } from "./date-util";



const FilterType = {
    EVERYTHING: 'everything',
    FUTURE: 'future',
    PAST: 'past',
  };


const filter = {
    [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
    [FilterType.FUTURE]: (points) => points.filter((point) => isFuturePoint(point.dateFrom)),
    [FilterType.PAST]: (points) => points.filter((point) => isPastPoint(point.dateTo))
};


  
export {FilterType, filter};

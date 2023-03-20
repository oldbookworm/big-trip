import dayjs from "dayjs";
let utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

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


const getYear = (data) => {
  return dayjs(data).year();
}

const getMonth = (data) => {
  let month = dayjs(data).month() + 1;
  month < 10 ? month = '0' + month : month;
  return month;
}

const getDay = (data) => {
  let day = dayjs(data).utc().date();
  day < 10 ? day = '0' + day : day;
  return day;
}


// возвращает дату в формате "2019-03-18"
const getFullDate = (data) => {
  const date = `${getYear(data)}-${getMonth(data)}-${getDay(data)}`;
  return date;
}

// возвращает дату в формате MAR 18
const getEventDate = (data) => {
  const month = DATE_MONTHS[getMonth(data)];
  const day = getDay(data);
  return `${month} ${day}`;
}


// возвращает время
const getTime = (data) => {
  const hours = dayjs(data).utc().hour();
  const minutes = dayjs(data).utc().minute();
  const time = `${hours}:${minutes}`;
  return time;
}

// возвращает дату и время в формате 2019-07-11T11:22
const getDateTime = (data) => {
 return `${getFullDate(data)}T${getTime(data)}`;
}

// возвращает продолжительность в формате 1D 12H 23M
const getDateDifference = (start, end) => {
    const fullTime = getDuration(start, end);
    
    let hours = Math.trunc(fullTime / 60);
    let days = 0;
    if(hours === 24) {
      days = 1;
      hours = 0;
    }
    if(hours > 24){
      days = Math.trunc(hours / 24);
      hours = days % 24;
    }
    const minutes = fullTime % 60;

    return `${days == 0 ? '': days + 'D'} ${hours == 0 ? '': hours + 'H'} ${minutes == 0 ? '' : minutes + 'M'}`;
}

// возвращает разницу между двумя датами в минутах
const getDuration = (start, end) => {
  const date1 = dayjs(start);
  const date2 = dayjs(end);
  
  const difference = date2.diff(date1, 'minute');
  return difference;
}

// красивое отображение даты в попапе
const beautifyPopupDate = (data) => {
    const date = `${getDay(data)}/${getMonth(data)}/${getYear(data)}`;
    const time = getTime(data);
    return `${date} ${time}`
}


// функции для фильтров
// дата пойнта в будущем относительно реальной даты
const isFuturePoint = (date) => dayjs().isBefore(date);
// дата пойнта в прошлом (истекло) относительно реальной даты
const isPastPoint = (date) => dayjs().isAfter(date);


export {getFullDate, getEventDate, getTime, getDateTime, getDateDifference, getDuration, beautifyPopupDate, isFuturePoint, isPastPoint};
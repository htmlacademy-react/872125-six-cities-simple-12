// установка заглавной буквы слова
import { ONE_POINT } from '../consts';

export const setCapitalLetter = (str?: string) => {
  if (str) {
    return str[0].toUpperCase() + str.slice(1);
  } else {return str;}
};


export const pointsToPercent = (pointAmount?: number) => {
  if (pointAmount) {
    const percent = Math.round(pointAmount) * ONE_POINT;
    return `${percent.toString()}%`;
  } else {
    return '';
  }
};

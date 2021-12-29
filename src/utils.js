import { v4 as uuid } from 'uuid';

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const soundsListArray = [
  { checked: false, name: 'Ringing' },
  { checked: false, name: 'Hissing' },
  { checked: false, name: 'Whistle' },
  { checked: false, name: 'Buzzing' },
  { checked: false, name: 'Hum' },
  { checked: false, name: 'Music' },
  { checked: false, name: 'Pulsating' },
  { checked: false, name: 'Other' },
];

export const sleepArray = [
  {
    name: '0-2 Hours',
    id: uuid(),
    checked: false,
  },
  {
    name: '2-4 Hours',
    id: uuid(),
    checked: false,
  },
  {
    name: '4-6 Hours',
    id: uuid(),
    checked: false,
  },
  {
    name: '6-8 Hours',
    id: uuid(),
    checked: false,
  },
  {
    name: '8+ Hours',
    id: uuid(),
    checked: false,
  },
];

export const formatDate = (date) => {
  date = new Date(date);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const getMonthYearString = (date) => {
  if (date) {
    date = new Date(date);
    const monthYearString = `${date.getFullYear()}-${date.getMonth() + 1}`;
    return monthYearString;
  }
  return null;
};

export const getMonthYearDayString = (date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export const isObjectAndEmpty = (obj) => {
  return Boolean(
    obj &&
      Object.keys(obj).length === 0 &&
      Object.getPrototypeOf(obj) === Object.prototype,
  );
};

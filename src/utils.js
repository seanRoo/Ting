import {v4 as uuid} from 'uuid';

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const soundsArray = [
  {
    name: 'Ringing',
    id: uuid(),
    checked: false,
  },
  {
    name: 'Hissing',
    id: uuid(),
    checked: false,
  },
  {
    name: 'Pulsating',
    id: uuid(),
    checked: false,
  },
  {
    name: 'Buzzing',
    id: uuid(),
    checked: false,
  },
  {
    name: 'Whistle',
    id: uuid(),
    checked: false,
  },
  {
    name: 'Hum',
    id: uuid(),
    checked: false,
  },
  {
    name: 'Music',
    id: uuid(),
    checked: false,
  },
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

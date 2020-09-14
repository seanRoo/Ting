import {v4 as uuid} from 'uuid';

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const soundsListArray = {
  ringing: {
    name: 'Ringing',
    id: uuid(),
    checked: false,
  },
  hissing: {
    name: 'Hissing',
    id: uuid(),
    checked: false,
  },
  whistle: {
    name: 'Whistle',
    id: uuid(),
    checked: false,
  },
  buzzing: {
    name: 'Buzzing',
    id: uuid(),
    checked: false,
  },
  hum: {
    name: 'Hum',
    id: uuid(),
    checked: false,
  },
  music: {
    name: 'Music',
    id: uuid(),
    checked: false,
  },
  pulsating: {
    name: 'Pulsating',
    id: uuid(),
    checked: false,
  },
  other: {
    name: 'Other',
    id: uuid(),
    checked: false,
  },
};

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

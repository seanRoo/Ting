import {DB} from '../config';

export const addCheckIn = async (sounds, sliderValues, date) => {
  await DB.ref(`/checkIns/${date}`)
    .set({sounds, sliderValues})
    .then(() => console.log('Success'))
    .catch((error) => {
      throw error;
    });
};

export const getCheckIn = (date) => {
  const res = DB.ref(`/checkIns/${date}`).on('value', (querySnapshot) => {
    let data = querySnapshot.val() ? querySnapshot.val() : {};
    return data[Object.getOwnPropertyNames(data)[0]];
  });
  return res;
};

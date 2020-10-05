import {DB} from '../config';

export const addCheckIn = async (
  sounds,
  sliderValues,
  date,
  userId,
  monthYearString,
) => {
  await DB.ref(`/checkIns/${userId}/${monthYearString}/${date}`)
    .set({sounds, sliderValues})
    .then(() => console.log('Success'))
    .catch((error) => {
      throw error;
    });
};

export const getCheckIn = (userId, monthYearString) => {
  const res = DB.ref(`/checkIns/${userId}/${monthYearString}`).on(
    'value',
    (querySnapshot) => {
      let data = querySnapshot.val() ? querySnapshot.val() : {};
    },
  );
  return res;
};

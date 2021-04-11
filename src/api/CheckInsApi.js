import { DB } from '../config';

const todaysDate = new Date();
const currentYear = todaysDate.getFullYear();

export const addCheckIn = async (
  sounds,
  sliderValues,
  date,
  userId,
  monthYearString,
) => {
  date = new Date(date);
  await DB.ref(
    `/checkIns/${userId}/${date.getFullYear()}/${monthYearString}/${date.getDate()}`,
  )
    .set({ date, sounds, sliderValues })
    .then(() => console.log('Success'))
    .catch((error) => {
      throw error;
    });
};

export const getCheckIn = (userId, year) => {
  const res = DB.ref(`/checkIns/${userId}/${year}`).on(
    'value',
    (querySnapshot) => {
      let data = querySnapshot.val() ? querySnapshot.val() : {};
    },
  );
  return res;
};

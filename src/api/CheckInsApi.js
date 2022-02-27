import { DB } from '../config';
import { getMonthYearString } from '../utils';

const todaysDate = new Date();
const currentYear = todaysDate.getFullYear();

export const addCheckIn = async (sliderValues, date, userId, callback) => {
  date = new Date(date);
  await DB.ref(
    `/checkIns/${userId}/${date.getFullYear()}/${getMonthYearString(
      date,
    )}/${date.getDate().toString()}`,
  )
    .set({ sliderValues })
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

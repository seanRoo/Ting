import { DB } from '../config';
import { getMonthYearString } from '../utils';

export const setRecommendations = async (userId, date, recommendations) => {
  await DB.ref(`/recommendations/${userId}/${getMonthYearString(date)}/`)
    .set({ ...recommendations })
    .catch((error) => error);
};

export const fetchRecommendations = (userId, callback, date) => {
  DB.ref(`/recommendations/${userId}/${getMonthYearString(date)}`).on(
    'value',
    (querySnapshot) => {
      let data = querySnapshot.val() ? querySnapshot.val() : null;
      callback(data);
    },
  );
};

export const updateRecommendations = async (
  userId,
  date,
  newItem,
  category,
) => {
  DB.ref(
    `/recommendations/${userId}/${getMonthYearString(date)}/${category}/`,
  ).update(newItem);
};

export const deleteRecommendation = async (userId, date, category, index) => {
  DB.ref(`/recommendations/${userId}/${getMonthYearString(date)}/${category}/`)
    .child(`${index}`)
    .remove();
};

import { DB } from '../config';

export const addConsultant = async (formValues, userId) => {
  await DB.ref(`/consultants/${userId}/${formValues.address.id}`)
    .set(formValues)
    .catch((error) => {
      throw error;
    });
};

export const getConsultants = (userId, callback) => {
  DB.ref(`/consultants/${userId}/`).on('value', (querySnapshot) => {
    let data = querySnapshot.val() ? querySnapshot.val() : [];
    callback(data);
  });
};

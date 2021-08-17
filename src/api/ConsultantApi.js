import { DB } from '../config';

export const addConsultant = async (formValues, userId) => {
  console.log(formValues);
  await DB.ref(`/consultants/${userId}/${formValues.address.id}`)
    .set(formValues)
    .catch((error) => {
      throw error;
    });
};

export const getConsultants = (userId, callback) => {
  DB.ref(`/consultants/${userId}/`).on('value', (querySnapshot) => {
    let data = querySnapshot.val() ? querySnapshot.val() : [];
    //console.log(Object.values(data)[0]);
    console.log('here', data);
    callback(data);
  });
};

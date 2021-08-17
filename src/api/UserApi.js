import { DB } from '../config';

export const createUser = async ({ userName, firstName, lastName, userId }) => {
  await DB.ref(`/users/${userId}/`)
    .set({ userName, firstName, lastName, userId })
    .then(() => console.log('Success'))
    .catch((error) => {
      throw error;
    });
};

export const getUser = (userId, callback = () => {}) => {
  DB.ref(`/users/${userId}`).on('value', (querySnapshot) => {
    let data = querySnapshot.val() ? querySnapshot.val() : {};
    callback(data);
  });
};

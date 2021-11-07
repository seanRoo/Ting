import { DB } from '../config';

export const createUser = async ({
  firstName = null,
  lastName = null,
  userId,
}) => {
  await DB.ref(`/users/${userId}/`)
    .set({ firstName, lastName, userId })
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

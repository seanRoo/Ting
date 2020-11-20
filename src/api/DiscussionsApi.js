import { DB } from '../config';

export const addDiscussionPost = async (message, callback) => {
  await DB.ref(`/discussions/`)
    .push({ ...message })
    .then(() => callback())
    .catch((error) => {
      throw error;
    });
};

export const getDiscussionPosts = (callback) => {
  const res = DB.ref(`/discussions/`).on('value', (querySnapshot) => {
    let data = querySnapshot.val() ? querySnapshot.val() : {};
    callback(Object.values(data));
  });
};

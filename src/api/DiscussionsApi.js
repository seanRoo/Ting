import { DB } from '../config';

export const addDiscussionPost = async (message, callback) => {
  await DB.ref(`/discussions/${message.messageId}`)
    .set({ ...message, date: Date.now() })
    .then(() => callback())
    .catch((error) => {
      throw error;
    });
};

export const getDiscussionPosts = (callback) => {
  DB.ref('/discussions/').on('value', (querySnapshot) => {
    let data = querySnapshot.val() ? querySnapshot.val() : {};
    data = Object.values(data).sort((a, b) => a.date - b.date);
    callback(Object.values(data));
  });
};

export const addReply = async (replyMessage) => {
  await updateCommentCount(replyMessage.parentMessageId);
  await DB.ref(
    `/replies/${replyMessage.parentMessageId}/${replyMessage.messageId}`,
  )
    .set({
      ...replyMessage,
      date: Date.now(),
    })
    .catch((error) => {
      throw error;
    });
};

export const getReplies = (parentMessageId, callback) => {
  DB.ref(`/replies/${parentMessageId}/`)
    .orderByChild('date')
    .on('value', (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((element) => {
        data.push(element.val());
      });
      callback(data);
    });
};

export const updateCommentCount = async (messageId) => {
  const dbRef = DB.ref(`/replies/${messageId}/`);
  dbRef.on('value', async (querySnapshot) => {
    if (querySnapshot.val()) {
      const replyCount = Object.keys(querySnapshot.val()).length;
      await DB.ref(`/discussions/${messageId}`).update({
        replyCount,
      });
    }
  });
};

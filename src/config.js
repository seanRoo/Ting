import Database from '@react-native-firebase/database';

export const DB = Database().ref(`/testing/123`).push();

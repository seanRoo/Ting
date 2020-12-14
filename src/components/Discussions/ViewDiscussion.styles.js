import { StyleSheet } from 'react-native';

const ViewDiscussionStyles = StyleSheet.create({
  textInputContainer: {
    margin: 5,
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    flex: 0.01,
  },
  textInputComponent: {
    minHeight: 40,
    padding: 10,
    paddingTop: 12,
    paddingLeft: 14,
    borderColor: 'orchid',
    borderWidth: 1,
    borderRadius: 15,
    maxHeight: 80,
  },
  replyTextContainer: {
    width: '88%',
    flexDirection: 'column',
  },
  replyMessageHeading: {
    //fontSize: 15,
  },
  replyMessageBody: {
    fontSize: 16,
    //margin: 12,
    marginTop: 10,
    marginRight: 10,
  },
  avatar: {
    backgroundColor: 'grey',
  },
  avatarContainer: {
    width: '12%',
    flexDirection: 'column',
    marginLeft: 12,
    marginTop: 4,
  },
});

export default ViewDiscussionStyles;

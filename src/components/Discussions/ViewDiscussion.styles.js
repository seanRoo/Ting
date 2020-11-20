import { StyleSheet } from 'react-native';

const ViewDiscussionStyles = StyleSheet.create({
  textInputContainer: {
    margin: 5,
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    flex: 0.02,
  },
  textInputComponent: {
    minHeight: 40,
    padding: 10,
    paddingTop: 12,
    paddingLeft: 14,
    borderColor: 'orchid',
    borderWidth: 2,
    borderRadius: 15,
    maxHeight: 80,
  },
  replyTextContainer: {
    width: '88%',
  },
  replyMessageHeading: {
    marginTop: 12,
    marginLeft: 10,
    fontSize: 15,
  },
  replyMessageBody: {
    fontSize: 18,
    margin: 12,
    flex: 1,
    flexWrap: 'wrap',
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

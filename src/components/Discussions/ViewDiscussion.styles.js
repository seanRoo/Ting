import { StyleSheet } from 'react-native';

const ViewDiscussionStyles = StyleSheet.create({
  textInputContainer: {
    position: 'absolute',
    backgroundColor: 'whitesmoke',
    width: '100%',
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
    backgroundColor: 'white',
    marginLeft: 8,
    marginRight: 4,
    marginBottom: 6,
  },
  replyTextContainer: {
    width: '88%',
    flexDirection: 'column',
  },
  replyMessageHeading: {
    fontSize: 15,
  },
  replyMessageBody: {
    fontSize: 16,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 24,
  },
  replyMessageAvatar: {
    backgroundColor: 'black',
    marginTop: 4,
    marginRight: 8,
  },
  viewDiscussionAvatar: {
    backgroundColor: 'black',
  },
  avatarContainer: {
    width: '12%',
    flexDirection: 'column',
    marginLeft: 12,
    marginTop: 4,
  },
});

export default ViewDiscussionStyles;

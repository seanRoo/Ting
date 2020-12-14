import { StyleSheet } from 'react-native';

const DiscussionCardStyles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: 'ghostwhite',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  bodyText: { fontSize: 16, fontFamily: 'Roboto' },
  bold: { fontWeight: 'bold' },
  footer: {
    paddingRight: 0,
    flexDirection: 'row',
    borderTopColor: 'black',
    borderRadius: 20,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  goToButton: {
    alignSelf: 'flex-end',
  },
  buttonText: {
    padding: 5,
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 12,
    paddingRight: 0,
  },
  buttonIcon: {
    fontSize: 18,
    color: 'black',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  myMessageClass: {
    borderLeftColor: 'orchid',
    borderLeftWidth: 4,
  },
  discussionCard: {
    width: '95%',
    alignSelf: 'center',
    borderColor: 'orchid',
    borderRadius: 20,
  },
  authorStyle: { color: 'dodgerblue' },
});

export default DiscussionCardStyles;

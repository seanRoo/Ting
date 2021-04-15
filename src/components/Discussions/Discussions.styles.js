import { ScaledSheet } from 'react-native-size-matters';

const DiscussionCardStyles = ScaledSheet.create({
  container: {
    padding: 5,
    backgroundColor: 'ghostwhite',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: '12@s',
  },
  bodyText: { fontSize: '14@s', fontFamily: 'Roboto' },
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
    padding: '5@s',
    borderRadius: '10@s',
    fontSize: '16@s',
    paddingLeft: '12@s',
    paddingRight: 0,
  },
  buttonIcon: {
    fontSize: '18@s',
    color: 'black',
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

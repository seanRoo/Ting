import { ScaledSheet } from 'react-native-size-matters';

const DashboardCardStyles = ScaledSheet.create({
  container: {
    padding: '5@s',
    backgroundColor: 'ghostwhite',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: '16@s',
  },
  bodyText: { fontSize: '18@s' },
  bold: { fontWeight: 'bold' },
  footer: {
    paddingRight: 0,
    height: '45@s',
  },
  goToButton: {
    alignSelf: 'flex-end',
  },
  buttonText: {
    padding: 5,
    borderRadius: 10,
    fontSize: '16@s',
    paddingLeft: '12@s',
    paddingRight: 0,
  },
  buttonIcon: {
    fontSize: '18@s',
    color: 'black',
  },
  cardBody: { paddingLeft: '5@s', paddingRight: '5@s' },
});

export default DashboardCardStyles;

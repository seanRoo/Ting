import { ScaledSheet } from 'react-native-size-matters';

const DashboardCardStyles = ScaledSheet.create({
  container: {
    padding: '10@s',
    backgroundColor: 'ghostwhite',
    display: 'flex',
    flex: 1,
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

  graphContainer: {
    flex: 0.6,
    borderWidth: 1,
    borderColor: 'black',
    paddingRight: 12,
    borderRadius: 10,
    marginTop: 0,
    borderTopWidth: 1,
    backgroundColor: 'white',
  },
});

export default DashboardCardStyles;

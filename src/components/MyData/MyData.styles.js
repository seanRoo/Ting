import { ScaledSheet } from 'react-native-size-matters';

export default ScaledSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: 'white',
  },
  headerSection: {
    flex: 0.2,
    marginTop: 6,
    marginBottom: 6,
  },
  headerText: {
    color: 'black',
  },
  dataEntriesText: {
    fontSize: 24,
    color: 'black',
    margin: 4,
    marginLeft: 0,
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  actionButton: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 2,
    borderRadius: 10,
    backgroundColor: 'white',
    marginLeft: 8,
    width: 60,
  },
  actionButtonText: {
    fontSize: '12@s',
  },
  actionButtonIcon: { marginLeft: 14 },
  lineChartContainer: {
    flex: 0.7,
    backgroundColor: 'whitesmoke',
    borderWidth: 1,
    borderRadius: 4,
  },
});

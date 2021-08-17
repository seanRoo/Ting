import { ScaledSheet } from 'react-native-size-matters';

export default ScaledSheet.create({
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
});

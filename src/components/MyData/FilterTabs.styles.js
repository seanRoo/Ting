import { ScaledSheet } from 'react-native-size-matters';

export default ScaledSheet.create({
  container: {
    marginTop: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 0.5,
    minWidth: '90@s',
    margin: '4@s',
    padding: 8,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  buttonIcon: {
    position: 'absolute',
    right: 5,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 12,
    color: 'black',
  },
});

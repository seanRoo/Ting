import { StyleSheet } from 'react-native';

const MyDataStyles = StyleSheet.create({
  scrollView: {
    width: '100%',
    minHeight: '100%',
    //marginTop: 20,
    // marginLeft: 12,
    // marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonContainer: {
    marginBottom: 15,
    backgroundColor: 'transparent',
  },
  buttons: {
    height: 35,
    padding: 20,
  },
  graphContainer: {
    width: '100%',
  },
  graphViewDropdown: { marginBottom: 20 },
  menuOption: {
    height: 45,
    justifyContent: 'center',
    borderBottomWidth: 0.25,
    flexDirection: 'row',
    padding: 10,
  },
});

export default MyDataStyles;

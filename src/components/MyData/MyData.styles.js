import { StyleSheet } from 'react-native';

const MyDataStyles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'column', marginTop: 20 },
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

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
  bodyText: { fontSize: 20 },
  bold: { fontWeight: 'bold' },
  footer: {
    paddingRight: 0,
    height: 55,
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
  cardBody: { paddingLeft: 5, paddingRight: 5 },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '95%',
    height: '95%',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default DiscussionCardStyles;

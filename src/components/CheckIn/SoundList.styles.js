import { StyleSheet } from 'react-native';

const SoundListStyles = StyleSheet.create({
  header: { fontSize: 18, alignSelf: 'center' },
  listContainer: { width: '100%', flexDirection: 'row', marginTop: 25 },
  listRow: {
    width: '45%',
    flexDirection: 'column',
    flex: 1,
  },
  divider: {
    borderLeftWidth: 1,
    borderLeftColor: 'black',
    width: '10%',
    marginLeft: 20,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  checkbox: { width: 25 },
});

export default SoundListStyles;

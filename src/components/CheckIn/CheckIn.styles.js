import {StyleSheet} from 'react-native';

const SoundListStyles = StyleSheet.create({
  containerView: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
    width: '100%',
    marginTop: 5,
  },
  soundListContainer: {height: 'auto', flexDirection: 'column'},
  soundIntensitySliderContainer: {height: 120, width: '100%'},
});

export default SoundListStyles;

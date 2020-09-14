import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Slider from '@react-native-community/slider';
import Styles from './SoundIntensitySlider.styles';
import {Center} from '../Center';

const SoundList = ({sliderValues, setSliderValues}) => {
  return (
    <View
      style={{
        width: '100%',
      }}>
      <Text style={Styles.header}>What is the sound intensity level?</Text>
      <Center>
        <Text>
          {sliderValues.soundIntensity} / <Text style={Styles.bold}> 10</Text>
        </Text>
        <Slider
          style={Styles.slider}
          minimumValue={0}
          maximumValue={10}
          maximumTrackTintColor="#000000"
          value={sliderValues.soundIntensity}
          step={0.5}
          onValueChange={(value) =>
            setSliderValues({
              ...sliderValues,
              soundIntensity: value,
            })
          }
          minimumTrackTintColor="black"
          thumbTintColor="orchid"
        />
      </Center>
    </View>
  );
};

export default SoundList;

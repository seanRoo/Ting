import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import Styles from './SoundIntensitySlider.styles';
import { Center } from '../Center';

const SliderComponent = ({
  sliderValue,
  setSliderValue,
  headerText,
  isHours = false,
}) => {
  return (
    <View style={Styles.containerView}>
      <Text style={Styles.header}>{headerText}</Text>
      <Center>
        {!isHours && (
          <Text>
            {sliderValue} / <Text style={Styles.bold}>10</Text>
          </Text>
        )}
        {isHours && (
          <Text>
            {sliderValue}
            <Text style={Styles.bold}> Hours</Text>
          </Text>
        )}
        <Slider
          style={Styles.slider}
          minimumValue={0}
          maximumValue={10}
          maximumTrackTintColor="#000000"
          value={sliderValue}
          step={0.5}
          onValueChange={setSliderValue}
          minimumTrackTintColor="black"
          thumbTintColor="orchid"
        />
      </Center>
    </View>
  );
};

export default SliderComponent;

import React from 'react';
import { Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import Styles from './SoundIntensitySlider.styles';

const SliderComponent = ({ sliderValue, setSliderValue, subtitle, title }) => {
  const maxValue = title === 'Sleep' ? 12 : 10;
  return (
    <View style={Styles.containerView}>
      <View style={{ flex: 0.8 }}>
        <Text style={Styles.headerTitle}>{title}</Text>
        <Text style={Styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={{ flex: 0.2, marginTop: 10 }}>
        <Slider
          style={Styles.slider}
          minimumValue={0}
          maximumValue={maxValue}
          maximumTrackTintColor="#000000"
          value={sliderValue}
          step={0.5}
          onSlidingComplete={setSliderValue}
          minimumTrackTintColor="black"
          thumbTintColor="orchid"
        />
        <View style={{ marginLeft: 10, marginRight: 10, flexDirection: 'row' }}>
          <Text>0</Text>
          <Text style={{ position: 'absolute', right: 0 }}>{maxValue}</Text>
        </View>
      </View>
    </View>
  );
};

export default SliderComponent;

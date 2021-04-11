import React from 'react';
import { View, Text } from 'react-native';
import { Bar } from 'react-native-progress';
import MyCalendarStyles from '../MyCalendar.styles';

export const ProgressBar = ({
  heading,
  minValue = 0,
  maxValue = 10,
  progress,
  color,
}) => (
  <View style={{ flex: 0.9 }}>
    <Text style={MyCalendarStyles.progressBarHeadingTitle}>{heading}</Text>
    <View
      style={{
        flexDirection: 'row',
      }}
    >
      <Text style={MyCalendarStyles.progressBarMinValueLabel}>{minValue}</Text>
      <Text style={MyCalendarStyles.progressBarMaxValueLabel}>{maxValue}</Text>
    </View>
    <Bar color={color} progress={progress} width={null} />
    <Text
      style={[
        {
          ...MyCalendarStyles.progressBarProgressLabel,
          marginLeft: `${progress * 100}%`,
          color: color,
        },
      ]}
    >
      {progress * 10}
    </Text>
  </View>
);

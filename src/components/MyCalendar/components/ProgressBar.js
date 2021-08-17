import React from 'react';
import { View, Text } from 'react-native';
import { Bar } from 'react-native-progress';
import MyCalendarStyles from '../MyCalendar.styles';

const getBarLabelMargin = (progressValue) => {
  if (progressValue > 1) {
    return `${progressValue * 78}%`;
  } else if (progressValue === 1) {
    return `${progressValue * 94}%`;
  } else if (progressValue < 1) {
    return `${progressValue * 98}%`;
  } else {
    return null;
  }
};
export const ProgressBar = ({
  heading,
  minValue = 0,
  maxValue = 10,
  progress,
  color,
}) => {
  const barLabelMargin = getBarLabelMargin(progress);
  return (
    <View style={{ flex: 0.9 }}>
      <Text style={MyCalendarStyles.progressBarHeadingTitle}>{heading}</Text>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <Text style={MyCalendarStyles.progressBarMinValueLabel}>
          {minValue}
        </Text>
        <Text style={MyCalendarStyles.progressBarMaxValueLabel}>
          {maxValue === 10 ? '10+' : maxValue}
        </Text>
      </View>
      <Bar color={color} progress={progress} width={null} />
      <Text
        style={{
          ...MyCalendarStyles.progressBarProgressLabel,
          marginLeft: barLabelMargin,
          color: color,
        }}
      >
        {progress * 10}
      </Text>
    </View>
  );
};

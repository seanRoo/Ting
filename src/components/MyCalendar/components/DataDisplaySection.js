import React from 'react';
import { View, Text } from 'react-native';
import MyCalendarStyles from '../MyCalendar.styles';
import { ProgressBar } from './ProgressBar';

const defaultMaxValue = 10;
const getProgressColor = (progressValue, highValueIsBad = false) => {
  let color = '';
  if (progressValue <= 0.3) {
    color = highValueIsBad ? 'green' : 'red';
  } else if (progressValue > 0.3 && progressValue <= 0.6) {
    color = 'orange';
  } else if (progressValue > 0.6) {
    color = highValueIsBad ? 'red' : 'green';
  }
  return color;
};

const DataDisplaySection = ({ data, icon, title }) => {
  return (
    <View>
      <Text style={MyCalendarStyles.dataViewTitle}>{title}</Text>
      <View style={MyCalendarStyles.dataRowContainer}>
        <View style={MyCalendarStyles.iconContainer}>
          <View>{icon}</View>
        </View>
        <View style={MyCalendarStyles.progressBarContainer}>
          {data.map((element) => (
            <ProgressBar
              heading={element.heading}
              progress={element.value}
              color={getProgressColor(element.value, element.highValueIsBad)}
              maxValue={element.maxValue || defaultMaxValue}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default DataDisplaySection;

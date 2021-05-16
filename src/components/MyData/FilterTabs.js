import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from './FilterTabs.styles';

const filterOptions = [
  { filter: 'Sleep', color: 'green' },
  { filter: 'Stress', color: 'red' },
  { filter: 'Mood', color: 'blue' },
  { filter: 'Sound Intensity', color: 'purple', width: 130 },
  { filter: 'Sound Pitch', color: 'pink', width: 120 },
];

const FilterTabs = ({ handleFilterUpdate, filters }) => {
  const filterIsSelected = (option) => filters.includes(option);
  return (
    <View style={Styles.container}>
      {filterOptions.map((option) => (
        <TouchableOpacity
          style={{ ...Styles.button, width: option.width || 'auto' }}
          onPress={() => handleFilterUpdate(option.filter)}
        >
          <Text style={Styles.buttonText}>{option.filter}</Text>
          <MaterialCommunityIcons
            style={{ ...Styles.buttonIcon, color: option.color }}
            name={filterIsSelected(option.filter) ? 'check' : 'square-outline'}
            size={20}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FilterTabs;

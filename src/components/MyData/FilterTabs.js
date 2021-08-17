import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from './FilterTabs.styles';

const FilterTabs = ({ handleFilterUpdate, filters }) => {
  return (
    <View style={Styles.container}>
      <View style={Styles.tabContainer}>
        {filters?.map((option) => {
          return (
            <TouchableOpacity
              style={{
                ...Styles.button,
                width: option.width || 'auto',
                backgroundColor: option.disabled ? '#cccccc' : 'white',
              }}
              onPress={() => handleFilterUpdate(option)}
              disabled={option.disabled}
            >
              <Text style={Styles.buttonText}>{option.name}</Text>
              <MaterialCommunityIcons
                style={{ ...Styles.buttonIcon, color: option.color }}
                name={option.toggled ? 'check' : 'square-outline'}
                size={20}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default FilterTabs;

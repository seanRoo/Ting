import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const filterOptions = [
  { filter: 'Sleep', color: 'green' },
  { filter: 'Stress', color: 'red' },
  { filter: 'Mood', color: 'blue' },
  { filter: 'Sound Intensity', color: 'purple', width: 130 },
  { filter: 'Sound Pitch', color: 'pink' },
];

const FilterTabs = ({ handleFilterUpdate, filters }) => {
  const filterIsSelected = (option) => filters.includes(option);
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 8,
        flex: 0.2,
      }}
    >
      {filterOptions.map((option) => (
        <TouchableOpacity
          style={{
            borderWidth: 1,
            minWidth: 120,
            width: option.width || 'auto',
            margin: 4,
            padding: 8,
            borderRadius: 10,
            backgroundColor: 'white',
            flexDirection: 'row',
          }}
          onPress={() => handleFilterUpdate(option.filter)}
        >
          <Text
            style={{ color: option.color, fontWeight: 'bold', fontSize: 12 }}
          >
            {option.filter}
          </Text>
          <MaterialCommunityIcons
            style={{
              position: 'absolute',
              right: 5,
              alignSelf: 'center',
              color: filterIsSelected(option.filter) ? 'green' : 'black',
            }}
            name={filterIsSelected(option.filter) ? 'check' : 'square-outline'}
            size={20}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FilterTabs;

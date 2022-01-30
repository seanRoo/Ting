import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MonthPicker from 'react-native-month-year-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Text, TouchableOpacity, View } from 'react-native';

const DateSelect = ({
  showPicker,
  monthPickerValue,
  numEntries,
  ...styleProps
}) => (
  <TouchableOpacity
    style={{
      borderWidth: 0.5,
      borderColor: 'black',
      padding: 4,
      flexDirection: 'row',
      borderRadius: 10,
      height: 30,
      marginRight: 10,
      maxWidth: '50%',
      alignSelf: 'flex-end',
      justifyContent: 'space-between',
    }}
    onPress={() => showPicker(true)}
  >
    <View>
      <Text style={{ color: 'blue' }}>
        {`${monthPickerValue.toLocaleString('default', {
          month: 'long',
        })}, ${monthPickerValue.toLocaleString('default', {
          year: 'numeric',
        })}, ${numEntries} entries`}
      </Text>
    </View>
    <MaterialCommunityIcons
      name="pencil"
      size={16}
      style={{ marginLeft: 8, color: 'blue' }}
    />
  </TouchableOpacity>
);

export default DateSelect;

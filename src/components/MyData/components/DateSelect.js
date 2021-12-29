import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MonthPicker from 'react-native-month-year-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Text, TouchableOpacity } from 'react-native';

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
      width: '50%',
      alignSelf: 'flex-end',
    }}
    onPress={() => showPicker(true)}
  >
    <Text style={{ color: 'blue' }}>
      {`${monthPickerValue.toLocaleString('default', {
        month: 'long',
      })}, ${monthPickerValue.toLocaleString('default', {
        year: 'numeric',
      })}, ${numEntries} entries`}
    </Text>
    <MaterialCommunityIcons
      name="pencil"
      size={16}
      style={{ marginLeft: 8, color: 'blue' }}
    />
  </TouchableOpacity>
);

export default DateSelect;

// <RNPickerSelect
//   //placeholder={{ label: 'Select a Consulant Type...', value: 'Test' }}
//   textInputProps={{
//     width: 100,
//     color: 'black',
//   }}
//   pickerProps={{ width: 100 }}
//   touchableWrapperProps={{
//     width: '35%',
//     borderWidth: 1,
//     borderColor: 'grey',
//     borderRadius: 10,
//     height: 40,
//     ...styleProps,
//   }}
//   InputAccessoryView={() => null}
//   placeholder={{}}
//   onValueChange={(value) => console.log(value)}
//   items={[
//     { label: 'Last 7 Days', value: 0 },
//     { label: 'Last Month', value: 1 },
//     { label: 'Last 365 Days', value: 2 },
//   ]}
//   useNativeAndroidPickerStyle={false}
//   //textInputProps={{ color: consultantType ? 'black' : 'orchid' }}
//   Icon={() => (
//     <FontAwesome5 name="caret-down" style={{ top: 8, right: 8 }} size={18} />
//   )}
//   fixAndroidTouchableBug
// />

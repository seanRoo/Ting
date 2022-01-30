import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Input } from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import auth from '@react-native-firebase/auth';
import { Toast } from 'native-base';
import { addConsultant } from '../../api/ConsultantApi';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import InputScrollView from 'react-native-input-scroll-view';

const consultantTypes = ['Audiologist', 'GP', 'Doctor', 'Other'];

const AddConsultantForm = ({ navigation }) => {
  const currentUser = auth().currentUser.uid;
  const [saveEnabled, setSaveEnabled] = useState(false);
  const [addressValue, setAddressValue] = useState({ id: '', desc: '' });
  const [phoneNumValue, setPhoneNumValue] = useState('');
  const [consultantValue, setConsultantValue] = useState('');
  const [consultantType, setConsultantType] = useState(null);

  useEffect(() => {
    if (addressValue?.desc?.length && phoneNumValue?.length && consultantType) {
      setSaveEnabled(true);
    } else {
      setSaveEnabled(false);
    }
  }, [phoneNumValue, addressValue, consultantType]);

  useEffect(() => {
    console.log(addressValue);
    if (addressValue?.phoneNumber) {
      setPhoneNumValue(addressValue.phoneNumber);
    }
  }, [addressValue]);

  const handleSave = () => {
    const formValues = {
      address: addressValue,
      phoneNumber: phoneNumValue,
      consultantName: consultantValue || '',
      consultantType,
    };
    addConsultant(formValues, currentUser)
      .then(() => {
        Toast.show({
          text: 'Consultant Added',
          buttonText: 'Okay',
          type: 'success',
        });
        navigation.navigate('Dashboard');
      })
      .catch((error) => {
        console.error(error);
        Toast.show({
          text: 'Something went wrong..',
          buttonText: 'Okay',
          type: 'danger',
        });
      });
  };
  return (
    <InputScrollView
      style={{
        padding: 10,
      }}
      keyboardOffset={100}
      useAnimatedScrollView
      keyboardAvoidingViewProps={{ keyboardVerticalOffset: 20 }}
      automaticallyAdjustContentInsets
    >
      <View style={{ flex: 0.2 }}>
        <GooglePlacesAutocomplete
          fetchDetails
          placeholder={'Start typing to search...'}
          onPress={(data, details) => {
            console.log(data);
            console.log(details);
            setAddressValue({
              id: data.place_id,
              desc: data.description,
              lat: details.geometry.location.lat,
              lng: details.geometry.location.lng,
              openingHours: details.opening_hours
                ? details.opening_hours.weekday_text
                : null,
              openNow: details.opening_hours
                ? details.opening_hours.openNow
                : null,
              phoneNumber: details.formatted_phone_number || null,
              icon: details?.icon,
            });
          }}
          styles={{
            listView: {
              position: 'absolute',
              zIndex: 99999,
              top: 70,
            },
          }}
          query={{
            key: 'AIzaSyBkUX2MyIzlkGLyAib3f09u0TmmI4uqiyU',
            language: 'en',
            components: 'country:ie',
          }}
          textInputProps={{
            InputComp: Input,
            label: 'Address *',
            inputContainerStyle: {
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: 'black',
              padding: 1,
              borderRadius: 10,
            },
            inputStyle: { borderRadius: 10 },
            labelStyle: { marginBottom: 10, color: 'black' },
            placeholderTextColor: 'orchid',
          }}
        />
      </View>
      <View style={{ flex: 0.2, zIndex: -1 }}>
        <Input
          onChangeText={setPhoneNumValue}
          placeholder={'e.g 089-123 4567'}
          label={'Phone Number *'}
          inputContainerStyle={{
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: 'black',
            height: 55,
            borderRadius: 10,
          }}
          labelStyle={{ marginBottom: 10, color: 'black' }}
          placeholderTextColor="orchid"
          keyboardType="numeric"
          value={phoneNumValue}
        />
      </View>
      <View
        style={{
          margin: 10,
          flex: 0.2,
          marginTop: 5,
          marginBottom: 25,
          zIndex: -1,
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>
          Consultant Type *
        </Text>
        <RNPickerSelect
          placeholder={{ label: 'Select a Consulant Type...', value: null }}
          style={pickerSelectStyles}
          onValueChange={setConsultantType}
          items={consultantTypes.map((element, index) => {
            return {
              label: element,
              value: element,
            };
          })}
          useNativeAndroidPickerStyle={false}
          textInputProps={{ color: consultantType ? 'black' : 'orchid' }}
          Icon={() => (
            <FontAwesome5
              name="caret-down"
              style={{ top: 18, right: 20 }}
              size={18}
            />
          )}
          fixAndroidTouchableBug
        />
      </View>
      <View style={{ flex: 0.2, marginBottom: 10, zIndex: -1 }}>
        <Input
          onChangeText={setConsultantValue}
          placeholder={'e.g John Smith'}
          label={'Consultant Name'}
          inputContainerStyle={{
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: 'black',
            height: 55,
            borderRadius: 10,
          }}
          labelStyle={{ marginBottom: 10, color: 'black' }}
          placeholderTextColor="orchid"
        />
      </View>
      <View style={{ flex: 0.2, marginBottom: 10, zIndex: -1 }}>
        <TouchableOpacity
          onPress={handleSave}
          style={{
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            backgroundColor: saveEnabled ? 'orchid' : 'rgba(218,112,214, .3)',
          }}
          disabled={!saveEnabled}
        >
          <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </InputScrollView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: 'white',
    height: 55,
    width: '100%',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: 'white',
    height: 55,
    width: '100%',
  },
});
export default AddConsultantForm;

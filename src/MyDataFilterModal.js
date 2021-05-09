import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Modal, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CheckBox } from 'react-native-elements';
import { Center } from './components/Center';

const DATA = [
  {
    id: '1',
    title: 'Sound Pitch',
    checked: false,
  },
  {
    id: '2',
    title: 'Sound Intensity',
    checked: false,
  },
  {
    id: '3',
    title: 'Mood',
    checked: false,
  },
  {
    id: '4',
    title: 'Sleep Hours',
    checked: false,
  },
  {
    id: '5',
    title: 'Stress',
    checked: false,
  },
];

const MyDataFilterModal = ({ modalVisible, handleClose, handleSave }) => {
  const [filterOptions, setFilterOptions] = useState(DATA);

  const handleCheck = ({ item }) => {
    const newItem = item;
    newItem.checked ? (item.checked = false) : (item.checked = true);
    setFilterOptions([...filterOptions, newItem]);
  };

  const Item = ({ item }) => (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 6,
        justifyContent: 'center',
      }}
    >
      <CheckBox
        iconRight
        right
        title={item.title}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={item.checked}
        onIconPress={() => handleCheck({ item })}
        containerStyle={{
          alignSelf: 'center',
          width: '95%',
        }}
        textStyle={{ position: 'absolute', left: 0 }}
        uncheckedColor="orchid"
        checkedColor="orchid"
      />
    </View>
  );
  const renderItem = ({ item }) => <Item item={item} />;

  return (
    <Modal transparent={true} visible={modalVisible} animationType="slide">
      <Center>
        <View
          style={{
            //margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 15,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            width: '85%',
            height: 300,
            flex: 0.6,
          }}
        >
          <TouchableOpacity
            onPress={handleClose}
            style={{ position: 'absolute', right: 0, padding: 16 }}
          >
            <MaterialCommunityIcons name="close" size={28} color="black" />
          </TouchableOpacity>
          <View
            style={{
              flex: 0.2,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 20 }}>Filter</Text>
          </View>
          <FlatList
            style={{ flex: 0.4, alignSelf: 'center' }}
            data={DATA}
            renderItem={renderItem}
          />
          <TouchableOpacity
            onPress={() => handleSave(filterOptions)}
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              width: '98%',
              height: 30,
              flex: 0.1,
              borderColor: 'green',
              backgroundColor: 'green',
              borderWidth: 1,
              borderRadius: 10,
              marginLeft: 4,
            }}
          >
            <Text style={{ textAlign: 'center', color: 'white' }}>Save</Text>
          </TouchableOpacity>
        </View>
      </Center>
    </Modal>
  );
};

export default MyDataFilterModal;

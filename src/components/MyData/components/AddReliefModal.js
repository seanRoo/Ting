import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { v4 as uuid } from 'uuid';

const AddReliefModal = ({
  handleClose,
  addReliefModalVisible,
  handleAddReliefOption,
  reliefModalCategory,
}) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={addReliefModalVisible}
      onRequestClose={() => handleClose()}
    >
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <View
          style={{
            height: '30%',
            minHeight: 200,
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            paddingBottom: 14,
            paddingTop: 14,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flex: 1, width: '100%', justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, marginBottom: 8 }}>
              New relief option
            </Text>
            <TextInput
              style={{
                height: 40,
                width: '100%',
                borderRadius: 14,
                borderColor: 'orchid',
                borderWidth: 1,
              }}
              value={inputValue}
              onChangeText={setInputValue}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <TouchableOpacity
              style={{
                width: 100,
                borderRadius: 20,
                borderColor: 'lightgray',
                borderWidth: 1,
                padding: 14,
                elevation: 2,
                backgroundColor: 'white',
                alignItems: 'center',
                alignSelf: 'flex-start',
              }}
              onPress={() => {
                setInputValue('');
                handleClose();
              }}
            >
              <Text style={{ color: '#2196F3', fontWeight: 'bold' }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 100,
                borderRadius: 20,
                padding: 14,
                elevation: 2,
                backgroundColor: 'orchid',
                alignItems: 'center',
                alignSelf: 'flex-end',
              }}
              onPress={() => {
                if (inputValue.length) {
                  const newOption = {
                    label: inputValue,
                    selected: false,
                    attempted: false,
                    id: uuid(),
                    category: reliefModalCategory,
                    customOption: true,
                  };
                  handleAddReliefOption(newOption);
                  setInputValue('');
                }
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddReliefModal;

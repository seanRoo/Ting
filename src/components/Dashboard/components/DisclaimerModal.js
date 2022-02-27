import React from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const DisclaimerModal = ({ handleClose, disclaimerModalVisible }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={disclaimerModalVisible}
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
            height: '80%',
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            paddingBottom: 14,
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
          <View style={{ flex: 1 }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginBottom: 20,
              }}
            >
              <Text style={{ fontSize: 24 }}>Welcome to Ting</Text>
              <EvilIcons
                name="bell"
                size={45}
                color="orchid"
                style={{
                  paddingLeft: 8,
                  transform: [{ rotate: '30deg' }],
                }}
              />
            </View>
            <View
              style={{
                height: '85%',
                marginBottom: 10,
                width: 350,
                borderRadius: 12,
                borderColor: 'lightgray',
                borderWidth: 1,
                padding: 12,
              }}
            >
              <Text style={{ lineHeight: 30, fontSize: 18 }}>
                Ting is a tool focused solely on helping the user manage their
                tinnitus. Ting is not a substitute for medical help relating to
                your tinnitus and you should still seek professional medical
                help as you would have before
              </Text>
            </View>
          </View>
          <Pressable
            style={{
              width: 100,
              borderRadius: 20,
              padding: 14,
              elevation: 2,
              backgroundColor: '#2196F3',
              alignItems: 'center',
            }}
            onPress={() => handleClose()}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>I accept</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default DisclaimerModal;

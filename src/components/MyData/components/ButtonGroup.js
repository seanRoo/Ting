import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const getActiveStyles = () => ({
  borderColor: 'orchid',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.8,
  shadowRadius: 2,
  elevation: 8,
  borderWidth: 3,
});

const ButtonGroup = ({
  currentButtonIndex,
  setCurrentButtonIndex,
  ...styleProps
}) => {
  return (
    <View {...styleProps}>
      <View
        style={{
          width: '45%',
          height: '40%',
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'stretch',
          backgroundColor: 'white',
          borderWidth: 1,
          ...(currentButtonIndex === 0 && getActiveStyles()),
        }}
      >
        <TouchableOpacity
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setCurrentButtonIndex(0)}
        >
          <Text style={{ color: 'black', fontWeight: 'bold' }}>
            Sound Intensity
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '45%',
          height: '40%',
          borderRadius: 20,
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'stretch',
          backgroundColor: 'white',
          ...(currentButtonIndex === 1 && getActiveStyles()),
        }}
      >
        <TouchableOpacity
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setCurrentButtonIndex(1)}
        >
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Sleep</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '45%',
          height: '40%',
          borderRadius: 20,
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'stretch',
          backgroundColor: 'white',
          ...(currentButtonIndex === 2 && getActiveStyles()),
        }}
      >
        <TouchableOpacity
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setCurrentButtonIndex(2)}
        >
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Mood</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '45%',
          height: '40%',
          borderRadius: 20,
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'stretch',
          backgroundColor: 'white',
          ...(currentButtonIndex === 3 && getActiveStyles()),
        }}
      >
        <TouchableOpacity
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setCurrentButtonIndex(3)}
        >
          <Text style={{ color: 'black', fontWeight: 'bold' }}>
            Stress Level
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ButtonGroup;

import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LinearGuage = ({ startLabel, endLabel, value, ...otherProps }) => {
  return (
    <View {...otherProps}>
      <LinearGradient
        style={{
          width: '100%',
          alignSelf: 'flex-start',
          height: 40,
          borderRadius: 25,
        }}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 5 }}
        colors={['#14f9ff', '#ffc000', '#ff0000']}
      >
        <View
          style={{
            width: 2,
            height: '100%',
            backgroundColor: 'black',
            marginLeft: `${value}%`,
          }}
        ></View>
      </LinearGradient>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 4,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{startLabel}</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{endLabel}</Text>
      </View>
    </View>
  );
};

export default LinearGuage;

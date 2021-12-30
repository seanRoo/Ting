import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LinearGuage = ({
  startLabel,
  endLabel,
  value,
  highValueIsGood,
  ...otherProps
}) => {
  const colors = highValueIsGood
    ? ['#ff0000', '#ffc000', '#14f9ff']
    : ['#14f9ff', '#ffc000', '#ff0000'];
  return (
    <View {...otherProps}>
      <LinearGradient
        style={{
          alignSelf: 'center',
          height: 10,
          borderRadius: 25,
          width: '100%',
        }}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 5 }}
        colors={colors}
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

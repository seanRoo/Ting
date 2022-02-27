import React from 'react';
import Bar from 'react-native-progress/Bar';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProgressBar = ({ progress, label, icon, styleProps }) => (
  <>
    <Bar
      style={{ padding: 0, margin: 0, ...styleProps }}
      progress={progress / 10 || 0}
      width={190}
      color="orchid"
      borderColor="grey"
    />
    <View
      style={{
        flexDirection: 'row',
        display: 'flex',
      }}
    >
      <Text
        style={{
          paddingRight: 8,
          fontSize: 14,
        }}
      >
        {label}
      </Text>
      {icon}
      <Text style={{ fontSize: 14, marginLeft: 'auto' }}>
        <Text>{progress}</Text>/10
      </Text>
    </View>
  </>
);

export default ProgressBar;

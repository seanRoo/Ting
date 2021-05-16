import React from 'react';
import { Text } from 'react-native';
import Styles from './MyData.styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { scale } from 'react-native-size-matters';

const ActionButton = ({ iconName, text, handleClick }) => (
  <TouchableOpacity style={Styles.actionButton}>
    <MaterialCommunityIcons
      style={Styles.actionButtonIcon}
      name={iconName}
      size={scale(18)}
    />
  </TouchableOpacity>
);

export default ActionButton;

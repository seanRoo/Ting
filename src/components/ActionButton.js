import React from 'react';
import Styles from './ActionButton.styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { scale } from 'react-native-size-matters';

const ActionButton = ({ iconName, text, handleClick }) => (
  <TouchableOpacity style={Styles.actionButton} onPress={handleClick}>
    <MaterialCommunityIcons
      style={Styles.actionButtonIcon}
      name={iconName}
      size={scale(18)}
    />
  </TouchableOpacity>
);

export default ActionButton;

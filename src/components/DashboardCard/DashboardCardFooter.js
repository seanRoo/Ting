import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Icon, CardItem, Button} from 'native-base';
import {Right} from '../Right';
import Styles from './DashboardCard.styles';
const DashboardCardFooter = ({handleButtonPress, buttonText}) => {
  return (
    <CardItem footer style={Styles.footer}>
      <Right>
        <TouchableOpacity style={Styles.goToButton}>
          <Button transparent light onPress={handleButtonPress}>
            <Text style={Styles.buttonText}>{buttonText}</Text>
            <Icon name="chevron-forward-outline" style={Styles.buttonIcon} />
          </Button>
        </TouchableOpacity>
      </Right>
    </CardItem>
  );
};

export default DashboardCardFooter;

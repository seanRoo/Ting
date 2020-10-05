import React from 'react';
import { Text } from 'react-native';
import { Card, CardItem, Body } from 'native-base';
import DashboardCardFooter from './DashboardCardFooter';
import Styles from './DashboardCard.styles';

const DashboardCard = (props) => {
  const { headerText, bodyText, handleButtonPress, buttonText } = props;
  return (
    <Card>
      <CardItem header>
        <Text style={Styles.heading}>{headerText}</Text>
      </CardItem>
      <CardItem>
        <Body style={Styles.cardBody}>
          <Text style={Styles.bodyText}>{bodyText}</Text>
        </Body>
      </CardItem>
      <DashboardCardFooter
        handleButtonPress={handleButtonPress}
        buttonText={buttonText}
      />
    </Card>
  );
};

export default DashboardCard;

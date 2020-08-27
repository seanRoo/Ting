import React from 'react';
import {Text} from 'react-native';
import {Container, Content} from 'native-base';
import LineChartComponent from './LineChart';
import DashboardCard from './DashboardCard/DashboardCard';
import Styles from './DashboardCard/DashboardCard.styles';

const Dashboard = ({navigation}) => {
  return (
    <Container style={Styles.container}>
      <Content>
        <DashboardCard
          headerText="Reminders"
          bodyText={
            <Text style={Styles.bodyText}>
              You Have<Text style={Styles.bold}> 2</Text> Incomplete Check-Ins
            </Text>
          }
          buttonText="Go To Calendar"
          handleButtonPress={() => navigation.navigate('Check In')}
        />
        <DashboardCard
          headerText="Reminders"
          bodyText={<LineChartComponent />}
          buttonText="Go To My Data"
          handleButtonPress={() => navigation.navigate('My Data')}
        />
      </Content>
    </Container>
  );
};

export default Dashboard;

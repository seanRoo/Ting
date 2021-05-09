import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Container } from 'native-base';
import auth from '@react-native-firebase/auth';
import { DB } from '../../config';
import Styles from '../DashboardCard/DashboardCard.styles';
import { getMonthYearString } from '../../utils';
import MyDataFilterModal from '../../MyDataFilterModal';
import MyCalendarCard from './MyCalendarCard';
import MyDataCard from './MyDataCard';
import DashboardHeader from './DashboardHeader';
import DashboardDiscussionCard from './DashboardDiscussionCard';

const Dashboard = ({ navigation }) => {
  const currentUser = auth().currentUser.uid;
  const today = new Date();

  const [checkedIn, setCheckedIn] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const getIsCheckedInToday = (userId) => {
    try {
      DB.ref(
        `/checkIns/${userId}/${today.getFullYear()}/${getMonthYearString(
          today,
        )}/${today.getDate()}`,
      ).on('value', (querySnapshot) => {
        let data = querySnapshot.val() ? querySnapshot.val() : null;
        setCheckedIn(Boolean(data));
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIsCheckedInToday(currentUser);
  }, []);

  const handleSave = (options) => {
    setFilterOptions(options);
    setModalVisible(false);
  };

  return (
    <Container style={[Styles.container, modalVisible && { opacity: 0.2 }]}>
      <MyDataFilterModal
        modalVisible={modalVisible}
        handleClose={() => setModalVisible(!modalVisible)}
        handleSave={handleSave}
      />
      <DashboardHeader />
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <View style={{ flex: 0.5, flexDirection: 'row' }}>
          <DashboardDiscussionCard />
          <MyCalendarCard
            handleClick={() =>
              !checkedIn
                ? navigation.push('Check In', {
                    date: today,
                    monthYearString: getMonthYearString(today),
                  })
                : navigation.navigate('My Calendar', { dashboardDate: today })
            }
            checkedIn={checkedIn}
          />
        </View>
        <MyDataCard handleFilterClick={() => setModalVisible(!modalVisible)} />
      </View>
    </Container>
  );
};

export default Dashboard;

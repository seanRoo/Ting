import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { DB } from '../../config';
import Styles from '../DashboardCard/DashboardCard.styles';
import { getMonthYearString } from '../../utils';
import DashboardHeader from './DashboardHeader';
import { ButtonGroup } from 'react-native-elements';
import ConsultantList from './components/ConsultantList';
import HelpfulLinksList from './components/HelpfulLinksList';
import DashboardOverview from './components/DashboardOverview';
import { getUser } from '../../api/UserApi';
import Loading from '../Loading';
import TextCustomFont from '../TextCustomFont';

const Dashboard = ({ navigation }) => {
  const currentUser = auth().currentUser.uid;
  const today = new Date();

  const [checkedIn, setCheckedIn] = useState(false);
  const [buttonGroupIndex, setButtonGroupIndex] = useState(0);
  const [userInfo, setUserInfo] = useState(null);

  const getIsCheckedInToday = (userId) => {
    try {
      DB.ref(
        `/checkIns/${userId}/${today.getFullYear()}/2021-11/${today.getDate()}`,
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
    if (!userInfo) {
      getUser(currentUser, setUserInfo);
    }
  }, []);

  const buttonGroupComponents = [
    <DashboardOverview
      navigation={navigation}
      monthYearString={() => getMonthYearString(today)}
      today={today}
      checkedIn={checkedIn}
    />,
    <ConsultantList navigation={navigation} />,
    <HelpfulLinksList />,
  ];
  const buttons = [
    <TextCustomFont>My Calendar</TextCustomFont>,
    <TextCustomFont>My Consultants</TextCustomFont>,
    <TextCustomFont>Helpful Links</TextCustomFont>,
  ];

  return (
    <View style={Styles.container}>
      {userInfo && (
        <>
          <DashboardHeader
            handleClick={(routeName) => navigation.navigate(routeName)}
            userInfo={userInfo}
          />
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <ButtonGroup
              onPress={setButtonGroupIndex}
              selectedIndex={buttonGroupIndex}
              buttons={buttons}
              containerStyle={{
                borderRadius: 20,
                flex: 0.08,
                marginBottom: 20,
              }}
              buttonStyle={{
                backgroundColor: 'rgba(218,112,214, .3)',
                height: 45,
              }}
              selectedButtonStyle={{ backgroundColor: 'orchid' }}
              textStyle={{ color: 'black' }}
              selectedTextStyle={{ fontWeight: 'bold' }}
            />
            <View
              style={{
                flex: 0.92,
                padding: 4,
                borderRadius: 30,
                borderColor: 'orchid',
              }}
            >
              {buttonGroupComponents[buttonGroupIndex]}
            </View>
          </View>
        </>
      )}
      {!userInfo && <Loading />}
    </View>
  );
};

export default Dashboard;

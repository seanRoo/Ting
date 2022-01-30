import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import { DB } from '../../config';
import Styles from '../DashboardCard/DashboardCard.styles';
import { getMonthYearString } from '../../utils';
import DashboardHeader from './DashboardHeader';
import { ButtonGroup } from 'react-native-elements';
import ConsultantList from './components/ConsultantList';
import DashboardOverview from './components/DashboardOverview';
import { getUser } from '../../api/UserApi';
import Loading from '../Loading';
import TextCustomFont from '../TextCustomFont';
import MyHelp from './components/MyHelp';

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
    <MyHelp />,
  ];
  const buttons = [
    <TextCustomFont>My Calendar</TextCustomFont>,
    <TextCustomFont>My Consultants</TextCustomFont>,
    <TextCustomFont>My Relief</TextCustomFont>,
  ];

  return (
    <View style={Styles.container}>
      {userInfo && (
        <>
          <DashboardHeader
            styleProps={{ flex: 0.1 }}
            handleClick={(routeName) => navigation.navigate(routeName)}
            userInfo={userInfo}
          />
          <View
            style={{ flex: 0.1, borderWidth: 1, marginTop: 8, marginBottom: 8 }}
          ></View>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.8,
            }}
          >
            <ButtonGroup
              onPress={setButtonGroupIndex}
              selectedIndex={buttonGroupIndex}
              buttons={buttons}
              containerStyle={{
                borderRadius: 20,
                flex: 0.1,
                marginBottom: 20,
                width: '100%',
                alignSelf: 'center',
                justifyContent: 'center',
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

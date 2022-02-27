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
import { getUser, acceptDisclaimer } from '../../api/UserApi';
import Loading from '../Loading';
import TextCustomFont from '../TextCustomFont';
import MyHelp from './components/MyHelp';
import DisclaimerModal from './components/DisclaimerModal';

const Dashboard = ({ navigation }) => {
  const currentUser = auth().currentUser.uid;
  const today = new Date();

  const [checkedIn, setCheckedIn] = useState(false);
  const [buttonGroupIndex, setButtonGroupIndex] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  const [disclaimerModalVisible, setDisclaimerModalVisible] = useState(false);

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
    <MyHelp navigation={navigation} />,
  ];
  const buttons = [
    <TextCustomFont>My Check-ins</TextCustomFont>,
    <TextCustomFont>My Consultants</TextCustomFont>,
    <TextCustomFont>My Relief</TextCustomFont>,
  ];

  useEffect(() => {
    if (userInfo && !userInfo?.disclaimerAccepted) {
      setDisclaimerModalVisible(true);
    }
  }, [userInfo]);

  const handleDisclaimerModalClose = () => {
    acceptDisclaimer(currentUser);
    setDisclaimerModalVisible(false);
  };

  return (
    <>
      <DisclaimerModal
        disclaimerModalVisible={disclaimerModalVisible}
        handleClose={() => handleDisclaimerModalClose()}
      />
      <View style={Styles.container}>
        {userInfo && (
          <>
            <DashboardHeader
              styleProps={{ flex: 0.15 }}
              handleClick={(routeName) => navigation.navigate(routeName)}
              userInfo={userInfo}
            />
            <View
              style={{
                flexDirection: 'column',
                flex: 0.85,
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
    </>
  );
};

export default Dashboard;

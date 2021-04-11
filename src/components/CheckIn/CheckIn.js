import React, { useState, useEffect } from 'react';
import { List, ListItem, Button, Toast } from 'native-base';
import { Text, View, Alert } from 'react-native';
import { Center } from '../Center';
import { addCheckIn } from '../../api/CheckInsApi';
import { soundsListArray } from '../../utils';
import { cloneDeep } from 'lodash';
import { isEmpty } from 'lodash';
import { DB } from '../../config';
import Loading from '../Loading';
import { ScrollView } from 'react-native-gesture-handler';
import SoundList from './SoundList';
import CustomSlider from './SoundIntensitySlider';
import Styles from './CheckIn.styles';
import auth from '@react-native-firebase/auth';
import { NoDataAlert } from './NoDataAlert';

const CheckIn = ({ route, navigation }) => {
  const {
    params: { date, monthYearString },
  } = route;
  const [sounds, setSounds] = useState();
  const [sliderValues, setSliderValues] = useState({
    soundIntensity: 0,
    sleepHours: 0,
    stressLevel: 0,
  });
  const [loading, setLoading] = useState(true);
  const [checkedIn, setCheckedIn] = useState(false);

  const handleCheckIn = () => {
    try {
      const currentUser = auth().currentUser.uid;
      addCheckIn(
        getCheckedSounds(sounds),
        sliderValues,
        date,
        currentUser,
        monthYearString,
      ).then(() => {
        Toast.show({
          text: 'Check In Successful',
          buttonText: 'Okay',
          type: 'success',
        });
        navigation.navigate('My Calendar');
      });
    } catch (error) {
      console.error(error);
      Toast.show({
        text: 'Something went wrong..',
        buttonText: 'Okay',
        type: 'danger',
      });
    }
  };

  const getCheckIn = () => {
    const currentUser = auth().currentUser.uid;
    DB.ref(`/checkIns/${currentUser}/${monthYearString}/${date}`).on(
      'value',
      (querySnapshot) => {
        let soundsResponse = {};
        let slidersResponse = {};
        if (querySnapshot.val()) {
          soundsResponse = querySnapshot.child('sounds').val();
          slidersResponse = querySnapshot.child('sliderValues').val();
        }
        if (!isEmpty(soundsResponse) && !isEmpty(slidersResponse)) {
          setCheckedIn(true);
          setSliderValues({
            soundIntensity: slidersResponse.soundIntensity,
            sleepHours: slidersResponse.sleepHours,
            stressLevel: slidersResponse.stressLevel,
          });
          const soundArrayClone = cloneDeep(soundsListArray);
          soundArrayClone.map((sound) => {
            const checkedSound = soundsResponse.find(
              (element) => element === sound.name,
            );
            if (checkedSound) {
              sound.checked = true;
            }
            return sound;
          });
          setSounds(soundArrayClone);
        } else {
          setCheckedIn(false);
          setSounds(soundsListArray);
        }
      },
    );
  };

  const getCheckedSounds = (soundArray) => {
    const checkedSounds = soundArray.filter(
      (element) => element.checked === true,
    );
    const soundNames = checkedSounds.map((sound) => sound.name);
    return soundNames;
  };

  useEffect(() => {
    if (!sounds) {
      getCheckIn();
    }
    if (!isEmpty(sounds)) {
      setLoading(false);
    }
  }, [sounds, date]);
  return (
    <>
      {sounds && (
        <ScrollView>
          <View style={Styles.containerView}>
            <View>
              <List>
                <ListItem style={Styles.soundListContainer}>
                  <SoundList sounds={sounds} setSounds={setSounds} />
                </ListItem>
                <ListItem style={Styles.soundIntensitySliderContainer}>
                  <CustomSlider
                    sliderValue={sliderValues.soundIntensity}
                    setSliderValue={(value) =>
                      setSliderValues({
                        ...sliderValues,
                        soundIntensity: value,
                      })
                    }
                    headerText="What is the sound intensity level?"
                  />
                </ListItem>
                <ListItem style={Styles.soundIntensitySliderContainer}>
                  <CustomSlider
                    sliderValue={sliderValues.sleepHours}
                    setSliderValue={(value) =>
                      setSliderValues({
                        ...sliderValues,
                        sleepHours: value,
                      })
                    }
                    isHours
                    headerText="How much sleep did you get?"
                  />
                </ListItem>
                <ListItem style={Styles.soundIntensitySliderContainer}>
                  <CustomSlider
                    sliderValue={sliderValues.stressLevel}
                    setSliderValue={(value) =>
                      setSliderValues({
                        ...sliderValues,
                        stressLevel: value,
                      })
                    }
                    headerText="How is your stress level?"
                  />
                </ListItem>
                {!checkedIn && (
                  <Button
                    onPress={() =>
                      getCheckedSounds(sounds).length !== 0
                        ? handleCheckIn()
                        : NoDataAlert({ handleCheckIn })
                    }
                    style={{ backgroundColor: 'orchid' }}
                  >
                    <Center>
                      <Text style={{ color: 'white' }}>Check In!</Text>
                    </Center>
                  </Button>
                )}
              </List>
            </View>
          </View>
        </ScrollView>
      )}
      {loading && (
        <Center>
          <View>
            <Loading />
          </View>
        </Center>
      )}
    </>
  );
};

export default CheckIn;

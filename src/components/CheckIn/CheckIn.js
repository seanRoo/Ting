import React, {useState, useEffect} from 'react';
import {List, ListItem, Button, Toast} from 'native-base';
import {Text, View} from 'react-native';
import {Center} from '../Center';
import {addCheckIn} from '../../api/CheckInsApi';
import {soundsListArray} from '../../utils';
import Slider from '@react-native-community/slider';
import {isEmpty} from 'lodash';
import {DB} from '../../config';
import Loading from '../Loading';
import {ScrollView} from 'react-native-gesture-handler';
import SoundList from './SoundList';
import SoundIntensitySlider from './SoundIntensitySlider';
import Styles from './CheckIn.styles';
import auth from '@react-native-firebase/auth';

const CheckIn = ({route, navigation}) => {
  const {
    params: {
      date: {dateString},
    },
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
        Object.fromEntries(sounds),
        sliderValues,
        dateString,
        currentUser,
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
    DB.ref(`/checkIns/${currentUser}/${dateString}`).on(
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
          setSounds(new Map(Object.entries(soundsResponse)));
        } else {
          setCheckedIn(false);
          setSounds(new Map(Object.entries(soundsListArray)));
        }
      },
    );
  };

  useEffect(() => {
    if (!sounds) {
      getCheckIn();
    }
    if (!isEmpty(sounds)) {
      setLoading(false);
    }
  }, [sounds, dateString]);
  return (
    <>
      {sounds && (
        <ScrollView>
          <View style={Styles.containerView}>
            <View>
              {!checkedIn && (
                <List>
                  <ListItem style={Styles.soundListContainer}>
                    <SoundList sounds={sounds} setSounds={setSounds} />
                  </ListItem>
                  <ListItem style={Styles.soundIntensitySliderContainer}>
                    <SoundIntensitySlider
                      sliderValues={sliderValues}
                      setSliderValues={setSliderValues}
                    />
                  </ListItem>
                  <ListItem style={{height: 120, width: '100%'}}>
                    <View
                      style={{
                        width: '100%',
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          paddingBottom: 14,
                          alignSelf: 'center',
                        }}>
                        How much sleep did you get?
                      </Text>
                      <Center>
                        <Text>
                          {sliderValues.sleepHours}{' '}
                          <Text style={{fontWeight: 'bold'}}>Hours</Text>
                        </Text>
                        <Slider
                          style={{width: 300, height: 40}}
                          minimumValue={0}
                          maximumValue={12}
                          maximumTrackTintColor="#000000"
                          value={sliderValues.sleepHours}
                          step={0.5}
                          onValueChange={(value) =>
                            setSliderValues({
                              ...sliderValues,
                              sleepHours: value,
                            })
                          }
                          minimumTrackTintColor="black"
                          thumbTintColor="orchid"
                        />
                      </Center>
                    </View>
                  </ListItem>
                  <ListItem style={{height: 120, width: '100%'}}>
                    <View
                      style={{
                        width: '100%',
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          paddingBottom: 14,
                          alignSelf: 'center',
                        }}>
                        How is your stress level?
                      </Text>
                      <Center>
                        <Text>
                          {sliderValues.stressLevel} /
                          <Text style={{fontWeight: 'bold'}}> 10</Text>
                        </Text>
                        <Slider
                          style={{width: 300, height: 40}}
                          minimumValue={0}
                          maximumValue={10}
                          maximumTrackTintColor="#000000"
                          value={sliderValues.stressLevel}
                          step={0.5}
                          onValueChange={(value) =>
                            setSliderValues({
                              ...sliderValues,
                              stressLevel: value,
                            })
                          }
                          minimumTrackTintColor="black"
                          thumbTintColor="orchid"
                        />
                      </Center>
                    </View>
                  </ListItem>
                  {!checkedIn && (
                    <Button
                      onPress={handleCheckIn}
                      style={{backgroundColor: 'orchid'}}>
                      <Center>
                        <Text style={{color: 'white'}}>Check In!</Text>
                      </Center>
                    </Button>
                  )}
                </List>
              )}
              {checkedIn && (
                <View>
                  <Text>You are checked in</Text>
                </View>
              )}
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

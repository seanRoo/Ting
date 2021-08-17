import React, { useState } from 'react';
import { Button, Toast } from 'native-base';
import { Text, View, FlatList } from 'react-native';
import { Center } from '../Center';
import { addCheckIn } from '../../api/CheckInsApi';
import CustomSlider from './SoundIntensitySlider';
import Styles from './CheckIn.styles';
import auth from '@react-native-firebase/auth';

const CheckIn = ({ route, navigation }) => {
  const {
    params: { date, monthYearString },
  } = route;
  const [sounds, setSounds] = useState();
  const [sliderValues, setSliderValues] = useState({
    soundIntensity: 0,
    sleepHours: 0,
    stressLevel: 0,
    mood: 0,
    soundPitch: 0,
  });
  const [loading, setLoading] = useState(true);
  const [checkedIn, setCheckedIn] = useState(false);

  const handleCheckIn = () => {
    try {
      const currentUser = auth().currentUser.uid;
      addCheckIn(sliderValues, date, currentUser, monthYearString).then(() => {
        Toast.show({
          text: 'Check In Successful',
          buttonText: 'Okay',
          type: 'success',
        });
        navigation.navigate('Dashboard');
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

  const Item = ({ title, subtitle, stateName }) => {
    return (
      <View style={{ marginBottom: 16 }}>
        <CustomSlider
          sliderValue={sliderValues[stateName]}
          setSliderValue={(value) =>
            setSliderValues({
              ...sliderValues,
              [stateName]: value,
            })
          }
          subtitle={subtitle}
          title={title}
        />
      </View>
    );
  };
  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      subtitle={item.subtitle}
      stateName={item.stateName}
    />
  );

  return (
    <View style={Styles.containerView}>
      <FlatList
        data={[
          {
            title: 'Sound Intensity',
            stateName: 'soundIntensity',
            subtitle: 'Intensity of sound you hear',
          },
          {
            title: 'Stress Level',
            stateName: 'stressLevel',
            subtitle: 'Level of stress you are feeling today',
          },
          {
            title: 'Sound Pitch',
            stateName: 'soundPitch',
            subtitle: 'Level of sound pitch you hear',
          },
          {
            title: 'Sleep',
            stateName: 'sleepHours',
            subtitle: 'Hours of sleep you got',
          },
          {
            title: 'Mood',
            stateName: 'mood',
            subtitle: 'General level of happiness',
          },
        ]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{ flex: 0.8 }}
      />
      {!checkedIn && (
        <Button
          onPress={handleCheckIn}
          style={{ backgroundColor: 'orchid', flex: 0.05 }}
        >
          <Center>
            <Text style={{ color: 'white' }}>Check In!</Text>
          </Center>
        </Button>
      )}
    </View>
  );
};

export default CheckIn;

import React from 'react';
import { View, Text } from 'react-native';
import Circle from 'react-native-progress/Circle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import ProgressBar from './ProgressBar';

const OverallScoreArea = ({
  numEntries,
  scoreArray: [
    soundIntensityScore,
    soundPitchScore,
    sleepScore,
    moodScore,
    stressScore,
  ],
  showPicker,
  monthPickerValue,
  ...styleProps
}) => {
  const overallScore =
    (moodScore + sleepScore - (soundIntensityScore + stressScore) * 0.2) / 200;

  const getCircleColour = () => {
    const scoreWhole = overallScore * 100;
    return scoreWhole <= 30
      ? 'rgba(255,0,0,.6)'
      : scoreWhole > 30 && scoreWhole < 70
      ? 'gold'
      : 'green';
  };
  return (
    <View {...styleProps}>
      <View
        style={{
          paddingLeft: 10,
          flex: 0.15,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'column' }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Overall score this month
          </Text>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          flex: 0.85,
        }}
      >
        <Circle
          size={145}
          showsText
          textStyle={{ fontSize: 36, fontWeight: 'bold' }}
          progress={overallScore || 0}
          borderWidth={1}
          color={getCircleColour()}
          borderColor="grey"
          thickness={6}
          animated={false}
          style={{ marginRight: 10 }}
        />
        <View
          style={{
            flexDirection: 'column',
            height: '98%',
            justifyContent: 'space-between',
          }}
        >
          <ProgressBar
            progress={soundIntensityScore / 10}
            label="Sound Intensity"
            icon={<Ionicons size={14} name="ear-outline" />}
          />
          <ProgressBar
            progress={soundPitchScore / 10}
            label="Sound Pitch"
            icon={<Ionicons size={14} name="ear-outline" />}
          />
          <ProgressBar
            progress={sleepScore / 10}
            label="Sleep"
            icon={<MaterialCommunityIcons size={16} name="bed-outline" />}
          />
          <ProgressBar
            progress={moodScore / 10}
            label="Mood"
            icon={<SimpleLineIcons size={14} name="emotsmile" />}
          />
          <ProgressBar
            progress={stressScore / 10}
            label="Stress Level"
            icon={<MaterialCommunityIcons size={16} name="brain" />}
          />
        </View>
      </View>
    </View>
  );
};

export default OverallScoreArea;

import React from 'react';
import { View, Text } from 'react-native';
import Circle from 'react-native-progress/Circle';
import Bar from 'react-native-progress/Bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DateSelect from './DateSelect';
import ProgressBar from './ProgressBar';

const OverallScoreArea = ({
  numEntries,
  scoreArray: [moodScore, sleepScore, stressScore, soundIntensityScore],
  showPicker,
  monthPickerValue,
  ...styleProps
}) => {
  const overallScore =
    (moodScore + sleepScore + stressScore + soundIntensityScore) / 400;

  const getCircleColour = () => {
    const scoreWhole = overallScore * 100;
    return scoreWhole <= 35
      ? 'red'
      : scoreWhole > 35 && scoreWhole < 70
      ? 'gold'
      : 'green';
    //return circleColour;
  };

  return (
    <View {...styleProps}>
      <View
        style={{
          paddingLeft: 10,
          flex: 0.25,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'column' }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
            }}
          >
            Overall score
          </Text>
          {/* <Text
            style={{
              fontSize: 16,
              color: '#1c98e6',
              letterSpacing: 0.5,
              fontWeight: 'bold',
            }}
          >
            From <Text>{numEntries}</Text> data entries
          </Text> */}
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          flex: 0.7,
        }}
      >
        <Circle
          size={140}
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
            height: 160,
            justifyContent: 'space-between',
          }}
        >
          <ProgressBar
            progress={soundIntensityScore / 10}
            label="Sound Intensity"
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

import { Share } from 'react-native';

export const monthsArray = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const countOccurrences = (array) => {
  const countArray = array.reduce((acc, curr) => {
    if (typeof acc[curr] === 'undefined') {
      acc[curr] = 1;
    } else {
      acc[curr] += 1;
    }
    return acc;
  }, {});
  return countArray;
};

export const transformCountArray = (countArray) => {
  const transformedArray = [];
  for (const [key, val] of Object.entries(countArray)) {
    transformedArray.push({
      name: key,
      percentage: (Math.floor(val) / 15) * 100,
      legendFontColor: 'black',
      legendFontSize: 15,
      color:
        '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
    });
  }
  transformedArray.sort((a, b) => (a.name > b.name ? 1 : -1));
  return transformedArray;
};

export const charts = [
  {
    text: 'Sounds',
    value: 'sounds',
  },
  {
    text: 'Sleep & Stress',
    value: 'sleepAndStress',
  },
  {
    text: 'Mood',
    value: 'mood',
  },
];

export const sortData = (data) => {
  const sortedKeys = Object.keys(data).sort();
  const sortedData = sortedKeys.map((element, index) => {
    return data[sortedKeys[index]];
  });
  return sortedData;
};

export const transformDataSets = (sliderData) => [
  {
    name: 'Sleep',
    data: sliderData.sleepData,
    color: 'green',
    toggled: false,
    disabled: !sliderData.sleepData.length,
  },
  {
    name: 'Sound Intensity',
    data: sliderData.soundIntensityData,
    color: 'purple',
    toggled: false,
    width: 130,
    disabled: !sliderData.soundIntensityData.length,
  },
  {
    name: 'Sound Pitch',
    data: sliderData.soundPitchData,
    color: 'pink',
    toggled: false,
    width: 120,
    disabled: !sliderData.soundPitchData.length,
  },
  {
    name: 'Mood',
    data: sliderData.moodData,
    color: 'blue',
    toggled: false,
    disabled: !sliderData.moodData.length,
  },
  {
    name: 'Stress',
    data: sliderData.stressLevelData,
    color: 'red',
    toggled: false,
    disabled: !sliderData.stressLevelData.length,
  },
];

export const onShare = async () => {
  try {
    const result = await Share.share({
      message:
        'React Native | A framework for building native apps using React',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

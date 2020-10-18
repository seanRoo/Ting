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

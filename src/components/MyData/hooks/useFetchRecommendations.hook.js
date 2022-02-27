import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { fetchRecommendations } from '../../../api/RecommendationsApi';
import { sleepEntries, stressEntries } from '../MyData.utils';

const initialChipState = {
  sleep: sleepEntries.map((element) => ({
    label: element,
    selected: false,
    attempted: false,
    id: uuid(),
    category: 'sleep',
  })),
  stress: stressEntries.map((element) => ({
    label: element,
    selected: false,
    attempted: false,
    id: uuid(),
    category: 'stress',
  })),
};

const useFetchRecommendations = ({ currentUser, monthPickerValue }) => {
  const [chips, setChips] = useState(null);

  const handleUpdateChips = (newChips) => {
    if (newChips) {
      setChips(newChips);
    } else {
      setChips(initialChipState);
    }
  };

  useEffect(() => {
    if (!chips) {
      fetchRecommendations(
        currentUser,
        handleUpdateChips,
        new Date(monthPickerValue),
      );
    }
  }, [monthPickerValue, chips]);

  return { chips, setChips };
};

export default useFetchRecommendations;

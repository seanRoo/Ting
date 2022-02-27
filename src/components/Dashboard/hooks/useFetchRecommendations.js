import { useEffect, useState } from 'react';
import { fetchRecommendations } from '../../../api/RecommendationsApi';

const useFetchRecommendations = ({ currentUser, date }) => {
  const [recommendations, setRecommendations] = useState(null);
  const [recommendationsLoaded, setRecommendationsLoaded] = useState(false);

  const callback = (data) => {
    setRecommendations(data);
    setRecommendationsLoaded(true);
  };

  useEffect(() => {
    fetchRecommendations(currentUser, callback, date);
  }, []);

  return { recommendations, recommendationsLoaded };
};

export default useFetchRecommendations;

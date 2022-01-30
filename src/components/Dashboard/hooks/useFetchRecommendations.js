import { useEffect, useState } from 'react';
import { fetchRecommendations } from '../../../api/RecommendationsApi';

const useFetchRecommendations = ({ currentUser, date }) => {
  const [recommendations, setRecommendations] = useState(null);
  useEffect(() => {
    fetchRecommendations(currentUser, setRecommendations, date);
  }, []);
  console.log(recommendations);

  return { recommendations };
};

export default useFetchRecommendations;

import { useEffect, useState } from 'react';

export const useHasImprovedFromLastMonth = ({
  scoreArray,
  lastMonthScoreArray,
  highValueIsGood,
  filterIndex,
}) => {
  const [hasImprovedFromLastMonth, setHasImprovedFromLastMonth] =
    useState(false);

  useEffect(() => {
    if (highValueIsGood) {
      setHasImprovedFromLastMonth(
        lastMonthScoreArray?.[filterIndex] &&
          lastMonthScoreArray?.[filterIndex] - scoreArray?.[filterIndex] < 0,
      );
    } else {
      setHasImprovedFromLastMonth(
        lastMonthScoreArray?.[filterIndex] &&
          lastMonthScoreArray?.[filterIndex] - scoreArray?.[filterIndex] >= 0,
      );
    }
  }, [filterIndex]);

  return hasImprovedFromLastMonth;
};

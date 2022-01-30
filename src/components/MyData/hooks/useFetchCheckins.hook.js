import { useEffect, useState } from 'react';
import { DB } from '../../../config';
import { getPreviousMonthYearString } from '../../../utils';

export const useFetchCheckins = ({
  currentUser,
  monthPickerValue,
  pickerYear,
}) => {
  const [checkins, setCheckins] = useState(null);
  const [lastMonthCheckins, setLastMonthCheckins] = useState(null);
  const [checkinsLoaded, setCheckinsLoaded] = useState(false);

  useEffect(() => {
    setCheckinsLoaded(false);
    try {
      DB.ref(`/checkIns/${currentUser}/${monthPickerValue.getFullYear()}/`).on(
        'value',
        (querySnapshot) => {
          if (querySnapshot.val()) {
            let dataArray = [];
            for (var key in querySnapshot.val()) {
              if (querySnapshot.val()[key]) {
                dataArray.push({ [key]: querySnapshot.val()[key] });
              }
            }
            setCheckins(dataArray);
          }
        },
      );
      if (monthPickerValue.getMonth() === 0) {
        DB.ref(
          `/checkIns/${currentUser}/${
            monthPickerValue.getFullYear() - 1
          }/${getPreviousMonthYearString(monthPickerValue)}`,
        ).on('value', (querySnapshot) => {
          if (querySnapshot.val()) {
            setLastMonthCheckins([
              {
                [getPreviousMonthYearString(monthPickerValue)]:
                  querySnapshot.val(),
              },
            ]);
            setCheckinsLoaded(true);
          } else {
            setLastMonthCheckins(null);
          }
        });
      } else {
        setLastMonthCheckins(null);
        setCheckinsLoaded(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, [pickerYear]);

  return { checkins, checkinsLoaded, lastMonthCheckins };
};

import { Alert } from 'react-native';

export const NoDataAlert = ({ handleCheckIn }) =>
  Alert.alert(
    'Empty fields',
    'You have left some fields blank, are you sure want to submit this check-in?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Check-In',
        onPress: () => handleCheckIn(),
      },
    ],
  );

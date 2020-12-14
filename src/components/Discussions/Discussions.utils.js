import { DateTime } from 'luxon';

export const getInitials = ({ firstName, lastName }) => {
  if (firstName && lastName) {
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
    return initials;
  }
  return null;
};

export const formatFooterDate = (dateValue) => {
  return DateTime.fromJSDate(new Date(dateValue)).toLocaleString(
    DateTime.DATETIME_MED,
  );
};

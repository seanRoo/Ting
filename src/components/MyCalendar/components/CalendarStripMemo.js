import React from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import MyCalendarStyles from '../MyCalendar.styles';

const CalendarStripMemo = ({
  handleDateUpdate,
  selectedDate,
  handleCheckedInDatesStyle,
  handleWeekChange,
}) => {
  const today = new Date();
  return (
    <>
      {selectedDate && (
        <CalendarStrip
          style={MyCalendarStyles.calendarStrip}
          calendarHeaderStyle={MyCalendarStyles.calendarHeaderStyle}
          dateNumberStyle={MyCalendarStyles.dateNumberStyle}
          dateNameStyle={MyCalendarStyles.nonHighlightedText}
          highlightDateNumberStyle={MyCalendarStyles.highlightedText}
          highlightDateNameStyle={MyCalendarStyles.highlightedText}
          highlightDateContainerStyle={
            MyCalendarStyles.highlightedDateContainer
          }
          onDateSelected={(date) => handleDateUpdate(new Date(date))}
          selectedDate={selectedDate}
          maxDate={today}
          customDatesStyles={handleCheckedInDatesStyle}
          onWeekChanged={(start, end) => {
            handleWeekChange(start, end);
          }}
        />
      )}
    </>
  );
};

export default CalendarStripMemo;

import { ScaledSheet } from 'react-native-size-matters';

const MyCalendarStyles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 30,
  },
  highlightedDateContainer: {
    borderColor: 'orchid',
    borderWidth: 1,
  },
  highlightedText: {
    color: 'orchid',
  },
  nonHighlightedText: {
    color: 'black',
    //fontSize: 12,
  },
  calendarStrip: {
    height: '80@s',
    paddingTop: 15,
    paddingBottom: 10,
    fontFamily: 'Roboto',
  },
  dateNumberStyle: {
    fontSize: 13,
    color: 'black',
  },
  calendarHeaderStyle: {
    marginBottom: 10,
    color: 'black',
  },
  dataViewContainer: {
    borderWidth: 0.5,
    borderRadius: 30,
    borderColor: 'orchid',
    flex: 1,
  },
  scrollViewContainer: {
    marginLeft: '15@s',
    marginTop: '15@s',
    marginBottom: '10@s',
  },
  iconContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 0.2,
  },
  progressBarContainer: { flex: 0.75 },
  progressBarMinValueLabel: { fontSize: 14, flex: 0.5, color: 'gray' },
  progressBarMaxValueLabel: {
    fontSize: 14,
    textAlign: 'right',
    flex: 0.5,
    color: 'gray',
  },
  progressBarHeadingTitle: { fontSize: '14@s' },
  progressBarProgressLabel: { fontWeight: 'bold' },
  dataViewTitle: { fontSize: '16@s', color: 'orchid', marginBottom: '8@s' },
  dataRowContainer: {
    flexDirection: 'row',
    flex: 1,
  },
});

export default MyCalendarStyles;

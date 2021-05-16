import { ScaledSheet } from 'react-native-size-matters';

const MyCalendarStyles = ScaledSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  highlightedDateContainer: {
    borderColor: 'orchid',
    borderRadius: 10,
    borderWidth: 1,
  },
  highlightedText: {
    color: 'orchid',
  },
  nonHighlightedText: {
    color: 'black',
  },
  calendarStrip: {
    height: '100@s',
    paddingTop: 15,
    paddingBottom: 10,
  },
  dataViewContainer: {
    borderWidth: 0.5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderColor: 'black',
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
  progressBarHeadingTitle: { fontSize: '16@s' },
  progressBarProgressLabel: { fontWeight: 'bold' },
  dataViewTitle: { fontSize: '16@s', color: 'orchid', marginBottom: '8@s' },
  dataRowContainer: {
    flexDirection: 'row',
    flex: 1,
  },
});

export default MyCalendarStyles;

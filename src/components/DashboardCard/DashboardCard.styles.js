import React from 'react';
import {StyleSheet} from 'react-native';

const DashboardCardStyles = StyleSheet.create({
  container: {
    padding: 5,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  bodyText: {fontSize: 20},
  bold: {fontWeight: 'bold'},
  footer: {
    paddingRight: 0,
    height: 55,
  },
  goToButton: {
    alignSelf: 'flex-end',
  },
  buttonText: {
    padding: 5,
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 12,
    paddingRight: 0,
  },
  buttonIcon: {
    fontSize: 18,
    color: 'black',
  },
  cardBody: {paddingLeft: 5, paddingRight: 5},
});

export default DashboardCardStyles;

import React from 'react';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export const tabStyles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  circleTab: {
    position: 'absolute',
    left: 145,
    right: 0,
    bottom: 20,
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    textAlign: 'center',
    paddingTop: 15,
  },
  tabTextCircle: {
    textAlign: 'center',
    paddingTop: 15,
  },
  textCircle: {
    position: 'absolute',
    bottom: 50,
    paddingTop: 20,
  },
});

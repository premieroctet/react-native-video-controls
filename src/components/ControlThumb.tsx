import { StyleSheet, View } from 'react-native';
import React from 'react';
import type { ControlThumbProps } from './types';

const ControlThumb = ({ color = '#fff' }: ControlThumbProps) => {
  return <View style={[styles.thumb, { backgroundColor: color }]} />;
};

export default ControlThumb;

const styles = StyleSheet.create({
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 99999,
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});

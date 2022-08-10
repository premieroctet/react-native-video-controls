import React from 'react';
import type { ComponentProps, ComponentKey } from './types';
import ControlThumb from './ControlThumb';
import type { SharedValue } from 'react-native-reanimated';
import { StyleSheet, Text, View } from 'react-native';
import CurrentTime from './CurrentTime';
import { formatTime } from '../utils/time';

type PartialComponentProps = {
  [K in ComponentKey]: Partial<ComponentProps[K]>;
};

const defaultRenderCurrentTime = (currentTime: SharedValue<number>) => {
  return (
    <View style={styles.currentTimeContainer}>
      <CurrentTime time={currentTime} />
    </View>
  );
};

const defaultRenderDuration = (duration: number) => {
  return (
    <View style={styles.totalDurationContainer}>
      <Text style={styles.totalDurationText}>{formatTime(duration)}</Text>
    </View>
  );
};

export const defaultProps: PartialComponentProps = {
  slider: {
    activeColor: 'white',
    inactiveColor: '#aaa',
    playableColor: '#ccc',
    thumb: <ControlThumb color="white" />,
    renderTotalDuration: defaultRenderDuration,
    renderCurrentTime: defaultRenderCurrentTime,
  },
  videoState: {},
};

const styles = StyleSheet.create({
  currentTimeContainer: {
    marginRight: 10,
    width: 35,
  },
  totalDurationContainer: {
    marginLeft: 10,
  },
  totalDurationText: {
    fontSize: 14,
    color: 'white',
  },
});

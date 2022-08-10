import React, { useState } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import useLongPressGesture from '../hooks/useLongPressGesture';
import useTapGesture from '../hooks/useTapGesture';
import type { ControlTouchableProps } from './types';

const ControlTouchable = ({
  maxDuration,
  numberOfTaps,
  onPress,
  children,
}: ControlTouchableProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const gesture = useTapGesture({
    numberOfTaps,
    maxTapDuration: maxDuration,
    onBegin: () => {
      'worklet';
      runOnJS(setIsPressed)(true);
    },
    onTouchesUp: () => {
      'worklet';
      runOnJS(setIsPressed)(false);
    },
    onEnd: () => {
      'worklet';
      if (onPress) {
        runOnJS(onPress)();
      }
    },
  });
  const longPressGesture = useLongPressGesture({
    onBegin: () => {
      'worklet';
      runOnJS(setIsPressed)(true);
    },
    onEnd: () => {
      'worklet';
      runOnJS(setIsPressed)(false);
      if (onPress) {
        runOnJS(onPress)();
      }
    },
    onTouchesCancelled: () => {
      'worklet';
      runOnJS(setIsPressed)(false);
    },
  });

  return (
    <GestureDetector gesture={Gesture.Exclusive(gesture, longPressGesture)}>
      {typeof children === 'function'
        ? children({ pressed: isPressed })
        : children}
    </GestureDetector>
  );
};

export default ControlTouchable;

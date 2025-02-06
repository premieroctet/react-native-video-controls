import ReText from './ReText';
import { SharedValue, useDerivedValue } from 'react-native-reanimated';
import React from 'react';
import type { StyleProp, TextStyle } from 'react-native';

type Props = {
  time: SharedValue<number>;
  style?: StyleProp<TextStyle>;
};

const CurrentTime = ({ time, style }: Props) => {
  const text = useDerivedValue(() => {
    const timeInSeconds = time.value;
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  });

  return (
    <ReText
      accessible
      text={text}
      style={[{ color: 'white', fontSize: 14 }, style]}
    />
  );
};

export default CurrentTime;

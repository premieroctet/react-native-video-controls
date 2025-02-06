import React from 'react';
import { View } from 'react-native';
import { useControlsVisibility } from '../context/ControlsVisibility';
import ControlTouchable from './ControlTouchable';
import type { ControlFullScreenProps } from './types';

const ControlFullScreen = ({
  components,
  isFullScreen,
  onToggleFullScreen,
}: ControlFullScreenProps) => {
  const { exitFullscreen: ExitFullScreen, fullscreen: FullScreen } = components;
  const { resetVisibilityTimer } = useControlsVisibility();

  return (
    <ControlTouchable
      onPress={() => {
        onToggleFullScreen();
        resetVisibilityTimer();
      }}
    >
      <View
        accessible
        accessibilityLabel="Toggle fullscreen"
        accessibilityRole="button"
      >
        {isFullScreen ? <ExitFullScreen /> : <FullScreen />}
      </View>
    </ControlTouchable>
  );
};

export default ControlFullScreen;

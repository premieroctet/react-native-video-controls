import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import ControlTouchable from './ControlTouchable';
import useControlsVideoState from '../hooks/useControlsVideoState';
import type { ControlVideoStateProps } from './types';

const ControlVideoState = ({
  components,
  onPause,
  onPlay,
  onForward,
  onRewind,
  isPlaying,
  spacing = 15,
}: ControlVideoStateProps) => {
  const { setPressedButton, ...stateMethods } = useControlsVideoState({
    onPause,
    onPlay,
    onForward,
    onRewind,
  });
  const {
    play: PlayElement,
    pause: PauseElement,
    forward: ForwardElement,
    rewind: RewindElement,
  } = components;

  const containerStyle = useMemo(() => {
    switch (spacing) {
      case 'space-around':
      case 'space-between':
        return {
          width: '100%',
          justifyContent: spacing,
        };
      default:
        return {};
    }
  }, [spacing]);

  const itemSpacingStyle = useMemo(() => {
    switch (spacing) {
      case 'space-around':
      case 'space-between':
        return {
          marginRight: 0,
        };
      default:
        return {};
    }
  }, [spacing]);

  return (
    <View style={[styles.container, containerStyle]}>
      {!!RewindElement && (
        <ControlTouchable onPress={stateMethods.onRewind}>
          {({ pressed }) => {
            setPressedButton('rewind', pressed);
            return (
              <View
                accessible
                accessibilityLabel="Rewind"
                accessibilityRole="button"
                style={[styles.item, itemSpacingStyle]}
              >
                <RewindElement isPressed={pressed} />
              </View>
            );
          }}
        </ControlTouchable>
      )}
      {!isPlaying && !!PlayElement && (
        <ControlTouchable onPress={stateMethods.onPlay}>
          {({ pressed }) => {
            setPressedButton('play', pressed);
            return (
              <View
                accessible
                accessibilityLabel="Play"
                accessibilityRole="button"
                style={[styles.item, itemSpacingStyle]}
              >
                <PlayElement isPressed={pressed} />
              </View>
            );
          }}
        </ControlTouchable>
      )}
      {isPlaying && !!PauseElement && (
        <ControlTouchable onPress={stateMethods.onPause}>
          {({ pressed }) => {
            setPressedButton('pause', pressed);
            return (
              <View
                accessible
                accessibilityLabel="Pause"
                accessibilityRole="button"
                style={[styles.item, itemSpacingStyle]}
              >
                <PauseElement isPressed={pressed} />
              </View>
            );
          }}
        </ControlTouchable>
      )}
      {!!ForwardElement && (
        <ControlTouchable onPress={stateMethods.onForward}>
          {({ pressed }) => {
            setPressedButton('forward', pressed);
            return (
              <View
                accessible
                accessibilityLabel="Forward"
                accessibilityRole="button"
                style={[styles.item, itemSpacingStyle]}
              >
                <ForwardElement isPressed={pressed} />
              </View>
            );
          }}
        </ControlTouchable>
      )}
    </View>
  );
};

export default ControlVideoState;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    marginRight: 15,
  },
});

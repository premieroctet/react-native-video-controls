import React, { forwardRef, useImperativeHandle } from 'react';
import {
  AccessibilityActionEvent,
  LayoutRectangle,
  StyleSheet,
  View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import useControlSlider from '../hooks/useControlSlider';
import useControlThumb from '../hooks/useControlThumb';
import useLayout from '../hooks/useLayout';
import type { ControlSliderMethods, ControlSliderProps } from './types';
import { formatTime } from '../utils/time';

export const ControlSlider = forwardRef<
  ControlSliderMethods,
  ControlSliderProps
>(
  (
    {
      totalDuration,
      activeColor,
      inactiveColor,
      thumb,
      onSeek,
      renderTotalDuration,
      renderCurrentTime,
      sliderStyle,
      playableColor,
      fullScreenElement,
      sliderContainerStyle,
      radius,
      timeSharedValue,
      thumbSharedValue,
      thumbSimultaneousGestures = [],
      onSliderLayout,
      thumbHitSlop = 20,
    }: ControlSliderProps,
    ref
  ) => {
    const [layout, onLayout] = useLayout();
    const [, onThumbLayout] = useLayout();
    const thumbLayoutShared = useSharedValue<LayoutRectangle>({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });
    const layoutShared = useSharedValue<LayoutRectangle>({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });
    const {
      setCurrentTime,
      timeValue,
      setPlayableTime,
      activeViewStyle,
      playableTimeStyle,
    } = useControlSlider({
      progressLayout: layout,
      totalDuration,
      timeSharedValue,
    });
    const { thumbGestureHandler, thumbValue, updateThumbFromTime } =
      useControlThumb({
        totalDuration,
        progressLayout: layout,
        onGestureEnd: (time) => {
          onSeek?.(time);
        },
        thumbSharedValue,
        hitSlop: thumbHitSlop,
        timeSharedValue: timeValue,
      });

    useImperativeHandle(ref, () => ({
      setCurrentTime: (time) => {
        setCurrentTime(time);
        updateThumbFromTime(time);
      },
      setPlayableTime: (time) => {
        setPlayableTime(time);
      },
    }));

    const thumbStyle = useAnimatedStyle(() => {
      const thumbX = thumbValue.value;
      const thumbHeight = thumbLayoutShared.value?.height ?? 0;
      const thumbWidth = thumbLayoutShared.value?.width ?? 0;
      const layoutHeight = layoutShared.value?.height ?? 0;

      return {
        transform: [
          {
            translateX: thumbX - thumbWidth / 2,
          },
          {
            translateY: -thumbHeight / 2 + layoutHeight / 2,
          },
        ],
        opacity: layout ? 1 : 0,
      };
    });

    const onAccessibilityAction = (evt: AccessibilityActionEvent) => {
      const actionName = evt.nativeEvent.actionName;

      switch (actionName) {
        case 'increment': {
          onSeek?.(Math.min(totalDuration, timeValue.value + 5));
          break;
        }
        case 'decrement': {
          onSeek?.(Math.max(0, timeValue.value - 5));
          break;
        }
      }
    };

    return (
      <View style={[styles.container, sliderContainerStyle]}>
        {renderCurrentTime?.(timeValue)}
        <View
          style={[styles.slider, sliderStyle, { borderRadius: radius }]}
          onLayout={(event) => {
            onLayout(event);
            onSliderLayout?.(event);
            layoutShared.value = event.nativeEvent.layout;
          }}
          accessibilityLabel="Control slider"
          accessible
          accessibilityValue={{
            min: 0,
            max: totalDuration,
            now: timeValue.value,
            text: `${timeValue.value} seconds`,
          }}
          accessibilityActions={[
            {
              name: 'increment',
              label: 'Increment',
            },
            {
              name: 'decrement',
              label: 'Decrement',
            },
          ]}
          onAccessibilityAction={onAccessibilityAction}
          accessibilityRole="adjustable"
        >
          <Animated.View
            style={[
              styles.playable,
              playableTimeStyle,
              { backgroundColor: playableColor, borderRadius: radius },
            ]}
          />
          <Animated.View
            style={[
              activeViewStyle,
              { backgroundColor: activeColor, borderRadius: radius },
            ]}
          />
          <View
            style={[
              styles.inactive,
              { backgroundColor: inactiveColor, borderRadius: radius },
            ]}
          />
          <View style={styles.thumbContainer}>
            <GestureDetector
              gesture={Gesture.Simultaneous(
                thumbGestureHandler,
                ...thumbSimultaneousGestures
              )}
            >
              <Animated.View
                accessible={true}
                accessibilityLabel="Video slider thumb"
                accessibilityValue={{
                  min: 0,
                  max: totalDuration,
                  text: `${timeValue.value}s of ${formatTime(totalDuration)}s`,
                }}
                accessibilityHint="Drag left or right to adjust the current time"
                accessibilityActions={[
                  {
                    name: 'increment',
                    label: 'Increment',
                  },
                  {
                    name: 'decrement',
                    label: 'Decrement',
                  },
                ]}
                accessibilityRole="adjustable"
                onAccessibilityAction={onAccessibilityAction}
                style={thumbStyle}
                onLayout={(evt) => {
                  onThumbLayout(evt);
                  thumbLayoutShared.value = evt.nativeEvent.layout;
                }}
                hitSlop={
                  typeof thumbHitSlop === 'number'
                    ? {
                        top: thumbHitSlop,
                        bottom: thumbHitSlop,
                        left: thumbHitSlop,
                        right: thumbHitSlop,
                      }
                    : thumbHitSlop
                }
              >
                {thumb}
              </Animated.View>
            </GestureDetector>
          </View>
        </View>
        {renderTotalDuration?.(totalDuration)}
        {!!fullScreenElement && (
          <View style={styles.fullScreen}>{fullScreenElement}</View>
        )}
      </View>
    );
  }
);

export default ControlSlider;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 5,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    height: 5,
    flexDirection: 'row',
  },
  time: {
    marginLeft: 10,
  },
  thumbContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    zIndex: 999,
  },
  inactive: {
    flex: 1,
    zIndex: 1,
  },
  playable: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,
  },
  fullScreen: {
    marginLeft: 10,
  },
});

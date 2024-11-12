import { useEffect, useRef } from 'react';
import type { Insets, LayoutRectangle } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import {
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';
import { useControlsVisibility } from '../context/ControlsVisibility';

export type UseControlThumbParams = {
  progressLayout: LayoutRectangle | null;
  onGestureEnd: (timeForThumb: number) => void;
  totalDuration: number;
  thumbSharedValue?: SharedValue<number>;
  hitSlop?: number | Insets;
  timeSharedValue: SharedValue<number>;
};

const useControlThumb = ({
  progressLayout,
  onGestureEnd,
  totalDuration,
  thumbSharedValue,
  hitSlop = 20,
  timeSharedValue,
}: UseControlThumbParams) => {
  const thumbValue = useSharedValue(0);
  const gestureOffset = useSharedValue(0);
  const gestureIsRunning = useSharedValue(false);
  const canUpdateThumbFromTime = useRef(true);
  const { resetVisibilityTimer, startTimer, stopTimer } =
    useControlsVisibility();

  const setCanUpdateFromTime = (canUpdate: boolean) => {
    canUpdateThumbFromTime.current = canUpdate;
  };

  const thumbGestureHandler = Gesture.Pan()
    .onBegin(() => {
      'worklet';
      runOnJS(setCanUpdateFromTime)(false);
      runOnJS(stopTimer)();
      gestureIsRunning.value = true;
    })
    .onEnd(() => {
      'worklet';
      runOnJS(setCanUpdateFromTime)(true);
      const layoutWidth = progressLayout?.width ?? 0;
      const timeForThumb = totalDuration * (thumbValue.value / layoutWidth);
      gestureIsRunning.value = false;
      runOnJS(onGestureEnd)(timeForThumb);
    })
    .onFinalize(() => {
      'worklet';
      runOnJS(setCanUpdateFromTime)(true);
      runOnJS(startTimer)();
    })
    .onChange((event) => {
      'worklet';
      runOnJS(resetVisibilityTimer)();
      const layoutWidth = progressLayout?.width ?? 0;
      const x = event.translationX + gestureOffset.value;
      const thumbX = x;
      if (thumbX < 0) {
        thumbValue.value = 0;
      } else if (thumbX > layoutWidth) {
        thumbValue.value = layoutWidth;
      } else {
        thumbValue.value = thumbX;
      }
    })
    .hitSlop(hitSlop);

  const updateThumbFromTime = (time: number) => {
    const currentTime = time;
    if (canUpdateThumbFromTime.current) {
      thumbValue.value =
        totalDuration && progressLayout?.width
          ? (currentTime / totalDuration) * progressLayout.width
          : 0;
    }
  };

  useEffect(() => {
    if (progressLayout) {
      thumbValue.value =
        totalDuration && progressLayout?.width
          ? (timeSharedValue.value / totalDuration) * progressLayout.width
          : 0;
    }
  }, [progressLayout]);

  useAnimatedReaction(
    () => thumbValue.value,
    () => {
      if (!gestureIsRunning.value) {
        gestureOffset.value = thumbValue.value;
      }
      if (thumbSharedValue) {
        thumbSharedValue.value = thumbValue.value;
      }
    }
  );

  return {
    thumbGestureHandler,
    thumbValue,
    updateThumbFromTime,
  };
};

export default useControlThumb;

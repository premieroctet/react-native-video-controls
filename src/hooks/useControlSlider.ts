import type { LayoutRectangle } from 'react-native';
import {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

export type UseControlSliderParams = {
  progressLayout: LayoutRectangle | null;
  totalDuration: number;
  timeSharedValue?: SharedValue<number>;
};

const useControlSlider = ({
  totalDuration,
  progressLayout,
  timeSharedValue,
}: UseControlSliderParams) => {
  const timeValue = useSharedValue(0);
  const playableTimeValue = useSharedValue(0);

  const setCurrentTime = (time: number) => {
    if (timeSharedValue) {
      timeSharedValue.value = time;
    }
    timeValue.value = time;
  };

  const setPlayableTime = (time: number) => {
    playableTimeValue.value = time;
  };

  const activeViewStyle = useAnimatedStyle(() => {
    const layoutWidth = progressLayout?.width ?? 0;

    return {
      width: totalDuration
        ? (timeValue.value / totalDuration) * layoutWidth
        : 0,
      zIndex: 3,
    };
  }, [progressLayout, timeValue, totalDuration]);

  const playableTimeStyle = useAnimatedStyle(() => {
    const layoutWidth = progressLayout?.width ?? 0;

    return {
      width: totalDuration
        ? (playableTimeValue.value / totalDuration) * layoutWidth
        : 0,
    };
  }, [progressLayout, playableTimeValue, totalDuration]);

  return {
    setCurrentTime,
    timeValue: timeSharedValue ?? timeValue,
    setPlayableTime,
    playableTimeValue,
    activeViewStyle,
    playableTimeStyle,
  };
};

export default useControlSlider;

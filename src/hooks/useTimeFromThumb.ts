import type { LayoutRectangle } from 'react-native';
import { SharedValue, useDerivedValue } from 'react-native-reanimated';

export type UseTimeFromThumbParams = {
  progressLayout: LayoutRectangle | null;
  /**
   * Total duration in seconds
   */
  totalDuration: number;
  thumbValue: SharedValue<number>;
};

const useTimeFromThumb = ({
  progressLayout,
  thumbValue,
  totalDuration,
}: UseTimeFromThumbParams) => {
  const time = useDerivedValue(() => {
    const layoutWidth = progressLayout?.width ?? 0;
    const timeForThumb = totalDuration * (thumbValue.value / layoutWidth);

    return timeForThumb;
  });

  return { time };
};

export default useTimeFromThumb;

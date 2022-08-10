import { Gesture } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

export type UsePinchGestureParams = {
  onPinchIn: () => void;
  onPinchOut: () => void;
};

const usePinchGesture = ({ onPinchIn, onPinchOut }: UsePinchGestureParams) => {
  const pinchGesture = Gesture.Pinch().onEnd((evt) => {
    if (evt.scale > 1) {
      runOnJS(onPinchOut)();
    } else {
      runOnJS(onPinchIn)();
    }
  });

  return { pinchGesture };
};

export default usePinchGesture;

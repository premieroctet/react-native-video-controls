import {
  Gesture,
  GestureStateChangeEvent,
  GestureTouchEvent,
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

export type UseTapGestureParams = {
  numberOfTaps?: number;
  maxTapDuration?: number;
  onEnd?: (
    event: GestureStateChangeEvent<TapGestureHandlerEventPayload>
  ) => void;
  onBegin?: (
    event: GestureStateChangeEvent<TapGestureHandlerEventPayload>
  ) => void;
  onTouchesUp?: (event: GestureTouchEvent) => void;
  onTouchesDown?: (event: GestureTouchEvent) => void;
};

const useTapGesture = ({
  numberOfTaps = 1,
  maxTapDuration = 500,
  onEnd,
  onBegin,
  onTouchesDown,
  onTouchesUp,
}: UseTapGestureParams) => {
  const gesture = Gesture.Tap()
    .numberOfTaps(numberOfTaps)
    .maxDuration(maxTapDuration)
    .onTouchesUp((evt) => {
      'worklet';
      onTouchesUp?.(evt);
    })
    .onTouchesDown((evt) => {
      'worklet';
      onTouchesDown?.(evt);
    })
    .onBegin((evt) => {
      'worklet';
      onBegin?.(evt);
    })
    .onEnd((evt) => {
      'worklet';
      onEnd?.(evt);
    });

  return gesture;
};

export default useTapGesture;

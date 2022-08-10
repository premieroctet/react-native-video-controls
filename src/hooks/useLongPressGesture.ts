import {
  Gesture,
  GestureStateChangeEvent,
  GestureTouchEvent,
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

export type UseLongPressGestureParams = {
  onEnd?: (
    event: GestureStateChangeEvent<TapGestureHandlerEventPayload>
  ) => void;
  onBegin?: (
    event: GestureStateChangeEvent<TapGestureHandlerEventPayload>
  ) => void;
  onTouchesUp?: (event: GestureTouchEvent) => void;
  onTouchesDown?: (event: GestureTouchEvent) => void;
  onTouchesCancelled?: (event: GestureTouchEvent) => void;
};

const useLongPressGesture = ({
  onEnd,
  onBegin,
  onTouchesDown,
  onTouchesUp,
  onTouchesCancelled,
}: UseLongPressGestureParams) => {
  const gesture = Gesture.LongPress()
    .onTouchesUp((evt) => {
      'worklet';
      onTouchesUp?.(evt);
    })
    .onTouchesDown((evt) => {
      'worklet';
      onTouchesDown?.(evt);
    })
    .onTouchesCancelled((evt) => {
      'worklet';
      onTouchesCancelled?.(evt);
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

export default useLongPressGesture;

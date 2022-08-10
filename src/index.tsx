export { default as VideoControls } from './components/VideoControls';
export { default as ControlSlider } from './components/ControlSlider';
export { default as ControlThumb } from './components/ControlThumb';
export { default as ControlVideoState } from './components/ControlVideoState';
export { default as ControlTouchable } from './components/ControlTouchable';
export { default as ReText } from './components/ReText';
export { default as ControlFullScreen } from './components/ControlFullScreen';
export { default as CurrentTime } from './components/CurrentTime';

export { default as useControlsVideoState } from './hooks/useControlsVideoState';
export { default as useControlSlider } from './hooks/useControlSlider';
export { default as useControlThumb } from './hooks/useControlThumb';
export { default as useTapGesture } from './hooks/useTapGesture';
export { default as useTimeFromThumb } from './hooks/useTimeFromThumb';
export { default as useLayout } from './hooks/useLayout';
export { useControlsVisibility } from './context/ControlsVisibility';
export { default as usePinchGesture } from './hooks/usePinchGesture';

export type {
  Components,
  ComponentProps,
  ControlSliderMethods,
  ControlSliderProps,
  ControlThumbProps,
  VideoControlProps,
  ControlVideoStateProps,
  ControlVideoStateComponents,
  ControlFullScreenComponents,
  ControlFullScreenProps,
  ControlTouchableProps,
  ComponentKey,
  ControlFullScreenComponentKeys,
  ControlVideoStateComponentKeys,
  ControlVideoStateComponentProps,
} from './components/types';
export type { UseControlsVideoStateParams } from './hooks/useControlsVideoState';
export type { UseControlSliderParams } from './hooks/useControlSlider';
export type { UseControlThumbParams } from './hooks/useControlThumb';
export type { UseTapGestureParams } from './hooks/useTapGesture';
export type { UseTimeFromThumbParams } from './hooks/useTimeFromThumb';
export type { UsePinchGestureParams } from './hooks/usePinchGesture';

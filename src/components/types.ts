import type {
  Insets,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import type { Gesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture';
import type { SharedValue } from 'react-native-reanimated';

export type ControlSliderProps = {
  /**
   * The total duration of the video in seconds.
   */
  totalDuration: number;
  /**
   * Seek the video to this time in seconds.
   */
  onSeek: (time: number) => void;
  /**
   * Color for the past part of the progress bar
   */
  activeColor?: string;
  /**
   * Color for the future part of the progress bar
   */
  inactiveColor?: string;
  /**
   * Color for the playable part of the slider
   */
  playableColor?: string;
  /**
   * Thumb element to render. Defaults to a circle.
   *
   * _Note: this element is already wrapped in a GestureDetector_
   */
  thumb?: React.ReactElement;
  /**
   * Function to render the total duration of the video.
   *
   * @param totalDuration {number} The total duration of the video in seconds.
   */
  renderTotalDuration?: (totalDuration: number) => React.ReactElement | null;
  /**
   * Function to render the current time of the video.
   *
   * _Note: it is recommended to give a fixed width to this element_
   *
   * @param currentTime {number} A SharedValue of the current time in seconds.
   */
  renderCurrentTime?: (
    currentTime: SharedValue<number>
  ) => React.ReactElement | null;

  /**
   * Style applied to the slider. Can be useful to set a height
   */
  sliderStyle?: StyleProp<ViewStyle>;
  /**
   * Style applied to the slider container, which includes the current time and total time
   */
  sliderContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Border radius for the slider element and inner elements
   */
  radius?: number;
  /**
   * Element to render when the full width icon. Will render next to the total duration.
   */
  fullScreenElement?: React.ReactElement;
  /**
   * Reanimated shared value to have access to the current progress time.
   */
  timeSharedValue?: SharedValue<number>;
  /**
   * Reanimated shared value to have access to the current thumb progress.
   */
  thumbSharedValue?: SharedValue<number>;
  /**
   * Extra gesture handlers that runs simultaneously with the main thumb gesture handler
   * which handles its translation. Useful if you need to apply a scale effect on the thumb while
   * its pressed.
   */
  thumbSimultaneousGestures?: Gesture[];
  /**
   * Layout function for the slider element.
   */
  onSliderLayout?: (event: LayoutChangeEvent) => void;
  /**
   * Hit slop for the thumb gesture.
   */
  thumbHitSlop?: number | Insets;
};

export type ControlSliderMethods = {
  setCurrentTime: (time: number) => void;
  setPlayableTime: (time: number) => void;
};

export type ControlThumbProps = {
  color?: string;
};

export type ControlVideoStateComponentKeys =
  | 'forward'
  | 'rewind'
  | 'pause'
  | 'play';

export type ControlVideoStateComponentProps = {
  isPressed?: boolean;
};

export type ControlVideoStateComponents = {
  [key in ControlVideoStateComponentKeys]?: React.ComponentType<ControlVideoStateComponentProps>;
};

export type ControlVideoStateProps = {
  onPlay: () => void;
  onPause: () => void;
  onForward?: () => void;
  onRewind?: () => void;
  components: ControlVideoStateComponents;
  isPlaying: boolean;
  /**
   * Spacing between the elements. If its a number, a margin right is applied.
   * Else the value is apply to a `justifyContent` style.
   */
  spacing?: number | 'space-between' | 'space-around';
};

export type ControlFullScreenComponentKeys = 'fullscreen' | 'exitFullscreen';

export type ControlFullScreenComponents = {
  [key in ControlFullScreenComponentKeys]: React.ComponentType;
};

export type ControlFullScreenProps = {
  onToggleFullScreen: () => void;
  isFullScreen: boolean;
  components: ControlFullScreenComponents;
};

export type ComponentKey = 'slider' | 'videoState';

export type Components = {
  slider?: React.ComponentType<ControlSliderProps>;
  videoState?: React.ComponentType<ControlVideoStateProps>;
};

export type ComponentProps = {
  slider?: ControlSliderProps;
  videoState?: ControlVideoStateProps;
};

export type VideoControlProps = {
  initialVisible?: boolean;
  /**
   * Duration in ms after which the controls automatically hide.
   */
  autoHideAfterDuration?: number;
  /**
   * Components map, if you need to render custom components
   */
  components?: Components;
  /**
   * Set of props applied to the components map (including the default components).
   */
  componentsProps?: ComponentProps;
  /**
   * Function called upon double tap on the right side of the controls
   */
  onFastForward?: () => void;
  /**
   * Function called upon double tap on the left side of the controls
   */
  onFastRewind?: () => void;
  /**
   * Style applied to the video state view container. Useful if you want to
   * set the state buttons to have a full width.
   */
  videoStateContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Style applied to the controls container
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Player element to render the controls on.
   */
  videoElement: React.ReactElement;
  /**
   * Function called on pinch gesture that is zooming in
   */
  onZoomIn?: () => void;
  /**
   * Function called on pinch gesture that is zooming out
   */
  onZoomOut?: () => void;
  /**
   * Boolean indicating the auto dismiss of the controls.
   *
   * Defaults to true
   */
  autoDismiss?: boolean;
};

export type ControlTouchableProps = {
  numberOfTaps?: number;
  onPress?: () => void;
  /**
   * Max tap duration
   */
  maxDuration?: number;
  children?:
    | React.ReactElement
    | (({ pressed }: { pressed: boolean }) => React.ReactElement);
};

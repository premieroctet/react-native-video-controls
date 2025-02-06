# [Components list](#components)

- [VideoControls](#videocontrols)
- [ControlSlider](#controlslider)
- [ControlThumb](#controlthumb)
- [ControlVideoState](#controlvideostate)
- [ControlFullScreen](#controlfullscreen)
- [ControlTouchable](#controltouchable)

# [Hooks list](#hooks)

- [useControlSlider](#usecontrolslider)
- [useControlsVideoState](#usecontrolvideostate)
- [useControlFullScreen](#usecontrolfullscreen)
- [useControlThumb](#usecontrolthumb)
- [useLayout](#uselayout)
- [useTapGesture / useLongPressGesture](#uselongpressgesture--usetapgesture)
- [useTimeFromThumb](#usetimefromthumb)
- [useControlsVisibility](#usecontrolsvisibility)
- [usePinchGesture](#usepinchgesture)

# Components

## VideoControls

This is the main component that will render your player and the controls on it. You can pass children if you need to render custom views that are not handled by the lib (for example a video title).

#### videoElement (required)

A React element that renders the video player.

#### initialVisible (optional, default `true`)

If true, the controls will be visible during the initial render.

#### autoHideAfterDuration (optional, default `3000`)

Duration in ms after which the controls automatically hide.

#### components (optional)

Map of components that will be used to render some parts of the controls (slider, state controls for example). You can pass the following keys:

- `slider`: The slider that renders at the bottom of the player. Defaults to [ControlSlider](#controlslider).
- `videoState`: The state controls that render at the center of the player. Defaults to [ControlVideoState](#controlvideostate).

Example:

```js
<VideoControls
  components={{
    slider: MySlider,
    videoState: MyVideoState,
  }}
  videoElement={<MyPlayer />}
/>
```

#### componentsProps (optional)

Map of props to pass to the components used to render the controls (similar to the `components` prop).

Just like the `components` prop, it allows the following keys:

- `slider` (see [ControlSlider](#controlslider)):
- `videoState` (see [ControlVideoState](#controlvideostate))

Example:

```js
<VideoControls
  componentsProps={{
    slider: {
      totalDuration: 5000,
    },
  }}
  videoElement={<MyPlayer />}
/>
```

#### onFastForward (optional)

Called when the user double taps on the right side of the controls.

#### onFastRewind (optional)

Called when the user double taps on the left side of the controls.

#### videoStateContainerStyle (optional)

Style to apply to the container that contains the state controls. Useful if you want to position the state controls differently, for example if you want to make them full width.

#### containerStyle (optional)

Style applied to the controls container.

#### onZoomIn (optional)

Function called when zooming in the video with a pinch gesture.

#### onZoomOut (optional)

Function called when zooming out the video with a pinch gesture.

### autoDismiss (optional, default `true`)

Boolean indicating the auto dismiss of the controls.

### enableDismissOnTap (optional, default `true`)

Boolean indicating if the controls should be dismissed when the user taps on the controls overlay.

---

## ControlSlider

The control slider is a component that will render the progress bar, the current time, the total duration and a fullscreen button if provided.

#### totalDuration (required)

The total duration of the video

#### onSeek (required)

Function called when the user seeks the video from the slider's thumb. It receives the time in second as an argument.

#### activeColor (optional, default `white`)

Color for the past part (left side of the thumb) of the progress bar.

#### inactiveColor (optional, default `#aaa`)

Color for the future part (right side of the thumb) of the progress bar.

#### playableColor (optional, default `#ccc`)

Color for the future part (right side of the thumb) of the progress bar that goes until the playable part of the video.

#### thumb (optional)

React element that will render the thumb of the slider. Defaults to [ControlThumb](#controlthumb).

#### renderTotalDuration (optional)

Function that receives the total duration (in seconds) of the video. Returns a React element. Defaults to a white text formatted with minutes:seconds.

#### renderCurrentTime (optional)

Function that receives the current time (in seconds) of the video. Returns a React element. Defaults to a white text formatted with minutes:seconds.

It is recommended to give a fixed width to its container so that the slider layout is not affected by the width of the text.

_Note: the argument is a [reanimated SharedValue](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/shared-values/). To render it as a text, you can use the CurrentTime component._

#### sliderStyle (optional)

Style applied to the slider. Can be useful to set a height.

#### sliderContainerStyle (optional)

Style applied to the slider container, which includes the current time and total duration.

#### radius (optional)

Border radius for the slider element and inner elements (playable part, played part).

#### fullScreenElement (optional)

React element that will render the fullscreen button. Defaults to [ControlFullScreen](#controlfullscreen).

#### timeSharedValue (optional)

Reanimated shared value that allows you to keep track of the current progress time.

#### thumbSharedValue (optional)

Reanimated shared value that allows you to keep track of the current thumb progress.

#### thumbSimultaneousGestures (optional)

Extra gesture handlers (from [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/)) that runs simultaneously with the main thumb gesture handler which handles its translation. Useful if you need to apply a scale effect on the thumb while its pressed.

#### onSliderLayout (optional)

Layout function that is applied to the slider element.

#### thumbHitSlop (optional, default `20`)

Hit slop for the thumb element. It accepts a number or an insets object, similar to the [react-native hitSlop prop](https://reactnative.dev/docs/touchablewithoutfeedback#hitslop). For a number, the value is applied to all edges.

#### setCurrentTime (method)

Set the current time of the video.

#### setPlayableTime (method)

Set the playable time of the video.

---

## ControlThumb

#### color (optional, default `white`)

Color of the thumb.

---

## ControlVideoState

#### onPlay (required)

Function called when the user presses the play button.

#### onPause (required)

Function called when the user presses the pause button.

#### onForward (optional)

Function called when the user presses the forward button.

#### onRewind (optional)

Function called when the user presses the rewind button.

#### isPlaying (required)

Boolean indicating if the video is playing or not.

#### components (required)

Map of components used to render each part of the video state controls. You can pass the following keys:

- `play`: The play icon.
- `pause`: The pause icon.
- `forward`: The forward icon.
- `rewind`: The rewind icon.

All those components receive the following props:

- `isPressed`: boolean indicating the the touchable is being pressed or not. Useful to trigger an animation or apply different style.

#### spacing (optional, default `10`)

Spacing applied between each controls.

It also accepts a string (`space-between` or `space-around`). In that case, the prop is applied to a `justifyContent` style.

---

## ControlFullScreen

The ControlFullScreen component renders a touchable icon depending if the player is in full screen or not.

#### isFullScreen (required)

Boolean indicating if the player is in fullscreen or not

#### components (required)

Map of components used to render each part of the fullscreen button. You can pass the following keys:

- `fullScreen`: The fullscreen icon.
- `exitFullScreen`: The exit fullscreen icon.

They receive no prop.

#### onToggleFullScreen (required)

Function called when the user presses the fullscreen (or exit fullscreen) button.

---

## ControlTouchable

The ControlTouchable component renders a tap gesture handler. You should use it if you want to add custom touchables to the controls.

#### numberOfTaps (optional, default `1`)

Number of taps required to trigger the onPress function.

#### onPress (optional)

Function called when the gesture has completed

#### maxDuration (optional, in ms, default `500`)

Maximum duration of the tap gesture.

#### children

A React element or a function. The function will receive an object as an argument, containing the following keys:

- `pressed`: boolean indicating if the touchable is being pressed or not.

---

# Hooks

## useControlSlider

Handles shared value for the current time and the playable time. It also handles the styling for the active and playable parts of the progress bar.

It accepts an object with the following keys:

- `totalDuration` _(required)_ : the total duration of the video.
- `progressLayout` _(required)_ : the layout of the slider element.
- `timeSharedValue` _(optional)_ : See [here](#timesharedvalue-optional)

Returns:

- `setCurrentTime`: function to update the current time shared value.
- `setPlayableTime`: function to update the playable time shared value.
- `timeValue`: shared value for the current time of the video.
- `playableTimeValue`: shared value for the playable time of the video.
- `activeViewStyle`: style for the active part of the progress bar.
- `playableTimeStyle`: style for the playable part of the progress bar.

## useControlsVideoState

Handles the interaction between the video state controls and the visibility of the controls. If a button is pressed, the timer to hide the controls is reset. See [visibility](#visibility).

It accepts an object with the following keys:

- `onPlay` _(required)_ : function called when the user presses the play button.
- `onPause` _(required)_ : function called when the user presses the pause button.
- `onForward` _(optional)_ : function called when the user presses the forward button.
- `onRewind` _(optional)_ : function called when the user presses the rewind button.

Returns the same object as the one passed to the hook, with an extra:

- `setPressedButton`: Function to indicate which button is being pressed. This allows to not hide the controls while a button is being pressed. It accepts 2 arguments: a string with the name of the button and a boolean indicating if the button is being pressed.

## useControlThumb

Handles the thumb gesture. It accepts an object with the following keys:

- `progressLayout` _(required)_ : the layout of the slider element.
- `onGestureEnd` _(required)_ : function called when the gesture has ended. Receives the time in seconds as parameter.
- `totalDuration` _(required)_ : the total duration of the video.
- `thumbSharedValue` _(optional)_ : See [here](#timesharedvalue-optional)
- `hitSlop` _(optional, default `20`)_ : See [here](#thumbhitslop-optional)
- `timeSharedValue` _(required)_ : the current time as a shared value.

Returns:

- `thumbGestureHandler` : the gesture handler for the thumb
- `thumbValue`: the thumb translation as a shared value
- `updateThumbFromTime`: function to update the thumb position from a time in seconds.

## useLayout

Handles a view layout. Returns a tuple with the layout and a function to update the layout.

Example:

```js
const [layout, onLayout] = useLayout();

return <View onLayout={onLayout} />;
```

## useLongPressGesture / useTapGesture

Both hooks handle a tap gesture or a long press gesture. They accept an object with the following keys:

- `onBegin` _(optional)_ : function called when the gesture has begun.
- `onEnd` _(optional)_ : function called when the gesture has ended.
- `onTouchesUp` _(optional)_ : function called when the finger is lifted.
- `onTouchesDown` _(optional)_ : function called when the finger is placed on the screen.
- `onTouchesCancelled` _(optional)_ : function called when the finger stops being tracked.

Returns a [Tap Gesture](https://docs.swmansion.com/react-native-gesture-handler/docs/api/gestures/tap-gesture) or a [LongPress Gesture](https://docs.swmansion.com/react-native-gesture-handler/docs/api/gestures/long-press-gesture).

## useTimeFromThumb

Handles the time from the thumb position. It accepts an object with the following keys:

- `thumbValue` _(required)_ : the shared value for the thumb position.
- `totalDuration` _(required)_ : the total duration of the video in seconds.
- `progressLayout` _(required)_ : the layout of the slider element.

Returns an object with the following keys:

- `time`: the time in seconds from the thumb position.

## useControlsVisibility

Returns the context values handled by the visibility context. See [visibility](#visibility).

## usePinchGesture

Handles a pinch gesture. It accepts an object with the following keys:

- `onPinchIn` _(required)_ : function called when the users pinches with the fingers from the outside to the inside
- `onPinchOut` _(required)_ : function called when the users pinches with the fingers from the inside to the outside

Returns a [Pinch Gesture](https://docs.swmansion.com/react-native-gesture-handler/docs/api/gestures/pinch-gesture)

---

# Visibility

The visibility of the controls is handled by a context, which holds a timeout that will start, stop or reset depending on the actions of the user: press on a button, trigger the slider's thumb, etc.

This context is rendered by the [VideoControls](#videocontrols) component. So if you need to access this context, you should render your component as a children of `VideoControls`.

The context holds the following values:

- `resetVisibilityTimer` : function that restarts the timer
- `startTimer` : function that starts the timer
- `stopTimer` : function that stops the timer
- `isPlaying` : boolean indicating if the video is playing or not

---

# Methods

You can access the following methods thanks to a ref to the `VideoControls` component:

- `toggleVisible`: function to toggle the visibility of the controls
- `setVisible`: function to set the visibility of the controls. Takes a boolean as an argument.

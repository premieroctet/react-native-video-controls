# react-native-video-controls

![Npm Badge](https://img.shields.io/npm/v/@premieroctet/react-native-video-controls?style=for-the-badge)

Controls elements and utilities for react-native video players (react-native-video, expo-av, etc.).

![Demo](video-controls-demo.webm)

## Installation

### NPM

```sh
npm install @premieroctet/react-native-video-controls
```

### Yarn

```sh
yarn add @premieroctet/react-native-video-controls
```

Additionally, you need to install [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/installation) (at least v2) and [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation) (at least v2).

No other dependency is required, which makes the lib fully compatible with Expo.

## Usage

A complete example app with a basic usage is available in the [example](example) folder.

```tsx
<VideoControls
  componentsProps={componentProps}
  components={components}
  onFastForward={onFastForward}
  onFastRewind={onFastRewind}
  videoElement={
    <Video
      source={{
        uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      }}
      useNativeControls={false}
      onLoad={onLoad}
      onPlaybackStatusUpdate={onPlaybackStatusUpdate}
      shouldPlay
      rotation={isFullScreen ? 90 : 0}
      style={[
        { width: '100%' },
        isFullScreen
          ? {
              height: '100%',
            }
          : { aspectRatio: 16 / 9 },
      ]}
      ref={videoRef}
      pointerEvents="none"
    />
  }
/>
```

## API

See [API](API.md) for the list of available components and hooks.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Inspired from [react-native-video-controls](https://github.com/itsnubix/react-native-video-controls)

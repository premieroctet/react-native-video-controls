import * as React from 'react';
import 'react-native-gesture-handler';

import { FontAwesome } from '@expo/vector-icons';
import {
  ComponentProps,
  Components,
  ControlFullScreen,
  ControlFullScreenComponents,
  ControlSlider,
  ControlSliderMethods,
  ControlVideoStateComponents,
  VideoControls,
} from '@premieroctet/react-native-video-controls';
import { AVPlaybackStatus, Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const controlSliderRef = React.useRef<ControlSliderMethods>(null);
  const videoRef = React.useRef<Video>(null);
  const [totalDuration, setTotalDuration] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isFullScreen, setIsFullScreen] = React.useState(false);

  const onPlaybackStatusUpdate = React.useCallback(
    (status: AVPlaybackStatus) => {
      if (status.isLoaded) {
        controlSliderRef.current?.setCurrentTime(status.positionMillis / 1000);
        if (status.playableDurationMillis) {
          controlSliderRef.current?.setPlayableTime(
            status.playableDurationMillis / 1000
          );
        }
        setIsPlaying(status.isPlaying);
      }
    },
    []
  );

  React.useEffect(() => {
    ScreenOrientation.lockAsync(
      isFullScreen
        ? ScreenOrientation.OrientationLock.LANDSCAPE
        : ScreenOrientation.OrientationLock.PORTRAIT_UP
    ).catch(console.log);
  }, [isFullScreen]);

  const onSeek = React.useCallback((time: number) => {
    videoRef.current?.setPositionAsync(time * 1000);
  }, []);

  const onLoad = React.useCallback((status: AVPlaybackStatus) => {
    if (status.isLoaded && status.durationMillis) {
      setTotalDuration(status.durationMillis / 1000);
    }
  }, []);

  const onPlay = React.useCallback(() => {
    videoRef.current?.playAsync();
  }, []);

  const onPause = React.useCallback(() => {
    videoRef.current?.pauseAsync();
  }, []);

  const components = React.useMemo<Components>(() => {
    return {
      slider: (props) => <ControlSlider {...props} ref={controlSliderRef} />,
    };
  }, []);

  const videoStateComponents =
    React.useMemo<ControlVideoStateComponents>(() => {
      return {
        play: () => <FontAwesome name="play" size={25} color="white" />,
        pause: () => <FontAwesome name="pause" size={25} color="white" />,
        forward: () => <FontAwesome name="forward" size={20} color="white" />,
        rewind: () => <FontAwesome name="backward" size={20} color="white" />,
      };
    }, []);

  const onRewind = React.useCallback(async (time: number = 5000) => {
    const currentStatus = await videoRef.current?.getStatusAsync();

    if (currentStatus?.isLoaded) {
      const newTime = currentStatus.positionMillis - time;
      videoRef.current?.setPositionAsync(Math.max(0, newTime));
    }
  }, []);

  const onForward = React.useCallback(
    async (time: number = 5000) => {
      const currentStatus = await videoRef.current?.getStatusAsync();

      if (currentStatus?.isLoaded) {
        const newTime = currentStatus.positionMillis + time;
        videoRef.current?.setPositionAsync(
          Math.min(newTime, totalDuration * 1000)
        );
      }
    },
    [totalDuration]
  );

  const onFastForward = React.useCallback(() => {
    onForward(10000);
  }, [onForward]);

  const onFastRewind = React.useCallback(() => {
    onRewind(10000);
  }, [onRewind]);

  const fullScreenComponents =
    React.useMemo<ControlFullScreenComponents>(() => {
      return {
        exitFullscreen: () => (
          <FontAwesome name="compress" size={20} color="white" />
        ),
        fullscreen: () => <FontAwesome name="expand" size={20} color="white" />,
      };
    }, []);

  const fullScreenElement = React.useMemo(() => {
    return (
      <ControlFullScreen
        isFullScreen={isFullScreen}
        onToggleFullScreen={() => setIsFullScreen((old) => !old)}
        components={fullScreenComponents}
      />
    );
  }, [isFullScreen, fullScreenComponents]);

  const componentProps = React.useMemo<ComponentProps>(() => {
    return {
      slider: {
        totalDuration,
        onSeek,
        fullScreenElement,
      },
      videoState: {
        isPlaying,
        onPause,
        onPlay,
        onRewind,
        onForward,
        components: videoStateComponents,
      },
    };
  }, [
    totalDuration,
    onSeek,
    isPlaying,
    onPause,
    onPlay,
    videoStateComponents,
    fullScreenElement,
  ]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={{ width: '100%', aspectRatio: 16 / 9 }}>
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
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

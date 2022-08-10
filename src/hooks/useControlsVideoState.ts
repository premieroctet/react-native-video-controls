import { useCallback, useEffect, useRef } from 'react';
import { useControlsVisibility } from '../context/ControlsVisibility';

export type UseControlsVideoStateParams = {
  onPlay: () => void;
  onPause: () => void;
  onForward?: () => void;
  onRewind?: () => void;
};

const useControlsVideoState = ({
  onPause: _onPause,
  onPlay: _onPlay,
  onForward: _onForward,
  onRewind: _onRewind,
}: UseControlsVideoStateParams) => {
  const { resetVisibilityTimer } = useControlsVisibility();
  const pressedButtons = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      if (Object.values(pressedButtons.current).some(Boolean)) {
        resetVisibilityTimer();
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const setPressedButton = useCallback((key: string, value: boolean) => {
    pressedButtons.current[key] = value;
  }, []);

  const onPlay = useCallback(() => {
    resetVisibilityTimer();
    _onPlay();
  }, [_onPlay, resetVisibilityTimer]);

  const onPause = useCallback(() => {
    resetVisibilityTimer();
    _onPause();
  }, [_onPause, resetVisibilityTimer]);

  const onForward = useCallback(() => {
    resetVisibilityTimer();
    _onForward?.();
  }, [_onForward, resetVisibilityTimer]);

  const onRewind = useCallback(() => {
    resetVisibilityTimer();
    _onRewind?.();
  }, [_onRewind, resetVisibilityTimer]);

  return { onPlay, onPause, onForward, onRewind, setPressedButton };
};

export default useControlsVideoState;

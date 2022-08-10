import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';

type ControlsVisibiltyContextType = {
  resetVisibilityTimer: () => void;
  startTimer: () => void;
  stopTimer: () => void;
  isPlaying: boolean;
};

const ControlsVisibilityContext =
  React.createContext<ControlsVisibiltyContextType>({
    resetVisibilityTimer: () => null,
    startTimer: () => null,
    stopTimer: () => null,
    isPlaying: false,
  });

type ControlsVisibilityProviderProps = {
  visible: boolean;
  onHide: () => void;
  visibilityDuration?: number;
  isPlaying: boolean;
};

const ControlsVisibilityProvider = ({
  visible,
  onHide,
  children,
  visibilityDuration,
  isPlaying,
}: PropsWithChildren<ControlsVisibilityProviderProps>) => {
  const timeoutId = useRef<NodeJS.Timeout | undefined>(undefined);
  const startTimer = useCallback(() => {
    if (!timeoutId.current) {
      timeoutId.current = setTimeout(() => {
        if (isPlaying) {
          onHide();
        }
      }, visibilityDuration);
    }
  }, [visibilityDuration, onHide, isPlaying]);

  const stopTimer = useCallback(() => {
    clearTimeout(timeoutId.current);
    timeoutId.current = undefined;
  }, []);

  const resetVisibilityTimer = useCallback(() => {
    clearTimeout(timeoutId.current);
    timeoutId.current = undefined;
    startTimer();
  }, [startTimer]);

  useEffect(() => {
    if (visible && isPlaying) {
      startTimer();
    }

    return () => {
      clearTimeout(timeoutId.current);
      timeoutId.current = undefined;
    };
  }, [visible, isPlaying, startTimer]);

  const contextValue = useMemo(() => {
    return {
      resetVisibilityTimer,
      startTimer,
      stopTimer,
      isPlaying,
    };
  }, [resetVisibilityTimer, startTimer, stopTimer, isPlaying]);

  return (
    <ControlsVisibilityContext.Provider value={contextValue}>
      {children}
    </ControlsVisibilityContext.Provider>
  );
};

export const useControlsVisibility = () =>
  useContext(ControlsVisibilityContext);

export default ControlsVisibilityProvider;

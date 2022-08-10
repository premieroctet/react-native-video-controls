import { useCallback, useState } from 'react';
import type { LayoutChangeEvent, LayoutRectangle } from 'react-native';

const useLayout = (): [
  LayoutRectangle | null,
  (evt: LayoutChangeEvent) => void
] => {
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);

  const onLayout = useCallback((evt: LayoutChangeEvent) => {
    setLayout(evt.nativeEvent.layout);
  }, []);

  return [layout, onLayout];
};

export default useLayout;

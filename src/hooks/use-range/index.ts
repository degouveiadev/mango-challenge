import { useRef, useState, useCallback, useEffect } from 'react'

type MinMax = {
  min: number;
  max: number;
}

export type OnChangeRange = {
  min: string;
  max: string;
}

export type UseRangeProps = MinMax & {
  rangeValues?: number[];
  onChange: (values: OnChangeRange) => void;
}

export const useRange = ({ min, max, rangeValues, onChange }: UseRangeProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLDivElement | null>(null);

  const [minValue, setMinValue] = useState<number>(min)
  const [maxValue, setMaxValue] = useState<number>(max)

  const [isDragging, setIsDragging] = useState(false);

  const getValue = useCallback((value: number) => {
    if (rangeValues?.length) { return rangeValues[value] }
    return value
  }, [rangeValues])

  const handleChange = useCallback(({ min, max }: MinMax) => {
    const newMin = getValue(min)?.toFixed(2)
    const newMax = getValue(max)?.toFixed(2)
  
    onChange({ min: newMin, max: newMax });
  }, [onChange, getValue])

  const moveSliderPosition = useCallback((event: MouseEvent | React.MouseEvent) => {
    const sliderBoundingClientRect = sliderRef.current?.getBoundingClientRect();
  
    if (sliderBoundingClientRect) {
      const clientX = (event as MouseEvent).clientX;
      const posX = clientX - sliderBoundingClientRect.left;
      const totalWidth = sliderBoundingClientRect.width;

      const isLeftControl = controlRef.current?.getAttribute('data-control') === 'left'

      let selectedValue = (posX / totalWidth) * (max - min) + min;
      selectedValue = Math.max(min, selectedValue);
      selectedValue = Math.min(max, selectedValue);
      selectedValue = rangeValues?.length ? Math.round(selectedValue) : selectedValue

      if (isLeftControl && selectedValue < maxValue) {
        setMinValue(selectedValue)
        return
      }

      if (!isLeftControl && selectedValue > minValue) setMaxValue(selectedValue)
    }
  }, [max, min, minValue, maxValue, rangeValues]);

  const onMouseUp = useCallback(() => {
    handleChange({ min: minValue, max: maxValue });
    setIsDragging(false);
  }, [minValue, maxValue, handleChange]);
  
  const onMouseMove = useCallback((event: Event) => {
    if (isDragging) {
      moveSliderPosition(event as unknown as MouseEvent);
    }
  }, [isDragging, moveSliderPosition]);
  
  const onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    controlRef.current = event.target as HTMLDivElement;
    moveSliderPosition(event);
    setIsDragging(true);
  };

  const handleRangeValues = (externalValue: number, isMinValue = false) => {
    let value = externalValue
    value = Math.max(min, value);
    value = Math.min(max, value);

    if (isMinValue && value < maxValue) {
      setMinValue(value)
      handleChange({ min: value, max: maxValue });
      return
    }

    if (!isMinValue && value > minValue) {
      setMaxValue(value)
      handleChange({ min: minValue, max: value });
    }
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, onMouseMove, onMouseUp]);

  const calcControlPosition = (value: number): number => {
    return ((value - min) / (max - min)) * 100
  }

  return {
    sliderRef,
    controlRef,
    minValue,
    maxValue,
    calcControlPosition,
    onMouseDown,
    handleRangeValues,
    getValue,
  }
}

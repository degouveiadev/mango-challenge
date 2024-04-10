import { Container, Range, Control, Rail } from "./ragen-input.style";
import { InputCurrency } from "../input";
import { useRange, OnChangeRange } from "@/hooks/use-range";

type RangeSliderProps = {
  min: number;
  max: number;
  onChange: (values: OnChangeRange) => void;
  rangeValues?: number[]
}

const DEFAULT_CURRECY = '€'

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  onChange,
  rangeValues = []
}) => {
  const {
    sliderRef,
    minValue,
    maxValue,
    onMouseDown,
    calcControlPosition,
    handleRangeValues,
    getValue
  } = useRange({ min, max, rangeValues, onChange })
  const isRangeValues = rangeValues.length > 0

  return (
    <Container>
      <InputCurrency
        min={min}
        max={max}
        value={getValue(minValue)}
        defaultValue={min}
        onChange={(value) => handleRangeValues(value, true)}
        currency={DEFAULT_CURRECY}
        disabled={isRangeValues}
      />
      <Range
        ref={sliderRef}
        role="slider"
        tabIndex={0}
        aria-valuemin={min}
        aria-valuemax={max}
        onMouseDown={onMouseDown}
        aria-label="range-control"
      >
        <Control data-control='left' position={calcControlPosition(minValue)} />
        <Rail  />
        <Control data-control='right' position={calcControlPosition(maxValue)}/>
      </Range>
      <InputCurrency
        min={min}
        max={max}
        value={getValue(maxValue)}
        defaultValue={max}
        onChange={(value) => handleRangeValues(value, false)}
        currency={DEFAULT_CURRECY}
        aria-label="range-control"
        disabled={isRangeValues}
      />
    </Container>
  )
}

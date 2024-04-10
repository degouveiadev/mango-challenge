import { useInputCurrency } from '@/hooks/use-input-currency';
import { FormControl, Input as InputStyled } from './input.style'

type InputProps = {
  min: number;
  max: number;
  onChange: (value: number) => void;
  placeholder?: string;
  disabled?: boolean;
  value: number;
  defaultValue: string | number;
  currency: string;
}

export const InputCurrency: React.FC<InputProps> = ({
  min,
  max,
  currency,
  value,
  defaultValue,
  disabled,
  onChange,
}) => {
  const { 
    inputRef,
    showInput,
    inputValue,
    handleBlur,
    handleChange,
    handleShowInput
  } = useInputCurrency({ value, min, max, disabled, onChange })

  return (
    <FormControl showInput={showInput}>
      <InputStyled
        ref={inputRef}
        type='number'
        min={min}
        max={max}
        onChange={handleChange}
        onBlur={handleBlur}
        value={inputValue}
        step="0.01"
        role='spinbutton'
        disabled={disabled}
        readOnly={disabled}
      />
      {
        showInput
          ? (
            <span>{currency}</span>
          )
          : (
            <span onClick={handleShowInput}>{inputValue} {currency}</span>
          )
      }
    </FormControl>
  );
};

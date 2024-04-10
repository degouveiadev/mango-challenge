import { useRef, useState, useEffect } from 'react';

export type UseInputCurrency = {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
} 

const CURRENCY_REGEX = /^[0-9]+(\.[0-9]+)?$/;

export const useInputCurrency = ({ value, min, max, onChange }: UseInputCurrency) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string | number>('');

  const toFixed = (value: number) => value?.toFixed(2);

  useEffect(() => {
    setInputValue(toFixed(value))
  }, [value])

  useEffect(() => {
    if (showInput) {
      inputRef.current?.focus()
    }
  }, [showInput])

  const handleShowInput = () => {
    setShowInput(!showInput)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue)
  };

  const validateRange = () => {
    const amount = parseFloat(inputValue as string);
    return amount > min && amount < max;
  }

  const handleBlur = () => {
    handleShowInput()
    setInputValue(toFixed(value));

    const inRange = validateRange()

    if (inRange || CURRENCY_REGEX.exec(inputValue as string)) {
      onChange(parseFloat(inputValue as string));
    };
  }

  return { inputRef, showInput, inputValue, handleShowInput, handleChange, handleBlur }
}

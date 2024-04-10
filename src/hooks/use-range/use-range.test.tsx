import { renderHook, act } from '@testing-library/react-hooks'
import { useRange } from './index';

describe('useRange', () => {
  it('should return the initial values for minValue and maxValue', () => {
    const { result } = renderHook(() => useRange({ min: 0, max: 10, onChange: () => {} }));

    expect(result.current.minValue).toBe(0)
    expect(result.current.maxValue).toBe(10)
  });

  it('should update the minValue and maxValue when handleRangeValues is called', () => {
    const { result } = renderHook(() => useRange({ min: 0, max: 10, onChange: () => {} }));
    
    act(() => {
      result.current.handleRangeValues(5, true)
    })
    act(() => {
      result.current.handleRangeValues(9, false)
    })

    expect(result.current.minValue).not.toBe(0)
    expect(result.current.maxValue).not.toBe(10)
    expect(result.current.minValue).toBe(5)
    expect(result.current.maxValue).toBe(9)
  });

  it('should not be update the minValue and maxValue when handleRangeValues is called with a out-of-range value', () => {
    const { result } = renderHook(() => useRange({ min: 3, max: 10, onChange: () => {} }));
    
    act(() => {
      result.current.handleRangeValues(2, true)
    })
    act(() => {
      result.current.handleRangeValues(1, false)
    })

    expect(result.current.minValue).not.toBe(2)
    expect(result.current.maxValue).not.toBe(1)
    expect(result.current.minValue).toBe(3)
    expect(result.current.maxValue).toBe(10)
  });

  it('should be call onChange event when the range change', () => {
    const onChange = jest.fn()
    const { result } = renderHook(() => useRange({ min: 1, max: 10, onChange }));
    
    act(() => {
      result.current.handleRangeValues(2, true)
    })

    expect(onChange).toHaveBeenCalledTimes(1)
  });
});

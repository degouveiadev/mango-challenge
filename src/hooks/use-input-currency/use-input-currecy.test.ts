import { renderHook, act } from '@testing-library/react-hooks'
import { useInputCurrency } from './index';

describe('useRange', () => {
  it('should return the initial values for inputValue', () => {
    const { result } = renderHook(() => useInputCurrency({ min: 1, max: 10, value: 1, onChange: () => {} }));

    expect(result.current.inputValue).toBe("1.00")
  });

  it('should toggle the showInput state', () => {
    const { result } = renderHook(() => useInputCurrency({ min: 1, max: 10, value: 1, onChange: () => {} }));
    
    act(() => {
      result.current.handleShowInput()
    })
    expect(result.current.showInput).toBe(true)

    act(() => {
      result.current.handleShowInput()
    })
    expect(result.current.showInput).not.toBe(true)
  });

  it('should update the inputValue when the handleChange is called', () => {
    const { result } = renderHook(() => useInputCurrency({ min: 3, max: 10, value: 3, onChange: () => {} }));
    
    act(() => {
      result.current.handleChange({ target: { value: '4' } } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.inputValue).toBe("4")
  });

  it('should reset the inputValue when the value is out-of-range', () => {
    const onChange = jest.fn()
    const { result } = renderHook(() => useInputCurrency({ min: 3, max: 10, value: 3, onChange }));
    
    act(() => {
      result.current.handleChange({ target: { value: '1' } } as React.ChangeEvent<HTMLInputElement>)
    })
    expect(result.current.inputValue).toBe('1')

    act(() => {
      result.current.handleBlur()
    })

    expect(result.current.inputValue).toBe('3.00')
  });

  it('should call the onChange event', () => {
    const onChange = jest.fn()
    const { result } = renderHook(() => useInputCurrency({ min: 3, max: 10, value: 3, onChange }));
    
    act(() => {
      result.current.handleChange({ target: { value: '3' } } as React.ChangeEvent<HTMLInputElement>)
    })
    expect(result.current.inputValue).toBe('3')

    act(() => {
      result.current.handleBlur()
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.lastCall[0]).toBe(3)
  });
});

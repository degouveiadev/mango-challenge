import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { RangeSlider } from './';
import { ExerciseLayout } from '../templates/exercice/exercise';

describe('<RangeSlider />', () => {
  const mockGetBoundingClientRect = jest.fn(() => ({
    x: 0,
    y: 0,
    width: 350,
    height: 17,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    toJSON: () => null,
  }));

  it('renders without crashing', () => {
    render(<RangeSlider min={1} max={4} onChange={() => {}} />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });


  it('should display the amount label with initial values', () => {
    render(<RangeSlider min={1} max={80} onChange={() => {}} />);

    const minAmountLabel = screen.getByText(/1.00 €/);
    const maxAmountLabel = screen.getByText(/80.00 €/);

    expect(minAmountLabel).toBeInTheDocument();
    expect(maxAmountLabel).toBeInTheDocument();
  });

  it('should move the slider control and call the onChange event', async () => {
    const onChange = jest.fn();

    render(<RangeSlider min={1} max={80} onChange={onChange} />, {
      wrapper: (props) => <ExerciseLayout {...props} />
    });

    const slider = screen.getByRole('slider');
    slider.getBoundingClientRect = mockGetBoundingClientRect

    const controlLeft = slider.querySelector('[data-control="left"]') as HTMLElement;
    const controlRight = slider.querySelector('[data-control="right"]') as HTMLElement;

    expect(controlLeft).toBeInTheDocument();
    expect(controlRight).toBeInTheDocument();

    fireEvent.mouseDown(controlLeft, { clientX: 10 })
    fireEvent.mouseMove(controlLeft, { clientX: 10 });
    fireEvent.mouseUp(controlLeft);
    
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.lastCall[0].min).not.toBe(1);

    fireEvent.mouseDown(controlRight, { clientX: 70 })
    fireEvent.mouseMove(controlRight, { clientX: 70 });
    fireEvent.mouseUp(controlRight);
  
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange.mock.lastCall[0].max).not.toBe(80);
  });

  it('should move the slider control and not call the onChange event', () => {
    const onChange = jest.fn();
    render(<RangeSlider min={1} max={80} onChange={onChange} />);

    const slider = screen.getByRole('slider');
    slider.getBoundingClientRect = mockGetBoundingClientRect

    const controlLeft = slider.querySelector('[data-control="left"]') as HTMLElement;
    const controlRight = slider.querySelector('[data-control="right"]') as HTMLElement;

    expect(controlLeft).toBeInTheDocument();
    expect(controlRight).toBeInTheDocument();

    fireEvent.mouseDown(controlLeft)
    fireEvent.mouseMove(controlLeft, { clientX: -100 });
    fireEvent.mouseUp(controlLeft);

    expect(onChange.mock.lastCall[0].min).toBe(1);

    fireEvent.mouseDown(controlRight)
    fireEvent.mouseMove(controlRight, { clientX: 1000 });
    fireEvent.mouseUp(controlRight);

    expect(onChange.mock.lastCall[0].max).toBe(80);
  });

  it('should change the input currency and call the onChange event', async () => {
    const onChange = jest.fn();
    render(<RangeSlider min={1} max={80} onChange={onChange} />);

    const minAmountLabel = screen.getByText(/1.00 €/);
    const maxAmountLabel = screen.getByText(/80.00 €/);

    expect(minAmountLabel).toBeInTheDocument();
    expect(maxAmountLabel).toBeInTheDocument();

    userEvent.click(minAmountLabel)

    const inputMinValue: HTMLInputElement = await screen.findByRole('spinbutton');

    await act( async () => {
      await userEvent.type(inputMinValue, '3', {
        initialSelectionStart: 0,
        initialSelectionEnd: 1,
      })
    })
    fireEvent.blur(inputMinValue);

    expect(onChange.mock.lastCall[0].min).toBe(3);

    userEvent.click(minAmountLabel)

    const inputMaxValue: HTMLInputElement = await screen.findByRole('spinbutton');

    await act( async () => {
      await userEvent.type(inputMaxValue, '60', {
        initialSelectionStart: 0,
        initialSelectionEnd: 1,
      })
    })
    fireEvent.blur(inputMaxValue);

    expect(onChange.mock.lastCall[0].max).toBe(80);
  });
});

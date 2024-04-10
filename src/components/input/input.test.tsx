import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { InputCurrency } from './index';
import { ExerciseLayout } from '../templates/exercice/exercise';

describe('<InputCurrency />', () => {

  it('renders without crashing', () => {
    render(<InputCurrency min={1} max={5} onChange={() => {}} value={1} defaultValue={1} currency='€' />);
  
    const amountLabel = screen.getByText(/1.00 €/);

    expect(amountLabel).toBeInTheDocument();
  });


  it('should call the onChange event when the user types in the input', async () => {
    const onChange = jest.fn();
    render(<InputCurrency min={1} max={50} onChange={onChange} value={1} defaultValue={1} currency='€' />, {
      wrapper: (props) => <ExerciseLayout{...props} />
    });
  
    const amountLabel = screen.getByText(/1.00 €/);

    expect(amountLabel).toBeInTheDocument();

    userEvent.click(amountLabel)

    const input: HTMLInputElement = await screen.findByRole('spinbutton');
    
    await act( async () => {
      await userEvent.type(input, '3', {
        initialSelectionStart: 0,
        initialSelectionEnd: 1,
      })
    })
    fireEvent.blur(input);

    expect(onChange.mock.lastCall[0]).toBe(3);
  });
});

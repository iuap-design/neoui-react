/** CascadePicker.tsx */

import React, { useState } from 'react';
import { configure, render, screen, waitFor } from '@testing-library/react';
import { Button, CascadePicker } from '@tinper/m'
import userEvent from '@testing-library/user-event';


configure({ testIdAttribute: 'fieldid' });
describe('CascadePicker', () => {
  const options = [
    {
      label: 'Option 1',
      value: '1',
      children: [
        {
          label: 'Suboption 1',
          value: '1-1',
        },
        {
          label: 'Suboption 2',
          value: '1-2',
        },
      ],
    },
    {
      label: 'Option 2',
      value: '2',
      children: [
        {
          label: 'Suboption 3',
          value: '2-1',
        },
        {
          label: 'Suboption 4',
          value: '2-2',
        },
      ],
    },
  ];

  const renderCascadePicker = () => {
    const handleConfirm = jest.fn();
    const handleSelect = jest.fn();
    const App = () => {
      const [visible, setVisible] = useState(false)

      return (
        <>
          <Button
            onClick={() => {
              setVisible(true)
            }}
          >
            选择
          </Button>
          <CascadePicker
            title='级联选择'
            options={options}
            visible={visible}
            fieldid="cascadePickerFieldid"
            onClose={() => {
              setVisible(false)
            }}
            onConfirm={handleConfirm}
            onSelect={handleSelect}
          />
        </>
      )
    }
    const { getByTestId } = render(
      <App />
    );
    const trigger = screen.getByRole('button', { name: /选择/i })
    const getPicker = () => getByTestId('cascadePickerFieldid');
    const user = userEvent.setup()


    return { handleSelect, handleConfirm, trigger, getPicker, user };
  }

  it('renders without crashing <test prop:: options>', () => {
    render(<CascadePicker options={options} />);
  });

  it('displays the correct number of options',async () => {
    const { trigger, user } = renderCascadePicker();

    await user.click(trigger);



    const option1 = screen.getByRole('gridcell', { name: "Option 1" });
    const option2 = screen.getByRole('gridcell', { name: "Option 2" });

    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
  });

  it('selects the correct option', async () => {
    const { getPicker, trigger, user } = renderCascadePicker();

    await user.click(trigger);

    const picker = getPicker()

    await waitFor(async () => {

      const option1 = screen.getByRole('gridcell', { name: "Option 1" });
      const option2 = screen.getByRole('gridcell', { name: "Option 2" });

      await user.click(option1);

      expect(option1).toHaveAttribute('data-selected', 'true');
      expect(option2).not.toHaveAttribute('data-selected', 'true');
    })

  });

  it('triggers the onChange event', async () => {

    const { trigger, user, handleSelect } = renderCascadePicker();
    await user.click(trigger);

    await waitFor(async () => {

      const option1 = screen.getByRole('gridcell', { name: "Option 1" });
      const option2 = screen.getByRole('gridcell', { name: "Option 2" });

      await user.click(option1);




      await user.click(option2);

    })


  });
});

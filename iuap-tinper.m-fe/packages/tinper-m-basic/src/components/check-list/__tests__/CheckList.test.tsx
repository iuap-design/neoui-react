/** CheckList.tsx */
import React from 'react';
import { getTestId } from "@utils/GetTestId";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CheckList, CheckListProps } from '@tinper/m';
import CheckmarkCircle from "@tinper/m-icons/lib/cjs/CheckmarkCircle";
import CheckmarkCircleFill from "@tinper/m-icons/lib/cjs/CheckmarkCircleFill";
import RadioButtonOn from "@tinper/m-icons/lib/cjs/RadioButtonOn";

describe('CheckList Component ', () => {
  const renderCheckList = (props: CheckListProps = {}) => {
    const user = userEvent.setup();
    const { container } = render(
      <CheckList {...props}>
        <CheckList.Item value="A">A</CheckList.Item>
        <CheckList.Item value="B">B</CheckList.Item>
        <CheckList.Item value="C">
          C
        </CheckList.Item>
      </CheckList>
    );

    return {
      container,
      user
    }
  };
  describe('<test prop:: defaultValue>', () => {
    it('should render default value', () => {
      const { container } = renderCheckList({ defaultValue: ['A'] })
      expect(container).toMatchSnapshot()
    });
  })
  describe('<test prop:: value>', () => {
    it('should control by value', async () => {
      const { container, user } = renderCheckList({ value: ['B'] })
      expect(container).toMatchSnapshot()

      await user.click(screen.getByText('B'))
      expect(container).toMatchSnapshot()

      await user.click(screen.getByText('C'))
      expect(container).toMatchSnapshot()

    });

  })

  describe('<test prop:: multiple>', () => {
    it('should render multiple selected Value', async () => {
      const { container, user } = renderCheckList({ multiple: true, defaultValue: ['A', 'B'] })
      expect(container).toMatchSnapshot()

      await user.click(screen.getByText('B'))
      expect(container).toMatchSnapshot()

      await user.click(screen.getByText('C'))
      expect(container).toMatchSnapshot()

    });

    it('should control by multiple selected value', async () => {
      const { container, user } = renderCheckList({ multiple: true, value: ['A', 'B'] })
      expect(container).toMatchSnapshot()

      await user.click(screen.getByText('B'))
      expect(container).toMatchSnapshot()

      await user.click(screen.getByText('C'))
      expect(container).toMatchSnapshot()

      await user.click(screen.getByText('A'))
      expect(container).toMatchSnapshot()
    });
  })

  describe('<test prop:: activeIcon>', () => {
    it('should render activeIcon', () => {
      const { container } = renderCheckList({ activeIcon: <RadioButtonOn /> })
      expect(container).toMatchSnapshot()
    });
  })

  describe('<test prop:: extra> <test prop:: children>', () => {
    it('should render extra', async () => {
      const { container, user } = renderCheckList({
        extra: (active) =>
          active ? <CheckmarkCircleFill /> : <CheckmarkCircle />
      })
      expect(container).toMatchSnapshot()

      await user.click(screen.getByText('B'))
      expect(container).toMatchSnapshot()

      await user.click(screen.getByText('C'))
      expect(container).toMatchSnapshot()
    });
  })

  describe('<test prop:: extraAlign>', () => {
    it('should render align left', () => {
      const { container } = renderCheckList({ extraAlign: 'left' })
      expect(container).toMatchSnapshot()
    });
  })

  describe('<test prop:: disabled>', () => {
    it('should render disabled all ', () => {
      const { container } = renderCheckList({ disabled: true })
      expect(container).toMatchSnapshot()
    });
  })

  describe('<test prop:: readOnly>', () => {
    it('should render readOnly all ', () => {
      const { container } = renderCheckList({ readOnly: true })
      expect(container).toMatchSnapshot()
    });
  })

  describe('<test prop:: fieldid>', () => {
    it('render fieldid', () => {
      const fieldid = getTestId()
      const { container } = renderCheckList({ fieldid })
      expect(container.firstElementChild).toHaveAttribute('fieldid', fieldid)
    });
  })

  describe('<test prop:: clsPrefix>', () => {
    it("should have clsPrefix ", () => {
      const { container } = renderCheckList({ clsPrefix: 'test' })

      expect(container).toMatchSnapshot()
    });


  })

  describe('<test prop:: onChange>', () => {
    it('should called with selected value', async () => {
      const onChange = jest.fn()
      const { user } = renderCheckList({ onChange })

      await user.click(screen.getByText('B'))

      expect(onChange).toHaveBeenCalledWith(['B'])

      await user.click(screen.getByText('C'))

      expect(onChange).toHaveBeenCalledWith(['C'])

    });

    it('should called with multiple selected value', async () => {
      const onChange = jest.fn()
      const { user } = renderCheckList({ onChange, multiple: true })

      await user.click(screen.getByText('B'))

      expect(onChange).toHaveBeenCalledWith(['B'])

      await user.click(screen.getByText('C'))

      expect(onChange).toHaveBeenCalledWith(['B', 'C'])

      await user.click(screen.getByText('A'))

      expect(onChange).toHaveBeenCalledWith(['B', 'C', 'A'])

    });
  })
})

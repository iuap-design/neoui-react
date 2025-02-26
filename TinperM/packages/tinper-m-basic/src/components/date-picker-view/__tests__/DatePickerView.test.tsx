/** DatePickerView.tsx */
import React from 'react'
import { render, screen, within } from '@testing-library/react';
import { DatePickerView } from '@tinper/m';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import { DatePickerViewProps } from '../src';
// const prefixButton = `${muiPrefix}-button`;


describe('DatePicker Component', () => {
  const dateValue = new Date('2024-01-08 13:12:25')
  const dateArr = [2024, 1, 8, 13, 12, 25]


  const renderDatePickerView = (props: Partial<DatePickerViewProps> = {}) => {
    const fieldid = 'date-picker-view-fieldid'
    const onSelect = jest.fn()
    const renderLabel = jest.fn()
    const children = jest.fn()
    const { container } = render(<DatePickerView fieldid={fieldid}  onSelect={onSelect} renderLabel={renderLabel} {...props}>{children}</DatePickerView>)
    const getOptions = (precision: string): HTMLElement[] => within(screen.getByRole('listbox', { name: new RegExp(precision, 'i') })).getAllByRole('gridcell')
    const getOptionValues = (precision: string) => getOptions(precision).map(item => parseInt(item.textContent!))
    const getOptionByLabel = (precision: string, label: number | string) => within(screen.getByRole('listbox', { name: new RegExp(precision, 'i') })).getByRole('gridcell', { name: new RegExp(label.toString()) })
    return {
      container,
      user: userEvent.setup(),
      onSelect,
      children,
      renderLabel,
      getConfirmBtn: () => screen.getByRole('button', { name: /确定/ }),
      getOptions,
      getOptionValues,
      getOptionByLabel,
      fieldid
    }

  }


  describe('<test prop:: defaultValue>', () => {
    it('should defaultValue Date is selected', () => {
      renderDatePickerView({ defaultValue: dateValue, precision: 'second', renderLabel: undefined })

      const cells = screen.getAllByRole('gridcell', { selected: true });
      dateArr.forEach((item, i) => {
        expect(cells[i]).toHaveTextContent(item)
      })
    });
  })

  describe('<test prop:: value>  <test prop:: onChange> ', () => {
    it('should value Date is selected', () => {
      renderDatePickerView({ value: dateValue, precision: 'second', renderLabel: undefined })

      const cells = screen.getAllByRole('gridcell', { selected: true });
      dateArr.forEach((item, i) => {
        expect(cells[i]).toHaveTextContent(item.toString())
      })
    });
  });







  describe('<test prop:: precision> <test prop:: min> <test prop:: max> <test prop:: minuteStep>  ', () => {
    it.each([
      { precision: 'year', labels: ['year'] },
      { precision: 'month', labels: ['year', 'month'] },
      { precision: 'day', labels: ['year', 'month', 'day'] },
      { precision: 'hour', labels: ['year', 'month', 'day', 'hour'] },
      { precision: 'minute', labels: ['year', 'month', 'day', 'hour', 'minute'] },
      { precision: 'second', labels: ['year', 'month', 'day', 'hour', 'minute', 'second'] },
      { precision: 'week', labels: ['year', 'week'] },
      { precision: 'week-day', labels: ['year', 'week', 'week-day'] },
    ])('it should render $labels when precision = $precision', async ({ precision, labels }) => {

      renderDatePickerView({ precision })

      const columns = screen.getAllByRole('listbox')
      expect(columns).toHaveLength(labels.length)
      columns.forEach((column, index) => {
        expect(column).toHaveAccessibleName(new RegExp(labels[index], 'i'))
      })
    })
  });


  // describe('<test prop:: use12hours>', () => {
  //   it('should show 上午/下午 when precision is hour at least', () => {
  //     renderDatePicker({ precision: 'hour', use12hours: true })

  //     expect(screen.getByText('上午')).toBeInTheDocument()
  //     expect(screen.getByText('下午')).toBeInTheDocument()
  //   })
  //   it('should not show 上午/下午 when precision is less than hour', () => {
  //     renderDatePicker({ precision: 'day', use12hours: true })

  //     expect(screen.queryByText('上午')).not.toBeInTheDocument()
  //     expect(screen.queryByText('下午')).not.toBeInTheDocument()
  //   })
  // })

  describe('<test prop:: renderLabel>', () => {
    it('should custom render', () => {
      const { renderLabel } = renderDatePickerView({ min: dateValue, max: dateValue, precision: 'second' });

      expect(renderLabel.mock.calls).toEqual(
        expect.arrayContaining(
          [
            ['year', dateArr[0]],
            ['month', dateArr[1]],
            ['day', dateArr[2]],
            ['hour', dateArr[3]],
            ['minute', dateArr[4]],
            ['second', dateArr[5]],
          ]
        )
      )
    })
  })



  describe('<test prop:: filter> <test prop:: type> <test prop:: range>', () => {
    test('filter year/month/day/hour/minute/second', () => {
      const filterValue = {
        year: jest.fn((y: number, { date }: { date: Date }) => y % 2 === 0),
        month: jest.fn((m: number, { date }: { date: Date }) => m % 2 === 0),
        day: jest.fn((d: number, { date }: { date: Date }) => d % 3 === 0),
        hour: jest.fn((h: number, { date }: { date: Date }) => h % 4 === 0),
        minute: jest.fn((m: number, { date }: { date: Date }) => m % 6 === 0),
        second: jest.fn((s: number, { date }: { date: Date }) => s % 5 === 0),
      }
      const { getOptions } = renderDatePickerView({ min: new Date(2024, 0, 1), max: new Date(2034, 0, 1), precision: 'second', filter: filterValue })
      const years = getOptions('year')
      const months = getOptions('month')
      const days = getOptions('day')
      const hours = getOptions('hour')
      const minutes = getOptions('minute')
      const seconds = getOptions('second')

      expect(years).toHaveLength(6)
      expect(months).toHaveLength(6)
      expect(days).toHaveLength(9)
      expect(hours).toHaveLength(6)
      expect(minutes).toHaveLength(10)
      expect(seconds).toHaveLength(12)


    })
  })

  describe('<test prop:: clsPrefix>', () => {
    it('should contain mui clsPrefix default', async () => {
      renderDatePickerView({ value: dateValue })

      const element = screen.getByRole('listbox', { name: /year/i })
      expect(element).toHaveClass(/^mui/)
    });

  })

















})

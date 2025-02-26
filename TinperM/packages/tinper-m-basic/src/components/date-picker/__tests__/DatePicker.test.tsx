/** DatePicker.tsx */
import React, { useId } from 'react'
import { render, renderHook, screen, within } from '@testing-library/react';
import { DatePicker } from '@/index';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import { last, range } from 'lodash';
import type { DatePickerProps } from '../src/iDatePicker'
import { format, setDate, setHours, setMinutes, setMonth, setSeconds, setYear } from 'date-fns';
// const prefixButton = `${muiPrefix}-button`;


describe('DatePicker Component', () => {
  const dateValue = new Date('2024-01-08 13:12:25')
  const dateArr = [2024, 1, 8, 13, 12, 25]


  const renderDatePicker = (props: Partial<DatePickerProps> = {}) => {
    const {result: {current: fieldid}} = renderHook(useId)
    const onConfirm = jest.fn()
    const onSelect = jest.fn()
    const renderLabel = jest.fn()
    const children = jest.fn()
    const {container} = render(<DatePicker fieldid={fieldid} visible onConfirm={onConfirm} onSelect={onSelect} renderLabel={renderLabel} {...props}>{children}</DatePicker>)
    const getOptions =  (precision: string): HTMLElement[] => within(screen.getByRole('listbox', {name: new RegExp(precision,'i')})).getAllByRole('gridcell')
    const getOptionValues = (precision:string) => getOptions(precision).map(item => parseInt(item.textContent!))
    const getOptionByLabel = (precision: string, label: number | string) => within(screen.getByRole('listbox', {name: new RegExp(precision,'i')})).getByRole('gridcell', {name: new RegExp(label.toString())})
    return {
      container,
      user: userEvent.setup(),
      onConfirm,
      onSelect,
      children,
      renderLabel,
      getConfirmBtn: () => screen.getByRole('button', {name: /确定/}),
      getOptions,
      getOptionValues,
      getOptionByLabel,
      fieldid
    }

  }


  describe('<test prop:: defaultValue>', () => {
    it('should defaultValue Date is selected', () => {
      renderDatePicker({defaultValue: dateValue, precision: 'second', renderLabel: undefined})

      const cells = screen.getAllByRole('gridcell', {selected: true});
      dateArr.forEach((item, i) => {
        expect(cells[i]).toHaveTextContent(item)
      })
    });
  })

  describe('<test prop:: value>', () => {
    it('should value Date is selected', () => {
      renderDatePicker({value: dateValue, precision: 'second', renderLabel: undefined})

      const cells = screen.getAllByRole('gridcell', {selected: true});
      dateArr.forEach((item, i) => {
        expect(cells[i]).toHaveTextContent(item.toString())
      })
    });
  });



  describe('<test prop:: title>', () => {
    it('should show title', () => {
      const title = '时间选择'
      renderDatePicker({title})

      expect(screen.getByText(title)).toBeInTheDocument()
    })
  })

  describe('<test prop:: children>', () => {
    it('should render selected date value ', async () => {

      const {user, getConfirmBtn, children} = renderDatePicker({defaultValue:dateValue})

      await user.click(getConfirmBtn())

      expect(children.mock.calls[0][0]).toBe(dateValue)
    })
  })

  describe('<test prop:: precision>', () => {
    it.each([
      {precision: 'year' , labels: ['year']},
      {precision: 'month', labels: ['year', 'month']},
      {precision: 'day', labels: ['year', 'month', 'day']},
      {precision: 'hour', labels: ['year', 'month', 'day', 'hour']},
      {precision: 'minute', labels: ['year', 'month', 'day', 'hour', 'minute']},
      {precision: 'second', labels: ['year', 'month', 'day', 'hour', 'minute', 'second']},
      {precision: 'week', labels: ['year',  'week']},
      {precision: 'week-day', labels: ['year',  'week', 'week-day']},
    ])('it should render $labels when precision = $precision', async ({precision, labels}) => {

      renderDatePicker({precision})

      const columns = screen.getAllByRole('listbox')
      expect(columns).toHaveLength(labels.length)
      columns.forEach((column, index) => {
        expect(column).toHaveAccessibleName(new RegExp(labels[index],'i'))
      })
    })
  });


  describe('<test prop:: use12hours>', () => {
    it('should show 上午/下午 when precision is hour at least', () => {
      renderDatePicker({precision: 'hour', use12hours: true})

      expect(screen.getByText('上午')).toBeInTheDocument()
      expect(screen.getByText('下午')).toBeInTheDocument()
    })
    it('should not show 上午/下午 when precision is less than hour', () => {
      renderDatePicker({precision: 'day', use12hours: true})

      expect(screen.queryByText('上午')).not.toBeInTheDocument()
      expect(screen.queryByText('下午')).not.toBeInTheDocument()
    })
  })

  describe('<test prop:: renderLabel>', () => {
    it('should custom render', () => {
      const {renderLabel} = renderDatePicker({min: dateValue, max: dateValue, precision: 'second'});

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

  describe('<test prop:: minuteStep>', () => {
    it('should render minute interval', () => {
      const { getOptions } = renderDatePicker({minuteStep: 10, precision: 'minute'});

      const minuteOptions = getOptions('minute')
      expect(minuteOptions).toHaveLength(6)
    })

  })

  describe('<test prop:: disabled>', () => {
    it('should not render when disabled', () => {
      const { container } = renderDatePicker({disabled: true})

      expect(container).toBeEmptyDOMElement()
    })
  })
  describe('<test prop:: min> <test prop:: max>', () => {
    it.each([
      {min: '2024-01-01', max: '2024-01-01'},
      {min: '2024-01-01', max: '2025-05-15'},
    ])('should render from $min to $max', async ({min, max}) => {
      const [minYear, minMonth, minDay] = min.split('-')
      const [maxYear, maxMonth, maxDay] = max.split('-')
      const { getOptionValues, getOptions, user } = renderDatePicker({min, max, renderLabel: undefined, defaultValue: new Date("2024-12-12")});

      const yearRange = range(parseInt(minYear), parseInt(maxYear) + 1)
      const yearOptions = getOptions('year')
      const years = getOptionValues('year')
      expect(years).toHaveLength(yearRange.length)
      expect(yearRange).toEqual(years)

      const monthRange = range(parseInt(minMonth), parseInt(maxMonth) + 1)
      const months = getOptionValues('month')
      expect(months).toHaveLength(minYear === maxYear ? monthRange.length: 12)
      minYear === maxYear ? expect(monthRange).toEqual(months) : expect(range(1,13)).toEqual(months)
      if (maxYear > minYear) {
        await user.click(last(yearOptions)!)
        const months =  getOptionValues('month')
        expect(monthRange).toEqual(months)
      }

      const dayRange = range(parseInt(minDay), parseInt(maxDay) + 1)
      const days = getOptionValues('day')

      if (minMonth === maxMonth) {
        expect(dayRange).toEqual(days)
      }
      if (maxMonth > minMonth) {
        const monthOptions = getOptions('month')
        await user.click(last(monthOptions)!)
        const days =  getOptionValues('day')
        expect(dayRange).toEqual(days)
      }

    })

  })

  describe('<test prop:: filter> <test prop:: type> <test prop:: range>', () => {
    test('filter year/month/day/hour/minute/second', () => {
      const filterValue = {
        year: jest.fn((y:number, { date }: {date: Date}) => y % 2 === 0),
        month: jest.fn((m:number, { date }: {date: Date}) => m % 2 === 0),
        day: jest.fn((d:number, { date }: {date: Date}) => d % 3 === 0),
        hour: jest.fn((h: number, { date }: {date: Date}) => h % 4 === 0),
        minute: jest.fn((m: number, { date }: {date: Date}) => m % 6 === 0),
        second: jest.fn((s: number, { date }: {date: Date}) => s % 5 === 0),
      }
      const {getOptions} = renderDatePicker({min: new Date(2024, 0, 1), max: new Date(2034, 0, 1), precision: 'second', filter: filterValue})
      const years = getOptions('year')
      const months = getOptions('month')
      const days = getOptions('day')
      const hours = getOptions('hour')
      const minutes = getOptions('minute')
      const seconds = getOptions('second')

      expect(years).toHaveLength(6)
      expect(months).toHaveLength(6)
      // expect(days).toHaveLength(9)
      expect(hours).toHaveLength(6)
      expect(minutes).toHaveLength(10)
      expect(seconds).toHaveLength(12)


    })
  })

  describe('<test prop:: clsPrefix>', () => {
    it('should contain mui clsPrefix default', async () => {
       renderDatePicker({value: dateValue})

      const element = screen.getByRole('listbox', {name: /year/i})
      expect(element).toHaveClass(/^mui/)
    });

  })

  describe('<test prop:: fieldid>', () => {
    it('should contain fieldid', async () => {
      const {fieldid} = renderDatePicker()


      expect(screen.getByRole('button', {name: /确定/})).toHaveAttribute('fieldid', expect.stringContaining(fieldid))
      expect(screen.getByRole('button', {name: /取消/})).toHaveAttribute('fieldid', expect.stringContaining(fieldid))
    });
  })



  describe('<test prop:: onConfirm>', () => {
    it('should call onConfirm with selected date', async () => {
      const {user, getConfirmBtn, onConfirm} = renderDatePicker({value: dateValue});

      await user.click(getConfirmBtn())

      expect(format(onConfirm.mock.calls[0][0], 'yyyy-MM-dd')).toBe('2024-01-08')
    })
  })



  describe('<test prop:: onSelect>', () => {
    it.each(
      [
        {precision: 'year', label: '2026', expected: setYear(dateValue, 2026)},
        {precision: 'month', label: '4', expected: setMonth(dateValue, 3)},
        {precision: 'day', label: '14', expected: setDate(dateValue, 14)},
        {precision: 'hour', label: '11', expected: setHours(dateValue, 11)},
        {precision: 'minute', label: '22', expected: setMinutes(dateValue, 22)},
        {precision: 'second', label: '35', expected: setSeconds(dateValue, 35)},
      ]
    )('should call onSelect with select $label at $precision', async ({precision, label, expected}) => {
      const {user, getOptionByLabel, onSelect} = renderDatePicker({defaultValue: dateValue, precision: 'second', renderLabel: undefined});

      await user.click(getOptionByLabel(precision, label))
      await user.click(getOptionByLabel(precision, label))


      expect(onSelect).toHaveBeenCalledWith(expected)
    })
  })








})

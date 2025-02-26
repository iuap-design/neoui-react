/**Calendar.tsx */
import {render, renderHook, screen} from "@testing-library/react";
import {Calendar} from "@tinper/m";
import React, {useCallback, useId} from "react";
import userEvent from "@testing-library/user-event";
import {getDate, isToday, startOfMonth, startOfWeek} from "date-fns";
import {CalendarRef} from "../src/Calendar";

describe('Calendar Component', () => {


  describe('<test prop:: prevMonthButton>, <test prop:: nextMonthButton>, <test prop:: prevYearButton>, <test prop:: nextYearButton>', () => {
    it('should config prevMonth, nextMonth, prevYear and nextYear for header button', () => {
      const prevMonthText = '上一月';
      const nextMonthText = '下一月';
      const prevYearText = '上一年';
      const nextYearText = '下一年';

      render(<Calendar
        prevMonthButton={<span>{prevMonthText}</span>}
        nextMonthButton={<span>{nextMonthText}</span>}
        prevYearButton={<span>{prevYearText}</span>}
        nextYearButton={<span>{nextYearText}</span>}
      />)

      expect(screen.getByText(prevMonthText)).toBeInTheDocument();
      expect(screen.getByText(nextMonthText)).toBeInTheDocument();
      expect(screen.getByText(prevYearText)).toBeInTheDocument();
      expect(screen.getByText(nextYearText)).toBeInTheDocument();
    });

  });

  describe('<test prop:: selectionMode>', () => {
    it('should select one day when mode is single', async () => {
      const user = userEvent.setup()

      render(<Calendar
        selectionMode='single'
      />)
      await user.click(screen.getByRole('gridcell', {name: /18/i}))

      const selectedCell = screen.getByRole('gridcell', {selected: true})
      expect(selectedCell).toBeInTheDocument();
      expect(selectedCell).toHaveTextContent('18')
    });
    it('should select multiple days when mode is range', async () => {
      const user = userEvent.setup()

      render(<Calendar
        selectionMode='range'
      />)
      await user.click(screen.getByRole('gridcell', {name: /14/i}))
      await user.click(screen.getByRole('gridcell', {name: /15/i}))

      const selectedCells = screen.getAllByRole('gridcell', {selected: true})
      expect(selectedCells).toHaveLength(2)
      expect(selectedCells[0]).toHaveTextContent('14')
      expect(selectedCells[1]).toHaveTextContent('15')
    });

  });

  describe('<test prop:: weekStartsOn>', () => {
    it('should handle render Monday as the first day of week', () => {
      render(<Calendar weekStartsOn="Monday"/>)

      const result = screen.getAllByRole('gridcell')
      const expectedResult = getDate(startOfWeek(startOfMonth(new Date()), {weekStartsOn: 1}))
      expect(result[0]).toHaveTextContent(expectedResult.toString())
    });

  });

  describe('<test prop:: renderLabel>', () => {
    it('should handle custom label rendering', () => {
      render(<Calendar renderLabel={(date: Date) => {
        if (isToday(date)) return '今天'
      }}/>)

      expect(screen.getByRole('gridcell', {
        name: `${new Date().getDate()} 今天`
      })).toBeInTheDocument()
    });

  });
  describe('<test prop:: min>, <test prop:: max>', () => {
    it('should disabled outside of range from min to max', () => {
      const min = new Date()
      const max = new Date()
      min.setDate(12)
      max.setDate(20)

      render(<Calendar min={min} max={max}/>)

      expect(screen.getByRole('gridcell', {name: /21/i})).toHaveClass('mui-calendar-cell-disabled')
      expect(screen.getByRole('gridcell', {name: /11/i})).toHaveClass('mui-calendar-cell-disabled')
      expect(screen.getByRole('gridcell', {name: /12/i})).not.toHaveClass('mui-calendar-cell-disabled')
      expect(screen.getByRole('gridcell', {name: /20/i})).not.toHaveClass('mui-calendar-cell-disabled')
    });

  });

  describe('<test prop:: minPage>, <test prop:: maxPage>', () => {
    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth() + 1

    it('should disabled next month button when maxPage month equals to current, <test prop:: minPage>, <test prop:: maxPage>', async () => {
      const user = userEvent.setup()
      const minPage = {year: currentYear - 1, month: currentMonth}
      const maxPage = {year: currentYear, month: currentMonth + 1}

      render(<Calendar minPage={minPage} maxPage={maxPage}/>)

      const nextMonthButton = screen.getByRole('button', {name: /go to next month/i})

      expect(nextMonthButton).not.toHaveClass('mui-calendar-arrow-button-disabled')

      await user.click(nextMonthButton)

      expect(nextMonthButton).toHaveClass('mui-calendar-arrow-button-disabled')
      const expectedResult = `${currentYear}年${currentMonth + 1}月`
      expect(screen.getByText(expectedResult)).toBeInTheDocument()
    });

    it('should disabled next year button when maxPage year equals to current', async () => {
      const user = userEvent.setup()
      const minPage = {year: currentYear - 1, month: currentMonth}
      const maxPage = {year: currentYear, month: currentMonth + 1}

      render(<Calendar minPage={minPage} maxPage={maxPage}/>)

      const nextYearButton = screen.getByRole('button', {name: /go to next year/i})

      expect(nextYearButton).toHaveClass('mui-calendar-arrow-button-disabled')

      await user.click(nextYearButton)

      expect(nextYearButton).toHaveClass('mui-calendar-arrow-button-disabled')
      const expectedResult = `${currentYear}年${currentMonth}月`
      expect(screen.getByText(expectedResult)).toBeInTheDocument()
    });

    it('should disabled prev month button when minPage month equals to current', async () => {
      const user = userEvent.setup()
      const minPage = {year: currentYear, month: currentMonth - 1}
      const maxPage = {year: currentYear, month: currentMonth + 1}

      render(<Calendar minPage={minPage} maxPage={maxPage}/>)

      const prevMonthButton = screen.getByRole('button', {name: /go to prev month/i})

      expect(prevMonthButton).not.toHaveClass('mui-calendar-arrow-button-disabled')

      await user.click(prevMonthButton)

      expect(prevMonthButton).toHaveClass('mui-calendar-arrow-button-disabled')
      const expectedResult = `${currentYear}年${currentMonth - 1}月`
      expect(screen.getByText(expectedResult)).toBeInTheDocument()
    });

    it('should disabled prev year button when minPage year equals to current', async () => {
      const user = userEvent.setup()
      const minPage = {year: currentYear - 1, month: currentMonth}
      const maxPage = {year: currentYear, month: currentMonth + 1}

      render(<Calendar minPage={minPage} maxPage={maxPage}/>)

      const prevYearButton = screen.getByRole('button', {name: /go to prev year/i})

      expect(prevYearButton).not.toHaveClass('mui-calendar-arrow-button-disabled')

      await user.click(prevYearButton)

      expect(prevYearButton).toHaveClass('mui-calendar-arrow-button-disabled')
      const expectedResult = `${currentYear - 1}年${currentMonth}月`
      expect(screen.getByText(expectedResult)).toBeInTheDocument()
    });
  });

  describe('<test prop:: onPageChange>', () => {
    it.each([
      {buttonName: 'next month', expectedYear: 2024, expectedMonth: 4, description: 'current year and next month'},
      {buttonName: 'next year', expectedYear: 2025, expectedMonth: 3, description: 'next year and current month'},
      {buttonName: 'prev month', expectedYear: 2024, expectedMonth: 2, description: 'current year and prev month'},
      {buttonName: 'prev year', expectedYear: 2023, expectedMonth: 3, description: 'prev year and current month'},
    ])('should called onPageChange with $description', async ({ buttonName, expectedYear, expectedMonth }) => {
      const onPageChange = jest.fn()
      const user = userEvent.setup()
      render(<Calendar selectionMode='single'
                       onPageChange={onPageChange}
                       defaultValue='2024-03-11'/>);

      const button = screen.getByRole('button', {name: new RegExp(buttonName, 'i')})
      await user.click(button)

      expect(onPageChange).toHaveBeenCalledWith(expectedYear, expectedMonth)
    });
  });

  describe('<test prop:: renderDate>', () => {
    it('should render custom date', () => {
      const defaultRange: [Date, Date] = [
        new Date('2024-01-05'),
        new Date('2024-01-08'),
      ]
      const renderDate = jest.fn((date: Date) => <span>{date.getDate().toString().padStart(2, '0')}</span>)
      const { container } = render(<Calendar selectionMode='single'
        defaultValue={new Date(2024, 2, 11)}
 renderDate={renderDate}/>);

      expect(container).toMatchSnapshot()


    });
  });

  describe('<test prop:: allowClear>', () => {
    it('should allow clear by default', async () => {
      const user = userEvent.setup()
      render(<Calendar selectionMode='single'
                       defaultValue='2024-03-11'/>);

      const selectedCell = screen.getByRole('gridcell', {selected: true})

      expect(selectedCell).toHaveClass('mui-calendar-cell-selected')

      await user.click(selectedCell)

      expect(selectedCell).not.toHaveClass('mui-calendar-cell-selected')


    });

    it('should not allow clear when allowClear is false', async () => {
      const user = userEvent.setup()
      render(<Calendar selectionMode='single'
                       allowClear={false}
                       defaultValue='2024-03-11'/>);

      const selectedCell = screen.getByRole('gridcell', {selected: true})

      expect(selectedCell).toHaveClass('mui-calendar-cell-selected')

      await user.click(selectedCell)

      expect(selectedCell).toHaveClass('mui-calendar-cell-selected')


    });

  });

  describe('<test prop:: shouldDisableDate>', () => {
    it('should disabled date', () => {
      const shouldDisableDate = jest.fn(date => date.getDate() === 15);
      render(<Calendar selectionMode='single'
                       shouldDisableDate={shouldDisableDate}
                       defaultValue='2024-03-11'/>)

      expect(screen.getByRole('gridcell', {name: /15/i})).toHaveClass('mui-calendar-cell-disabled')
    });
  });

  describe('<test prop:: fieldid>', () => {
    it('should have fieldid for prev year button', () => {
      const {result: {current: fieldid}} = renderHook(useId)

      render(<Calendar fieldid={fieldid}/>)

      expect(screen.getByRole('button', {name: /prev year/i})).toHaveAttribute('fieldid', expect.stringContaining(fieldid))
    });

    it('should have fieldid for prev month button', () => {
      const {result: {current: fieldid}} = renderHook(useId)

      render(<Calendar fieldid={fieldid}/>)

      expect(screen.getByRole('button', {name: /prev month/i})).toHaveAttribute('fieldid', expect.stringContaining(fieldid))
    })

    it('should have fieldid for next month button ', () => {
      const {result: {current: fieldid}} = renderHook(useId)

      render(<Calendar fieldid={fieldid}/>)

      expect(screen.getByRole('button', {name: /next month/i})).toHaveAttribute('fieldid', expect.stringContaining(fieldid))
    });

    it('should have fieldid for next year button ', () => {
      const {result: {current: fieldid}} = renderHook(useId)

      render(<Calendar fieldid={fieldid}/>)

      expect(screen.getByRole('button', {name: /next year/i})).toHaveAttribute('fieldid', expect.stringContaining(fieldid))
    })
  });

  describe('<test prop:: clsPrefix>', () => {
    it('should have clsPrefix mui by default', () => {
      const {container} = render(<Calendar/>);

      expect(container.firstChild).toHaveClass(/^mui/i)
    });

    it('should have custom clasPrefix', () => {
      const {container} = render(<Calendar clsPrefix='test'/>);
      expect(container.firstChild).toHaveClass(/^test/i)
    });
  });


  it('should jump to a month, <test prop:: ref>', () => {
    const App = () => {
      const ref = useCallback((calendarRef: CalendarRef) => {
        calendarRef?.jumpTo({year: 2024, month: 4})
      }, [])
      return <Calendar ref={ref}/>
    }

    render(<App/>)

    const expectedResult = `2024年4月`
    expect(screen.getByText(expectedResult)).toBeInTheDocument()

  });


});

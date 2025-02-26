/**CalendarPickerView.tsx */
import { render, renderHook, screen, within } from "@testing-library/react";
import { Calendar, CalendarPickerView } from "@tinper/m";
import React, { useCallback, useId } from "react";
import userEvent from "@testing-library/user-event";
import {
  getDate,
  isToday,
  startOfDay,
  startOfHour,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { CalendarPickerViewProps } from "../src";

describe("CalendarPickerView Component <test prop:: shouldDisableDate>", () => {
  const renderCalendarPickerView = (
    props: Partial<CalendarPickerViewProps> = {}
  ) => {
    const user = userEvent.setup();
    const { container } = render(
      <CalendarPickerView  {...props} />
    );
    return {
      user,
      container,
    };
  };

  describe("<test prop:: title>", () => {
    it("should render title", () => {
      renderCalendarPickerView({ title: "title" });
      expect(screen.getByText("title")).toBeInTheDocument();
    });
  });
  describe("<test prop:: renderDate>", () => {
    it("should render custom date", () => {
      const renderDate = jest.fn((date: Date) =>
        date.getDate().toString().padStart(2, "0")
      );
      renderCalendarPickerView({
        renderDate,
        min: "2024-01-01",
        max: "2024-01-30",
      });

      expect(screen.getByRole("gridcell", { name: /01/i })).toBeInTheDocument();
    });
  });

  describe("<test prop:: renderTop>", () => {
    const renderTop = jest.fn((date: Date) => "top");
    it("should render custom top", () => {
      renderCalendarPickerView({
        renderTop,
        min: "2024-01-01",
        max: "2024-01-31",
      });

      const gridCell = screen.getByRole("gridcell", { name: /20/i });
      expect(within(gridCell).getByText("top")).toBeInTheDocument();
    });

    it("should call with date", () => {
      const min = startOfDay(new Date("2024-03-01"));

      renderCalendarPickerView({
        renderTop,
        min,
      });

      expect(renderTop.mock.calls.flat()).toContainEqual(min);
    });
  });

  describe("<test prop:: renderBottom>", () => {
    const renderBottom = jest.fn((date: Date) => "bottom");

    it("should render custom bottom", () => {
      renderCalendarPickerView({
        renderBottom,
        min: "2024-01-01",
        max: "2024-01-31",
      });

      const gridCell = screen.getByRole("gridcell", { name: /20/i });
      expect(within(gridCell).getByText("bottom")).toBeInTheDocument();
    });

    it("should call with date", () => {
      const min = startOfDay(new Date("2024-03-01"));

      renderCalendarPickerView({
        renderBottom,
        min,
      });

      expect(renderBottom.mock.calls.flat()).toContainEqual(min);
    });
  });

  describe("<test prop:: allowClear>", () => {
    it("shoud allow clear by default", async () => {
      const { user } = renderCalendarPickerView({
        min: "2024-01-01",
        max: "2024-01-30",
      });

      const gridCell = screen.getByRole("gridcell", { name: /11/i });
      await user.click(gridCell);

      expect(gridCell).toHaveClass(/selected/);

      await user.click(gridCell);

      expect(gridCell).not.toHaveClass(/selected/);
    });

    it("shoud disabled clear when allowClear is false", async () => {
      const { user } = renderCalendarPickerView({
        allowClear: false,
        min: "2024-01-01",
        max: "2024-01-30",
      });

      const gridCell = screen.getByRole("gridcell", { name: /11/i });
      await user.click(gridCell);

      expect(gridCell).toMatchSnapshot();

      await user.click(gridCell);

      expect(gridCell).toMatchSnapshot();
    });
  });

  describe("<test prop:: min> <test prop:: max>", () => {
    it("should render clickable date from min to max", () => {
      const { container } = renderCalendarPickerView({
        min: "2024-01-01",
        max: "2024-01-05",
      });

      expect(container).toMatchSnapshot();
    });

    it("should render only one clickable date when min = max", () => {
      const { container } = renderCalendarPickerView({
        min: "2024-01-01",
        max: "2024-01-01",
      });

      expect(container).toMatchSnapshot();
    });

    it('should not render any clickable date when min > max', () => {
        const { container } = renderCalendarPickerView({
   min: "2024-02-01",
   max: "2024-01-01",
 });
      expect(container).toMatchSnapshot();
    });
  });



  describe("<test prop:: weekStartsOn>", () => {
    it("should render week start on Monday", () => {
      const { container } = renderCalendarPickerView({
        weekStartsOn: "Monday",
        min: "2024-01-01",
        max: "2024-04-1",
      });
      expect(container).toMatchSnapshot();
    });
  });
  describe('<test prop:: fieldid>', () => {


    it('should render fieldid', () => {
    const {
      result: { current: fieldid },
    } = renderHook(useId);
      const { container } = renderCalendarPickerView({ fieldid })

      expect(container.firstElementChild).toHaveAttribute('fieldid', fieldid)
    })
  })

    describe("<test prop:: clsPrefix>", () => {
      it("should have clsPrefix mui by default", () => {
        const { container } = render(<CalendarPickerView />);

        expect(container).toMatchSnapshot()
      });

      it("should have custom clasPrefix", () => {
        const { container } = render(<CalendarPickerView clsPrefix="test" />);

         expect(container).toMatchSnapshot();
      });
    });

});

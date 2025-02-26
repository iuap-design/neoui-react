/** Selector.tsx */
import React from 'react'


import {render, screen} from "@testing-library/react";
import {Selector} from "@tinper/m";
import {fieldNamesOptions, options} from "@components/selector/demos/options";
import {SelectorProps, type SelectorValue} from "@components/selector/src";
import userEvent from "@testing-library/user-event";

describe('Selector Component ', () => {
  const renderSelector = <T extends SelectorValue>(props: Partial<SelectorProps<T>> = {}) => {
    const onChange = jest.fn();
    const {container} = render(<Selector options={options} onChange={onChange} {...props} />);
    const user = userEvent.setup()
    return {
      getSelectedOptions: () => screen.getAllByRole('option', {selected: true}),
      getOptionByLabel: (label: string) =>  screen.getByRole('option', {name: label}),
      getOptions: () => screen.getAllByRole('option'),
      user,
      selectOption: (index: number) => user.click(screen.getByText(options[index].label)),
      notSelected: () => screen.queryAllByRole('option', {selected: true}).length === 0,
      selector: container.firstElementChild,
      onChange,
      container
    }
  }
  it('should single selection by default <test prop:: defaultValue> <test prop:: onChange>', async () => {
    const {getSelectedOptions, selectOption, notSelected, onChange} = renderSelector({
      defaultValue: [options[0].value]
    })

    expect(getSelectedOptions()).toHaveLength(1)


    await selectOption(1)

    expect(getSelectedOptions()).toHaveLength(1)
    expect(onChange.mock.lastCall[0]).toEqual([options[1].value])
    expect(onChange.mock.lastCall[1].items).toEqual([options[1]])

    await selectOption(1)

    expect(notSelected()).toBe(true)
    expect(onChange.mock.lastCall[0]).toEqual([])
    expect(onChange.mock.lastCall[1].items).toEqual([])

  });

  it('should be controlled <test prop:: value> <test prop:: options>', async () => {
    const {getOptionByLabel, selectOption, notSelected, onChange} = renderSelector({
      value: [options[0].value]
    })

    await selectOption(1)

    expect(getOptionByLabel(options[0].label)).toHaveClass(/active/)



  });

  it('should multiple selection <test prop:: multiple>', async () => {
    const {getSelectedOptions, selectOption, onChange} = renderSelector({
      defaultValue: [options[0].value, options[1].value],
      multiple: true
    })

    await selectOption(2)

    expect(getSelectedOptions()).toHaveLength(3)

    await selectOption(1)

    expect(getSelectedOptions()).toHaveLength(2)

    await selectOption(1)

    expect(getSelectedOptions()).toHaveLength(3)


  });

  it('should be fixed width <test prop:: widthAdjustment>', () => {
    const {selector} = renderSelector({widthAdjustment: 'fixed', style: {'--item-width': '200px'}});
    expect(selector).toMatchSnapshot()
  });

  it('width should be determined by the content <test prop:: widthAdjustment>', () => {
    const {selector} = renderSelector({widthAdjustment: 'auto'});
    expect(selector).toMatchSnapshot()
  });

  it('should be 2 columns <test prop:: columns>', () => {
    const {selector} = renderSelector({columns: 2});
    expect(selector).toMatchSnapshot()
  });

  it('should be disabled <test prop:: disabled>', async () => {
    const {getOptions, selectOption} = renderSelector({disabled: true});
    const options = getOptions()

    options.forEach(option => {
      expect(option).toHaveClass(/disabled/)
    })

    await selectOption(2)

    expect(options[2]).toHaveClass(/disabled/)
  });

  it('the FieldName should be customized <test prop:: fieldNames>', () => {
    const { getOptionByLabel } = renderSelector({
      options: fieldNamesOptions,
      defaultValue: [fieldNamesOptions[1].valueT],
      fieldNames: {
        label: 'labelT',
        value: 'valueT',
        disabled: 'disabledT',
      }
    });

    fieldNamesOptions.forEach(option => {
      expect(screen.getByText(option.labelT)).toBeInTheDocument()
    })

    expect(getOptionByLabel(fieldNamesOptions[1].labelT)).toHaveClass(/active/)

    expect(getOptionByLabel(fieldNamesOptions[2].labelT)).toHaveClass(/disabled/)

  });

  it('should render description', () => {
    renderSelector({
      options: [
        {
          label: '选项1',
          description: '描述信息',
          value: '1',
        }]
    })

    expect(screen.getByText('描述信息')).toBeInTheDocument()
  });

  it('should not render checkMark <test prop:: showCheckMark>', () => {
     const { getSelectedOptions } = renderSelector({showCheckMark: false, defaultValue: [options[0].value]});

    expect(getSelectedOptions()[0]).toMatchSnapshot()
  });

  it('should contain fieldid <test prop:: fieldid>', () => {
    const fieldid = 'fieldid-selector'
    const { selector } = renderSelector({fieldid});

    expect(selector).toHaveAttribute('fieldid', fieldid)

  });

  it('should contain clsPrefix <test prop:: clsPrefix>', () => {

    const { container } = renderSelector({ clsPrefix: 'clsPrefix' });

    expect(container.firstElementChild).toHaveClass(/clsPrefix/i)

  });


})

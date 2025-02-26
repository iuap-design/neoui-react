import React from 'react';
import Calendar from './Calendar';
import { CalendarProps } from './iCalendar';
import SwitchYearHeader from './SwitchYearHeader';
import {WithConfigConsumer} from "../../wui-provider/src/context";
import generate from './Generate';
const {generateM} = generate;

@WithConfigConsumer({name: 'calendar'})
class CalendarWrapper extends React.Component<Partial<CalendarProps<null>>> {
    static SwitchYearHeader = SwitchYearHeader;
    render() {
        let {value, defaultValue, scrollIntoValue, defaultScrollIntoValue, ...others} = this.props
        const valueProps: {
            value?: Partial<CalendarProps<null>>['value'];
            defaultValue?: Partial<CalendarProps<null>>['defaultValue'];
            scrollIntoValue?: Partial<CalendarProps<null>>['scrollIntoValue'];
            defaultScrollIntoValue?: Partial<CalendarProps<null>>['defaultScrollIntoValue'];
        } = {};
        if (value) {
            valueProps.value = Array.isArray(value) ? value.map(v => generateM()(v.format())) : generateM()(value.format());
        }
        if (defaultValue) {
            valueProps.defaultValue = Array.isArray(defaultValue) ? defaultValue.map(v => generateM()(v.format())) : generateM()(defaultValue?.format());
        }
        if (scrollIntoValue) {
            valueProps.scrollIntoValue = generateM()(scrollIntoValue.format());
        }
        if (defaultScrollIntoValue) {
            valueProps.defaultScrollIntoValue = generateM()(defaultScrollIntoValue.format());
        }
        return <Calendar {...valueProps} {...others}></Calendar>
    }
}
CalendarWrapper.SwitchYearHeader = SwitchYearHeader;

export default CalendarWrapper;

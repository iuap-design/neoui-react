import React from 'react';
// import {sliderPropTypes} from './common/createSlider';
import createSliderWithTooltip from './createSliderWithTooltip';
import Handle from './Handle';
import Range from './Range';
import Slider from './Slider';
import type {CommonSliderProps, ComponentWrapperProps, SliderSingProps} from './iSlider'
import { WithConfigConsumer } from '../../wui-provider/src/context';

import type { ConfigConsumerProps} from '../../wui-provider/src/iProvider'
import { ConfigConsumer } from '../../wui-provider/src/context';
import omit from 'omit.js';
import type {RangeProps} from './iSlider'


class DemoRange extends React.Component<Partial<RangeProps>> {
    constructor(props: Partial<RangeProps>) {
        super(props);
    }
    render() {

        return <ConfigConsumer>
            {
                (configProps: ConfigConsumerProps)=>{
                    return <Range {...omit(configProps, ["getPrefixCls", "renderEmpty", "provider"])} {...this.props}/>;
                }
            }
        </ConfigConsumer>

    }
}
// const propTypes = {...sliderPropTypes}

// Slider.Range = Range;
// Slider.Handle = Handle;
// Slider.createSliderWithTooltip = createSliderWithTooltip;

const SliderRangeTooltip = createSliderWithTooltip(Range);
const SliderTooltip = createSliderWithTooltip(Slider);

@WithConfigConsumer({name: "slider"})
class SliderComponents extends React.Component<CommonSliderProps & ComponentWrapperProps> {
    static Range: typeof Range;
    static Handle: typeof Handle;
    static createSliderWithTooltip: typeof createSliderWithTooltip;
    render() {
        const {
            range,
            tipFormatter,
            getTooltipPopupContainer,
		    tooltipPlacement,
		    tooltipVisible,
            tooltip,
            ...others
        } = this.props;
        const tooltipProps = {
            tipFormatter: tipFormatter === undefined ? tooltip?.formatter : tipFormatter,
            getTooltipPopupContainer: getTooltipPopupContainer === undefined ? tooltip?.getPopupContainer : getTooltipPopupContainer,
            tooltipPlacement: tooltipPlacement === undefined ? tooltip?.placement : tooltipPlacement,
            tooltipVisible: tooltipVisible === undefined ? tooltip?.open : tooltipVisible,
        }
        if (this.props && this.props.hasOwnProperty('range') && range && (this.props.hasOwnProperty('tipFormatter') || tooltip !== undefined)) {
            return (
                <SliderRangeTooltip range {...tooltipProps} {...others} />
            )
        } else if (this.props && this.props.hasOwnProperty('range') && range) {
            return (
                <DemoRange range {...others} />
            )
        } else if (this.props && (this.props.hasOwnProperty('tipFormatter') || tooltip !== undefined)) {
            return (
                <SliderTooltip {...tooltipProps} {...others} />
            )
        } else {
            return (
                <Slider {...others} />
            )
        }
    }
}


SliderComponents.Range = DemoRange;
SliderComponents.Handle = Handle;
SliderComponents.createSliderWithTooltip = createSliderWithTooltip;
// SliderComponents.propTypes = propTypes;

interface CompoundedComponent extends React.ComponentClass<SliderSingProps> {
    Range: typeof Range;
    Handle: typeof Handle;
    createSliderWithTooltip: typeof createSliderWithTooltip;
}

export default SliderComponents as CompoundedComponent;


/**
 * This source code is quoted from rc-slider.
 * homepage: https://github.com/react-component/slider
 */
// import PropTypes from 'prop-types';
import React from 'react';
import {findDOMNode} from 'react-dom';
import Tooltip from '../../wui-tooltip/src';
// import {sliderPropTypes} from './common/createSlider';
// import Tooltip from '../../wui-tooltip/src2';
// import Tooltip from 'bee-tooltip';
import Handle from './Handle';
import type { GenericSliderProps, ComponentWrapperProps, ComponentWrapperState, HandleProps} from './iSlider';

function createSliderWithTooltip<Props extends GenericSliderProps>(
    Component: React.ComponentClass<Props>,
) {
    return class ComponentWrapper extends React.Component<
    ComponentWrapperProps & React.ComponentProps<typeof Component>,
    ComponentWrapperState
  > {
        /* static propTypes = {
		    ...sliderPropTypes,
		    tipFormatter: PropTypes.func,
		    handleStyle: PropTypes.arrayOf(PropTypes.object),
		    tipProps: PropTypes.object,
		}; */

		static defaultProps = {
		    tipFormatter(value: number) {
		        return value;
		    },
		    handleStyle: [{}],
		    tipProps: {},
		};

		handlesRefs: {[key: number]: Handle};
		tooltipRef: any;

		constructor(props: ComponentWrapperProps & React.ComponentProps<typeof Component>) {
		    super(props);
		    this.state = {visibles: {}, index: undefined};
		    this.handlesRefs = {};
		    this.tooltipRef = {};
		}

		componentDidMount() {
		    this.updateTooltipPosition();
		}

		componentDidUpdate() {
		    this.updateTooltipPosition();
		}

		updateTooltipPosition() {
		    const {index} = this.state
		    if (this.tooltipRef[index]) {
		        this.tooltipRef[index].forcePopupAlign && this.tooltipRef[index].forcePopupAlign();
		    }
		}

		getDefaultPosition() {
		    return document.body
		}

		handleTooltipVisibleChange = (index: number, visible: boolean) => {
		    this.setState((prevState: ComponentWrapperState) => {
		        return {
		            visibles: {
		                ...prevState.visibles,
		                [index]: visible,
		            },
		            index
		        };
		    });
		}

		saveHandle(index: number, handle: Handle) {
		    this.handlesRefs[index] = handle;
		}

		getDOMNode(index: number) {
		    return findDOMNode(this.handlesRefs[index])
		}

		handleWithTooltip = ({value, dragging, index, disabled, ...restProps}: HandleProps & {index: number, value: number}) => {
		    const {
		        tipFormatter,
		        tipProps,
		        handleStyle,
		        getTooltipPopupContainer,
		        tooltipPlacement = 'top',
		        tooltipVisible,
		    } = this.props;
		    const {
		        prefixCls = 'u-slider-tooltip',
		        overlay = tipFormatter(value),
		        ...restTooltipProps
		    } = tipProps;
		    try {
		        !(document as any).documentMode && this.updateTooltipPosition(); // 解决IE浏览器下卡顿问题
		    } catch (e) {
		        // console.log(e)
		    }

		    const isVisible = () => {
		        if (this.props.hasOwnProperty('tooltipVisible')) {
		            return tooltipVisible;
		        } else {
		            return (!disabled && (this.state.visibles[index] || dragging));
		        }
		    }

		    return (
		        <Tooltip
		            {...restTooltipProps}
		            className={prefixCls}
		            overlay={overlay}
		            shouldUpdatePosition={true}
		            visible={isVisible()}
		            key={index}
		            ref={ref => this.tooltipRef[index] = ref}
		            // getPopupContainer={() => this.getDOMNode(index)}
		            placement={tooltipPlacement}
		            getPopupContainer={getTooltipPopupContainer || this.getDefaultPosition}
		        >
		            <Handle
		                {...restProps}
		                style={{
		                    ...handleStyle[0],
		                }}
		                ref={(ref: Handle) => this.saveHandle(index, ref)}
		                value={value}
		                onMouseEnter={() => this.handleTooltipVisibleChange(index, true)}
		                onMouseLeave={() => this.handleTooltipVisibleChange(index, false)}
		            />
		        </Tooltip>
		    );
		}

		render() {
		    return <Component {...this.props} handle={this.handleWithTooltip}/>;
		}
    };
}

export default createSliderWithTooltip as any;
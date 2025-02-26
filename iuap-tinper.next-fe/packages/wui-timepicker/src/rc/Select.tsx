// /* eslint jsx-a11y/no-noninteractive-element-to-interactive-role: 0 */
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import classnames from 'classnames';
import type {ReactInstance, MouseEventHandler} from 'react';
import type {RCSelectProps} from './iRCTimePicker';
// import PropTypes from 'prop-types';

const scrollTo = (element: HTMLElement, to: number, duration: number) => {
    const requestAnimationFrame =
        window.requestAnimationFrame ||
        function requestAnimationFrameTimeout() {
            return setTimeout(arguments[0], 10); // eslint-disable-line
        };
    // jump to target if duration zero
    if (duration <= 0) {
        element.scrollTop = to;
        return;
    }
    const difference = to - element.scrollTop;
    const perTick = (difference / duration) * 10;

    requestAnimationFrame(() => {
        element.scrollTop += perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    });
};

class Select extends Component<RCSelectProps> {
    /* static propTypes = {
        prefixCls: PropTypes.string,
        options: PropTypes.array,
        selectedIndex: PropTypes.number,
        width: PropTypes.number,
        type: PropTypes.string,
        onSelect: PropTypes.func,
        onMouseEnter: PropTypes.func
    }; */

    state = {
        active: false
    };
    private list!: ReactInstance;

    componentDidMount() {
        // jump to selected option
        this.scrollToSelected(0);
    }

    componentDidUpdate(prevProps: RCSelectProps) {
        const {selectedIndex} = this.props;
        // smooth scroll to selected option
        if (prevProps.selectedIndex !== selectedIndex) {
            this.scrollToSelected(120);
        }
    }

    onSelect = (value: string) => {
        const {onSelect, type} = this.props;
        onSelect(type, value);
    };

    getOptions() {
        const {options, selectedIndex, prefixCls} = this.props;
        return options.map((item, index) => {
            const cls = classnames({
                [`${prefixCls}-select-option-selected`]: selectedIndex === index,
                [`${prefixCls}-select-option-disabled`]: item.disabled
            });
            const onClick = item.disabled
                ? undefined
                : () => {
                    this.onSelect(item.value);
                };
            return (
                <li role='button' onClick={onClick} className={cls} key={index}>
                    {item.value}
                </li>
            );
        });
    }

    handleMouseEnter: MouseEventHandler<HTMLDivElement> = e => {
        const {onMouseEnter} = this.props;
        this.setState({active: true});
        onMouseEnter(e);
    };

    handleMouseLeave = () => {
        this.setState({active: false});
    };

    saveList = (node: HTMLUListElement) => {
        this.list = node;
    };

    scrollToSelected(duration: number) {
        // move to selected item
        const {selectedIndex} = this.props;
        const select = ReactDom.findDOMNode(this) as HTMLElement;
        const list = ReactDom.findDOMNode(this.list) as HTMLElement;
        if (!list) {
            return;
        }
        let index = selectedIndex;
        if (index < 0) {
            index = 0;
        }
        const topOption = list.children[index];
        const to = (topOption as HTMLElement).offsetTop;
        select && scrollTo(select, to, duration);
    }

    render() {
        const {prefixCls, options, width} = this.props;
        const {active} = this.state;
        if (options.length === 0) {
            return null;
        }
        const cls = classnames(`${prefixCls}-select`, {
            [`${prefixCls}-select-active`]: active
        });
        return (
            <div
                className={cls}
                style={{width: width}} // Input的宽度传给选项的容器div added by: gx
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <ul ref={this.saveList}>{this.getOptions()}</ul>
            </div>
        );
    }
}

export default Select;

import React, {Component} from 'react';
import {WebUI, getNid} from "../../wui-core/src/index"
import Icon from '../../wui-icon/src';
import { BackTopProps } from './iBackTop';
import { WithConfigConsumer } from '../../wui-provider/src/context';

// const propTypes = {
//     visibilityHeight: PropTypes.number,
//     click: PropTypes.func,
//     target: PropTypes.func,
//     fieldid: PropTypes.string,
//     character: PropTypes.element
// };
const defaultProps: BackTopProps = {
    visibilityHeight: 400,
    click: () => {
    },
    target: () => window,
    character: <Icon type="uf-top-up"/>
};
@WithConfigConsumer()
@WebUI({name: "back-top", defaultProps})
class BackTop extends Component<BackTopProps, {show: boolean}> {
    static defaultProps = defaultProps;
    constructor(props: BackTopProps) {
        super(props);
        this.state = {
            show: false
        };
        this.click = this.click.bind(this);
        this.scroll = this.scroll.bind(this);
    }

    componentDidMount() {
        this.scroll();
    }

    scroll() {
        let that = this;
        (this.props.target() as HTMLElement).onscroll = function() {
            if (((that.props.target() as Window).scrollY || (that.props.target() as HTMLElement).scrollTop) >= that.props.visibilityHeight) {
                that.setState({
                    show: true
                })
            } else {
                that.setState({
                    show: false
                });
            }
        }
    }

    click() {
        let height = (this.props.target() as Window).scrollY || (this.props.target() as HTMLElement).scrollTop;
        let timer = (height: number) => {
            let that = this;
            let h = Math.floor(height / 3);
            that.props.target().scrollTo ? that.props.target().scrollTo(0, h) : (this.props.target() as HTMLElement).scrollTop = h;
            if (h > 0) {
                window.clearInterval((window as any).backTopTimer);
                (window as any).backTopTimer = window.setInterval(() => {
                    timer(h);
                }, 90);
            } else {
                this.setState({
                    show: false
                });
                window.clearInterval((window as any).backTopTimer);
                return;
            }
        };
        timer(height);
        this.props.click();
    }

    render() {
        // 使用了 others不能包含 visibilityHeight click character
        // eslint-disable-next-line no-unused-vars
        let {className, children, visibilityHeight, click, target, character, clsPrefix, fieldid, dir, ...others} = this.props;
        className = className ? className : '';
        className = !this.state.show ? `${clsPrefix} ${clsPrefix}-hide ` + (target() === window ? '' : `${clsPrefix}-dom `) + className : `${clsPrefix} ` + (target() === window ? '' : `${clsPrefix}-dom `) + className;
        let adapterNid = getNid(this.props)
        return (
            <span {...others} fieldid={fieldid} className={className} onClick={this.click} {...adapterNid}>
                {children ? children : this.props.character}
            </span>
        )
    }
}

// BackTop.propTypes = propTypes;
export default BackTop as React.ComponentClass<Partial<BackTopProps>>;

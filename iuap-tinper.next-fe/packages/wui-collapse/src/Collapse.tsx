import classNames from 'classnames';
// import PropTypes from 'prop-types';
import omit from "omit.js";
import React, {cloneElement} from 'react';
import {createChainedFunction} from '../../wui-core/src';
import {WebUI, getNid} from "../../wui-core/src/index"
import Collapse from './Panel';

import { CollapseProps, CollapseState } from './iCollapse'
// const propTypes = {
//     // 是否是手风琴效果
//     accordion: PropTypes.bool,
//     // 激活的项
//     activeKey: PropTypes.any,
//     // 默认的激活的项
//     defaultActiveKey: PropTypes.any,
//     // 选中函数
//     onSelect: PropTypes.func,
//     role: PropTypes.string,
//     bordered: PropTypes.bool,
//     ghost: PropTypes.bool,
//     expandIconPosition: PropTypes.string,
//     className: PropTypes.string,
//     style: PropTypes.object,
//     collapsible: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
//     expandIcon: PropTypes.any,
//     destroyInactivePanel: PropTypes.bool,
//     bodyClassName: PropTypes.string,
//     fieldid: PropTypes.string
// };

const defaultProps = {
    accordion: false,
    bordered: false,
    ghost: false,
    expandIconPosition: 'left',
    activeKey: null,
    defaultActiveKey: null,
    className: '',
    style: {},
    onSelect: null,
    collapsible: '',
    expandIcon: null,
    destroyInactivePanel: false
};

// TODO: Use uncontrollable.
@WebUI({name: "collapse-group", defaultProps})
class CollapseGroup extends React.Component<CollapseProps, CollapseState> {
    static Panel = Collapse
    constructor(props: CollapseProps, context: any) {
        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            activeKey: props.defaultActiveKey || props.activeKey,
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps: CollapseProps) {
        if ('activeKey' in nextProps && nextProps.activeKey != this.props.activeKey) {
            this.setState({
                activeKey: nextProps.activeKey
            })
        }
    }

    handleSelect(key: string, expandedFlag: boolean, e: React.MouseEvent<HTMLElement>) {
        e?.preventDefault();

        if (this.props.onSelect) {
            this.props.onSelect(key, e);
        }

        // if (this.state.activeKey === key) {
        //   key = null;
        // }
        if (this.props.activeKey) {
            return
        }
        if (this.props.accordion) {
            this.setState({activeKey: key});
            return
        }
        let expandedFlagArr = []
        // 点击展开面板时，将key存数组中，收起时从数组中删除当前key，更新activeKey
        if (!expandedFlag) {
            expandedFlagArr.push(key)
            if (typeof this.state.activeKey == 'string' || typeof this.state.activeKey == 'number') {
                expandedFlagArr.push(this.state.activeKey)
            } else {
                if (this.state.activeKey) {
                    expandedFlagArr = [...expandedFlagArr, ...this.state.activeKey]
                } else {
                    expandedFlagArr = [...expandedFlagArr]
                }

            }
            this.setState({activeKey: expandedFlagArr})
        } else {
            if (typeof this.state.activeKey == 'string' || typeof this.state.activeKey == 'number') {
                expandedFlagArr.push(this.state.activeKey)
            } else {
                expandedFlagArr = [...(this.state.activeKey as string[])]
            }
            let setArr = new Set(expandedFlagArr)
            // Array.from(setArr)
            // expandedFlagArr = Array.from(setArr)
            expandedFlagArr = [...setArr]
            // expandedFlagArr = expandedFlagArr.splice(expandedFlagArr.findIndex(item => item == key), 1)
            let copyArr: any[] = []
            expandedFlagArr.forEach(item => {
                if (item != key) {
                    copyArr.push(item)
                }
            })
            this.setState({activeKey: copyArr});
        }
        // this.setState({ activeKey: expandedFlagArr });
        // this.setState({ activeKey: key });
    }

    render() {
        const {
            accordion,
            // activeKey: propsActiveKey,
            className,
            children,
            defaultActiveKey,
            // onSelect,
            // style,
            clsPrefix,
            bordered,
            ghost,
            expandIconPosition,
            collapsible,
            expandIcon,
            destroyInactivePanel,
            bodyClassName,
            fieldid,
            type,
            ...others
        } = this.props;


        let activeKey: any;
        if (accordion) {
            // activeKey = propsActiveKey != null ?
            //   propsActiveKey : this.state.activeKey;
            if (this.state.activeKey) {
                if (Array.isArray(this.state.activeKey)) {
                    activeKey = this.state.activeKey[0]
                } else {
                    activeKey = this.state.activeKey;
                }
            }
            others.role = others.role || 'tablist';
        } else {
            if ((typeof this.state.activeKey == 'string') || (typeof this.state.activeKey == 'number')) {
                let arr = []
                arr.push(this.state.activeKey.toString())
                activeKey = arr
            } else {
                if (this.state.activeKey) {
                    activeKey = this.state.activeKey
                } else {
                    activeKey = []
                }
            }
        }

        let classes = {
            [`${clsPrefix}`]: true
        };
        // classes[`${clsPrefix}`] = true;
        let adapterNid = getNid(this.props)

        return (
            <div
                // {...others}
                {...omit(others, ["activeKey", "onSelect", "style", "onChange"])}
                className={classNames(className, classes)}
                style={this.props.style}
                fieldid={fieldid}
                {...adapterNid}
            >
                {React.Children.map(children, child => {
                    if (!React.isValidElement(child)) {
                        return child;
                    }
                    let paneKey = child.key === null ? child.props.eventKey : child.key
                    let childrenExpanded = child.props.expanded
                    const childProps = {
                        style: child.props.style,
                        bordered,
                        ghost,
                        expandIconPosition,
                        headerRole: 'tab',
                        panelRole: 'tabpanel',
                        // collapsible: true,
                        collapsible,
                        eventKey: paneKey,
                        expanded: childrenExpanded != undefined ? childrenExpanded : activeKey?.includes(paneKey), // 子组件传入expanded时优先级高于activekey
                        parentFlag: true,
                        parentActiveKey: this.props.activeKey,
                        defaultActiveKey,
                        expandIcon,
                        destroyInactivePanel,
                        bodyClassName,
                        fieldid,
                        onSelect: createChainedFunction(
                            this.handleSelect, child.props.onSelect
                        )
                    };
                    let typeProps = {}
                    if (type) {
                        typeProps = {
                            type
                        }
                    }
                    Object.assign(childProps, typeProps)

                    if (accordion) {
                        Object.assign(childProps, {
                            // headerRole: 'tab',
                            // panelRole: 'tabpanel',
                            collapsible,
                            accordion,
                            parentFlag: true,
                            // expandIcon,
                            expanded: paneKey === activeKey,
                        });
                    }

                    return cloneElement(child, childProps);
                })}
            </div>
        );
    }
}

// CollapseGroup.propTypes = propTypes;
// CollapseGroup.defaultProps = defaultProps;
// CollapseGroup.Panel = Collapse;

export default CollapseGroup;

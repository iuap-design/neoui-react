// export default from './Tabs';
// 20181211animated，scrollAnimated（ScrollableTabBarMixin），inkBarAnimated（InkTabBarMixin）都是默认为true的
// 去掉所有的动画
import React from "react";
// import PropTypes from 'prop-types';
import {Warning} from "../../wui-core/src";
import SearchTabs from './SearchTabs';
import Tab from './Tab'
import {Tabs as TabsInner} from './Tabs';
import { EntranceProps } from './iTabs'
import { WithConfigConsumer } from "../../wui-provider/src/context";

const {isShouldUpdate} = Warning;

// const propTypes = {
//     extraContent: PropTypes.any,
//     tabBarExtraContent: PropTypes.any,
//     tabPosition: PropTypes.any,
//     tabBarPosition: PropTypes.any,
//     tabBarStyle: PropTypes.any,
//     style: PropTypes.func,
//     type: PropTypes.string
// }

@WithConfigConsumer({name: "tabs"})
class Tabs extends React.Component<EntranceProps> {
    static SearchTabs = SearchTabs
    static TabPane = TabsInner.TabPane

    render() {
        const {
            extraContent,
            tabBarExtraContent,
            tabPosition,
            tabBarPosition,
            tabBarStyle,
            type,
            style
        } = this.props
        const tabBarStyleTypeMap = {
            line: 'simple',
            card: 'upborder',
            'editable-card': 'editable-card',
            'simple': 'simple',
            'fill': 'fill',
            'primary': 'primary',
            'trangle': 'trangle',
            'upborder': 'upborder',
            'fade': 'fade',
            'downborder': 'downborder',
            'trapezoid': 'trapezoid',
            'fill-line': 'fill-line'
        }
        isShouldUpdate("Tabs", this.props)
        const disableProps = {
            animated: false,
            scrollAnimated: false, // scrollableBar的class
            inkBarAnimated: false, // inkBar的class
            // useTransform3d: false, // 是否使用translate3d來实现线条
            tabBarPosition: tabPosition ? tabPosition : tabBarPosition,
            extraContent: tabBarExtraContent ? tabBarExtraContent : extraContent,
            style: style,
            // this.props.tabBarStyle  逻辑有缺失 @邵海龙
            // tabBarStyle: tabBarStyleTypeMap[this.props.type ? this.props.type : (this.props.tabBarStyle as keyof typeof tabBarStyleTypeMap)],
            tabBarStyle: (typeof tabBarStyle === 'object') ? tabBarStyle : null,
            type: tabBarStyleTypeMap[type ? type : (typeof tabBarStyle === 'string') ? tabBarStyle : 'line']
        };
        return (<TabsInner {...this.props} {...disableProps}/>)
    }
}

// Tabs.TabPane = TabsInner.TabPane;
// Tabs.SearchTabs = SearchTabs;
Tabs.SearchTabs.Item = Tab;
// Tabs.propTypes = propTypes

export default Tabs;


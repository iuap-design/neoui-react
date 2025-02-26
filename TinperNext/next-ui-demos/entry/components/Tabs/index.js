/* eslint-disable react/prop-types */
import React, {PureComponent} from 'react';
import './index.less';

class DetailTabs extends PureComponent {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         activeKey: props.activeKey
    //     }
    // }

    onTabsClick = (activeKey) => {
        if (activeKey !== this.props.activeKey && this.props.onChange) {
            this.props.onChange(activeKey)
        }
        if (this.props.onTabsClick) {
            this.props.onTabsClick(activeKey)
        }
    }

    render() {
        const { tabsList = [], activeKey } = this.props;
        return (
            <ul className='code-tabs'>
                {
                    tabsList.map(item => (
                        <li onClick={() => this.onTabsClick(item.value)} className={activeKey === item.value ? 'detail-tabs-item active' : 'detail-tabs-item'} key={item.value} data-value={item.value}>{item.name}<i/></li>
                    ))
                }
            </ul>
        )
    }
}

export default DetailTabs;

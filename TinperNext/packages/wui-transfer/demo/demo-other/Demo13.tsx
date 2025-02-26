/**
 *
 * @title 自定义头部数据渲染
 * @description 使用selectAllLabels属性可以自定义头部数据，使用titles可以自定义头部标题
 *
 */


import {Transfer, TransferProps} from '@tinper/next-ui';
import React from 'react';

const allTargetKeys: string[] = [];
const mockData: TransferProps['dataSource'] = [];
for (let i = 0; i < 20; i++) {
    mockData.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 3 < 1,
    });
    allTargetKeys.push(i.toString());
}

const targetKeys = mockData
    .filter(item => +item.key % 3 > 1)
    .map(item => item.key);

class Demo13 extends React.Component {
     state = {
         targetKeys,
         selectedKeys: [],
         showModal: false,
         modalSize: '',
     }

     inputValue: string = '';

     handleChange: TransferProps['onChange'] = (nextTargetKeys, direction, moveKeys) => {
         this.setState({targetKeys: nextTargetKeys});

         console.log('targetKeys: ', nextTargetKeys);
         console.log('direction: ', direction);
         console.log('moveKeys: ', moveKeys);
     }

     handleSelectChange: TransferProps['onSelectChange'] = (sourceSelectedKeys, targetSelectedKeys) => {
         this.setState({selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys]});

         console.log('sourceSelectedKeys: ', sourceSelectedKeys);
         console.log('targetSelectedKeys: ', targetSelectedKeys);
     }

     handleScroll: TransferProps['onScroll'] = (direction, e) => {
         console.log('direction is:', direction);
         console.log('target is:', e.target);
     }

     setSelectAllLabels = (info: { checkedCount: number; totalCount: number}, direction: string) => {
         const {checkedCount} = info;
         const { targetKeys } = this.state;
         return `${checkedCount} - ${direction === 'right' ? targetKeys.length : mockData.filter(item => !targetKeys.includes(item.key)).length}`
     }

     render() {
         const targetKeys = [...this.state.targetKeys];
         return (
             <div>
                 <Transfer
                     showSearch
                     dataSource={mockData}
                     targetKeys={targetKeys}
                     onChange={this.handleChange}
                     selectAllLabels={[(info) => this.setSelectAllLabels(info, 'left'), (info) => this.setSelectAllLabels(info, 'right')]}
                     titles={['Source', 'Target']}
                 />
             </div>
         );
     }
}


export default Demo13;

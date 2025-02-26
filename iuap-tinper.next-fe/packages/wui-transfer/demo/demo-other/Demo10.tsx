/**
 *
 * @title 定制显示操作按钮
 * @description 可使用operations配置
 *
 */


import {Transfer, TransferProps} from '@tinper/next-ui';
import React from 'react';

function getMockData(start: number, end: number) {
    const mockData: TransferProps['dataSource'] = [];
    for (let i = start; i < end; i++) {
        mockData.push({
            key: i.toString(),
            title: `content${i + 1}`,
            description: `description of content${i + 1}`,
            disabled: i % 3 < 1,
        });
    }

    return mockData
}

class Demo10 extends React.Component {

    state = {
        targetKeys1: [],
        targetKeys2: [],
    }

     handleChange = (nextTargetKeys: TransferProps['targetKeys'], direction: string, moveKeys: any, type: string) => {
         this.setState({[`targetKeys${type}`]: nextTargetKeys});
         console.log('targetKeys: ', nextTargetKeys);
         console.log('direction: ', direction);
         console.log('moveKeys: ', moveKeys);
     }

     handleSelectChange: TransferProps['onSelectChange'] = (sourceSelectedKeys, targetSelectedKeys) => {

         console.log('sourceSelectedKeys: ', sourceSelectedKeys);
         console.log('targetSelectedKeys: ', targetSelectedKeys);
     }

     render() {
         const data1 = getMockData(0, 20);
         const data2 = getMockData(30, 50);
         return (
             <div>
                 <Transfer
                     showSearch
                     dataSource={data1}
                     targetKeys={this.state.targetKeys1}
                     onChange={(...arg) => this.handleChange!(...arg, '1')}
                     onSelectChange={this.handleSelectChange}
                     operations={['rightOne', 'leftOne']}
                     style={{ marginBottom: '20px' }}
                 />
                 <Transfer
                     showSearch
                     dataSource={data2}
                     targetKeys={this.state.targetKeys2}
                     onChange={(...arg) => this.handleChange!(...arg, '2')}
                     onSelectChange={this.handleSelectChange}
                     operations={{'rightOne': {text: '向右'}, 'leftOne': {text: '向左'}}}
                 />
             </div>
         );
     }
}


export default Demo10;

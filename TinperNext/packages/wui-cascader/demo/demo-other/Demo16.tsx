/**
 *
 * @title 动态加载选项
 * @description loadData属性，用于动态加载选项，无法与 showSearch 一起使用。
 * @type other
 */

import {Cascader, Col, Row, CascaderProps} from '@tinper/next-ui';
import React from 'react';

const optionLists = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        isLeaf: false,
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        isLeaf: false,
    },
];

const Demo16 = () => {
    const [options, setOptions] = React.useState(optionLists);

    const onChange: CascaderProps['onChange'] = (value, selectedOptions) => {
        console.log(value, selectedOptions);
    };

    const loadData: CascaderProps['loadData'] = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        // load options lazily
        setTimeout(() => {
            targetOption.loading = false;
            targetOption.children = [
                {
                    label: `${targetOption.label} Dynamic 1`,
                    value: 'dynamic1',
                },
                {
                    label: `${targetOption.label} Dynamic 2`,
                    value: 'dynamic2',
                },
            ];
            setOptions([...options]);
        }, 1000);
    };

    // return <Cascader options={options} loadData={loadData} onChange={onChange} changeOnSelect />;
    return (<Row>
        <Col md={4}>
            <Cascader options={options} loadData={loadData} onChange={onChange} changeOnSelect/>
        </Col>
    </Row>)
};
export default Demo16;

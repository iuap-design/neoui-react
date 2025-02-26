/**
 * @jest-environment jest-puppeteer-react/environment
 */
import React from 'react';
import Select from '../src';
import testBigDataScroll from "../../../next-ui-library/test/common/bigDataScrollTest";

const Option = Select.Option;
const ComponentChildren = [];
for (let i = 0; i < 10000; i++) {
    ComponentChildren.push(<Option key={i + 1}>{i + 1}</Option>);
}

const bigDataSelect = <Select showSearch open placeholder="please select" virtual={true}>
    {ComponentChildren}
</Select>;

testBigDataScroll('select', bigDataSelect, '.rc-virtual-list-holder', 'div[title="9999"]');


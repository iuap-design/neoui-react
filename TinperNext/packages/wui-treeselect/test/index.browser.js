/**
 * @jest-environment jest-puppeteer-react/environment
 */
import React, { Component } from 'react';
import TreeSelect from '../src';
import testBigDataScroll from "../../../next-ui-library/test/common/bigDataScrollTest";
import { prefix } from '../../wui-core/src/updatePrefix';

const x = 10000;
const y = 1;
const z = 1;
const treeData = [];
const generateData = (_level, _preKey, _tns) => {
    const preKey = _preKey || '0';
    const tns = _tns || treeData;
    const children = [];
    for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`;
        tns.push({ title: key, key, value: key });
        if (i < y) {
            children.push(key);
        }
    }
    if (_level < 0) {
        return tns;
    }
    const level = _level - 1;
    children.forEach((key, index) => {
        tns[index].children = [];
        return generateData(level, key, tns[index].children);
    });
};
generateData(z);

const expandedKeys = ['0-0', '0-1', '0-2', '0-3', '0-4', '0-5', '0-6', '0-0-0', '0-0-1']
const bigDataTreeSelect2 = <TreeSelect open showSearch treeData={treeData} treeExpandedKeys={expandedKeys}
    placeholder="please select" virtual={true} 
/>
testBigDataScroll('treeselect', bigDataTreeSelect2, `.${prefix}-select-tree-list-holder`, 'span[title="0-9999"]');

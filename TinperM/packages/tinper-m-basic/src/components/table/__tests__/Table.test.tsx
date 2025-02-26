/** Table.tsx */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Table from '../src'
import { mount } from '@tests/mount'
import { muiPrefix } from '@utils/UpdatePrefixs'

const prefixTable = `${muiPrefix}-table`;
const fieldid = 'Table_test'

const columns = [
  { key: 'index', title: '序号', dataIndex: 'index', width: 'auto' },
  { key: 'orderNumber', title: '订单编号', dataIndex: 'orderNumber', width: 'auto' },
  { key: 'supplierName', title: '供应商名称', dataIndex: 'supplierName', width: 'auto' },
  { key: 'transactionType', title: '交易类型', dataIndex: 'transactionType', width: 'auto'},
  { key: 'purchaseOrganization', title: '采购组织', dataIndex: 'purchaseOrganization', width: 'auto' },
  { key: 'purchaseOrganizationCode', title: '采购组织编码', dataIndex: 'purchaseOrganizationCode', width: 'auto' }
];
const data = [
  { index: 1, orderNumber: 'NU0391025', supplierName: 'XX供应商', transactionType: '普通', purchaseOrganization: '组织c', purchaseOrganizationCode: 'Aa324' },
  { index: 2, orderNumber: 'GJ7284619', supplierName: 'YY供应商', transactionType: '紧急', purchaseOrganization: '组织a', purchaseOrganizationCode: 'Bb678' },
  { index: 3, orderNumber: 'KD9037264', supplierName: 'ZZ供应商', transactionType: '普通', purchaseOrganization: '组织b', purchaseOrganizationCode: 'Cc135' },
  { index: 4, orderNumber: 'PL5627498', supplierName: 'AA供应商', transactionType: '紧急', purchaseOrganizationCode: 'Dd246' },
  { index: 5, orderNumber: 'BM4918273', supplierName: 'BB供应商', transactionType: '普通', purchaseOrganizationCode: 'Ee357' },
  { index: 6, orderNumber: 'HN8374651', supplierName: 'CC供应商', transactionType: '普通', purchaseOrganizationCode: 'Ff468' }
]

describe('Table Component', () => {
  let wrapper: any
  // 渲染
  it('component: Table, <test prop:: fieldid>', () => {
    wrapper = mount(<Table columns={columns} data={data} fieldid={fieldid} />)
    expect(wrapper.find(`.${prefixTable}`).prop('fieldid')).toEqual(`${fieldid}_table`);
  });

  // 自定义样式-clsPrefix
  it('component: Table, <test prop:: clsPrefix >', () => {
    const customClsPrefix = 'custom-cls';
    wrapper = mount(<Table columns={columns} data={data} clsPrefix={customClsPrefix} />)
    expect(wrapper.exists(`.${prefixTable}`)).toEqual(false);
    const newClassName = `${customClsPrefix}-table`;
    expect(wrapper.exists(`.${newClassName}`)).toEqual(true);
  })
})

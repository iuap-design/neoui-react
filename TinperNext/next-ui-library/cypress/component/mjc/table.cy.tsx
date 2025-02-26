import React from 'react'
import BaseDemo from './demo1'
import Demo2 from './demo2'
import Demo3 from './demo3'
import Demo4 from './demo4' // hoverContent
import Demo5 from './demo5' // 多表头
import Demo6 from './demo6' // 固定列
import Demo7 from './demo7' // 合并列
import Demo8 from './demo8' // 列文本颜色、背景色
import Demo9 from './demo9' // 排序、多选
import Demo10 from './demo10' // 单选
import Demo11 from './demo11' // 锁定列
import Demo12 from './demo12' // 大数据
import Demo13 from './demo13' // filter locale
import Demo14 from './demo14' // subtable locale
// import Demo15 from './demo15' // subtable locale
import { Table, Icon } from '../../../../packages'


// 三个点操作 下拉筛选 

const columns = [
    {title: "员工编号", dataIndex: "a", key: "a", width: 150},
    {title: "员工姓名", dataIndex: "b", key: "b", width: 100},
    {title: "性别", dataIndex: "c", key: "c", width: 100},
    {title: "部门", dataIndex: "d", key: "d", width: 100},
    {title: "职级", dataIndex: "e", key: "e", width: 100}
];
const columnstitleAlign = [
    {title: "员工编号", dataIndex: "a", key: "a", width: 150, titleAlign: 'left', contentAlign: 'left', required: true},
    {title: "员工姓名", dataIndex: "b", key: "b", width: 100, titleAlign: 'center', contentAlign: 'center', required: true},
    {title: "性别", dataIndex: "c", key: "c", width: 100, titleAlign: 'right', contentAlign: 'right', required: true},
    {title: "部门", dataIndex: "d", key: "d", width: 100},
    {title: "职级", dataIndex: "e", key: "e", width: 100}
];
const headerDisplayInRowcolumns = [
    {title: "员工编号", dataIndex: "a", key: "a", width: 150},
    {title: "员工姓名员工姓名员工姓名", dataIndex: "b", key: "b", width: 100},
    {title: "性别", dataIndex: "c", key: "c", width: 100},
    {title: "部门", dataIndex: "d", key: "d", width: 100},
    {title: "职级", dataIndex: "e", key: "e", width: 100}
];
const headerDisplayInRowData = [
    {a: "ASVAL_20190328", b: "小张", c: "男", d: "财务二科", key: "1"},
    {a: "ASVAL_20190320", b: "小明小明小明小明小明小明小明小明小明小明", c: "男", d: "财务一科", key: "2"},
    {a: "ASVAL_20190312", b: "小红", c: "女", d: "财务一科", key: "3"},
    {a: "ASVAL_20190328", b: "小张", c: "男", d: "财务二科", key: "4"},
    {a: "ASVAL_20190320", b: "小明", c: "男", d: "财务一科", key: "5"},
    {a: "ASVAL_20190312", b: "小红", c: "女", d: "财务一科", key: "6"}
];

describe('Table view', () => {
    it('table border', () => {
        let wrapperold = (
            <div>
                <p>旧版表格：</p>
                <BaseDemo bordered={true} scrollMode={'table'} />
                <p>新版表格：</p>
                <BaseDemo bordered={true} scrollMode={'sticky'} />
            </div>
        )
        let wrappernew = (
            <div>
                <p>旧版表格：</p>
                <BaseDemo bordered={false} scrollMode={'table'} />
                <p>新版表格：</p>
                <BaseDemo bordered={false} scrollMode={'sticky'} />
            </div>
        )
        cy.mount(wrapperold)
        // cy.viewport(1000, 600)
        cy.compareSnapshot('Table-bordered-true')
        cy.mount(wrappernew)
        // cy.viewport(1000, 600)
        cy.compareSnapshot('Table-border-false')
    })
    it('table row hover', () => {
        let wrapper = (
            <div>
                <p>旧版表格：</p>
                <BaseDemo bordered={false} scrollMode="table" />
                <p>新版表格：</p>
                <BaseDemo bordered={false} scrollMode="sticky" />
            </div>
        )
        cy.mount(wrapper)
        // cy.viewport(1000, 600)
        cy.get('.wui-table-body .wui-table-row').eq(0).trigger('mouseover')
        cy.compareSnapshot('Table-row-hover')
    })
    it('table stripeLine', () => {
        let wrapper = (
            <div>
                <p>旧版表格：</p>
                <BaseDemo stripeLine={true} scrollMode="table" />
                <p>新版表格：</p>
                <BaseDemo stripeLine={true} scrollMode="sticky" />
            </div>
        )
        cy.mount(wrapper)
        cy.compareSnapshot('Table-stripeLine-compare')
    })
    it('table showExpandIcon', () => { // 是否显示展开行icon
        let wrapper = (
            <div>
                <p>旧版表格：</p>
                <Demo2 bordered={true} scrollMode="table" showExpandIcon />
                <p>新版表格：</p>
                <Demo2 bordered={true} scrollMode="sticky" showExpandIcon />
            </div>
        )
        cy.mount(wrapper)
        // cy.viewport(1000, 600)
        cy.compareSnapshot('Table-showExpandIcon-compare')
        cy.get('.wui-table-row-expand-icon').eq(0).click()
        cy.compareSnapshot('Table-old-showExpandIcon-click')
        // cy.viewport(1000, 600)
        cy.get('.wui-table-sticky .wui-table-row-expand-icon').eq(0).click()
        cy.compareSnapshot('Table-new-showExpandIcon-click')
    })
    it('table expandIconCellWidth', () => { // 自定义展开图标、展开icon宽度
        let wrapper = (
            <div>
                <p>旧版表格：</p>
                <Demo2 bordered={true} scrollMode="table" showExpandIcon expandIconCellWidth={50} expandIcon={<Icon type="uf-qq" />} />
                <p>新版表格：</p>
                <Demo2 bordered={true} scrollMode="sticky" showExpandIcon expandIconCellWidth={50} expandIcon={<Icon type="uf-qq" />} />
            </div>
        )
        cy.mount(wrapper)
        // cy.viewport(1000, 600)
        cy.compareSnapshot('Table-expandIconCellWidth-compare')
        cy.get('.wui-table-row-expand-icon').eq(0).click({force: true})
        cy.compareSnapshot('Table-expandIconCellWidth-click-compare')
    })
    it('table defaultExpandAllRows', () => { //表体是否默认展开所有扩展行
        let wrapper = (
            <div>
                <p>旧版表格：</p>
                <Demo2 bordered={true} scrollMode="table" showExpandIcon defaultExpandAllRows />
                <p>新版表格：</p>
                <Demo2 bordered={true} scrollMode="sticky" showExpandIcon defaultExpandAllRows />
            </div>
        )
        cy.mount(wrapper)
        // cy.viewport(1000, 600)
        cy.compareSnapshot('Table-defaultExpandAllRows-show')
        cy.get('.wui-table-row-expand-icon').eq(0).click()
        cy.compareSnapshot('Table-old-defaultExpandAllRows-click')
        // cy.viewport(1000, 600)
        cy.get('.wui-table-sticky .wui-table-row-expand-icon').eq(0).click()
        cy.compareSnapshot('Table-new-defaultExpandAllRows-click')
    })
    it('table expandIconAsCell', () => { // 展开按钮是否单独作为一个单元格
        let wrapper1 = (
            <div>
                <p>旧版表格：</p>
                <Demo2 bordered={true} scrollMode="table" showExpandIcon expandIconAsCell={true} />
                <p>新版表格：</p>
                <Demo2 bordered={true} scrollMode="sticky" showExpandIcon expandIconAsCell={true} />
            </div>
        )
        let wrapper2 = (
            <div>
                <p>旧版表格：</p>
                <Demo2 bordered={true} scrollMode="table" showExpandIcon expandIconAsCell={false} />
                <p>新版表格：</p>
                <Demo2 bordered={true} scrollMode="sticky" showExpandIcon expandIconAsCell={false} />
            </div>
        )
        cy.mount(wrapper1)
        // cy.viewport(1000, 600)
        cy.compareSnapshot('Table-expandIconAsCell-true')
        cy.mount(wrapper2)
        // cy.viewport(1000, 600)
        cy.compareSnapshot('Table-expandIconAsCell-false')
    })
    it('table expandIconColumnIndex', () => { // 展开按钮插入某一列
        let wraper1 = (
            <div>
                <p>旧版表格：</p>
                <Demo2 bordered={true} scrollMode="table" showExpandIcon expandIconColumnIndex={1} />
                <p>新版表格：</p>
                <Demo2 bordered={true} scrollMode="sticky" showExpandIcon expandIconColumnIndex={1} />
            </div>
        )
        let wraper2 = (
            <div>
                <p>旧版表格：</p>
                <Demo2 bordered={true} scrollMode="table" showExpandIcon expandIconColumnIndex={2} />
                <p>新版表格：</p>
                <Demo2 bordered={true} scrollMode="sticky" showExpandIcon expandIconColumnIndex={2} />
            </div>
        )
        cy.mount(wraper1)
        // cy.viewport(1000, 600)
        cy.compareSnapshot('Table-expandIconColumnIndex-first')
        cy.mount(wraper2)
        // cy.viewport(1000, 600)
        cy.compareSnapshot('Table-expandIconColumnIndex-second')
    })
    it('table show header', () => { //是否显示头部
        cy.mount((
            <div>
                <p>旧版表格：</p>
                <BaseDemo bordered={true} scrollMode="table" showHeader={false} />
                <p>新版表格：</p>
                <BaseDemo bordered={true} scrollMode="sticky" showHeader={false} />
            </div>
        ))
        // cy.viewport(1000, 600)
        cy.wait(1000)
        cy.compareSnapshot('Table-hidden-header')
    })
    it('table title footer', () => { // 展开按钮插入某一列
        cy.mount((
            <div>
                <p>旧版表格：</p>
                <BaseDemo bordered={true} scrollMode="table" title={() => '标题'} footer={() => '尾部'} />
                <p>新版表格：</p>
                <BaseDemo bordered={true} scrollMode="sticky" title={() => '标题'} footer={() => '尾部'} />
            </div>
        ))
        // cy.viewport(1000, 600)
        cy.wait(1000)
        cy.compareSnapshot('Table-title-footer')
    })
    it('table emptyText', () => { // 空数据展示
        let wrapper1 = (
            <div>
                <p>旧版表格：</p>
                <Table scrollMode="table" data={[]} columns={columns} />
                <p>新版表格：</p>
                <Table scrollMode="sticky" data={[]} columns={columns} />
            </div>
        )
        let wrapper2 = (
            <div>
                <p>旧版表格：</p>
                <Table scrollMode="table" data={[]} columns={columns} emptyText="空数据自定义显示" />
                <p>新版表格：</p>
                <Table scrollMode="sticky" data={[]} columns={columns} emptyText="空数据自定义显示" />
            </div>
        )
        cy.mount(wrapper1)
        // cy.viewport(1000, 600)
        cy.wait(1000)
        cy.compareSnapshot('Table-dataEmpty-compare')
        cy.mount(wrapper2)
        // cy.viewport(1000, 600)
        cy.wait(1000)
        cy.compareSnapshot('Table-emptyText-compare')
    })
    it('table scroll show', () => { // 显示滚动条
        let wrapper1 = (
            <div>
                <p>旧版表格：</p>
                <BaseDemo scrollMode="table" scroll={{y: 150}} />
                <p>新版表格：</p>
                <BaseDemo scrollMode="sticky" scroll={{y: 150}} />
            </div>
        )
        cy.mount(wrapper1)
        // cy.viewport(1000, 600)
        cy.wait(1000)
        cy.compareSnapshot('Table-scroll-compare')
    })
    it('table filterable', () => { // 是否可过滤
        cy.mount((
            <div>
                <p>旧版表格：</p>
                <Demo3 scrollMode={'table'} filterable={true} />
                <p>新版表格：</p>
                <Demo3 scrollMode={'sticky'} filterable={true} />
            </div>
        ))
        cy.wait(1000)
        cy.compareSnapshot('Table-filterable-compare')
        cy.get('.filter-wrap').eq(1).find('.wui-select').click()
        cy.get('.wui-select-item-option').eq(1).click()
        cy.get('.filter-wrap').eq(5).find('.wui-select').click()
        cy.get('.wui-select-item-option').eq(1).click({force: true})
        cy.compareSnapshot('Table-filterable-age-change')
    })
    it('table hoverContent', () => { // hoverContent
        cy.mount((
            <div>
                <p>旧版表格：</p>
                <Demo4 scrollMode={'table'} />
                <p>新版表格：</p>
                <Demo4 scrollMode={'sticky'} />
            </div>
        ))
        cy.get('.wui-table-body .wui-table-row').eq(1).trigger('mouseover')
        cy.get('.wui-table-sticky .wui-table-body .wui-table-row').eq(1).trigger('mouseover')
        cy.compareSnapshot('Table-hoverContent-compare')
    })
    it('table headerHeight', () => { // hoverContent
        cy.mount((
            <div>
                <p>旧版表格：</p>
                <BaseDemo scrollMode={'table'} headerHeight={50} height={50} />
                <p>新版表格：</p>
                <BaseDemo scrollMode={'sticky'} headerHeight={50} height={50} />
            </div>
        ))
        cy.compareSnapshot('Table-rowHeight-compare')
    })
    it('table headerDisplayInRow', () => { // hoverContent
        let wrapper1 = (
            <div>
                <p>旧版表格：</p>
                <Table scrollMode={'table'} data={headerDisplayInRowData} columns={headerDisplayInRowcolumns} headerDisplayInRow={true} bodyDisplayInRow={true} />
                <p>新版表格：</p>
                <Table scrollMode={'sticky'} data={headerDisplayInRowData} columns={headerDisplayInRowcolumns} headerDisplayInRow={true} bodyDisplayInRow={true} />
            </div>
        )
        let wrapper2 = (
            <div>
                <p>旧版表格：</p>
                <Table scrollMode={'table'} data={headerDisplayInRowData} columns={headerDisplayInRowcolumns} headerDisplayInRow={false} bodyDisplayInRow={false} />
                <p>新版表格：</p>
                <Table scrollMode={'sticky'} data={headerDisplayInRowData} columns={headerDisplayInRowcolumns} headerDisplayInRow={false} bodyDisplayInRow={false} />
            </div>
        )
        cy.mount(wrapper1)
        cy.compareSnapshot('Table-headerDisplayInRow-true')
        cy.mount(wrapper2)
        cy.compareSnapshot('Table-headerDisplayInRow-false')
    })
    it('table showRowNum', () => { // hoverContent
        cy.mount((
            <div>
                <p>旧版表格：</p>
                <BaseDemo scrollMode={'table'} showRowNum />
                <p>新版表格：</p>
                <BaseDemo scrollMode={'sticky'} showRowNum />
            </div>
        ))
        cy.compareSnapshot('Table-showRowNum-compare')
    })
    it('table fillSpace', () => { // fillSpace,自动填满父级剩余空间
        cy.mount((
            <div>
                <p>旧版表格：</p>
                <div style={{height: '600px'}}>
                    <BaseDemo scrollMode={'table'} fillSpace />
                    <div>测试内容</div>
                </div>
                <p>新版表格：</p>
                <div style={{height: '600px'}}>
                    <BaseDemo scrollMode={'sticky'} fillSpace />
                    <div>测试内容</div>
                </div>
            </div>
        ))
        cy.compareSnapshot('Table-fillSpace-compare')
    })
    it('table moreCol', () => { // 多列表头
        cy.mount((
            <div>
                <p>旧版表格：</p>
                <Demo5 scrollMode={'table'} />
                <p>新版表格：</p>
                <Demo5 scrollMode={'sticky'} />
            </div>
        ))
        cy.compareSnapshot('Table-moreCol-compare')
    })
    it('table fixed', () => { // 固定列
        cy.mount((
            <div>
                <p>旧版表格：</p>
                <Demo6 scrollMode={'table'} />
                <p>新版表格：</p>
                <Demo6 scrollMode={'sticky'} />
            </div>
        ))
        // cy.viewport(800, 1000)
        cy.compareSnapshot('Table-fixed-compare')
        cy.get('.wui-table-body').eq(0).scrollTo("50%")
        cy.get('.wui-table-sticky .wui-table-body').eq(0).scrollTo("50%")
        cy.compareSnapshot('Table-fixed-scroll-half')
        cy.get('.wui-table-body').eq(0).scrollTo("100%")
        cy.get('.wui-table-sticky .wui-table-body').eq(0).scrollTo("100%")
        cy.compareSnapshot('Table-fixed-scroll-all')
    })
    it('table column colSpan', () => { // 合并列
        cy.mount((
            <div>
                <p>旧版表格：</p>
                <Demo7 scrollMode={'table'} />
                <p>新版表格：</p>
                <Demo7 scrollMode={'sticky'} />
            </div>
        ))
        // cy.viewport(800, 1000)
        cy.compareSnapshot('Table-column-colSpan-compare')
    })
    it('table color', () => { // 列文本、背景颜色
        cy.mount((
            <div>
                <p>旧版表格：</p>
                <Demo8 scrollMode={'table'} />
                <p>新版表格：</p>
                <Demo8 scrollMode={'sticky'} />
            </div>
        ))
        // cy.viewport(800, 1000)
        cy.compareSnapshot('Table-fontColor-compare')
    })
    it('table align', () => { // 对齐方式
        cy.mount((
            <div>
                <p>旧版表格：</p>
                <Table scrollMode={'table'} data={headerDisplayInRowData} columns={columnstitleAlign} />
                <p>新版表格：</p>
                <Table scrollMode={'sticky'} data={headerDisplayInRowData} columns={columnstitleAlign} />
            </div>
        ))
        // cy.viewport(800, 1000)
        cy.compareSnapshot('Table-align-compare')
    })
    it('table sorter', () => { // 排序
        cy.mount((
            <div>
                <p>旧版表格：</p>
                <Demo9 scrollMode={'table'} />
                <p>新版表格：</p>
                <Demo9 scrollMode={'sticky'} />
            </div>
        ))
        // cy.viewport(800, 1000)
        cy.compareSnapshot('Table-sorter-compare')
        cy.get('.uf-triangle-down').eq(0).click({force: true})
        cy.get('.wui-table-sticky .uf-triangle-down').eq(0).click({force: true})
        cy.compareSnapshot('Table-sorter-reverse-compare')
    })
    it('table multiSelect', () => { // 多选
        cy.mount((
            <div>
                <p>旧版表格：</p>
                <Demo9 scrollMode={'table'} multiSelectConfig={{background: 'red'}} />
                <p>新版表格：</p>
                <Demo9 scrollMode={'sticky'} multiSelectConfig={{background: 'red'}} />
            </div>
        ))
        // cy.viewport(800, 1000)
        cy.compareSnapshot('Table-multiSelect-compare')
        cy.get('.wui-table input').eq(2).click()
        cy.wait(1000)
        cy.get('.wui-table-sticky input').eq(2).click()
        cy.wait(1000)
        cy.compareSnapshot('Table-multiSelect-click-compare')
    })
    it('table radio', () => { // 单选
        cy.mount((
            <div>
                <p>旧版表格：</p>
                <Demo10 scrollMode={'table'} rowSelection={{columnTitle: '标题', columnWidth: 50, fixed: true, selectedRowKeys: ['3']}} />
                <p>新版表格：</p>
                <Demo10 scrollMode={'sticky'} rowSelection={{columnTitle: '标题', columnWidth: 50, fixed: true, selectedRowKeys: ['3']}} />
            </div>
        ))
        // cy.viewport(800, 1000)
        cy.compareSnapshot('Table-radio-compare')
        cy.get('.wui-table-single-column').eq(1).click()
        cy.get('.wui-table-sticky .wui-table-single-column').eq(1).click()
        cy.wait(1000)
        cy.compareSnapshot('Table-radio-click-compare')
    })
    it('table lockable', () => { // 锁定列    三个点位置跑偏
        cy.mount((
            <div>
                <p>旧版表格：</p>
                <Demo11 scrollMode={'table'} />
                <p>新版表格：</p>
                <Demo11 scrollMode={'sticky'} />
            </div>
        ))
        // cy.viewport(800, 1000)
        cy.compareSnapshot('Table-lockable-compare')
        cy.get('.uf-weidongjie').eq(0).click({force: true})
        cy.get('.wui-table-body').eq(0).scrollTo("50%")
        cy.get('.wui-table-sticky .uf-weidongjie').eq(0).click({force: true})
        cy.get('.wui-table-sticky .wui-table-body').eq(0).scrollTo("50%")
        cy.compareSnapshot('Table-lockable-scroll-compare')
    })
    it('table bigData', () => { // 大数据
        cy.mount((
            <div>
                <p>旧版表格：</p>
                <Demo12 scrollMode={'table'} />
                <p>新版表格：</p>
                <Demo12 scrollMode={'sticky'} />
            </div>
        ))
        // cy.viewport(800, 1000)
        cy.compareSnapshot('Table-bigData-compare')
        cy.get('.wui-button').click({ multiple: true })
        cy.compareSnapshot('Table-bigData-positioning')
        cy.get('.wui-table-body').eq(0).scrollTo("0", "50%")
        cy.get('.wui-table-sticky .wui-table-body').eq(0).scrollTo("0", "50%")
        cy.compareSnapshot('Table-bigData-scroll-compare')
    })
    it('table load locale', () => { // loading 多语
        cy.mount((
            <div>
                <p>旧版表格：</p>
                <BaseDemo scrollMode={'table'} loading={true} locale={'en-us'} />
                <BaseDemo scrollMode={'table'} loading={true} locale={'zh-cn'} />
                <BaseDemo scrollMode={'table'} loading={true} locale={'zh-tw'} />
                <p>新版表格：</p>
                <BaseDemo scrollMode={'sticky'} loading={true} locale={'en-us'} />
                <BaseDemo scrollMode={'sticky'} loading={true} locale={'zh-cn'} />
                <BaseDemo scrollMode={'sticky'} loading={true} locale={'zh-tw'} />
            </div>
        ))
        // cy.viewport(800, 1000)
        cy.compareSnapshot('Table-load-locale-compare')
    })
    it('table fileter locale1', () => { // 过滤表头 多语
        cy.mount((
            <Demo13 scrollMode={'table'} locale={'en-us'} />
        ))
        // cy.viewport(800, 1000)
        cy.get('.wui-button').eq(0).click()
        cy.wait(1000)
        cy.compareSnapshot('Table-fileter-locale-compare1')
    })
    it('table fileter locale2', () => { // 过滤表头 多语
        cy.mount((
            <Demo13 scrollMode={'table'} locale={'zh-cn'} />
        ))
        // cy.viewport(800, 1000)
        cy.get('.wui-button').eq(0).click()
        cy.wait(1000)
        cy.compareSnapshot('Table-fileter-locale-compare2')
    })
    it('table fileter locale3', () => { // 过滤表头 多语
        cy.mount((
            <Demo13 scrollMode={'table'} locale={'zh-tw'} />
        ))
        // cy.viewport(800, 1000)
        cy.get('.wui-button').eq(0).click()
        cy.wait(1000)
        cy.compareSnapshot('Table-fileter-locale-compare3')
    })
    it('table fileter locale4', () => { // 过滤表头 多语
        cy.mount((
            <Demo13 scrollMode={'sticky'} locale={'en-us'} />
        ))
        // cy.viewport(800, 1000)
        cy.get('.wui-button').eq(0).click()
        cy.wait(1000)
        cy.compareSnapshot('Table-fileter-locale-compare4')
    })
    it('table fileter locale5', () => { // 过滤表头 多语
        cy.mount((
            <Demo13 scrollMode={'sticky'} locale={'zh-cn'} />
        ))
        // cy.viewport(800, 1000)
        cy.get('.wui-button').eq(0).click()
        cy.wait(1000)
        cy.compareSnapshot('Table-fileter-locale-compare5')
    })
    it('table fileter locale6', () => { // 过滤表头 多语
        cy.mount((
            <Demo13 scrollMode={'sticky'} locale={'zh-tw'} />
        ))
        // cy.viewport(800, 1000)
        cy.get('.wui-button').eq(0).click()
        cy.wait(1000)
        cy.compareSnapshot('Table-fileter-locale-compare6')
    })
    it('table sumtable locale', () => { // 合计多语
        cy.mount((
            <div>
                <p>旧版表格：</p>
                <Demo14 scrollMode={'table'} locale={'en-us'} />
                <Demo14 scrollMode={'table'} locale={'zh-cn'} />
                <Demo14 scrollMode={'table'} locale={'zh-tw'} />
                <p>新版表格：</p>
                <Demo14 scrollMode={'sticky'} locale={'en-us'} />
                <Demo14 scrollMode={'sticky'} locale={'zh-cn'} />
                <Demo14 scrollMode={'sticky'} locale={'zh-tw'} />
            </div>
        ))
        // cy.viewport(800, 1000)
        cy.compareSnapshot('Table-sumtable-locale-compare')
    })
    // it('table rightTopMore locale', () => { // 
    //     cy.mount((
    //         <div>
    //             <p>旧版表格：</p>
    //             <Demo15 scrollMode={'table'} locale={'en-us'} />
    //             <p>新版表格：</p>
    //             <Demo15 scrollMode={'sticky'} locale={'en-us'} />
    //         </div>
    //     ))
    //     // cy.viewport(800, 1000)
    //     cy.get(`.uf-3dot-h`).eq(0).click({ force: true })
    //     cy.get(`.wui-table-sticky .uf-3dot-h`).eq(0).click({ force: true })
    //     cy.compareSnapshot('Table-rightTopMore-locale-compare')
    // })
    it('table tableHeader locale', () => { // 内置序列号多语
        cy.mount((
            <div>
                <p>旧版表格：</p>
                <BaseDemo scrollMode={'table'} showRowNum={true} locale={'en-us'} />
                <BaseDemo scrollMode={'table'} showRowNum={true} locale={'zh-cn'} />
                <BaseDemo scrollMode={'table'} showRowNum={true} locale={'zh-tw'} />
                <p>新版表格：</p>
                <BaseDemo scrollMode={'sticky'} showRowNum={true} locale={'en-us'} />
                <BaseDemo scrollMode={'sticky'} showRowNum={true} locale={'zh-cn'} />
                <BaseDemo scrollMode={'sticky'} showRowNum={true} locale={'zh-tw'} />
            </div>
        ))
        // cy.viewport(800, 1000)
        cy.compareSnapshot('Table-tableHeader-locale-compare')
    })
})
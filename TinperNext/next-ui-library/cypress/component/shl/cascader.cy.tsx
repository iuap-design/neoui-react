import React from 'react'
import { Cascader } from '../../../../packages'
import BaseDemo from './cascaderDemo1'
const options = [{
    label: '基础组件',
    value: 'jczj',
    children: [{
            label: '导航',
            value: 'dh',
            children: [{
                    label: '面包屑',
                    value: 'mbx'
                }, {
                    label: '分页',
                    value: 'fy'
                }, {
                    label: '标签',
                    value: 'bq'
                }, {
                    label: '菜单',
                    value: 'cd'
                }]
        }, {
            label: '反馈',
            value: 'fk',
            children: [{
                    label: '模态框',
                    value: 'mtk'
                }, {
                    label: '通知',
                    value: 'tz'
                }]
        },
        {
            label: '表单',
            value: 'bd'
        }]
}, {
    label: '应用组件',
    value: 'yyzj',
    children: [{
            label: '参照',
            value: 'ref',
            children: [{
                    label: '树参照',
                    value: 'reftree'
                }, {
                    label: '表参照',
                    value: 'reftable'
                }, {
                    label: '穿梭参照',
                    value: 'reftransfer'
                }]
        }]
}
];

const sizeArr: any = ['xs', 'sm', 'md', 'nm', 'lg', 'default', 'small', 'middle', 'large'];
const CascaderSizeDemo = (props: any) => {
    let comps: JSX.Element[] = [];
    sizeArr.forEach((size: any) => {
        comps.push(
            <>
                <Cascader size={size} {...props} />
                <Cascader size={size} disabled {...props} />
            </>
        );
    });
    return <>{comps}</>;
};

describe('Cascader View', () => {
    const prefix = 'wui-cascader'
    const defaultOptions = ['jczj', 'dh', 'cd'];
    it('cascader border', () => {
        cy.mount((
            <div>
                <BaseDemo bordered={false} />
                <BaseDemo bordered={true} />
            </div>
        ))
        cy.viewport(200, 100)
        cy.compareSnapshot('cascader-border')
        cy.mount(<CascaderSizeDemo bordered='bottom' />)
        cy.compareSnapshot('basic_cascader_border_bottom')
        cy.mount(<CascaderSizeDemo bordered='bottom' disabled/>)
        cy.compareSnapshot('basic_cascader_disabled_border_bottom')
    })
    it('cascader disabled', () => {
        cy.mount((
            <BaseDemo disabled={true} />
        ))
        cy.get(`.${prefix}-picker`).click()
        cy.get(`.${prefix}-picker`).should('not.have.class', `.${prefix}-picker-focused`)
        cy.viewport(200, 100)
        cy.compareSnapshot('cascader-disabled')
    })
    it('cascader basic size', () => {
        cy.mount((<CascaderSizeDemo />))
        cy.compareSnapshot('basic_cascader_size')
    })
    it('cascader size', () => {
        cy.mount((
            <div>
                <BaseDemo size={'lg'} />
                <BaseDemo size={'md'} />
                <BaseDemo size={'sm'} />
            </div>
        ))
        cy.viewport(200, 100)
        cy.compareSnapshot('cascader-size')
    })
    it('cascader allowClear', () => {
        cy.mount((
            <BaseDemo allowClear={true} defaultValue={defaultOptions} />
        ))
        cy.get(`.${prefix}-picker-clear`).trigger('mousemove')
        // cy.wait(2000)
        cy.viewport(200, 100)
        cy.compareSnapshot('cascader-allowClear')
    })
    it('cascader popupPlacement', () => {
        cy.mount((
            <div>
                <BaseDemo popupPlacement={'bottomLeft'} />
                <BaseDemo popupPlacement={'bottomRight'} />
            </div>
        ))
        cy.get(`.${prefix}-picker`).each(($input)=>{
            $input.click()
        })
        // cy.viewport(300, 400)
        cy.compareSnapshot('cascader-popupPlacement')
    })
    it('cascader allopen', () => {
        cy.mount((
            <BaseDemo defaultValue={defaultOptions} />
        ))
        cy.get(`.${prefix}-picker`).click()
        // cy.viewport(300, 400)
        cy.compareSnapshot('cascader-allopen')
    })
    it('Cascader select position bottom', () => { // 下拉位置在上方显示
        cy.mount((
            <div>
                {/* <div style={{height: '500px'}}></div> */}
                <Cascader options={options}  placeholder="请选择" />
            </div>
        ))
        cy.viewport(600, 600)
        cy.wait(1000)
        cy.get('.wui-cascader-picker').click()
        cy.wait(1000)
        cy.compareSnapshot('Cascader-select-position-bottom')
    })
    it('Cascader select position top', () => { // 下拉位置在上方显示
        cy.mount((
            <div>
                <div style={{height: '500px'}}></div>
                <Cascader options={options}  placeholder="请选择" />
            </div>
        ))
        cy.viewport(600, 600)
        cy.wait(1000)
        cy.get('.wui-cascader-picker').click()
        cy.wait(1000)
        cy.compareSnapshot('Cascader-select-position-top')
    })
    it('Cascader select position middle', () => { // 下拉位置在中间位置显示
        cy.mount((
            <div>
                <div style={{height: '150px'}}></div>
                <Cascader options={options}  placeholder="请选择" />
            </div>
        ))
        cy.viewport(600, 300)
        cy.wait(1000)
        cy.get('.wui-cascader-picker').click()
        cy.wait(1000)
        cy.compareSnapshot('Cascader-select-position-middle')
    })
})
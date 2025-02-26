import React from "react";
import { Select, InputNumber } from '../../../../packages'
import {prefix} from "../../../../packages/wui-core/src";

const { Option } = Select;

const sizeArr: any = ['xs', 'sm', 'md', 'nm', 'lg', 'default', 'small', 'middle', 'large'];
const SelectSizeDemo = (props: any) => {
    let comps: JSX.Element[] = [];
    sizeArr.forEach((size: any) => {
        comps.push(
            <>
                <Select size={size} {...props}>
                    <Option value='svetlana'>Svetlana</Option>
                    <Option value={[1, 2]}>Array</Option>
                </Select>
                <Select size={size} disabled {...props}>
                    <Option value='svetlana'>Svetlana</Option>
                    <Option value={[1, 2]}>Array</Option>
                </Select>
            </>
        );
    });
    return <>{comps}</>;
  };

const Demo1 = (props: any) => {
    return(
        <Select style={{ width: '200px'}} {...props}>
            <Option value="spring">春天</Option>
            <Option value="summer">夏天</Option>
            <Option value="autumn" disabled>
                秋天
            </Option>
            <Option value="winter">冬天</Option>
        </Select>
    )
}

const Demo2 = (props: any) => {
    return(
        <Select style={{ width: '200px'}} {...props}>
            <Option value="spring">长春天长春天长春天长春天长春天长春天</Option>
            <Option value="summer"><span>dom节点夏天</span></Option>
            <Option value="autumn" disabled>
                秋天
            </Option>
            <Option value="winter">冬天</Option>
        </Select>
    )
}

describe('select.cy.tsx', {
    viewportWidth: 300,
    viewportHeight: 300
}, () => {
    it('test size', () => {
        cy.mount(<SelectSizeDemo defaultValue='svetlana' allowClear style={{width: 200}} />);
        cy.compareSnapshot('basic_select_size');

        cy.mount(<SelectSizeDemo defaultValue='svetlana' allowClear  bordered='bottom' />)
        cy.compareSnapshot('basic_select_border_bottom')
        cy.mount(<SelectSizeDemo defaultValue='svetlana' allowClear  bordered='bottom' disabled />)
        cy.compareSnapshot('basic_select_disabled_border_bottom')
    });

    it('test open select', () => {
        cy.mount(<Demo1 open autoFocus defaultValue="spring" />)
        cy.compareSnapshot('open-select')
    });

    it('test bordered', () => {
        cy.mount(<Demo1 bordered={false} defaultValue="spring" />)
        cy.compareSnapshot('bordered')
    });

    it('test disabled', () => {
        cy.mount(<Demo1 disabled defaultValue="spring" />)
        cy.compareSnapshot('disabled')
    });

    it('test loading', () => {
        cy.mount(<Demo1 loading defaultValue="spring" />)
        cy.compareSnapshot('loading')
    });

    it('test showArrow', () => {
        cy.mount(<Demo1 showArrow={false} defaultValue="spring" />)
        cy.compareSnapshot('showArrow')
    });

    it('test mode tags', () => {
        cy.mount(<Demo1 mode="tags" defaultValue={["spring", "summer"]} />)
        cy.compareSnapshot('mode-tags')
    });

    it('test mode multiple', () => {
        cy.mount(<Demo1 mode="multiple" defaultValue={["spring", "summer"]} />)
        cy.compareSnapshot('mode-multiple')
    });

    it('test allowClear', () => {
        cy.mount(<Demo1 allowClear defaultValue="spring" />)
        cy.get('.wui-select').eq(0).realHover();
        cy.compareWithOptions('allowClear', {
            capture: 'runner',
            clip: {x: 800, y: 80, width: 1200, height: 500 }
        })
    });

    it('test listHeight', () => {
        cy.mount(<Demo1 open listHeight={50} defaultValue="spring" />)
        cy.compareSnapshot('listHeight')
    });

    it('test mode multiple-maxTagCount', () => {
        cy.mount(
            <>
                <Demo1 mode="multiple" maxTagCount={2} defaultValue={["spring", "summer", "winter"]} />
                <Demo1 mode="multiple" maxTagCount='auto' defaultValue={["spring", "summer", "winter"]} />
            </>
        )
        cy.compareSnapshot('maxTagCount');
        cy.get('.wui-select-selection-overflow-item-rest .wui-select-selection-item').eq(0).click({force: true});
        cy.viewport(160, 300)
        cy.compareSnapshot('maxTagCount-number-open');

        cy.get('.wui-select-selection-overflow-item-rest .wui-select-selection-item').eq(1).click({force: true});
        cy.viewport(160, 300)
        cy.compareSnapshot('maxTagCount-auto-open');

    });

    it('test placement', () => {
        // placement 只有上下方向
        cy.mount(<Demo1 placement="topLeft" style={{ marginTop: '200px'}} open />)
        cy.compareSnapshot('mode-placement')
    });

    it('test long allowClear', () => {
        cy.mount(<Demo2 allowClear defaultValue="spring"/>)
        cy.get('.wui-select').eq(0).realHover();
        cy.compareWithOptions('long-allowClear', {
            capture: 'runner',
            clip: {x: 800, y: 80, width: 1200, height: 500 }
        })
    });

    it('test option is dom', () => {
        cy.mount(<Demo2 showSearch defaultValue="summer"/>)
        cy.compareSnapshot('option-is-dom')
    });

    it('test auto placement', () => {
        cy.mount(
            <>
                <Select open style={{ width: '200px', marginTop: '300px', marginRight: '20px'}}>
                    {new Array(20).fill('1').map((_num, index) => (<Option value={index + 1}>{index + 1}</Option>))}
                </Select>
                <Select open style={{ width: '200px', marginTop: '250px', marginRight: '20px'}}>
                    {new Array(20).fill('1').map((_num, index) => (<Option value={index + 1}>{index + 1}</Option>))}
                </Select>
                <Select open style={{ width: '200px', marginTop: '100px'}}>
                    {new Array(20).fill('1').map((_num, index) => (<Option value={index + 1}>{index + 1}</Option>))}
                </Select>
            </>
        )
        cy.viewport(800, 500);
        cy.compareSnapshot('auto-placement')
    });

    it('test locale', () => {
        cy.mount(
            <>
                {['zh-cn', 'en-us', 'zh-tw'].map(local => <Select locale={local} open style={{ width: '200px', margin: '30px'}}></Select>)}
            </>
        )
        cy.viewport(800, 400);
        cy.compareSnapshot('locale')
    })

    it('test inputnumber select', () => {
        cy.mount(
            <>
                <div style={{ width: '200px', margin: '10px'}}>
                    <InputNumber className='demo18-input-number' iconStyle='one' min={-9999} max={99999} addonBefore={<Select defaultValue={'http'}>
                        <Option value={'http'}>http</Option>
                        <Option value={'https'}>https</Option>
                    </Select>}/>
                </div>
                <div style={{ width: '200px', margin: '10px'}}>
                    <InputNumber className='demo18-input-number' iconStyle='one' min={-9999} max={99999} addonBefore={<Select defaultValue={'http'}>
                        <Option value={'http'}>http</Option>
                        <Option value={'https'}>https</Option>
                    </Select>}/>
                </div>
            </>

        )
        // cy.viewport(800, 400);
        cy.get(`.${prefix}-select`).eq(1).click()
        cy.compareSnapshot('select-inputnumber')
    })

})
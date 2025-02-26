import React from "react";
import AutoComplete from "../../../../packages/wui-autocomplete/src";

const sizeArr: any = ['xs', 'sm', 'md', 'nm', 'lg', 'default', 'small', 'middle', 'large'];
const AutoCompleteSizeDemo = (props: any) => {
    let comps: JSX.Element[] = [];
    sizeArr.forEach((size: any) => {
        comps.push(
            <>
                <AutoComplete size={size} placeholder={'请输入'} {...props} />
                <AutoComplete
                    size={size}
                    options={['10000', '10001', '10002', '11000', '12010']}
                    value='1'
                    disabled
                    {...props}
                />
            </>
        );
    });
    return <>{comps}</>;
};

describe('autocomplete.cy.tsx', {
    viewportWidth: 300,
    viewportHeight: 300
}, () => {

    it('test size', () => {
        cy.mount(<AutoCompleteSizeDemo />);
        cy.compareSnapshot('basic_select_size');
        cy.mount(<AutoCompleteSizeDemo bordered='bottom' />)
        cy.compareSnapshot('basic_autocomplete_border_bottom')
        cy.mount(<AutoCompleteSizeDemo bordered='bottom' disabled/>)
        cy.compareSnapshot('basic_autocomplete_disabled_border_bottom')
    });

    it('test <disabled>', () => {
        cy.mount(
            <AutoComplete placeholder={'请输入'} disabled />
        );
        cy.compareSnapshot('disabled')
        // 增加点击操作
    });

    it('test <show>', () => {
        cy.mount(
            <AutoComplete options={["10000", "10001", "10002", "11000", "12010"]} show placeholder={'请输入'} />
        );
        cy.compareSnapshot('show')
    });

    it('test <value>', () => {
        cy.mount(
            <AutoComplete options={["10000", "10001", "10002", "11000", "12010"]} value="1" show placeholder={'请输入'} />
        );
        cy.compareSnapshot('value')
    })
})
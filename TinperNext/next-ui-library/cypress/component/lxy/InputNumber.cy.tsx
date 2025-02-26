import React from 'react';
import {InputNumber, Select} from '@tinper/next-ui';
import {prefix} from '../../../../packages/wui-core/src';

Cypress.config({
    viewportWidth: 300,
    viewportHeight: 400
});

const style = {marginLeft: 20, marginTop: 10, marginBottom: 20, width: '80%'};

const Inputs = props => (
    <>
        <InputNumber {...props} />
        <InputNumber iconStyle='one' {...props} />
        <InputNumber size='sm' {...props} />
        <InputNumber size='md' {...props} />
        <InputNumber disabled {...props} />
    </>
);

const Option = Select.Option;
const InputNumberGroup = InputNumber.InputNumberGroup;
const sizeArr: any = ['xs', 'sm', 'md', 'nm', 'lg', 'default', 'small', 'middle', 'large'];
const InputNumberSizeDemo = (props: any) => {
    let comps: JSX.Element[] = [];
    sizeArr.forEach((size: any) => {
        comps.push(
            <>
                <InputNumber size={size} {...props} />
                <InputNumber size={size} {...props} iconStyle='one' />
                <InputNumber size={size} {...props} disabled />
                <InputNumber size={size} {...props} disabled iconStyle='one' />
                <InputNumberGroup size={size} {...props} value={[123, 456]} />
                <InputNumberGroup size={size} {...props} value={[123, 456]} iconStyle='one' />
                <InputNumberGroup size={size} {...props} value={[123, 456]} disabled />
                <InputNumberGroup size={size} {...props} value={[123, 456]} disabled iconStyle='one' />

                <InputNumber
                    size={size}
                    {...props}
                    iconStyle='one'
                    addonAfter={
                        <Select defaultValue={'com'}>
                            <Option value={'com'}>com</Option>
                            <Option value={'cn'}>cn</Option>
                        </Select>
                    }
                    addonBefore={
                        <Select defaultValue={'http'}>
                            <Option value={'http'}>http</Option>
                            <Option value={'https'}>https</Option>
                        </Select>
                    }
                />
            </>
        );
    });
    return <>{comps}</>;
};

describe('InputNumber_input', () => {
    // 默认态、禁用输入框，仅输入框/有值
    it('should mount basic picker input', () => {
        cy.mount(<Inputs style={style} value={123} />);
        cy.wait(200);
        cy.compareSnapshot('basic_inputnumber');

        cy.mount(<InputNumberSizeDemo placeholder='请输入' />);
        cy.wait(200);
        cy.compareSnapshot('basic_input_number_size');
        cy.mount(<InputNumberSizeDemo value={222} allowClear />);
        cy.wait(200);
        cy.compareSnapshot('basic_input_number_clear_size');

        cy.mount(<InputNumberSizeDemo bordered='bottom' />)
        cy.compareSnapshot('basic_input_number_border_bottom')
        cy.mount(<InputNumberSizeDemo bordered='bottom' value={1234} allowClear/>)
        cy.compareSnapshot('basic_input_number_clear_border_bottom')
    });

    // hover\disabled态，显示清空图标，且可正常清空\focus
    // TODO：mouserover模拟hover失败
    it('should mount clear icon', () => {
        cy.mount(<Inputs value={4567} style={style} />);
        cy.get(`.${prefix}-input-number`).eq(0).trigger('mouseover');
        cy.compareSnapshot('hover_input_clearIcon');
        cy.get(`.${prefix}-input-number`).eq(0).click();
        cy.compareSnapshot('focus_inputnumber');
    });

    // 不显示加减按钮
    it('should clear value and show placeholder', () => {
        cy.mount(<Inputs value={4567} hideActionButton />);
        cy.get(`.${prefix}-input-number`).eq(0).click();
        cy.compareSnapshot('input_hide_button');
    });
});

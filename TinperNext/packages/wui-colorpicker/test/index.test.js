/** ColorPicker.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {prefix} from '../../wui-core/src/updatePrefix';
import ColorPicker from '../src/index';

describe('colorPicker', () => {

    it('colorPicker should be exist', function() {
        let colorPicker = mount(<ColorPicker/>);
        expect(colorPicker.hasClass(`${prefix}-colorpicker`)).toEqual(true);
    })

    it('className should be exist,<test prop:: className>', function() {
        let colorPicker = mount(<ColorPicker className="newColorPicker"/>);
        expect(colorPicker.hasClass("newColorPicker")).toEqual(true);
    })

    it('value is success,<test prop:: value>', function() {
        let colorPicker = mount(<ColorPicker className="newColorPicker" value="#FFEBEE"/>);
        expect(colorPicker.find(`.${prefix}-colorpicker-form-color-demo`).prop("style").backgroundColor).toEqual("rgb(255, 235, 238)");
        // modal中的勾选是默认的，不是根据value值勾选，只有点击才会改变
    })

    it('disabled is success,<test prop:: disabled>', function() {
        let colorPicker = mount(<ColorPicker className="newColorPicker" disabled/>);
        expect(colorPicker.find(`input`).prop("disabled")).toEqual(true);
        colorPicker.find(`.${prefix}-colorpicker-form-color-demo`).simulate("click");
        expect(colorPicker.find(`${prefix}-modal`).length).toEqual(0);
    })

    it('disabledAlpha is success,<test prop:: disabledAlpha>', function() {
        let colorPicker = mount(<ColorPicker className="newColorPicker" disabledAlpha={true}/>);
        colorPicker.find(`.${prefix}-colorpicker-form-color-demo`).simulate("click");
        expect(document.getElementsByClassName(`${prefix}-input-prefix-suffix`)[1].disabled).toEqual(true);
    })

    it('disabledAlpha is false,<test prop:: disabledAlpha>', function() {
        let colorPicker = mount(<ColorPicker className="newColorPicker"/>);
        colorPicker.find(`.${prefix}-colorpicker-form-color-demo`).simulate("click");
        expect(document.getElementsByClassName(`${prefix}-input-prefix-suffix`)[1].disabled).toEqual(false);
    })

    it('disabledModal is true,<test prop:: disabledModal>', function() {
        let colorPicker = mount(<ColorPicker className="newColorPicker" disabledModal={true}/>);
        colorPicker.find(`.${prefix}-colorpicker-form-color-demo`).simulate("click");
        expect(colorPicker.find(`${prefix}-modal`).length).toEqual(0);
    })

    it('isParameterArea is false,<test prop:: isParameterArea>', function() {
        let colorPicker = mount(<ColorPicker className="newColorPicker" isParameterArea={false}/>);
        colorPicker.find(`.${prefix}-colorpicker-form-color-demo`).simulate("click");
        expect(document.getElementsByClassName(`${prefix}-colorpicker-panel-content`)[0].getElementsByClassName("${prefixColorPicker}-panel-color-info")[0]).toEqual(undefined);
    })

    it('placeholder is success,<test prop:: placeholder>', function() {
        let colorPicker = mount(<ColorPicker placeholder="请输入十六进制色值"/>);
        expect(colorPicker.find(`.${prefix}-input`).prop("placeholder")).toEqual("请输入十六进制色值");
    })

    it('onChange is success,<test prop:: onChange>', function() {
        const Change = jest.fn();
        let colorPicker = mount(<ColorPicker onChange={Change}/>);
        colorPicker.find(`.${prefix}-input`).simulate('change', {target: {value: '#ffffff'}});
        expect(colorPicker.find(`.${prefix}-input`).prop("value")).toBe('#ffffff');
        expect(Change).toHaveBeenCalled();
    })

    it('title is success,<test prop:: title>', function() {
        let colorPicker = mount(<ColorPicker title="新的标题"/>);
        colorPicker.find(`.${prefix}-colorpicker-form-color-demo`).simulate("click");
        expect(document.getElementsByClassName(`${prefix}-modal-header`)[0].getElementsByClassName(`${prefix}-modal-title`)[0].innerHTML).toBe("新的标题");
    })

    it('cacelBtn and confirmBtn are success,<test prop:: cacelBtn>,<test prop:: confirmBtn>', function() {
        let colorPicker = mount(<ColorPicker cacelBtn="新的取消" confirmBtn="新的确定"/>);
        colorPicker.find(`.${prefix}-colorpicker-form-color-demo`).simulate("click");
        expect(document.getElementsByClassName(`${prefix}-modal-footer`)[0].getElementsByClassName(`${prefix}-button-text-wrap`)[0].innerHTML).toBe("新的取消")
        expect(document.getElementsByClassName(`${prefix}-modal-footer`)[0].getElementsByClassName(`${prefix}-button-text-wrap`)[1].innerHTML).toBe("新的确定")
    })

    it('modalProps are success,<test prop:: modalProps>', function() {
        let colorPicker = mount(<ColorPicker modalProps={{draggable: true}}/>);
        colorPicker.find(`.${prefix}-colorpicker-form-color-demo`).simulate("click");
        expect(colorPicker.find(`.${prefix}-modal-dialog`).hasClass(`${prefix}-modal-draggable`)).toEqual(true);
    })

    it('modalProps are success,<test prop:: label>', function() {
        let colorPicker = mount(<ColorPicker label="颜色"/>);
        expect(colorPicker.find(`.${prefix}-form-item-label label`).text()).toBe("颜色");
    })

    it('modalProps are success,<test prop:: required>', function() {
        let colorPicker = mount(<ColorPicker label="颜色" required={true}/>);
        expect(colorPicker.find(`.${prefix}-form-item-label label`).hasClass(`${prefix}-form-item-required`)).toEqual(true);
    })

    it('modalProps are success,<test prop:: autoCalculate>', function() {
        let res;
        let colorPicker = mount(<ColorPicker autoCalculate={(value) => {
            res = value
        }}/>);
        colorPicker.find(`.${prefix}-colorpicker-form-color-demo`).simulate("click");
        colorPicker.find(`.${prefix}-button-primary`).simulate("click");
        expect(res).toEqual({
            "lighter": "rgb(244,67,54)",
            "darker": "rgb(211,47,47)",
            "clor": "#e53935"
        });
    })
    //新增fieldid测试
    describe('component: ColorPicker, <test prop:: fieldid>', () => {
        it('fieldid test', () => {
            const wrapper = mount(<ColorPicker />);
            expect(wrapper.find(`.${prefix}-input`).at(0).props().fieldid).toBe(undefined);
            wrapper.find(`.${prefix}-colorpicker-form-color-demo`).simulate("click");
            expect(wrapper.find(`.${prefix}-colorpicker-form-color-demo`).props().fieldid).toBe(undefined);
            expect(wrapper.find(`div.error`).props().fieldid).toBe(undefined);
            expect(wrapper.find(`.${prefix}-modal-open`).props().fieldid).toBe(undefined);
            expect(wrapper.find(`.${prefix}-modal-header`).props().fieldid).toBe(undefined);
            expect(wrapper.find(`button.close`).props().fieldid).toBe(undefined);
            expect(wrapper.find(`.${prefix}-modal-title`).props().fieldid).toBe(undefined);
            expect(wrapper.find(`.${prefix}-modal-body`).props().fieldid).toBe(undefined);
            expect(wrapper.find(`.${prefix}-select`).props().fieldid).toBe(undefined);
            expect(wrapper.find(`.uf-arrow-down`).props().fieldid).toBe(undefined);
            expect(wrapper.find(`.${prefix}-colorpicker-panel-color-plate li`).at(0).props().fieldid).toBe(undefined);
            expect(wrapper.find(`.uf-correct-2`).props().fieldid).toBe(undefined);
            expect(wrapper.find(`.selected-color`).props().fieldid).toBe(undefined);
            expect(wrapper.find(`.${prefix}-colorpicker-panel-color-info li`).at(0).props().fieldid).toBe(undefined);
            expect(wrapper.find(`.${prefix}-colorpicker-panel-color-info li`).at(1).props().fieldid).toBe(undefined);
            expect(wrapper.find(`.${prefix}-colorpicker-panel-color-info li`).at(2).props().fieldid).toBe(undefined);
            expect(wrapper.find(`.${prefix}-input-affix-wrapper-md`).at(1).props().fieldid).toBe(undefined);
            expect(wrapper.find(`span.${prefix}-input-simple-suffix`).at(1).props().fieldid).toBe(undefined);
            expect(wrapper.find(`.${prefix}-modal-footer`).props().fieldid).toBe(undefined);
            expect(wrapper.find(`.${prefix}-modal-footer button`).at(0).props().fieldid).toBe(undefined);
            expect(wrapper.find(`.${prefix}-modal-footer button`).at(1).props().fieldid).toBe(undefined);
            wrapper.setProps({ fieldid: 'test' })
            expect(wrapper.find(`.${prefix}-input`).at(0).props().fieldid).toBe('test_input');
            expect(wrapper.find(`.${prefix}-colorpicker-form-color-demo`).props().fieldid).toBe("test_input_color");
            expect(wrapper.find(`div.error`).props().fieldid).toBe("test_error");
            expect(wrapper.find(`.${prefix}-modal-header`).props().fieldid).toBe("test_color_modal_header");
            expect(wrapper.find(`button.close`).props().fieldid).toBe("test_color_modal_header_close");
            expect(wrapper.find(`.${prefix}-modal-title`).props().fieldid).toBe("test_color_modal_title");
            expect(wrapper.find(`.${prefix}-modal-body`).props().fieldid).toBe("test_color_modal_body");
            expect(wrapper.find(`.${prefix}-select`).props().fieldid).toBe("test_color_select");
            expect(wrapper.find(`.uf-arrow-down`).instance().getAttribute('fieldid')).toBe("test_color_select_suffix");
            expect(wrapper.find(`.${prefix}-colorpicker-panel-color-plate li`).at(0).props().fieldid).toBe("test_list_50");
            expect(wrapper.find(`.uf-correct-2`).props().fieldid).toBe("test_icon_600");
            expect(wrapper.find(`.selected-color`).props().fieldid).toBe("test_color_select_div");
            expect(wrapper.find(`.${prefix}-colorpicker-panel-color-info li`).at(0).props().fieldid).toBe("test_color_class");
            expect(wrapper.find(`.${prefix}-colorpicker-panel-color-info li`).at(1).props().fieldid).toBe("test_color_rgb");
            expect(wrapper.find(`.${prefix}-colorpicker-panel-color-info li`).at(2).props().fieldid).toBe("test_color_hex");
            expect(wrapper.find(`.${prefix}-input-affix-wrapper-md`).at(1).props().fieldid).toBe("test_color_alpha_input");
            expect(wrapper.find(`span.${prefix}-input-simple-suffix`).at(1).props().fieldid).toBe("test_color_alpha_suffix");
            expect(wrapper.find(`.${prefix}-modal-footer`).props().fieldid).toBe("test_color_modal_footer");
            expect(wrapper.find(`.${prefix}-modal-footer button`).at(0).props().fieldid).toBe("test_color_modal_footer_cancel");
            expect(wrapper.find(`.${prefix}-modal-footer button`).at(1).props().fieldid).toBe("test_color_modal_footer_ok");
        })
    })
});

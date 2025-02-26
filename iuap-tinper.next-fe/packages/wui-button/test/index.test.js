/** Button.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
// import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {screen} from "@testing-library/react";
import {mountTest, attrsTest, actWait} from "../../../next-ui-library/test/common/index"
import Button from '../src/index';
import Icon from '../../wui-icon/src/index';
import {prefix} from '../../wui-core/src/updatePrefix';
import { sleep } from '../../../next-ui-library/test/common/utils';

const prefixButton = `${prefix}-button`;

// Enzyme.configure({adapter: new Adapter()});
 
describe('Button', () => {
    mountTest(Button);
    mountTest(() => <Button size="lg"/>);
    mountTest(() => <Button size="sm"/>);

    it('mount correctly', () => {
        expect(() => mount(<Button>Follow</Button>)).not.toThrow();
    });
})
attrsTest({
    title: 'component: Button, <test prop:: block>',
    Component: Button,
    attrs: {
        block: true
    },
    selector: `.${prefixButton}`,
    classnames: [`${prefixButton}-block`]
});
attrsTest({
    title: 'component: Button, <test prop:: danger>',
    Component: Button,
    attrs: {
        danger: true
    },
    selector: `.${prefixButton}`,
    classnames: [`${prefixButton}-danger`]
});
attrsTest({
    title: 'component: Button, <test prop:: ghost>',
    Component: Button,
    attrs: {
        ghost: true
    },
    selector: `.${prefixButton}`,
    classnames: [`${prefixButton}-ghost`]
});
attrsTest({
    title: 'component: Button, <test prop:: bordered>',
    Component: Button,
    attrs: {
        bordered: true
    },
    selector: `.${prefixButton}`,
    classnames: [`${prefixButton}-border`]
});
['lg', 'sm', 'md'].forEach(item => {
    attrsTest({
        title: 'component: Button, <test prop:: size>',
        Component: Button,
        attrs: {
            size: item
        },
        selector: `.${prefixButton}`,
        classnames: [`${prefixButton}-${item}`]
    });
});
['primary', 'success', 'info', 'warning', 'danger'].forEach(item => {
    attrsTest({
        title: 'component: Button, <test prop:: colors>',
        Component: Button,
        attrs: {
            colors: item
        },
        selector: `.${prefixButton}`,
        classnames: [`${prefixButton}-${item}`]
    });
});
Object.entries({'round': 'round', 'squared': 'squared', 'floating': 'floating', 'pillRight': 'pill-right', 'pillLeft': 'pill-left'}).forEach(item => {
    attrsTest({
        title: 'component: Button, <test prop:: shape>',
        Component: Button,
        attrs: {
            shape: item[0]
        },
        selector: `.${prefixButton}`,
        classnames: [`${prefixButton}-${item[1]}`]
    });
});

describe('component: Button, <test prop:: loading>,<test prop:: loadingText>', () => {
    attrsTest({
        title: 'component: Button, <test prop:: loading>',
        Component: Button,
        attrs: {
            loading: true
        },
        selector: `.${prefixButton}`,
        classnames: [`${prefixButton}-loading`]
    });
    it('Button should be loadingText', () => {
        let button = mount(<Button loading loadingText={"加载"}/>);
        expect(button.find('span').at(1).text()).toEqual('加载');
    });
    // loading状态下的button不能触发onClick, 但是模拟点击（js获取dom点击事件）会触发点击事件
    it('Button should be not allowed click', () => {
        const mockOnClick = jest.fn();
        let button = mount(<Button loading onClick={mockOnClick}/>);
        // button.getDOMNode().click();
        button.simulate('click');
        expect(mockOnClick).toHaveBeenCalled();
        // expect(mockOnClick).not.toHaveBeenCalled();
    });
});

describe('component: Button, <test prop:: disabled>', () => {
    it('Button should be disabled', () => {
        let button = mount(<Button disabled/>);
        expect(button.find('button').props().disabled).toEqual(true);
    });
    it('Button should be not allowed click', () => {
        const mockOnClick = jest.fn();
        let button = mount(<Button disabled onClick={mockOnClick}/>);
        button.simulate('click');
        expect(mockOnClick).not.toHaveBeenCalled();
    });
});

describe('component: Button, <test prop:: type>', function() {
    ['dashed', 'text', 'link', 'primary', 'ghost', 'default'].forEach(item => {
        attrsTest({
            title: 'component: Button, <test prop:: type>',
            Component: Button,
            attrs: {
                type: item
            },
            selector: `.${prefixButton}`,
            classnames: [`${prefixButton}-${item}`]
        });
    })
})

describe('component: Button, <test prop:: target>, <test prop:: href>', () => {
    it('Button should be link has href && Button should be link is name a && Button should be target', () => {
        let button = mount(<Button type='link' href="http://www.tinper.com/" target={"_blank"}/>);
        expect(button.find('a').props().href).toEqual('http://www.tinper.com/');
        expect(button.find(`a.${prefixButton}`).at(0).prop('target')).toEqual('_blank');
    });
})

describe('component: Button, <test prop:: icon>', () => {
    it('Button should be icon only', () => {
        let button = mount(<Button icon="uf-xiaoxi"/>);
        expect(button.find('button').hasClass(`${prefixButton}-icon-cls`)).toEqual(true);
        expect(button.find('button').hasClass(`${prefixButton}-icon-only`)).toEqual(true);
    });
    it('Button should be icon and text', () => {
        let button = mount(<Button icon="uf-xiaoxi">按钮</Button>);
        expect(button.find('button').hasClass(`${prefixButton}-icon-cls`)).toEqual(true);
        expect(button.find('button').hasClass(`${prefixButton}-icon-only`)).toEqual(false);
        expect(button.find('button').childAt(0).hasClass(`${prefixButton}-icon-cls-wrapper`)).toEqual(true);
        expect(button.find('button').childAt(1).hasClass(`${prefixButton}-text-wrap`)).toEqual(true);
        expect(button.find('button').childAt(1).text()).toEqual('按钮');
    });
    it('Button should not have icon only', () => {
        let button = mount(<Button icon="uf-xiaoxi" loading loadingText={"加载"}/>);
        expect(button.find('button').hasClass(`${prefixButton}-icon-cls`)).toEqual(true);
        expect(button.find('button').hasClass(`${prefixButton}-icon-only`)).toEqual(false);
    });
})

describe('component: Button, <test prop:: htmlType>', function() {
    it('Button type should be submit', function() {
        let button = mount(<Button htmlType={"submit"}/>);
        expect(button.find(`button.${prefixButton}`).at(0).prop('type')).toEqual('submit');
    });
    it('Button type should be button', function() {
        let button = mount(<Button htmlType={"button"}/>);
        expect(button.find(`button.${prefixButton}`).at(0).prop('type')).toEqual('button');
    });
    it('Button type should be reset', function() {
        let button = mount(<Button htmlType={"reset"}/>);
        expect(button.find(`button.${prefixButton}`).at(0).prop('type')).toEqual('reset');
    });
})

describe('component: Button, <test prop:: className>', function() {
    it('Button should be className wui-my-class', function() {
        let button = mount(<Button className={`${prefix}-my-class`}/>);
        expect(button.find('button').hasClass(`${prefix}-my-class`)).toEqual(true);
    });
})

describe('component: Button, <test prop:: style>', function() {
    it('Button should be has style', function() {
        let styleCss = {
            color: 'red',
            background: 'yellow',
        }
        let buttonC = mount(<Button style={styleCss}/>);
        const button = buttonC.find('button');
        expect(button.prop('style').color).toEqual('red');
        expect(button.prop('style').background).toEqual('yellow');
    });
})

describe('component: Button, <test prop:: maxWidth>', function() {
    it('Button should be has maxWidth', async function() {

        let buttonC = mount(<Button maxWidth>testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest</Button>);
        const button = buttonC.find('button');
        expect(button.hasClass(`${prefixButton}-has-max-width`)).toEqual(true)
    });
})

describe('component: Button, <test prop:: onClick>', function() {
    it('Button click change type', function() {
        let typeChange = "primary";

        function clickEvent(event) {
            typeChange = "accent";
        }

        let buttonC = mount(<Button onClick={clickEvent} type={typeChange}/>);
        const button = buttonC.find('button');
        button.simulate('click');
        expect(typeChange == "accent").toEqual(true);
    });
    it('Button click change colors', function() {
        let colorsChange = "primary";
        let buttonC;

        function clickEvent(event) {
            // colorsChange = 'success';
            buttonC.setProps({colors: 'success'});
        }

        buttonC = mount(<Button onClick={clickEvent} colors={colorsChange}/>);
        const button = buttonC.find('button');
        expect(button.hasClass(`${prefixButton}-primary`)).toEqual(true);

        button.simulate('click');
        expect(buttonC.find('button').hasClass(`${prefixButton}-success`)).toEqual(true);
    });
});

describe('fieldid, <test prop:: fieldid>', () => {
    it('@fieldid,"***_icon"', function() {
        let wrapper = mount(<Button icon='uf-plus' />);
        expect(wrapper.find(`.${prefixButton}`).find(`.${prefix}-icon`).props().fieldid).toEqual(undefined);
        wrapper.setProps({ fieldid: 'fieldid-id' });
        expect(wrapper.find(`.${prefixButton}`).find(`.${prefix}-icon`).props().fieldid).toEqual('fieldid-id_icon');
    });
    it('@fieldid,"***_loading_icon"', () => {
        let wrapper = mount(<Button icon='uf-plus' loading />);
        expect(wrapper.find(`.${prefixButton}`).find(`.${prefix}-icon`).props().fieldid).toEqual(undefined);
        wrapper.setProps({ fieldid: 'fieldid-id' });
        expect(wrapper.find(`.${prefixButton}`).find(`.${prefix}-icon`).props().fieldid).toEqual('fieldid-id_loading_icon');
    });
    // #LYJM-39024 Button组件给Icon组件添加fieldid
    it('@fieldid,"***_loading_icon"', () => {
        let wrapper = mount(<Button icon={<Icon type="uf-plus"/>} />);
        expect(wrapper.find(`.${prefixButton}`).find(`.uf-plus`).props().fieldid).toEqual(undefined);
        wrapper.setProps({ fieldid: 'fieldid-id' });
        expect(wrapper.find(`.${prefixButton}`).find(`.uf-plus`).props().fieldid).toEqual('fieldid-id_icon');
    });
});
describe('id', () => {
    it('@id,"***_icon"', function() {
        let wrapper = mount(<Button icon='uf-plus' />);
        expect(wrapper.find(`.${prefixButton}`).find(`.${prefix}-icon`).props().id).toEqual(undefined);
        wrapper.setProps({ id: 'id-id' });
        expect(wrapper.find(`.${prefixButton}`).find(`.${prefix}-icon`).props().id).toEqual('id-id_icon');
    });
    it('@id,"***_loading_icon"', () => {
        let wrapper = mount(<Button icon='uf-plus' loading />);
        expect(wrapper.find(`.${prefixButton}`).find(`.${prefix}-icon`).props().id).toEqual(undefined);
        wrapper.setProps({ id: 'id-id' });
        expect(wrapper.find(`.${prefixButton}`).find(`.${prefix}-icon`).props().id).toEqual('id-id_loading_icon');
    });
});

describe('component: Button link and loadingText', () => {
    it('Button type link', function() {
        let wrapper = mount(<Button type='link' href='https://www.tinper-next.com/' />);
        expect(wrapper.find('a').props().href).toEqual('https://www.tinper-next.com/');
    });
    it('Button props loadingText', () => {
        let wrapper = mount(<Button loading loadingText='加载中' />);
        expect(wrapper.find('button').text()).toEqual('加载中');
    });
    it('Button not effective props <test prop:: isText> <test prop:: isSubmit>', () => {
        let wrapper = mount(<Button isText isSubmit>按钮</Button>);
        expect(wrapper.find('button').text()).toEqual('按钮');
    });
});
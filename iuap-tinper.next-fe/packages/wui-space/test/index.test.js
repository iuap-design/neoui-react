/** Space.tsx */
import {mount, render, shallow} from '../../../next-ui-library/test/common/mount'
import React, {useState} from 'react';
// import {act} from 'react-test-renderer';
// import {act} from '@testing-library/preact/test-utils/act'

import {mountTest} from "../../../next-ui-library/test/common/index"
import {prefix} from '../../wui-core/src/updatePrefix';
import Space from '../src';
import {Button, Input} from "../../index";

const prefixSpace = `${prefix}-space`;

describe('Space', function() {
    mountTest(Space);

    it('should render width empty children', () => {
        const wrapper = mount(<Space/>);

        expect(wrapper.exists()).toBe(false);
    });

    it('should render width customize size', () => {
        const wrapper = mount(
            <Space size={10}>
                <span>1</span>
                <span>2</span>
            </Space>,
        );

        expect(wrapper.find(`div.${prefixSpace}-item`).at(0).prop('style').marginRight).toBe('10px');
        expect(wrapper.find(`div.${prefixSpace}-item`).at(1).prop('style').marginRight).toBe("");
    });
    it('should render with invalidElement', () => {
        const wrapper = mount(
            <Space>
				text1<span>text1</span>
				text1
            </Space>,
        );

        expect(wrapper.find(`div.${prefixSpace}-item`).length).toBe(3);
    });

    it('should be keep store', () => {
        function Demo() {
            const [state, setState] = React.useState(1);

            return (
                <div
                    id="demo"
                    onClick={() => {
                        setState(value => value + 1);
                    }}
                >
                    {state}
                </div>
            );
        }

        function SpaceDemo() {
            const [visible, setVisible] = useState(true);

            function onChange() {
                setVisible(!visible);
            }

            return (
                <Space>
                    {visible && <div>space</div>}
                    <Demo/>
                    <p onClick={onChange}>Three</p>
                </Space>
            );
        }

        const wrapper = mount(<SpaceDemo/>);

        expect(wrapper.find('#demo').text()).toBe('1');

        // act(() => {
        //     wrapper.find('#demo').simulate('click');
        // });

        wrapper.find('#demo').simulate('click');

        expect(wrapper.find('#demo').text()).toBe('2');

        // act(() => {
        //     wrapper.find('p').simulate('click');
        // });

        wrapper.find('p').simulate('click');

        expect(wrapper.find('#demo').text()).toBe('2');
    });

});
describe('component: Space, <test prop:: style>', () => {
    it('style should be {color:red}', () => {
        const wrapper = mount(
            <Space wrap style={{color: "red"}}>
				text1<span>text1</span>
                <>text3</>
            </Space>,
        );

        expect(wrapper.find(`.${prefixSpace}`).prop('style').color).toBe('red');
    });
});

describe('component: Space, <test prop:: align>', () => {
    it('should be align start', () => {
        const wrapper = mount(
            <Space align="start">
				text1<span>text1</span>
                <>text3</>
            </Space>,
        );
        expect(wrapper.find(`.${prefixSpace}-align-start`).exists()).toBe(true);
    });
    it('should be align end', () => {
        const wrapper = mount(
            <Space align="end">
				text1<span>text1</span>
                <>text3</>
            </Space>,
        );
        expect(wrapper.find(`.${prefixSpace}-align-end`).exists()).toBe(true);
    });
    it('should be align center', () => {
        const wrapper = mount(
            <Space align="center">
				text1<span>text1</span>
                <>text3</>
            </Space>,
        );
        expect(wrapper.find(`.${prefixSpace}-align-center`).exists()).toBe(true);
    });
    it('should be align baseline', () => {
        const wrapper = mount(
            <Space align="baseline">
				text1<span>text1</span>
                <>text3</>
            </Space>,
        );
        expect(wrapper.find(`.${prefixSpace}-align-baseline`).exists()).toBe(true);
    });
});

describe('component: Space, <test prop:: direction>', () => {
    it('should be horizontal', () => {
        const wrapper = shallow(
            <Space>
				text1<span>text1</span>
                <>text3</>
            </Space>,
        );

        expect(wrapper.hasClass(`${prefixSpace}-horizontal`)).toBe(true);
    });
    it('should be vertical', () => {
        const wrapper = mount(
            <Space direction="vertical">
				text1<span>text1</span>
                <>text3</>
            </Space>,
        );

        expect(wrapper.find(`.${prefixSpace}-vertical`).exists()).toBe(true);
    });
});

describe('component: Space, <test prop:: size>', () => {
    it('should be large', () => {
        const wrapper = mount(
            <Space size="large">
				text1<span>text1</span>
                <>text3</>
            </Space>,
        );
        expect(wrapper.find(`div.${prefixSpace}-item`).at(0).prop('style').marginRight).toBe('24px');
    });
    it('should be middle', () => {
        const wrapper = mount(
            <Space size="middle">
				text1<span>text1</span>
                <>text3</>
            </Space>,
        );
        expect(wrapper.find(`div.${prefixSpace}-item`).at(0).prop('style').marginRight).toBe('16px');
    });
    it('should be small', () => {
        const wrapper = mount(
            <Space size="small">
				text1<span>text1</span>
                <>text3</>
            </Space>,
        );
        expect(wrapper.find(`div.${prefixSpace}-item`).at(0).prop('style').marginRight).toBe('8px');
    });
    it('should be 10', () => {
        const wrapper = mount(
            <Space size={10}>
				text1<span>text1</span>
                <>text3</>
            </Space>,
        );
        expect(wrapper.find(`div.${prefixSpace}-item`).at(0).prop('style').marginRight).toBe('10px');
    });
});

describe('component: Space, <test prop:: split>', () => {
    it('should split for -', () => {
        const wrapper = mount(
            <Space split="-">
				text1<span>text1</span>
                <>text3</>
            </Space>,
        );
        expect(wrapper.find(`.${prefixSpace}-item-split`).at(0).text()).toBe('-');
    });
});

describe('component: Space, <test prop:: wrap>', () => {
    it('should be wrap', () => {
        const wrapper = mount(
            <Space wrap>
				text1<span>text1</span>
                <>text3</>
            </Space>,
        );

        expect(wrapper.find(`div.${prefixSpace}`).prop('style').flexWrap).toBe('wrap');
    });
});

describe('component: Space.Compact, <test prop:: direction>', () => {
    it('should be horizontal', () => {
        const wrapper = shallow(
            <Space.Compact>
				<Button>新增</Button>
				<Button>查询</Button>
            </Space.Compact>,
        );

        expect(wrapper.hasClass(`${prefixSpace}-compact`)).toBe(true);
    });
    it('should be vertical', () => {
        const wrapper = shallow(
            <Space.Compact direction="vertical">
				<Button>新增</Button>
				<Button>查询</Button>
            </Space.Compact>,
        );

        expect(wrapper.hasClass(`${prefixSpace}-compact-vertical`)).toBe(true);
    });
});

describe('component: Space.Compact, <test prop:: block>', () => {
    it('should be block', () => {
        const wrapper = shallow(
            <Space.Compact block>
				<Input style={{ width: '10%' }} defaultValue="新疆" />
				<Button>查询</Button>
            </Space.Compact>,
        );

        expect(wrapper.hasClass(`${prefixSpace}-compact-block`)).toBe(true);
    });

    it('should be null', () => {
        const wrapper = shallow(
            <Space.Compact block />
        );

        expect(wrapper.exists()).toBe(false);
    });
});

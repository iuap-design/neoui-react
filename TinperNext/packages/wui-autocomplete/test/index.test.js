/** AutoComplete.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {actWait, mountTest} from "../../../next-ui-library/test/common/index"
import AutoComplete from '../src/index';
import { prefix } from '../../wui-core/src/updatePrefix';
import { sleep } from '../../../next-ui-library/test/common/utils';
const prefixAutoComplete = `${prefix}-autocomplete`
const prefixSelect = `${prefix}-select`
describe("basic tests", () => {
    mountTest(AutoComplete);

    it("component: AutoComplete, <test prop:: value>value test", () => {
        const wrapper = mount(<AutoComplete value="321"/>)
        expect(wrapper.find('input').instance().value).toEqual('321');
    })

    // it("component: AutoComplete, <test prop:: autocomplete>placeholder should be 'input render test'", () => {
    //     const wrapper = mount(<AutoComplete placeholder="input render test"/>)
    //     expect(wrapper.find(`.${prefixAutoComplete}`).length).toBe(1)
    //     expect(wrapper.find(`.${prefixAutoComplete} input`).props().placeholder).toBe('input render test')
    // })
    // 结构更改导致
    // it("component: AutoComplete, <test prop:: options>click test", () => {
    //     const DemoComponent = () => {
    //         return <AutoComplete
    //             options={["10000", "10001", "10002", "11000", "12010"]}
    //             placeholder='click test'
    //         />
    //     }
    //     const wrapper = mount(<DemoComponent/>)
    //     wrapper.find('Input').simulate('click')
    //     wrapper.find('input').simulate('change', {target: {value: '111'}});
    //     expect(wrapper.find(`${prefixSelect}-item`).length).toBe(1)
    // })
    // it("component: AutoComplete, <test prop:: show>show dropdown at first and then hide", () => {
    //     const DemoComponent = () => {
    //         return <AutoComplete
    //             options={["10000", "10001", "10002", "11000", "12010"]}
    //             placeholder='click test'
    //             show={true}
    //         />
    //     }
    //     const wrapper = mount(<DemoComponent/>)
    //     expect(wrapper.find(`${prefixSelect}-item`).length).toBe(1)
    //     wrapper.find(`.${prefixAutoComplete}-options li`).at(0).simulate('click')
    //     expect(wrapper.find(`.${prefixAutoComplete}-options`).length).toBe(0)
    // })

    it("component: AutoComplete, <test prop:: disabled>disabled test", () => {
        const DemoComponent = () => {
            return <AutoComplete
                disabled
                options={["10000", "10001", "10002", "11000", "12010"]}
                placeholder='click test'
            />
        }
        const wrapper = mount(<DemoComponent/>)
        expect(wrapper.find(`.${prefixAutoComplete} input[disabled]`).length).toBe(1)
    })
    // 结构更改导致
    // it("component: AutoComplete, <test prop:: options>options test", () => {
    //     const DemoComponent = () => {
    //         return <AutoComplete
    //             options={["Carol", "Ultron", "Sharon", "Bucky"]}
    //             placeholder='click test'
    //             show={true}
    //         />
    //     }
    //     const wrapper = mount(<DemoComponent/>)
    //     expect(wrapper.find(`.${prefixAutoComplete}-options li`).length).toBe(4)
    // })

    it('component: AutoComplete, <test prop:: onChange>, <test prop:: onKeyDown>onChange and onKeydown test', () => {
        const onChange = jest.fn();
        const onKeydown = jest.fn();
        const DemoComponent = () => {
            return <AutoComplete
                options={["Carol", "Ultron", "Sharon", "Bucky"]}
                placeholder='click test'
                onChange={onChange}
                onKeyDown={onKeydown}
                show={true}
            />
        }
        const wrapper = mount(<DemoComponent/>)
        wrapper.find('input').simulate('change', {target: {value: '111'}});
        expect(onChange).toHaveBeenCalled();
        wrapper.find('input').simulate('keydown', {keyCode: 13});
        expect(onKeydown).toHaveBeenCalledTimes(1);
    });
    // 结构更改导致
    // it('component: AutoComplete, <test prop:: onSelectOption>,onSelectOption test', () => {
    //     const onSelectOption = jest.fn();
    //     const DemoComponent = () => {
    //         return <AutoComplete
    //             options={["Carol", "Ultron", "Sharon", "Bucky"]}
    //             placeholder='select test'
    //             onSelectOption={onSelectOption}
    //             show={true}
    //         />
    //     }
    //     const wrapper = mount(<DemoComponent/>)
    //     wrapper.find(`.${prefixAutoComplete}-options li`).at(0).simulate('click')
    //     expect(onSelectOption).toHaveBeenCalled();
    // });

    it('component: AutoComplete, <test prop:: onBlur>onBlur test', () => {
        const onBlur = jest.fn();
        const DemoComponent = () => {
            return <AutoComplete
                options={["Carol", "Ultron", "Sharon", "Bucky"]}
                placeholder='blur test'
                onBlur={onBlur}
                show={true}
            />
        }
        const wrapper = mount(<DemoComponent/>)
        wrapper.find('input').simulate('focus');
        wrapper.find('input').simulate('blur');
        expect(onBlur).toHaveBeenCalled();
    });

    // 结构更改
    // it('component: AutoComplete, <test prop:: fieldid>', () => {
    //     let wrapper = mount(<AutoComplete options={["111", "222", "333"]} show={true} />);
    //     expect(wrapper.find(`ul li`).at(0).props().fieldid).toBe(undefined);
    //     expect(wrapper.find(`input`).at(0).props().fieldid).toBe(undefined);
    //     wrapper.setProps({ fieldid: 'test' });
    //     expect(wrapper.find(`ul li`).at(0).props().fieldid).toBe("test_option_0");
    //     expect(wrapper.find(`input`).at(0).props().fieldid).toBe("test_input");
    // });

    // it('component: AutoComplete, <test prop:: placeholder>', () => {
    //     let wrapper = mount(<AutoComplete placeholder='my placeholder test' />);
    //     expect(wrapper.find(`input`).at(0).props().placeholder).toBe("my placeholder test");
    // });
})

// 结构更改导致
//补充键盘按键测试
// describe('component: AutoComplete, keyboard test', () => {
//     let wrapper;
//     beforeEach(() => {
//         wrapper = mount(<AutoComplete options={["111", "222", "333"]} show={true} />);
//     });
//     // 38为上方向键,40为下方向键,13为回车键的键码
//     it('keyCode:38', () => {
//         expect(wrapper.find('input').prop('value')).toBe('')
//         wrapper.find('input').simulate('keydown', { keyCode: 38 });
//         expect(wrapper.find('input').prop('value')).toBe("333")
//         wrapper.find('input').simulate('keydown', { keyCode: 38 });
//         expect(wrapper.find('input').prop('value')).toBe("222")
//     })
//     it('keyCode:40', () => {
//         expect(wrapper.find('input').prop('value')).toBe('')
//         wrapper.find('input').simulate('keydown', { keyCode: 40 });
//         expect(wrapper.find('input').prop('value')).toBe("111")
//     })
//     it('keyCode:13', () => {
//         expect(wrapper.find(`.${prefixAutoComplete}-options`)).toHaveLength(1);
//         wrapper.find('input').simulate('keydown', { keyCode: 13 });
//         expect(wrapper.find(`.${prefixAutoComplete}-options`)).toHaveLength(0);
//     })
// });

//补充鼠标移入移出测试
// describe('component: AutoComplete, mouse test', () => {
//     let wrapper = mount(<AutoComplete options={["111", "222", "333"]} show={true} />);
//     it('mouseEnter and mouseleave', () => {
//         expect(wrapper.find('input').prop('value')).toBe("")
//         wrapper.find('ul li').at(0).simulate('mouseEnter');
//         expect(wrapper.find('input').prop('value')).toBe("111")
//         wrapper.find('ul').at(0).simulate('mouseleave');
//         expect(wrapper.find('input').prop('value')).toBe("")
//     })
//     it('blur', async () => {
//         expect(wrapper.find(`.${prefixAutoComplete}-options`)).toHaveLength(1);
//         wrapper.find('input').simulate('focus');
//         wrapper.find('input').simulate('blur');
//         await sleep(300)
//         wrapper.update()
//         expect(wrapper.find(`.${prefixAutoComplete}-options`)).toHaveLength(0);
//     })
// });

//补充componentWillReceiveProps测试
// describe('component: AutoComplete, componentWillReceiveProps test', () => {
//     let wrapper;
//     beforeEach(() => {
//         wrapper = mount(<AutoComplete options={["111", "222", "333"]} show={true} />);
//     });
//     it('value', () => {
//         expect(wrapper.find('input').prop('value')).toBe("")
//         wrapper.setProps({ value: '111' });
//         expect(wrapper.find('input').prop('value')).toBe("111")
//     })
//     it('options', async () => {
//         expect(wrapper.find(`ul li`).at(0).text()).toBe("111");
//         wrapper.setProps({ options: [] });
//         expect(wrapper.find(`ul li`).at(0).text()).toBe("暂无相关数据");
//     })
//     it('show', async () => {
//         expect(wrapper.find(`.${prefixAutoComplete}-options`)).toHaveLength(1);
//         wrapper.setProps({ show: false });
//         expect(wrapper.find(`.${prefixAutoComplete}-options`)).toHaveLength(0);
//     })
// });

//补充Value值为" "的情况
// describe('component: AutoComplete, set " " as value ', () => {
//     let wrapper;
//     beforeEach(() => {
//         wrapper = mount(<AutoComplete />);
//     });
//     it('value={" "}', () => {
//         wrapper = mount(<AutoComplete value={" "} />);
//         expect(wrapper.find('input').prop('value')).toBe(" ")
//     })
//     it('setProps({ value: " " })', async () => {
//         wrapper.setProps({ value: " " });
//         expect(wrapper.find('input').prop('value')).toBe(" ")
//     })
//     it('change ', async () => {
//         wrapper.find('input').simulate('change', { target: { value: " " } });
//         expect(wrapper.find('input').prop('value')).toBe("")
//     })
// });

//补充Jira场景单测
// describe('Jira Test, component: AutoComplete', () => {
//     it('fix: [autoComplete] #QDJCJS-8125 autoComplete不应该有选中态', () => {
//         let wrapper = mount(<AutoComplete options={["111", "222", "333"]} show={true} />);
//         //选中一项后，隐藏面板再显示，不应该有选中状态
//         wrapper.find(`${prefixSelect}-item`).at(0).simulate('mouseEnter');
//         expect(wrapper.find(`${prefixSelect}-item`).at(0).hasClass('active')).toBe(true)
//         wrapper.setProps({show: false});
//         wrapper.setProps({show: true});
//         expect(wrapper.find(`${prefixSelect}-item`).at(0).hasClass('active')).toBe(false)
//     })
//     it('fix: #QDJCJS-5537 AutoComplete组件修改', () => {
//         let wrapper = mount(<AutoComplete options={["111", "222", "333"]} show={true} />);
//         //清空输入框或者输入空字符后，重新打开面板，不应该出现没有选项
//         wrapper.find(`${prefixSelect}-item`).at(0).simulate('click');
//         wrapper.find('input').simulate('change', { target: { value: " " } });
//         wrapper.setProps({show: false});
//         wrapper.setProps({show: true});
//         expect(wrapper.find('ul li')).toHaveLength(3); //任有三个选项
//     })
// });
describe("X basic tests, <test prop:: options>", () => {
    it('test <options> type', async() => {
 
        let wrapper = mount(<AutoComplete getPopupContainer={dom => dom} open={true} />);
        // expect(wrapper.find('input').instance().value).toEqual('a1');
        wrapper.setProps({options: [{label: 'a1', value: 'a1'}, {label: 'b2', value: 'b2'}, {label: 'c3', value: 'c3'}]});
        expect(wrapper.find(`.${prefixSelect}-dropdown-hidden`).length).toBe(0);
        // 设置非法格式数据，下拉无法正常渲染
        wrapper.setProps({options: [123]});
        expect(wrapper.find(`.${prefixSelect}-dropdown-hidden`).length).toBe(1);
    });
    
    it('<test prop:: children>', () => {
        let wrapper = mount(
            <AutoComplete
                getPopupContainer={dom => dom}
                value="a1" options={[{label: 'a1', value: 'a1'}, {label: 'b2', value: 'b2'}, {label: 'c3', value: 'c3'}]}
                open={true}
            >
               <input className='myInput' />
            </AutoComplete>
        );
        expect(wrapper.find('.myInput')).toBeDefined()
    })
})

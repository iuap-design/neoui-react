/** Cascader.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {attrsTest, sleep} from "../../../next-ui-library/test/common/index"
import {prefix} from '../../wui-core/src/updatePrefix'
import Icon from '../../wui-icon/src'
import Cascader from '../src/index';

const options = [
    {
        value: '浙江',
        label: '浙江',
        children: [
            {
                label: '杭州',
                value: '杭州',
                children: [
                    {
                        label: '西湖',
                        value: '西湖',
                        children: [
                            {
                                label: '白娘子',
                                value: '白娘子'
                            },
                            {
                                label: '许仙',
                                value: '许仙'
                            }]
                    }]
            }
        ]
    },
    {
        value: '江苏',
        label: '江苏',
        children: [
            {
                value: '南京',
                label: '南京',
                children: [
                    {
                        label: '中华门',
                        value: '中华门'
                    }]
            }
        ]
    },
    {
        label: '山东',
        value: '山东'
    }
];
const options1 = [
    {
        value1: '浙江',
        label1: '浙江'
    },
    {
        value1: '江苏',
        label1: '江苏',
        children1: [
            {
                value1: '南京',
                label1: '南京',
                children1: [
                    {
                        label1: '中华门',
                        value1: '中华门'
                    }]
            }
        ]
    },
    {
        label1: '山东',
        value1: '山东'
    }
];
const defaultValue = ['浙江', '杭州', '西湖', '白娘子'];
const defaultValue2 = ['江苏', '南京', '中华门'];
//新增fieldid测试
describe('component: cascader, <test prop:: fieldid>', () => {
    it('[@fieldid="***-input"]', () => {
        let wrapper = mount(<Cascader options={options} fieldid='test' />);
        expect(wrapper.find(`.${prefix}-cascader-input`).at(0).props().fieldid).toEqual('test-input')
    })
    it('[@fieldid="***-expand"]', async () => {
        let wrapper = mount(<Cascader options={options} fieldid='test' />);
        wrapper.find('.uf-arrow-down').at(0).simulate('click')
        await sleep(300)
        expect(wrapper.find('.uf-arrow-right').at(0).instance().getAttribute('fieldid')).toEqual('test_expand_0')
    })
    it('[@fieldid="***-close"]', async () => {
        let wrapper = mount(<Cascader options={options} fieldid='test' />);
        wrapper.find('.uf-arrow-down').at(0).simulate('click')
        wrapper.find(`.${prefix}-cascader-menu`).find('li').at(2).simulate('click')
        await sleep(300)
        expect(wrapper.find(`.uf-close-c`).at(0).instance().getAttribute('fieldid')).toEqual('test_close')
    })
})
describe('component: Cascader, <test prop:: popupVisible>, <test prop:: onPopupVisibleChange>', () => {
    // [false, true].forEach((item) => {
    //     it(`popupVisible is ${item}`, () => {
    //         const wrapper = mount(<Cascader options={options} popupVisible={item} />);
    //         wrapper.find('input').simulate('click');
    //         expect(wrapper.exists(`.${prefix}-cascader-menu`)).toEqual(item);
    //     });
    // })
    // it(`popupVisible is true`, () => {
    //     const wrapper = mount(<div id="popupEl"><Cascader getPopupContainer={() => document.getElementById('popupEl')} options={options} popupVisible={true} /></div>);
    //     // wrapper.find('input').simulate('click');
    //     expect(wrapper.find(`.${prefix}-cascader-menu`).length).toEqual(1);
    // });
    it(`popupVisible is false`, () => {
        const wrapper = mount(<Cascader options={options} popupVisible={false} />);
        wrapper.find('input').simulate('click');
        expect(wrapper.exists(`.${prefix}-cascader-menus`)).toEqual(false);
    });
    it('popup correctly when panel is open', () => {
        const onPopupVisibleChange = jest.fn();
        const wrapper = mount(<Cascader options={options} onPopupVisibleChange={onPopupVisibleChange} />);
        wrapper.find('input').simulate('click');
        expect(onPopupVisibleChange).toHaveBeenCalledWith(true, undefined);
        wrapper.find('input').simulate('click');
        expect(onPopupVisibleChange).toHaveBeenCalledWith(false, undefined);
    });
    it('should close popup when clear selection', () => {
        const onPopupVisibleChange = jest.fn();
        const wrapper = mount(
            <Cascader
                options={options} popupVisible
                defaultValue={['zhejiang', 'hangzhou']}
                onPopupVisibleChange={onPopupVisibleChange}
            />,
        );
        wrapper.find(`.${prefix}-cascader-picker-clear i`).at(0).simulate('click');
        expect(onPopupVisibleChange).toHaveBeenCalledWith(false, 'isClear');
    });
    it('should not trigger visible change when click search input', () => {
        const onPopupVisibleChange = jest.fn();
        const wrapper = mount(<Cascader options={options} showSearch onPopupVisibleChange={onPopupVisibleChange} />);
        wrapper.find('input').simulate('focus');
        expect(onPopupVisibleChange).toHaveBeenCalledTimes(0);
        wrapper.find('input').simulate('click');
        expect(onPopupVisibleChange).toHaveBeenCalledTimes(1);
        wrapper.find('input').simulate('click');
        expect(onPopupVisibleChange).toHaveBeenCalledTimes(1);
        wrapper.find('input').simulate('blur');
        wrapper.find('.wui-cascader-picker').simulate('click');
        // wrapper.setState({ popupVisible: false });
        // wrapper.find('input').simulate('click');
        expect(onPopupVisibleChange).toHaveBeenCalledTimes(2);
    });
})
describe('component: Cascader, <test prop:: value>', () => {
    it(`it should have value`, () => {
        const wrapper = mount(<Cascader value={['浙江', '杭州', '西湖', '白娘子']} options={options} />);
        expect(wrapper.find(`.${prefix}-cascader-picker-label`).at(0).text()).toEqual(['浙江', '杭州', '西湖', '白娘子'].join(' / '));
    })
})
describe('component: Cascader, <test prop:: suffixIcon >', () => {
    it(`default suffixicon`, () => {
        const wrapper = mount(<Cascader />);
        expect(wrapper.find(`.${prefix}-cascader-picker-arrow i`).hasClass("uf-arrow-down")).toEqual(true);
    })
    it(`change suffixicon`, () => {
        const mCascader = mount(<Cascader suffixIcon={<Icon type="uf-star"/>} />);
        expect(mCascader.find(`.${prefix}-cascader-picker-arrow i`).hasClass("uf-star")).toEqual(true);
    })
})
describe('component: Cascader, <test prop:: showSearch>', () => {
    it(``, () => {
        const wrapper = mount(<Cascader showSearch options={options} />);
        wrapper.find('input').simulate('change', {target: {value: '江'}})
        expect(wrapper.find(`.${prefix}-cascader-menu-item`)).toHaveLength(3);
    })

})
describe('render cascader', () => {
    it('render cascader', () => {
        const mCascader = mount(<Cascader options={options}/>);
        expect(mCascader.find('input').at(0).hasClass(`${prefix}-cascader-input`)).toEqual(true)
    })
})
describe('component: Cascader, <test prop:: size>', () => {
    ['lg', 'md', 'sm'].forEach(item => {
        it(`it should have class name ${item}`, () => {
            const mCascader = mount(<Cascader size={item} options={options}/>);
            expect(mCascader.find('input').at(0).hasClass(`${item}`)).toEqual(true)
        })
    })
})
describe('component: Cascader, <test prop:: disabled>', () => {
    it(`it should have class name cascader-picker-disabled`, () => {
        const mCascader = mount(<Cascader disabled={true} options={options}/>);
        expect(mCascader.find('span').at(0).hasClass(`${prefix}-cascader-picker-disabled`)).toEqual(true);
        expect(mCascader.find('input').at(0).instance().disabled).toEqual(true);
    })
})
describe('component: Cascader, <test prop:: placeholder>', () => {
    it(`it should have placeholder`, () => {
        const mCascader = mount(<Cascader placeholder='请输入' options={options}/>);
        expect(mCascader.find('input').at(0).instance().placeholder).toEqual('请输入');
    })
})
describe('component: Cascader, <test prop:: defaultValue>', () => {
    it(`it should have defaultValue`, () => {
        const mCascader = mount(<Cascader defaultValue={defaultValue} options={options}/>);
        expect(mCascader.find(`.${prefix}-cascader-picker-label`).at(0).text()).toEqual(defaultValue.join(' / '));
    })
})
describe('component: Cascader, <test prop:: separator>', () => {
    it(`it should have defaultValue`, () => {
        const mCascader = mount(<Cascader defaultValue={defaultValue} separator="**" options={options}/>);
        expect(mCascader.find(`.${prefix}-cascader-picker-label`).at(0).text()).toEqual(defaultValue.join(' ** '));
    })
})
describe('component: Cascader, <test prop:: bordered>', () => {
    it(`it should have defaultValue`, () => {
        const mCascader = mount(<Cascader options={options}/>);
        expect(mCascader.find(`.${prefix}-cascader-picker`).at(0).hasClass(`${prefix}-cascader-picker-border-none`)).toEqual(false)
        mCascader.setProps({
            bordered: false
        })
        expect(mCascader.find(`.${prefix}-cascader-picker`).at(0).hasClass(`${prefix}-cascader-picker-border-none`)).toEqual(true)
    })
})
describe('component: Cascader, <test prop:: allowClear>', () => {
    it(`it should have defaultValue`, () => {
        let mCascader = mount(<Cascader allowClear={true} defaultValue={defaultValue} options={options}/>);
        let div = mCascader.find(`.${prefix}-cascader-picker`).first();
        expect(div.childAt(2).hasClass(`${prefix}-cascader-picker-clear`)).toBeTruthy();
        mCascader.setProps({allowClear: false})
        div = mCascader.find(`.${prefix}-cascader-picker`).first();
        expect(div.childAt(2).hasClass(`${prefix}-cascader-picker-clear`)).toBeFalsy();
    })
})
describe('component: Cascader, <test prop:: autoFocus>', () => {

    it('autoFocus should be called ', () => {
        let mCascader = mount(<Cascader autoFocus showSearch={true}>
        </Cascader>);
        const input = mCascader.find('input')
        mCascader.simulate('mouseEnter');
        setTimeout(() => expect(input.focus).toHaveBeenCalled(), 250);
    })
})
describe('component: Cascader, <test prop:: style>', () => {

    it('it should have style color ', () => {
        let mCascader = mount(<Cascader style={{color: 'red'}} showSearch={true}>
        </Cascader>);
        const mSpan = mCascader.find(`.${prefix}-cascader-picker`)
        expect(mSpan.prop('style').color).toEqual('red');
    })
})
describe('component: Cascader, <test prop:: showSearch>', () => {

    it('it should have style color ', () => {
        let mCascader = mount(<Cascader showSearch={true}>
        </Cascader>);
        const mSpan = mCascader.find(`.${prefix}-cascader-picker`)
        expect(mSpan.hasClass(`${prefix}-cascader-picker-show-search`)).toEqual(true);
    })
})
describe('component: Cascader, <test prop:: displayRender>', () => {

    it('it should have style color ', () => {
        let mCascader = mount(<Cascader displayRender={() => '2'} defaultValue={defaultValue}>
        </Cascader>);
        const mSpan = mCascader.find(`.${prefix}-cascader-picker`)
        expect(mCascader.find(`.${prefix}-cascader-picker-label`).at(0).text()).toEqual('2');
    })
})
describe('component: Cascader, <test prop:: notFoundContent>', () => {

    it('it should have style color ', () => {
        const mCascader = mount(<Cascader notFoundContent='222' defaultValue={defaultValue}>
        </Cascader>);
        const outDiv = mCascader.find(`.${prefix}-cascader-picker`);
        outDiv.simulate('click');
        const mSpan = mCascader.find(`.${prefix}-cascader-menu-item`)

        expect(mSpan).toHaveLength(1)
        expect(mSpan.text()).toEqual('222');
    })
})

attrsTest({
    title: 'component: Select, <test prop:: className>',
    Component: Cascader,
    attrs: {
        className: 'my-class'
    },
    selector: `.${prefix}-cascader-picker`,
    classnames: [`my-class`]
})

describe('component: Cascader, <test prop:: getPopupContainer>, <test prop:: defaultValue>', () => {
    it(`it should have popup count as 7`, () => {
        const mCascader = mount(
            <div id="popupEl">
                <Cascader getPopupContainer={() => document.getElementById('popupEl')}
						  defaultValue={defaultValue} separator="**" options={options}/>
            </div>
        );
        let outDiv = mCascader.find(`.${prefix}-cascader-picker`);
        outDiv.simulate('click');
        const popupElWrappers = mCascader.find(`.${prefix}-cascader-menu-item`);
        expect(popupElWrappers).toHaveLength(7)
    })
})
describe('component: Cascader, <test prop:: getPopupContainer>, <test prop:: defaultValue>, <test prop:: fieldNames>', () => {
    it(`it should have popup count as 5`, () => {
        const mCascader = mount(
            <div id="popupEl">
                <Cascader getPopupContainer={() => document.getElementById('popupEl')}
						  fieldNames={{
							  children: 'children1',
							  label: 'label1',
							  value: 'value1',
						  }}
						  defaultValue={defaultValue2} options={options1}/>
            </div>
        );
        let outDiv = mCascader.find(`.${prefix}-cascader-picker`);
        outDiv.simulate('click');
        const popupElWrappers = mCascader.find(`.${prefix}-cascader-menu-item`);
        expect(popupElWrappers).toHaveLength(5)
    })
})
// should dropdownRender return a data structure ？
describe('component: Cascader, <test prop:: getPopupContainer>, <test prop:: dropdownRender>', () => {
    it('it should have style color ', () => {
        let mCascader = mount(
            <div id="popupEl">
                <Cascader getPopupContainer={() => document.getElementById('popupEl')}
						  dropdownRender={() => <div className="dropdownTest">2</div>}>
                </Cascader>
            </div>
        );
        let outDiv = mCascader.find(`.${prefix}-cascader-picker`);
        outDiv.simulate('click');
        const popupElWrappers = mCascader.find(`.${prefix}-cascader-menu-empty`);
        expect(popupElWrappers).toHaveLength(1)
        expect(mCascader.find(`.dropdownTest`).text()).toEqual('2');
    })
})
describe('component: Cascader, <test prop:: getPopupContainer>, <test prop:: changeOnSelect>', () => {
    it(`it should have text as 浙江`, () => {
        const mCascader = mount(
            <div id="popupEl">
                <Cascader getPopupContainer={() => document.getElementById('popupEl')}
						  changeOnSelect={true} options={options}/>
            </div>
        );
        let outDiv = mCascader.find(`.${prefix}-cascader-picker`);
        outDiv.simulate('click');
        const popupElWrapper = mCascader.find(`.${prefix}-cascader-menu-item`).first();
        popupElWrapper.simulate('click');
        expect(mCascader.find(`.${prefix}-cascader-picker-label`).at(0).text()).toEqual('浙江');
    })
})
describe('component: Cascader, <test prop:: getPopupContainer>, <test prop:: popupClassName>', () => {
    it(`it should have class name as my-class-1`, () => {
        const mCascader = mount(
            <div id="popupEl">
                <Cascader getPopupContainer={() => document.getElementById('popupEl')}
						  popupClassName="my-class-1"
						  changeOnSelect={true} options={options}/>
            </div>
        );
        let outDiv = mCascader.find(`.${prefix}-cascader-picker`);
        outDiv.simulate('click');
        const popupElWrapper = mCascader.find(`.${prefix}-cascader-dropdown`).first();
        expect(popupElWrapper.hasClass('my-class-1')).toEqual(true);

    })
})
// todo
// describe('component: Cascader, <test prop:: getPopupContainer>, <test prop:: popupPlacement>', () => {
//     ['bottomRight', 'bottomLeft'].forEach(item => {
//         xit(`it should have defaultValue`, () => {
//             const mCascader = mount(
//                 <div id="popupEl" style={{padding: '100px', margin: "100px"}}>
//                     <Cascader getPopupContainer={() => document.getElementById('popupEl')}
// 							  popupPlacement={item}

// 							  changeOnSelect={true} options={options}/>
//                 </div>
//             );
//             let outDiv = mCascader.find(`.${prefix}-cascader-picker`);
//             outDiv.simulate('click');
//             const popupElWrapper = mCascader.find(`.${prefix}-cascader-menus`).first();
//             // expect(popupElWrapper.hasClass(`${prefix}-cascader-menus-placement-${item}`)).toEqual(true);
//         })
//     })

// })
describe('component: Cascader, <test prop:: getPopupContainer>, <test prop:: defaultValue>, <test prop:: loadData>', () => {
    it(`loadData should be called`, () => {
        const mockLoadData = jest.fn();
        const mCascader = mount(
            <div id="popupEl">
                <Cascader getPopupContainer={() => document.getElementById('popupEl')}
						  loadData={mockLoadData}
						  changeOnSelect={true} options={[
                        {
                            value: 'zhejiang1',
                            label: 'Zhejiang1',
                            // it must have the attribute as isLeaf
                            isLeaf: false,
                        },
                        {
                            value: 'jiangsu',
                            label: 'Jiangsu',
                            isLeaf: false,
                        },
                    ]}/>
            </div>
        );
        let outDiv = mCascader.find(`.${prefix}-cascader-picker`);
        outDiv.simulate('click');
        expect(mockLoadData).not.toHaveBeenCalled();
        const popupElWrapper = mCascader.find(`.${prefix}-cascader-menu-item`).first();
        popupElWrapper.simulate('click');
        expect(mockLoadData).toHaveBeenCalled();
        expect(mockLoadData.mock.calls[0][0][0].value).toBe('zhejiang1')
    })
})
// todo
describe('component: Cascader, <test prop:: getPopupContainer>, <test prop:: defaultValue>, <test prop:: expandTrigger>', () => {
    it(`it should have defaultValue`, () => {
        const mCascader = mount(
            <div id="popupEl">
                <Cascader getPopupContainer={() => document.getElementById('popupEl')}
						  expandTrigger='hover' options={options}/>
            </div>
        );
        let outDiv = mCascader.find(`.${prefix}-cascader-picker`);
        outDiv.simulate('click');
        const popupElWrapper = mCascader.find(`.${prefix}-cascader-menu-item`).first();
        popupElWrapper.simulate('mouseEnter');

        popupElWrapper.simulate('click');
        expect(mCascader.find(`.${prefix}-cascader-menu`)).toHaveLength(2)

    })
})
describe('component: Cascader, <test prop:: getPopupContainer>, <test prop:: expandIcon>', () => {
    it(`it should have new icon and class as uf-dongjie`, () => {
        const mCascader = mount(
            <div id="popupEl">
                <Cascader getPopupContainer={() => document.getElementById('popupEl')}
						  options={options}
						  expandIcon={<Icon type="uf-dongjie"/>}
                />
            </div>
        );
        let outDiv = mCascader.find(`.${prefix}-cascader-picker`);
        outDiv.simulate('click');
        const popupElWrapper = mCascader.find(`.${prefix}-cascader-menu-item-expand-icon i`).first();
        expect(popupElWrapper.hasClass('uf-dongjie')).toEqual(true);

    })
})
describe('component: Cascader, <test prop:: getPopupContainer>, <test prop:: onChange>, <test prop:: options>', () => {
    it(`onChange should have be called`, () => {
        const mockChange = jest.fn();
        const mCascader = mount(
            <div id="popupEl">
                <Cascader getPopupContainer={() => document.getElementById('popupEl')}
						  options={options}
						  changeOnSelect={true}
						  onChange={mockChange}
						  expandIcon={<Icon type="uf-dongjie"/>}
                />
            </div>
        );
        let outDiv = mCascader.find(`.${prefix}-cascader-picker`);
        outDiv.simulate('click');
        expect(mockChange).not.toHaveBeenCalled();
        const popupElWrapper = mCascader.find(`.${prefix}-cascader-menu-item`).first();
        popupElWrapper.simulate('click');
        expect(mockChange).toHaveBeenCalled();
        expect(mockChange.mock.calls[0][0][0]).toBe('浙江')
        expect(mockChange.mock.calls[0][1][0].value).toBe('浙江')

    })
})
describe('component: Cascader, <test prop:: change value>', () => {
    it(`it should have change value`, () => {
        const wrapper = mount(<Cascader value={['浙江', '杭州', '西湖', '白娘子']} options={options} />);
        expect(wrapper.find(`.${prefix}-cascader-picker-label`).at(0).text()).toEqual(['浙江', '杭州', '西湖', '白娘子'].join(' / '));
        wrapper.setProps({value: ['江苏', '南京', '中华门'], fieldid: 'test', expandTrigger: 'hover', inputValue: '江苏'})
        // wrapper.find('Cascader').at(0).instance().handleChange(['江苏', '南京', '中华门'], [{__IS_FILTERED_OPTION: true, path: 'baidu'}])
        // wrapper.find('Cascader').at(0).instance().clearSelection({preventDefault: ()=> {}, stopPropagation: () => {}})
        // wrapper.find('Cascader').at(0).instance().handleKeyDown({keyCode: 'space', stopPropagation: () => {}}) 
    })
})
describe('component: Cascader, <test prop:: showSearch>', () => {
    it(`it should showSearch`, () => {
        const wrapper = mount(<Cascader fieleid="test" expandTrigger={'hover'} value={['浙江', '杭州', '西湖', '白娘子']} options={options} />);
        expect(wrapper.find(`.${prefix}-cascader-picker-label`).at(0).text()).toEqual(['浙江', '杭州', '西湖', '白娘子'].join(' / '));
        // wrapper.find('Cascader').at(0).instance().focus()
        // wrapper.find('Cascader').at(0).instance().blur()
        wrapper.unmount()
    })
})
describe('Cascader Test', () => {
    it('component: Cascader, <test prop:: inputValue>', () => {
        let wrapper = mount(<Cascader options={options} inputValue="test" />);
        expect(wrapper.find(`.${prefix}-cascader-input`).at(0).props().value).toEqual('test')
    });
    it('component: Cascader, <test prop:: locale>', () => {
        let wrapper = mount(<Cascader options={options} locale="en-us" />);
        expect(wrapper.find('input').at(0).instance().placeholder).toEqual('Please select')
    });
    it('component: Cascader, <test prop:: onSearch>', async () => {
        let searchHandle = jest.fn()
        let wrapper = mount(<Cascader options={options} onSearch={searchHandle} />);
        wrapper.find('input').simulate('change', {target: {value: '2'}})
    });
})
describe('Cascader type is tiled', () => {
    it('component: Cascader, <test prop:: dropdownType>', () => {
        let wrapper = mount(<Cascader options={options} dropdownType="tiled" allowClear={true} defaultValue={defaultValue} />);
        expect(wrapper.find(`.${prefix}-cascader-picker-label`).at(0).text()).toEqual('浙江 / 杭州 / 西湖 / 白娘子')
        // wrapper.find(`.${prefix}-cascader-picker-clear i`).at(0).simulate('click');
        // expect(wrapper.find(`.${prefix}-cascader-picker-label`).at(0).text()).toEqual('')
        wrapper.find('input').simulate('click');
        // wrapper.find(`.${prefix}-tabs-tab`).at(2).simulate('click');
        // wrapper.find(`.${prefix}-tabs-tab`).at(0).simulate('click');
        wrapper.find(`.${prefix}-cascader-tiled-item`).at(2).simulate('click');
        expect(wrapper.find(`.${prefix}-cascader-picker-label`).at(0).text()).toEqual('山东')
        wrapper.find('input').simulate('click');
        wrapper.find(`.${prefix}-cascader-tiled-item`).at(0).simulate('click');
        // wrapper.find('input').simulate('change', {target: {value: '江'}})
        // wrapper.find(`.${prefix}-cascader-tiled-search-item`).at(0).simulate('click');
    });
    it('component: Cascader, <test prop:: dropdownType loadData>', () => {
        const mockLoadData = jest.fn();
        let optionsList = [
            {
                value: 'zhejiang',
                label: 'Zhejiang',
                isLeaf: false,
                groupTopKey: 'abcd',
                groupContentKey: 'c'
            },
            {
                value: 'jiangsu',
                label: 'Jiangsu',
                isLeaf: false,
                groupTopKey: 'wxyz',
                groupContentKey: 'w',
            },
        ]
        let wrapper = mount(<Cascader options={optionsList} dropdownType="tiled" allowClear={true} loadData={mockLoadData} />);
        wrapper.find('input').simulate('click');
        wrapper.find(`.${prefix}-cascader-tiled-item`).at(0).simulate('click');
        expect(wrapper.find(`.${prefix}-cascader-picker-label`).at(0).text()).toEqual('')
    });
    it('component: Cascader, <test prop:: dropdownType loadData is isLeaf>', () => {
        const mockLoadData = jest.fn();
        let optionsList = [
            {
                value: 'zhejiang',
                label: 'Zhejiang',
                isLeaf: true,
                groupTopKey: 'abcd',
                groupContentKey: 'c'
            },
            {
                value: 'jiangsu',
                label: 'Jiangsu',
                isLeaf: true,
                groupTopKey: 'wxyz',
                groupContentKey: 'w',
            },
        ]
        let wrapper = mount(<Cascader options={optionsList} dropdownType="tiled" allowClear={true} loadData={mockLoadData} />);
        wrapper.find('input').simulate('click');
        wrapper.find(`.${prefix}-cascader-tiled-item`).at(0).simulate('click');
        expect(wrapper.find(`.${prefix}-cascader-picker-label`).at(0).text()).toEqual('Zhejiang')
    });
    it('component: Cascader, <test prop:: dropdownType tabs>', () => {
        let wrapper = mount(<div id="ttyy"><Cascader options={options} showSearch dropdownType="tiled" allowClear={true} defaultValue={defaultValue} getPopupContainer={() => document.querySelector('#ttyy')} /></div>);
        wrapper.find('input').simulate('change', {target: {value: '江'}})
        wrapper.find(`.${prefix}-cascader-tiled-search-item`).at(0).simulate('click');
        expect(wrapper.find(`.${prefix}-cascader-picker-label`).at(0).text()).toEqual('浙江 / 杭州 / 西湖 / 白娘子')
        // wrapper.find('input').simulate('click');
        // wrapper.find(`.${prefix}-tabs-tab`).at(2).simulate('click');
        // wrapper.find(`.${prefix}-tabs-tab`).at(0).simulate('click');
    });
    it('component: Cascader, <test prop:: dropdownType onSearch>', async () => {
        let searchHandle = jest.fn()
        let wrapper = mount(<Cascader options={options} showSearch dropdownType="tiled" onSearch={searchHandle} />);
        wrapper.find('input').simulate('change', {target: {value: '江'}})
    });
})
describe('Cascader multiple', () => {
    it('component: Cascader, <test prop:: multiple>', () => {
        let defaultValue1 = [['浙江', '杭州', '西湖', '白娘子'], ['浙江', '杭州', '西湖', '许仙']]
        let wrapper = mount(<Cascader options={options} multiple={true} dropdownType="tiled" allowClear={true} defaultValue={defaultValue1} />);
        // expect(wrapper.find(`.${prefix}-cascader-input`).at(0).props().value).toEqual('test')
        // expect(wrapper.find(`.${prefix}-cascader-selection-overflow-item`).at(0).find(`[title=白娘子]`).at(0).hasClass('wui-cascader-selection-item')).toEqual(true)
    });
    it('component: Cascader, <test prop:: multiple maxTagCount>', () => {
        let defaultValue1 = [['浙江', '杭州', '西湖', '白娘子'], ['浙江', '杭州', '西湖', '许仙']]
        let wrapper = mount(<Cascader options={options} multiple={true} dropdownType="tiled" allowClear={true} defaultValue={defaultValue1} maxTagCount={1} />);
        // expect(wrapper.find(`.${prefix}-cascader-input`).at(0).props().value).toEqual('test')
        // expect(wrapper.find(`.${prefix}-cascader-selection-overflow-item`).at(0).find(`[title=白娘子]`).at(0).hasClass('wui-cascader-selection-item')).toEqual(true)
    });
})

/** DynamicView.tsx */
import React, {Component} from 'react';
import DynamicView from '../src'
import { mount} from '../../../next-ui-library/test/common/mount'
import {sleep} from "../../../next-ui-library/test/common/index"
const json = {
    "nid": "nid_1000",
    "uititle": "inputCon",
    "uitype": "div",
    "uikey": 'div',
    "style": {"width": "400px"},
    "children": [
        {
            "nid": "nid_1001",
            "uititle": "输入框",
            "uitype": "Input",
            "uikey": 'input',
        },
        {
            "uitype": "DatePicker",
            "uikey": 'datepicker',
            "style": {"marginTop": "20px"},
        },
        {
            "uitype": "Tabs",
            "uikey": 'tabs',
            "style": {"marginTop": "20px"},
            "children": [
                {
                    "uikey": "tabsPane0",
                    "uitype": "Tabs.TabPane",
                    "tab": "Tab 1",
                    "key": "1",
                    "children": "内容一"
                },
                {
                    "uikey": "tabsPane1",
                    "uitype": "Tabs.TabPane",
                    "tab": "Tab 2",
                    "key": "2",
                    "children": "内容二"
                },
                {
                    "uikey": "tabsPane2",
                    "uitype": "Tabs.TabPane",
                    "tab": "Tab 3",
                    "key": "3",
                    "children": "内容三"
                }
            ]
        }
    ]
}
let tabKey = ''
function tabsClick (key) {
    tabKey = key
}
const json2 = {
    "nid": "nid_1000",
    "uititle": "inputCon",
    "uitype": "div",
    "uikey": 'div',
    "style": {"width": "400px"},
    "children": [
        {
            "nid": "nid_1001",
            "uititle": "输入框",
            "uitype": "Input",
            "uikey": 'input',
        },
        {
            "nid": "nid_1002",
            "uititle": "调用ref方法1",
            "uitype": "Button",
            "uikey": 'buttonRef1',
        },
        {
            "nid": "nid_1003",
            "uitype": "DatePicker",
            "uikey": 'datepicker',
            "style": {"marginTop": "20px"},
        },
        {
            "uitype": "Tabs",
            "uikey": 'tabs',
            "style": {"marginTop": "20px"},
            "children": [
                {
                    "uikey": "tabsPane0",
                    "uitype": "Tabs.TabPane",
                    "tab": "Tab 1",
                    "key": "1",
                    "children": "内容一"
                },
                {
                    "uikey": "tabsPane1",
                    "uitype": "Tabs.TabPane",
                    "tab": "Tab 2",
                    "key": "2",
                    "children": "内容二"
                },
                {
                    "uikey": "tabsPane2",
                    "uitype": "Tabs.TabPane",
                    "tab": "Tab 3",
                    "key": "3",
                    "children": "内容三"
                }
            ]
        }
    ],
    "uievents": {
        'tabs': {'onTabClick': tabsClick}
    }
}
class Custom extends React.Component {
    render() {
        return (
            <div id="mySelf">自定义扩展uiParser</div>
        )
    }
}

let mocEventWillMount = jest.fn();
let mocEventDidMount = jest.fn();
let mocEventWillUpdate = jest.fn();
let mocEventDidUpdate = jest.fn();
let mocEventWillUnmount = jest.fn();
let myEvent = {
    "input":{
        "onViewWillMount":function({item} = options){
            mocEventWillMount(item.uikey);
        }, // 将要挂载的生命周期方法
        "onViewDidMount":function({item} = options){
            mocEventDidMount(item.uikey)
        }, // 已挂载的生命周期方法
        "onViewWillUpdate":function({item} = options){
            mocEventWillUpdate(item.uikey)
        }, // 将要更新的生命周期方法
        "onViewDidUpdate":function({item} = options){
            mocEventDidUpdate(item.uikey)
        }, // 已更新的生命周期方法
        "onViewWillUnmount":function({item} = options){
            mocEventWillUnmount(item.uikey)
        }
    },
    "datepicker":{
        "onViewWillMount":function({item} = options){
            mocEventWillMount(item.uikey);
        }, // 将要挂载的生命周期方法
        "onViewDidMount":function({item} = options){
            mocEventDidMount(item.uikey)
        }, // 已挂载的生命周期方法
        "onViewWillUpdate":function({item} = options){
            mocEventWillUpdate(item.uikey)
        }, // 将要更新的生命周期方法
        "onViewDidUpdate":function({item} = options){
            mocEventDidUpdate(item.uikey)
        }, // 已更新的生命周期方法
        "onViewWillUnmount":function({item} = options){
            mocEventWillUnmount(item.uikey)
        }
    },
    // "tabsPane0":{
    //     "onViewWillMount":function({item} = options){
    //         mocEventWillMount(item.uikey);
    //     }, // 将要挂载的生命周期方法
    //     "onViewDidMount":function({item} = options){
    //         mocEventDidMount(item.uikey)
    //     }, // 已挂载的生命周期方法
    //     "onViewWillUpdate":function({item} = options){
    //         mocEventWillUpdate(item.uikey)
    //     }, // 将要更新的生命周期方法
    //     "onViewDidUpdate":function({item} = options){
    //         mocEventDidUpdate(item.uikey)
    //     }, // 已更新的生命周期方法
    //     "onViewWillUnmount":function({item} = options){
    //         mocEventWillUnmount(item.uikey)
    //     }
    // },
    // "tabsPane1":{
    //     "onViewWillMount":function({item} = options){
    //         mocEventWillMount(item.uikey);
    //     }, // 将要挂载的生命周期方法
    //     "onViewDidMount":function({item} = options){
    //         mocEventDidMount(item.uikey)
    //     }, // 已挂载的生命周期方法
    //     "onViewWillUpdate":function({item} = options){
    //         mocEventWillUpdate(item.uikey)
    //     }, // 将要更新的生命周期方法
    //     "onViewDidUpdate":function({item} = options){
    //         mocEventDidUpdate(item.uikey)
    //     }, // 已更新的生命周期方法
    //     "onViewWillUnmount":function({item} = options){
    //         mocEventWillUnmount(item.uikey)
    //     }
    // }

}

class TestDisplay extends Component {
    constructor(props){
        super(props);
        this.count = 0;
    }
    getDisplay() {
        return "myDisplayText";
    }
    render() {
        this.count = this.count+1;
        return <div><h2>监听store变化</h2>
                <div id={this.props.uikey} count={this.count}>{this.props.displayText}</div>
        </div>;
    }
}


describe('component: DynamicView', () => {
    it('DynamicView, <test prop:: uiMeta>', () => {
        let wrapper = mount(<DynamicView uiMeta={json} />)
        expect(wrapper.find('.wui-input').length).toEqual(1)
    });
    it('DynamicView, <test prop:: uiMeta>', () => {
        let item = ''
        let tabsClick = (key) => {
            item = key
        }
        let uiEvent = {
            'tabs': {'onTabClick': tabsClick}
        }
        let wrapper = mount(<DynamicView uiMeta={json} uiEvent={uiEvent} />)
        wrapper.find('.wui-tabs-tab').at(1).simulate('click')
        expect(item).toEqual('2')
    });
    it('DynamicView, <test prop:: uiEvent>', () => {
        let item = ''
        let tabsClick = (key) => {
            item = key
        }
        let uiEvent = {
            'tabs': {'onTabClick': tabsClick}
        }
        let wrapper = mount(<DynamicView uiMeta={[json]} uiEvent={uiEvent} />)
        wrapper.find('.wui-tabs-tab').at(1).simulate('click')
        expect(item).toEqual('2')
    });


    it('DynamicView, <test prop:: uiEvent in lifeCallback>', () => {

        let wrapper = mount(<DynamicView uiMeta={json} uiEvent={myEvent} />)
        expect(mocEventWillMount).toHaveBeenCalled()
        expect(mocEventDidMount).toHaveBeenCalled()
        // expect(mocEventWillMount).toHaveBeenCalledWith('input');
        // expect(mocEventWillMount).toHaveBeenCalledWith('datepicker');

    });

    it('DynamicView, <test prop:: uievent in uiMeta>', () => {
        let wrapper = mount(<DynamicView uiMeta={json2} />)
        wrapper.find('.wui-tabs-tab').at(1).simulate('click')
        expect(tabKey).toEqual('')
    });
    it('DynamicView, <test prop:: setState uiMeta>', () => {
        let onparaName = jest.fn()
        let wrapper = mount(<DynamicView uiMeta={Object.assign(json2, {logicFormula: true})} globalParams={{'onclick': onparaName}} />)
        // wrapper.find('CreateView').setState({uiParams: {'onclick': onparaName}})
        wrapper.setProps({uiMeta: json})
        wrapper.find('.wui-tabs-tab').at(1).simulate('click')
        expect(wrapper.find('.wui-tabs-tab').length).toEqual(3)
        wrapper.setProps({uiMeta: []})
        expect(wrapper.find('.wui-tabs-tab').length).toEqual(0)
    });
    it('DynamicView, <test prop:: uiParser>', () => {
        let uiMetajson = {
            "nid": "nid_1000",
            "uititle": "button",
            "uitype": "Custom",
            "uikey": 'button',
            "children": "打开"
        }
        let uiParse = {
            "Custom": Custom
        }
        let wrapper = mount(<DynamicView uiMeta={uiMetajson} uiParser={uiParse} />)
        expect(wrapper.find('#mySelf').length).toEqual(1)
    });


    it('DynamicView, <test prop:: uiEvent> nested event', () => {
        let myMeta = {
            "nid": "nid_1000",
            "uititle": "inputCon",
            "uitype": "div",
            "uikey": 'div',
            "style": {"width": "400px"},
            "children": [
                {
                    "nid": "nid_1003",
                    "uitype": "NestedEvent",
                    "uikey": 'testNestedEvent',
                    "a":{
                        "f":"f001",
                        "b":{
                            "z":"z001"
                        }
                    }
                }
            ]
        }
        let myEvent = {
            "testNestedEvent":{
                "onChange":function(){
                    return "change001";
                },
                "a.b.x":function(){
                    return "x001";
                },
                "a.b.y":function(){
                    return "y001";
                }
            }
        }
        class NestedEvent extends React.Component {
            render() {
                expect(this.props.onChange()).toBe('change001');
                expect(this.props.a.b.x()).toBe('x001');
                expect(this.props.a.b.y()).toBe('y001');
                expect(this.props.a.f).toBe('f001');
                expect(this.props.a.b.z).toBe('z001');
                return (
                    <div>验证自定义嵌套事件</div>
                )
            }
        }
        let wrapper = mount(<DynamicView uiMeta={myMeta} uiParser={{
            "NestedEvent": NestedEvent
        }} uiEvent={myEvent} />);

        wrapper.unmount();
    });

    it('DynamicView, <test prop:: uiEvent> life events', () => {
        let myMeta = {
            "nid": "nid_1000",
            "uititle": "div",
            "uitype": "div",
            "uikey": 'root',
            "children": []
        };
        let mocWillMount = jest.fn();
        let mocDidMount = jest.fn();
        let mocWillUpdate = jest.fn();
        let mocDidUpdate = jest.fn();
        let mocWillUnmount = jest.fn();
        let myEvent = {};
        let count = 10;
        for(let i=0;i<count;i++){
            myMeta.children.push(
                {
                    "nid": "nid_2000"+i,
                    "uititle": "输入框"+i,
                    "uitype": "Input"+i,
                    "uikey": 'inputTest'+i,
                }
            )
            myEvent['inputTest'+i] = {
                "onViewWillMount":function({item} = options){
                    mocWillMount(item.uikey);
                }, // 将要挂载的生命周期方法
                "onViewDidMount":function({item} = options){
                    mocDidMount(item.uikey)
                }, // 已挂载的生命周期方法
                "onViewWillUpdate":function({item} = options){
                    mocWillUpdate(item.uikey)
                }, // 将要更新的生命周期方法
                "onViewDidUpdate":function({item} = options){
                    mocDidUpdate(item.uikey)
                }, // 已更新的生命周期方法
                "onViewWillUnmount":function({item} = options){
                    mocWillUnmount(item.uikey)
                }
            }
        }
        let wrapper = mount(<DynamicView uiMeta={myMeta}  uiEvent={myEvent} />);
        expect(mocWillMount).toHaveBeenCalledTimes(count);
        expect(mocDidMount).toHaveBeenCalledTimes(count);
        wrapper.setProps({uiStore:{name:"testStore",init:{}}})
        expect(mocWillUpdate).toHaveBeenCalledTimes(count);
        expect(mocDidUpdate).toHaveBeenCalledTimes(count);
        wrapper.unmount();
        expect(mocWillUnmount).toHaveBeenCalledTimes(count);

    })

    it('DynamicView, <test prop:: uiStore> with init、api', () => {
        let myMeta = {
            "nid": "nid_1000",
            "uititle": "inputCon",
            "uitype": "div",
            "uikey": 'div',
            "style": {"width": "400px"},
            "children": [
                {
                    "nid": "nid_1001",
                    "uititle": "输入框1",
                    "uitype": "Input",
                    "uikey": 'input1',
                },
                {
                    "nid": "nid_1002",
                    "uititle": "输入框2",
                    "uitype": "Input",
                    "uikey": 'input2',
                },
                {
                    "nid": "nid_100101",
                    "uititle": "调用ref方法1",
                    "uitype": "Button",
                    "uikey": 'buttonRef',
                },
                {
                    "nid": "nid_100102",
                    "uititle": "调用action方法",
                    "uitype": "Button",
                    "uikey": 'buttonAct',
                },
                {
                    "nid": "nid_100103",
                    "uititle": "调用更新input方法",
                    "uitype": "Button",
                    "uikey": 'buttonInput',
                },
                {
                    "nid": "nid_1003",
                    "uitype": "TestDisplay",
                    "uikey": 'testDisplay1'
                },
                {
                    "uitype": "Tabs",
                    "uikey": 'tabs',
                    "activeKey": "1",
                    "children": [
                        {
                            "uikey": "tabsPane0",
                            "uitype": "Tabs.TabPane",
                            "tab": "Tab 1",
                            "key": "1",
                            "children": [
                                {
                                    "nid": "nid_100101",
                                    "uitype": "TestDisplay",
                                    "uikey": 'testDisplay2'
                                }
                            ]
                        },
                        {
                            "uikey": "tabsPane1",
                            "uitype": "Tabs.TabPane",
                            "tab": "Tab 2",
                            "key": "2",
                            "children": "内容二"
                        },
                        {
                            "uikey": "tabsPane2",
                            "uitype": "Tabs.TabPane",
                            "tab": "Tab 3",
                            "key": "3",
                            "children": "内容三"
                        }
                    ]
                }
            ]
        }
        let nowTime = "new_"+new Date().getTime();
        let myStore = {
            name:"myStore1",
            init:{
                "displayText":'空',
                "inputValue":''
            },
            changeText:function(rootStore,newText){
                rootStore.myStore1.displayText = newText;
                return {...rootStore}
            },
            changeInput:function(rootStore,newText){
                rootStore.myStore1.inputValue = newText;
                return {...rootStore}
            }
        }

        let myEvent = {
            "input1":{
                'onViewObserveStore': function(rootStore) {
                    return {
                        value:rootStore.myStore1.inputValue
                    }
                }
            },
            "buttonRef":{
                "onViewObserveStore":function(){
                    return {type:'primary'};
                },
                "onClick":function(){
                    // console.log('AAA--buttonRef--click');
                    let testDisplay1 = this.findUI('testDisplay1');
                    let testDisplay2 = this.findUI('testDisplay2');
                    let val1 = testDisplay1.api.getDisplay();
                    let val2 = testDisplay2.api.getDisplay();
                    // 验证api是否正常，store中的子元素ref是否正常
                    expect(val1).toEqual('myDisplayText');
                    expect(val2).toEqual('myDisplayText');
                }
            },
            "buttonAct":{
                "onClick":function(){
                    let store = this.getStore();
                    store.api.changeText(nowTime);
                }
            },
            "buttonInput":{
                "onClick":function(){
                    let store = this.getStore();
                    store.api.changeInput(nowTime);
                }
            },
            "testDisplay1":{
                "onViewWillMount":function({item} = options){
                    mocEventWillMount(item.uikey);
                }, // 将要挂载的生命周期方法
                "onViewDidMount":function({item} = options){
                    mocEventDidMount(item.uikey)
                }, // 已挂载的生命周期方法
                "onViewWillUpdate":function({item} = options){
                    mocEventWillUpdate(item.uikey)
                }, // 将要更新的生命周期方法
                "onViewDidUpdate":function({item} = options){
                    mocEventDidUpdate(item.uikey)
                }, // 已更新的生命周期方法
                "onViewWillUnmount":function({item} = options){
                    mocEventWillUnmount(item.uikey)
                },
                'onViewObserveStore': function(rootStore) {
                    // console.log('AAA----[onViewObserveStore][TestDisplay]--》执行变化到view.props---->', preStore);
                    return {
                        displayText: rootStore.myStore1.displayText
                    }
                }
            },
            "testDisplay2":{
                'onViewObserveStore': function(rootStore) {
                    // console.log('AAA----[onViewObserveStore][TestDisplay]--》执行变化到view.props---->', preStore);
                    return {
                        displayText: rootStore.myStore1.displayText +"test2"
                    }
                }
            },
        }


        let wrapper = mount(<DynamicView uiParser={{"TestDisplay":TestDisplay}} uiMeta={myMeta}  uiEvent={myEvent} uiStore={myStore}/>);

        // 验证函数组件WithConfigConsumer或React.forwardRef的场景是否触发onViewObserveStore
        let buttonFef = wrapper.find('.wui-button').at(0);
        expect(buttonFef.hasClass(`wui-button-primary`)).toEqual(true);

        // 验证生命周期是否正常
        expect(mocEventWillMount).toHaveBeenCalled()
        expect(mocEventDidMount).toHaveBeenCalled()

        // 模拟触发store变化
        wrapper.find('.wui-button').at(0).simulate('click');
        wrapper.find('.wui-button').at(1).simulate('click');
        wrapper.find('.wui-button').at(2).simulate('click');

        // TODO 单个组件update时机存在问题
        // expect(mocEventWillUpdate).toHaveBeenCalled()
        // expect(mocEventDidUpdate).toHaveBeenCalled()

        // 验证onViewObserveStore是否正常映射为props
        let inputDom1 = wrapper.find(`input`).at(0);
        let testDom1 = wrapper.find(`#testDisplay1`);
        let testDom2 = wrapper.find(`#testDisplay2`);

        expect(inputDom1.value).toBe(nowTime)
        expect(testDom1.text()).toBe(nowTime)
        expect(testDom2.text()).toBe(nowTime+"test2")


        expect(parseInt(testDom1.prop('count'))).toBe(2);
        expect(parseInt(testDom2.prop('count'))).toBe(2);

        // 验证生命周期是否正常
        wrapper.unmount();
        expect(mocEventWillUnmount).toHaveBeenCalled();

    });

    it('DynamicView, <test prop:: uiStore> with initState、actions、effects', async () => {
        let myMeta = {
            "nid": "nid_1000",
            "uititle": "inputCon",
            "uitype": "div",
            "uikey": 'page0',
            "style": {"width": "400px"},
            "children": [
                {
                    "nid": "nid_1001",
                    "uititle": "输入框1",
                    "uitype": "Input",
                    "uikey": 'input1',
                },
                {
                    "nid": "nid_1002",
                    "uititle": "输入框2",
                    "uitype": "Input",
                    "uikey": 'input2',
                },
                {
                    "nid": "nid_100101",
                    "children": "调用ref方法1",
                    "uitype": "Button",
                    "uikey": 'buttonRef',
                },
                {
                    "nid": "nid_100102",
                    "children": "调用action方法",
                    "uitype": "Button",
                    "uikey": 'buttonAct',
                },
                {
                    "nid": "nid_100103",
                    "children": "调用更新input方法",
                    "uitype": "Button",
                    "uikey": 'buttonInput',
                },
                {
                    "nid": "nid_100104",
                    "children":[{
                        "nid": "nid_1001040",
                        "uitype": "div",
                        "children": "Button状态测试"
                    }],
                    "uitype": "Button",
                    "uikey": 'buttonStatus'
                },
                {
                    "nid": "nid_100105",
                    "uititle": "用户信息",
                    "uitype": "TestDisplay",
                    "uikey": 'userDisplay',
                },
                {
                    "nid": "nid_1003",
                    "uitype": "TestDisplay",
                    "uikey": 'testDisplay1'
                },
                {
                    "uitype": "Tabs",
                    "uikey": 'tabs',
                    "activeKey": "1",
                    "children": [
                        {
                            "uikey": "tabsPane0",
                            "uitype": "Tabs.TabPane",
                            "tab": "Tab 1",
                            "key": "1",
                            "children": [
                                {
                                    "nid": "nid_100101",
                                    "uitype": "TestDisplay",
                                    "uikey": 'testDisplay2'
                                }
                            ]
                        },
                        {
                            "uikey": "tabsPane1",
                            "uitype": "Tabs.TabPane",
                            "tab": "Tab 2",
                            "key": "2",
                            "children": "内容二"
                        },
                        {
                            "uikey": "tabsPane2",
                            "uitype": "Tabs.TabPane",
                            "tab": "Tab 3",
                            "key": "3",
                            "children": "内容三"
                        }
                    ]
                }
            ]
        }
        let nowTime = "new_"+new Date().getTime();
        let myStore = {
            name:"myPrivateStore1",
            initState:{
                "displayText":'空',
                "inputValue":'',
                "userInfo":{},
                "depId":'',
                "updateTime":0,
                "btnDisabled":false
            },
            actions:{
                changeText:function(preState,newText){
                    preState.displayText = newText;
                    return {...preState}
                },
                changeInput:function(preState,newText){
                    preState.inputValue = newText;
                    return {...preState}
                },
                updateUser:function(preState,userInfo,depId,updateTime){ // 测试action多个参数场景
                    preState.userInfo = userInfo;
                    preState.depId = depId;
                    preState.updateTime = updateTime;
                    return {...preState};
                },
                changeButtonStatus:function(preState,isDisabled){
                    preState.btnDisabled = isDisabled;
                    return {...preState};
                }
            },
            effects:{
                getUserInfo:async function(getStore,userId){
                    let result = await new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve({userId,userName:'Dio'});
                        }, 500)
                    });
                    let store = getStore();
                    store.actions.updateUser(result,'D001',3000);
                }
            }
        }

        let myEvent = {
            "page0":{
               'onViewDidMount': function(){
                   let store = this.getStore();
                   store.effects.getUserInfo("U001")
               }
            },
            "input1":{
                'onViewObserveStore': function(preState) {
                    return {
                        value:preState.inputValue
                    }
                }
            },
            "buttonRef":{
                "onViewObserveStore":function(){
                    return {type:'primary'};
                },
                "onClick":function(){
                    // console.log('AAA--buttonRef--click');
                    let testDisplay1 = this.findUI('testDisplay1');
                    let testDisplay2 = this.findUI('testDisplay2');
                    let val1 = testDisplay1.api.getDisplay();
                    let val2 = testDisplay2.api.getDisplay();
                    // 验证api是否正常，store中的子元素ref是否正常
                    expect(val1).toEqual('myDisplayText');
                    expect(val2).toEqual('myDisplayText');
                }
            },
            "buttonAct":{
                "onClick":function(){
                    let store = this.getStore();
                    store.actions.changeText(nowTime);
                }
            },
            "buttonInput":{
                "onClick":function(){
                    let store = this.getStore();
                    store.actions.changeInput(nowTime);
                }
            },
            "buttonStatus":{
                'onViewObserveStore': function(preState) {
                    return {
                        disabled: preState.btnDisabled
                    }
                },
                "onClick":function(){
                    // console.log('AAA--buttonStatus--click');
                    let preDisabled = this.findUI('buttonStatus').disabled;
                    let preChildren = this.findUI('buttonStatus').children;
                    // console.log('AAA--buttonStatus--preDisabled',preDisabled);
                    expect(React.isValidElement(preChildren[0])).toBe(false); //确保children依然为json格式
                    expect(preDisabled).toBe(false);
                    let store = this.getStore();
                    store.actions.changeButtonStatus(true);
                    let nextDisabled = this.findUI('buttonStatus').disabled;
                    let nextChildren = this.findUI('buttonStatus').children;
                    expect(nextDisabled).toBe(true);
                    expect(React.isValidElement(nextChildren[0])).toBe(false); //确保children依然为json格式
                    expect(preChildren[0]).toBe(nextChildren[0]);
                }
            },
            "userDisplay":{
                'onViewObserveStore': function(preState) {
                    return {
                        displayText: preState.userInfo.userId+"_"+preState.userInfo.userName+"_"+preState.depId+"_"+preState.updateTime
                    }
                }
            },
            "testDisplay1":{
                "onViewWillMount":function({item} = options){
                    mocEventWillMount(item.uikey);
                }, // 将要挂载的生命周期方法
                "onViewDidMount":function({item} = options){
                    mocEventDidMount(item.uikey)
                }, // 已挂载的生命周期方法
                "onViewWillUpdate":function({item} = options){
                    mocEventWillUpdate(item.uikey)
                }, // 将要更新的生命周期方法
                "onViewDidUpdate":function({item} = options){
                    mocEventDidUpdate(item.uikey)
                }, // 已更新的生命周期方法
                "onViewWillUnmount":function({item} = options){
                    mocEventWillUnmount(item.uikey)
                },
                'onViewObserveStore': function(preState) {
                    // console.log('AAA----[onViewObserveStore][TestDisplay]--》执行变化到view.props---->', preStore);
                    return {
                        displayText: preState.displayText
                    }
                }
            },
            "testDisplay2":{
                'onViewObserveStore': function(preState) {
                    // console.log('AAA----[onViewObserveStore][TestDisplay]--》执行变化到view.props---->', preStore);
                    return {
                        displayText: preState.displayText +"test2"
                    }
                }
            },
        }


        let wrapper = mount(<DynamicView uiParser={{"TestDisplay":TestDisplay}} uiMeta={myMeta}  uiEvent={myEvent} uiStore={myStore}/>);

        // 验证函数组件WithConfigConsumer或React.forwardRef的场景是否触发onViewObserveStore
        let buttonFef = wrapper.find('.wui-button').at(0);
        expect(buttonFef.hasClass(`wui-button-primary`)).toEqual(true);

        // 验证生命周期是否正常
        expect(mocEventWillMount).toHaveBeenCalled()
        expect(mocEventDidMount).toHaveBeenCalled()

        // 模拟触发store变化
        wrapper.find('.wui-button').at(0).simulate('click');
        wrapper.find('.wui-button').at(1).simulate('click');
        wrapper.find('.wui-button').at(2).simulate('click');
        wrapper.find('.wui-button').at(3).simulate('click');

        // 验证onViewObserveStore是否正常映射为props
        let inputDom1 = wrapper.find(`input`).at(0);
        let testDom1 = wrapper.find(`#testDisplay1`);
        let testDom2 = wrapper.find(`#testDisplay2`);

        expect(inputDom1.value).toBe(nowTime)
        expect(testDom1.text()).toBe(nowTime)
        expect(testDom2.text()).toBe(nowTime+"test2")


        expect(parseInt(testDom1.prop('count'))).toBe(2);
        expect(parseInt(testDom2.prop('count'))).toBe(2);

        await sleep(1000);
        let userDisplay = wrapper.find(`#userDisplay`);
        expect(userDisplay.text()).toBe("U001_Dio_D001_3000");

        // 验证生命周期是否正常
        wrapper.unmount();
        expect(mocEventWillUnmount).toHaveBeenCalled();

    });

});


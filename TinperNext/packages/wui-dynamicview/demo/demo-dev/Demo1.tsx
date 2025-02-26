// /**
//  *
//  * @title 事件处理器
//  * @description 事件处理器uiEvent（注：json数据确保存在uikey字段，保证uiEvent事件添加到对应的组件上）。
//  *
//  */
// import { DynamicView } from "@tinper/next-ui";
// import React, {Component} from 'react';

// const json = {
//     "nid": "nid_1000",
//     "uititle": "inputCon",
//     "uitype": "div",
//     "uikey": 'div',
//     "style": {"width": "400px"},
//     "children": [
//         {
//             "nid": "nid_1001",
//             "uititle": "输入框",
//             "uitype": "Input",
//             "uikey": 'input',
//         },
//         {
//             "nid": "nid_100121",
//             "uitype": "Button",
//             "uikey": 'buttonTwo',
//             "children": "触发两次"
//         },
//         {
//             "nid": "nid_100111",
//             "uititle": "动态变量",
//             "uitype": "Input",
//             "uikey": 'input111',
//             "value": '!{userName}',
//         },
//         {
//             "nid": "nid_100222",
//             "uititle": "test2",
//             "uitype": "Button",
//             "uikey": 'button2',
//             "children": "触发一次异步请求更新"
//         },
//         {
//             "nid": "nid_100223",
//             "uititle": "test3",
//             "uitype": "Button",
//             "uikey": 'button3',
//             "children": "触发一次同步"
//         },
//         {
//             "nid": "nid_100000",
//             "uititle": "TestDisplay",
//             "uitype": "TestDisplay",
//             "uikey": 'testDisplay1',
//             "children": "TestDisplay1"
//         },
//         {
//             "nid": "nid_1001_2",
//             "uitype": "DatePicker",
//             "uikey": 'datepicker',
//             "style": {"marginTop": "20px"},
//         },
//         {
//             "nid": "nid_1002",
//             "uititle": "输入框2",
//             "uitype": "Input",
//             "uikey": 'input2',
//         },
//         {
//             "uitype": "Tabs",
//             "uikey": 'tabs',
//             "style": {"marginTop": "20px"},
//             "children": [
//                 {
//                     "uikey": "tabsPane0",
//                     "uitype": "Tabs.TabPane",
//                     "tab": "Tab 1",
//                     "key": "1",
//                     "nid": "nid_3001",
//                     "children": "内容一"
//                 },
//                 {
//                     "uikey": "tabsPane1",
//                     "uitype": "Tabs.TabPane",
//                     "tab": "Tab 2",
//                     "key": "2",
//                     "nid": "nid_3002",
//                     "children": "内容二"
//                 },
//                 {
//                     "uikey": "tabsPane2",
//                     "uitype": "Tabs.TabPane",
//                     "tab": "Tab 3",
//                     "key": "3",
//                     "nid": "nid_3003",
//                     "children": "内容三"
//                 }
//             ]
//         }
//     ]
// }
// function clickHandle(v1: string) {
//     console.log('触发Input的onChange事件', v1)
// }
// function tabsClick(key: string) {
//     console.log('tabs页签被点击了', key)
// }
// function onOpenChange(key: boolean) {
//     console.log('DatePicker切换面板', key)
// }
// function dateChange(key: any, formatString: string) {
//     console.log('DatePicker选中日期', key, 'formatString:', formatString)
// }
// let myEvent = {
//     'button1': {
//         'onViewObserveStore': function(preStore:any) {
//             // console.log('AAA----[onViewObserveStore][button1]--》执行变化到view.props---->', preStore);
//             return {
//                 colors: preStore.myStore1.buttonType
//             }
//         },
//         "onClick": function() {
//             // let input = this.findUI('input');
//             // let date = this.findUI('datepicker');
//             // input.value = new Date().getTime();
//             // date.disabled = true;
//             // this.refresh();

//             let store = this.getStore();
//             let storeState = store.getState();
//             console.log("AAA变更前", storeState);
//             // store.api.changeInput('你好呀', '你发');

//             // 一个方法体内多次调用会触发多次通知
//             store.api.changeInput('你好呀1');
//             // store.api.changeButton('primary');
//             // store.api.changeInput('你好呀2');

//             console.log("AAA变更后", storeState);
//         }
//     },
//     "button2": {
//         onClick: function() {
//             // this.testPageStoreUpdate();
//             let store = this.getStore();
//             store.api.asyncSearchSelectTreeNode('xxxbbb');
//             // store.api.changeButton('primary', '按钮已变更')
//             // store.api.changeInput('你好呀3');
//             // store.api.changeInputStyle();
//             this.findUI('testDisplay1').api.getDisplay();
//         }
//     },
//     "button3": {
//         onClick: function() {
//             let store = this.getStore();
//             store.api.changeTabName('tab_' + new Date().getTime());
//         }
//     },
//     'input': {
//         'onChange': clickHandle,
//         'onViewObserveStore': function(preStore:any) {
//             // console.log('AAA----[onViewObserveStore][input]--》执行变化到view.props---->', preStore);
//             // let a = this.findUI('testDisplay1');
//             // console.log('AAA--2-',a);
//             return {
//                 value: preStore.myStore1.input
//             }
//         }
//     },
//     'input2': {
//         'onChange': clickHandle,
//         'onViewObserveStore': function(preStore:any) {
//             // console.log('AAA----[onViewObserveStore][input2]--》执行变化到view.props---->', preStore);
//             return {
//                 value: preStore.myStore1.input,
//                 stype: preStore.myStore1.inputStyle
//             }
//         }
//     },
//     'tabs': {
//         'onTabClick': tabsClick
//     },
//     'tabsPane0': {
//         'onViewObserveStore': function(rootStore:any) {
//             return {
//                 tab: rootStore.myStore1.tabname || '临时tab'
//             }
//         }
//     },
//     'inputH2': {
//         'onViewObserveStore': function(rootStore:any) {
//             return {
//                 children: rootStore.myStore1.input
//             }
//         }
//     },
//     'testDisplay1': {
//         'onViewObserveStore': function(rootStore:any) {
//             console.log('AAA----[onViewObserveStore][TestDisplay]--》执行变化到view.props---->', rootStore);
//             return {display: rootStore.myStore1.tabname}
//         }
//     },
//     'datepicker': {'onOpenChange': onOpenChange, 'onChange': dateChange},
// }

// const myStore = {
//     "name": "myStore1",
//     "init": {
//         "tabname": '',
//         "input": "请输入内容",
//         "data": [{name: 'xxx1', code: 'yyy1', type: 1, dataIndex: 'abc'}]
//     },
//     "changeInput": function(store: any, newText: string, ssTest: any) {
//         store.myStore1.input = newText;
//         return {...store};
//     },
//     "changeInputStyle": function(store: any) {
//         store.myStore1.inputStyle = {background: 'red'};
//         return {...store};
//     },
//     "changeTabName": function(store: any, tabname: string) {
//         store.myStore1.tabname = tabname;
//         return {...store};
//     },
//     "changeButton": function(store: any, type: string, text: string) {
//         store.myStore1.buttonType = type;
//         store.myStore1.buttonText = text;
//         return {...store};
//     },
//     // 支持异步返回
//     "asyncSearchSelectTreeNode": async function(getStore: any, selectNode: any) {
//         let store = getStore();
//         console.log('AAA---async->1');
//         let result = await new Promise((resolve, reject) => {
//             console.log('AAA---async->2.1');
//             setTimeout(() => {
//                 console.log('AAA---async->2.2');
//                 resolve('响应结果' + new Date().getTime());
//             }, 2000)
//         })
//         console.log('AAA---async->3');
//         store.api.changeInput(selectNode + result);
//     }
// }
// // const myStore2 = {
// //     "name": "myStore2",
// //     "init": {
// //         "input": "请输入内容",
// //         "data": [{name: 'xxx1', code: 'yyy1', type: 1, dataIndex: 'abc'}]
// //     },
// //     "changeTableData": function(store, newText, ssTest) {
// //         store.myStore2.data = newText;
// //         return {...store};
// //     },

// // }

// const myParams = {
//     "userName": function() {
//         return "你哈"
//     }
// }

// class TestDisplay extends Component<{display: boolean}> {
//     getDisplay() {
//         console.log('AAA---验证ref是否正常', this.props.display);
//     }
//     render() {
//         console.log('AAA---render--TestDisplay');
//         return <div>触发一次同步结果，监听store变化{this.props.display}</div>;
//     }
// }

// // // 测试ref使用
// // const TestDisplay = React.forwardRef((props:{display:string}, ref:any)=>{
// //     return <div ref={ref}>监听store变化{props.display}</div>;
// // })
// //
// // const TestDisplayH = ReduxUtils.connect(TestDisplay, (store:any)=>{
// //     console.log('AAA----[onViewObserveStore][testDisplay1]--》响应store变化', store);
// //     return {display: store.rootStore.myStore1.tabname}
// // })


// class Demo1 extends Component {
//     render() {
//         return (
//             <div className="demoPadding">
//                 {/* <Provider store={superStore}><DynamicView appCode={"AX001"} pageCode={"PX002"} uiMeta={json} uiEvent={uiEvent} uiStore={uiStore} /></Provider>*/}
//                 <DynamicView appCode={"AX001"} uiParser={{"TestDisplay": TestDisplay}} pageCode={"PX002"} uiParams={myParams} uiMeta={json} uiEvent={myEvent} uiStore={myStore} />
//                 {/* <DynamicView appCode={"AX001"} uiParser={{"TestDisplay": TestDisplay}} pageCode={"PX002"} uiMeta={json} uiEvent={myEvent} uiStore={myStore2} /> */}
//             </div>
//         )
//     }
// }

// export default Demo1;

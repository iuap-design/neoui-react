// /**
//  *
//  * @title 动态视图
//  * @description 根据json解析组件视图。
//  *
//  */

// import { DynamicView } from "@tinper/next-ui";
// import React, {Component} from 'react';
// // import { Button, Upload, Input } from '@tinper/next-ui';
// // import { Button } from 'antd';

// // const globalparser = {
// //     "Page": 'div',
// //     "Button": Button,
// //     "Upload": Upload,
// //     "Input": Input
// // }

// const json = {
//     "nid": "nid_1000",
//     "uititle": "工具栏",
//     "uitype": "div",
//     "uikey": 'page',
//     // "colors": "primary",
//     // "children": "上传",
//     // "columns": columns04,
//     // "data": data04
//     "children": [
//         {
//             "nid": "nid_1001",
//             "uititle": "按钮",
//             "uikey": "reloadBtn",
//             "uitype": "Button",
//             "colors": "primary",
//             "children": "主按钮",
//         },
//         {
//             "uitype": "div",
//             "uikey": 'uploadContent',
//             "style": {"marginTop": "20px"},
//             "children": [
//                 {
//                     "nid": "nid_1002",
//                     "uikey": "delBtn",
//                     "uititle": "上传",
//                     "uitype": "Upload",
//                     "children": [
//                         {
//                             "nid": "nid_1001",
//                             "uititle": "按钮",
//                             "uikey": "reloadBtn",
//                             "uitype": "Button",
//                             "colors": "primary",
//                             "children": "上传",
//                         }
//                     ],
//                 }
//             ]
//         },
//         {
//             "uitype": "div",
//             "uikey": 'inputContent',
//             "style": {"width": "400px", "marginTop": "20px", "marginBottom": "20px"},
//             "children": [
//                 {
//                     "nid": "nid_1003",
//                     "uititle": "输入框",
//                     "uikey": "input",
//                     "uitype": "Input",
//                     "placeholder": '请输入'
//                 }
//             ]
//         },
//         {
//             "uitype": "Tabs",
//             "uikey": 'tabs',
//             "children": [
//                 {
//                     "uikey": "tabsPane0",
//                     "uitype": "Tabs.TabPane",
//                     "tab": "Tab 1",
//                     "key": "1",
//                     "children": "内容一"
//                 },
//                 {
//                     "uikey": "tabsPane1",
//                     "uitype": "Tabs.TabPane",
//                     "tab": "Tab 2",
//                     "key": "2",
//                     "children": "内容二"
//                 },
//                 {
//                     "uikey": "tabsPane2",
//                     "uitype": "Tabs.TabPane",
//                     "tab": "Tab 3",
//                     "key": "3",
//                     "children": "内容三"
//                 }
//             ]
//         },
//         {
//             "uitype": "div",
//             "uikey": 'div2',
//             "style": {"marginTop": "20px"},
//             "children": [
//                 {
//                     "uitype": "Switch",
//                     "uikey": 'switch',
//                 },
//                 {
//                     "uitype": "span",
//                     "uikey": 'span1',
//                     "style": {"marginLeft": "10px", "display": "inline-block"},
//                     "children": [
//                         {
//                             "uitype": "Checkbox",
//                             "uikey": 'Checkbox1',
//                             "children": "盒子1"
//                         },
//                     ]
//                 },
//                 {
//                     "uitype": "span",
//                     "uikey": 'span2',
//                     "style": {"marginLeft": "10px", "display": "inline-block"},
//                     "children": [
//                         {
//                             "uitype": "Checkbox",
//                             "uikey": 'Checkbox2',
//                             "children": "盒子2"
//                         }
//                     ]
//                 }
//             ]
//         },
//     ]
// }
// class Demo1 extends Component {
//     render() {
//         return (
//             <div className="demoPadding">
//                 <DynamicView uiMeta={json} />
//             </div>
//         )
//     }
// }

// export default Demo1;

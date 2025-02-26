// /**
//  *
//  * @title 动态视图Form表单
//  * @description 根据json解析Form表单组件视图。
//  *
//  */

// import { DynamicView } from '@tinper/next-ui';
// import React, {Component} from 'react';
// // import { Button } from 'antd';

// const json = {
//     "nid": "nid_1000",
//     "uititle": "工具栏",
//     "uitype": "Form",
//     "uikey": 'form',
//     // "layout": {
//     //     "labelCol": { "span": 4 },
//     //     "wrapperCol": { "span": 12 }
//     // },
//     "labelCol": { "span": 4 },
//     "wrapperCol": { "span": 12 },
//     "children": [
//         {
//             "nid": "nid_1001",
//             "uititle": "item",
//             "uikey": "reloadBtn",
//             "uitype": "Form.Item",
//             "label": "用户名",
//             // "name": "userName",
//             "children": [
//                 {
//                     "nid": "nid_1003",
//                     "uititle": "输入框",
//                     "uikey": "input",
//                     "uitype": "Input",
//                     "placeholder": '请输入用户名'
//                 }
//             ],
//         },
//         {
//             "nid": "nid_1004",
//             "uititle": "item",
//             "uikey": "addressCon",
//             "uitype": "Form.Item",
//             "label": "邮箱",
//             // "name": "email",
//             "children": [
//                 {
//                     "nid": "nid_1005",
//                     "uititle": "输入框",
//                     "uikey": "input1",
//                     "uitype": "Input",
//                     "placeholder": '请输入邮箱'
//                 }
//             ],
//         },
//         {
//             "nid": "nid_1006",
//             "uititle": "item",
//             "uikey": "addressCon",
//             "uitype": "Form.Item",
//             "label": "密码",
//             // "name": "password",
//             "children": [
//                 {
//                     "nid": "nid_1007",
//                     "uititle": "输入框",
//                     "uikey": "input3",
//                     "uitype": "Input",
//                     "placeholder": '请输入密码',
//                     "type": "password"
//                 }
//             ],
//         },
//         {
//             "nid": "nid_1008",
//             "uititle": "item",
//             "uikey": "numberCon",
//             "uitype": "Form.Item",
//             "label": "幸运数字",
//             // "name": "number",
//             "children": [
//                 {
//                     "nid": "nid_1009",
//                     "uititle": "输入框",
//                     "uikey": "number",
//                     "uitype": "InputNumber",
//                     "placeholder": '请输入幸运数字',
//                 }
//             ],
//         },
//         {
//             "nid": "nid_10010",
//             "uititle": "item",
//             "uikey": "dateCon",
//             "uitype": "Form.Item",
//             "label": "日期",
//             // "name": "date",
//             "children": [
//                 {
//                     "nid": "nid_10011",
//                     "uititle": "日期",
//                     "uikey": "DatePicker",
//                     "uitype": "DatePicker",
//                     "placeholder": "请输入日期"
//                 }
//             ],
//         },
//         {
//             "nid": "nid_10012",
//             "uititle": "item",
//             "uikey": "rangeCon",
//             "uitype": "Form.Item",
//             "label": "日期范围",
//             // "name": "range",
//             "children": [
//                 {
//                     "nid": "nid_10013",
//                     "uititle": "日期范围",
//                     "uikey": "rangePicker",
//                     "uitype": "DatePicker.RangePicker",
//                     "placeholder": ['放假日期', '开学日期']
//                 }
//             ],
//         },
//         {
//             "nid": "nid_10014",
//             "uititle": "item",
//             "uikey": "btnCon",
//             "uitype": "Form.Item",
//             "label": " ",
//             // "name": "",
//             "children": [
//                 {
//                     "nid": "nid_10015",
//                     "uititle": "",
//                     "uikey": "cnacelCon",
//                     "uitype": "span",
//                     "style": {"marginRight": "8px"},
//                     "children": [
//                         {
//                             "nid": "nid_10016",
//                             "uititle": "",
//                             "uikey": "cnacel",
//                             "uitype": "Button",
//                             "colors": "secondary",
//                             "children": "取消"
//                         }
//                     ]
//                 },
//                 {
//                     "nid": "nid_10017",
//                     "uititle": "",
//                     "uikey": "submit",
//                     "uitype": "Button",
//                     "children": "提交",
//                     "colors": "primary",
//                 }
//             ],
//         }
//     ]
// }
// class Demo2 extends Component {
//     render() {
//         return (
//             <div className="demoPadding">
//                 <DynamicView uiMeta={json} />
//             </div>
//         )
//     }
// }

// export default Demo2;

import React from "react";
import {testPropClassName, testRootDomClsPrefix, testPropFieldid} from "../common";

import Affix from "../../../packages/wui-affix/src/index";

import Alert from "../../../packages/wui-alert/src/index";
// import AnchorWrapper from "../../../packages/wui-anchor/src/index";
import AutoComplete from "../../../packages/wui-autocomplete/src/index";
import Avatar from "../../../packages/wui-avatar/src/index";
import Backtop from "../../../packages/wui-backtop/src/index";
import Badge from "../../../packages/wui-badge/src/index";
import Breadcrumb from "../../../packages/wui-breadcrumb/src/index";
import ButtonGroup from "../../../packages/wui-button-group/src/index";
import Button from "../../../packages/wui-button/src/index";
import Calendar from "../../../packages/wui-calendar/src/index";
import Cascader from "../../../packages/wui-cascader/src/index";
import Checkbox from "../../../packages/wui-checkbox/src/index";
import {prefix} from '../../../packages/wui-core/src/updatePrefix';
import DropdownWrapper from "../../../packages/wui-dropdown/src/index";
import Form from "../../../packages/wui-form/src/index";
import InputNumber from "../../../packages/wui-input-number/src/index";
import Input from "../../../packages/wui-input/src/index";
import Radio from "../../../packages/wui-radio/src/index";
import Rate from "../../../packages/wui-rate/src/index";
import Space from "../../../packages/wui-space/src/index";
import Switch from "../../../packages/wui-switch/src/index";
import Tag from "../../../packages/wui-tag/src/index";
import  Card from "../../../packages/wui-card/src/index";
import Carousel from "../../../packages/wui-carousel/src/index";


import Collapse from "../../../packages/wui-collapse/src/index";

import Colorpicker from "../../../packages/wui-colorpicker/src/index";

import Datepicker from "../../../packages/wui-datepicker/src/index";
import Divider from "../../../packages/wui-divider/src/index";
import Empty from "../../../packages/wui-empty/src/index";
import Icon from "../../../packages/wui-icon/src/index";
import Image from "../../../packages/wui-image/src/index";
import Modal from "../../../packages/wui-modal/src/index";
import Menu from "../../../packages/wui-menu/src/index";
import Pagination from "../../../packages/wui-pagination/src/index";
import Progress from "../../../packages/wui-progress/src/index";
import Select from "../../../packages/wui-select/src/index";
import Slider from "../../../packages/wui-slider/src/index";
import Spin from "../../../packages/wui-spin/src/index";
import Steps from "../../../packages/wui-steps/src/index";
import Svgicon from "../../../packages/wui-svgicon/src/index";
import Table from "../../../packages/wui-table/src/index";
import Tabs from "../../../packages/wui-tabs/src/index";
import Timeline from "../../../packages/wui-timeline/src/index";
import Timepicker from "../../../packages/wui-timepicker/src/index";
// import Message from "../../../packages/wui-message/src/index";
// import Notification from "../../../packages/wui-notification/src/index";
// import Popconfirm from "../../../packages/wui-popconfirm/src/index";
import Popover from "../../../packages/wui-popover/test/popoverClass";
// import Provider from "../../../packages/wui-provider/src/index";
// import Tooltip from "../../../packages/wui-tooltip/src/index";
import Transfer from "../../../packages/wui-transfer/src/index";
// import Transition from "../../../packages/wui-transition/src/index";
import Tree from "../../../packages/wui-tree/src/index";
import Treeselect from "../../../packages/wui-treeselect/src/index";
import Upload from "../../../packages/wui-upload/src/index"

const RootDomClsPrefixComponentsArray = [
	{Alert: Alert},
	{InputNumber: InputNumber, classNameSelector: `.${prefix}-input-number`},
	{AutoComplete: AutoComplete},
	{Button: Button},
	{Badge: Badge},
	{ButtonGroup: ButtonGroup},
	{Switch: Switch, fieldidSelector: 'button'},
	{Affix: Affix},
	{Checkbox: Checkbox},
	{Radio: Radio},
	{Tag: Tag},
	{Backtop: Backtop},
	{Breadcrumb: Breadcrumb},
	{Calendar: Calendar, attr: {mutiple: true}, classNameSelector: `.${prefix}-calendar`},
	{Cascader: Cascader, fieldidSelector: `.${prefix}-cascader-picker`, classNameSelector: `.${prefix}-cascader-picker`},
	{Input: Input},
	{Form: Form.Item},
	{Rate: Rate},
	{Avatar: Avatar},
	{Space: Space, attr: {children: "demo-children"}},
	{DropdownWrapper: DropdownWrapper.Button, fieldidSelector: 'button', classNameSelector: 'button', attr: {children: "demo-children"}},
	{Card: Card},
	{Carousel: Carousel, classNameSelector: '.slick-slider'},
	// {Datepicker: Datepicker},
	{Collapse: Collapse},
	{Colorpicker: Colorpicker},
	{Divider: Divider},
	{Empty: Empty},
	{Icon: Icon},
	{Image: Image,   attr:{children: <div>
        <img
            data-original="http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-5-min.jpg"
            src='http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-1-min.jpg'
            alt="Picture"/>
    </div>}},
	{Menu: Menu, rootSelector: `ul.${prefix}-menu-root`, fieldidSelector: `.${prefix}-menu`, classNameSelector: `ul.${prefix}-menu-root`},
	{Modal: Modal, attr:{visible: true}, classNameSelector: `.${prefix}-modal-dialog`, rootSelector: `.${prefix}-modal`, fieldidSelector: `div[role=dialogRoot]`},
	{Pagination: Pagination},
	{Progress: Progress},
	{Select: Select},
	{Slider: Slider},
	{Spin: Spin, fieldidSelector: `.${prefix}-spin-default`, rootSelector: `.${prefix}-spin-backdrop`, attr: {spinning: true}, classNameSelector: `.${prefix}-spin`},
	{Steps: Steps},
	{Svgicon: Svgicon, rootSelector: `.${prefix}-svgicon`, classNameSelector: `.${prefix}-svgicon`},
	{Table: Table},
	{Tabs: Tabs},
	{Timeline: Timeline, attr: {children: [
        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>,
        <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>,
        <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>,
        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
    ]}},
	{Timepicker: Timepicker},
	{Transfer: Transfer},
	{Tree: Tree},
	{Treeselect: Treeselect, fieldidSelector: `.${prefix}-select-arrow-icon`},
	{Upload: Upload, fieldidSelector: `div.${prefix}-upload-select`},
	// {Popover: Popover, fieldidSelector: 'div', attr: {visible: true}},
	// { AnchorWrapper: AnchorWrapper },
	// // { Animate: Animate },
	// { Spin: Spin, fieldidSelector: `.${prefix}-spin-show-text`, attr: {spinning: true} }, // root dom has no prefix class
	// { Drawer: Drawer }, // 不支持 classname
];
// [RootDomClsPrefixComponentsArray[2]].forEach(obj => {
RootDomClsPrefixComponentsArray.forEach(obj => {
	const objArr = Object.entries(obj)[0];
	testRootDomClsPrefix({name: objArr[0], Component: objArr[1],selector: obj.rootSelector, attr: obj.attr});
    testPropClassName({name: objArr[0], Component: objArr[1], selector: obj.classNameSelector, attr: obj.attr})
    testPropFieldid({name: objArr[0], Component: objArr[1], selector: obj.fieldidSelector, attr: obj.attr})
})

/*
 * @Author: Mr.mjc
 * @Date: 2023-02-06 19:30:35
 * @LastEditors: MJC
 * @LastEditTime: 2024-03-26 19:19:42
 * @Description: 
 * @FilePath: /next-ui/next-ui-library/test/root-config.js
 */
const path = require("path")
const packages = path.resolve(__dirname, "../../packages")
const commonpath = path.resolve(__dirname, "./commonTest")
const optionalComp = process.argv[process.argv.length - 1].split('--comp=') && process.argv[process.argv.length-1].split('--comp=')[1];
const colors = require("colors/safe");
colors.setTheme({
	silly: 'rainbow',
	input: 'grey',
	verbose: 'cyan',
	prompt: 'grey',
	info: 'green',
	data: 'grey',
	help: 'cyan',
	warn: 'yellow',
	debug: 'blue',
	error: 'red'
});
console.log(colors.info(`执行 ${optionalComp || '所有'}组件的测试`))
const allcomponents = [
	commonpath,
	`${packages}/wui-alert`,
	`${packages}/wui-anchor`,
	`${packages}/wui-animate`,
	`${packages}/wui-input-number`,
	`${packages}/wui-input`,
	`${packages}/wui-input-group`,
	`${packages}/wui-dropdown`,
	`${packages}/wui-form`,
	`${packages}/wui-autocomplete`,
	`${packages}/wui-button`,
	`${packages}/wui-badge`,
	`${packages}/wui-button-group`,
	`${packages}/wui-switch`,
	`${packages}/wui-rate`,
	`${packages}/wui-spin`,
	`${packages}/wui-space`,
	`${packages}/wui-affix`,
	`${packages}/wui-checkbox`,
	`${packages}/wui-radio`,
	`${packages}/wui-tag`,
	`${packages}/wui-drawer`,
	`${packages}/wui-avatar`,
	`${packages}/wui-backtop`,
	`${packages}/wui-breadcrumb`,
	`${packages}/wui-calendar`,
	`${packages}/wui-cascader`,
	`${packages}/wui-collapse`,
	`${packages}/wui-menu`,
	`${packages}/wui-modal`,
	`${packages}/wui-pagination`,
	`${packages}/wui-select`,
	`${packages}/wui-steps`,
	`${packages}/wui-tabs`,
	`${packages}/wui-tooltip`,
	`${packages}/wui-tree`,
	`${packages}/wui-treeselect`,
	`${packages}/wui-timepicker`,
	`${packages}/wui-upload`,
	`${packages}/wui-card`,
	`${packages}/wui-slider`,
	`${packages}/wui-svgicon`,
	`${packages}/wui-popover`,
	`${packages}/wui-progress`,
	`${packages}/wui-divider`,
	`${packages}/wui-empty`,
	`${packages}/wui-colorpicker`,
	`${packages}/wui-transfer`,

	`${packages}/wui-datepicker`,
	`${packages}/wui-message`,
	`${packages}/wui-notification`,
	`${packages}/wui-table`,
	`${packages}/wui-timeline`,
	`${packages}/wui-carousel`,
	`${packages}/wui-icon`,
	`${packages}/wui-image`,
	`${packages}/wui-layout`,
	`${packages}/wui-popconfirm`,
	`${packages}/wui-provider`,
	`${packages}/wui-skeleton`,
	`${packages}/wui-clipboard`,
	// `${packages}/wui-dynamicview`,
	`${packages}/wui-list`,
	`${packages}/wui-typography`
]

// // `${packages}/wui-transition`,
// // `${packages}/wui-overlay`,
// // `${packages}/wui-navbar`,
// // `${packages}/wui-locale`,
// // `${packages}/wui-imageviewer`,
// // `${packages}/wui-core`,
const testComponents = allcomponents.filter(c => c.endsWith(optionalComp && optionalComp.toLowerCase()))
module.exports = testComponents.length ? testComponents : allcomponents

import Config from "./warningConfig";
import * as warningUtil from 'rc-util/lib/warning';
export const warning = warningUtil.warning;
export const note = warningUtil.note;
export const resetWarned = warningUtil.resetWarned;
export const call = warningUtil.call;
export const warningOnce = warningUtil.warningOnce;
export const noteOnce = warningUtil.noteOnce;
// import { ubaReport, ubaTargetReportCount } from './uba';


export const warningConfig = Config;
// let warned = {}
//
// export function warning(valid, message) {
//     if (
//         process.env.NODE_ENV !== "production" &&
// 		!valid &&
// 		console !== undefined
//     ) {
//         console.error(`Warning: ${message}`);
//     }
// }
//
// export function call(method, valid, message) {
//     if (!valid && !warned[message]) {
//         method(false, message);
//         warned[message] = true;
//     }
// }
//
// export function warningOnce(valid, message) {
//     call(warning, valid, message);
// }

export function isShouldUpdate(component:string, props:any) {
    const config = Config[component];
    if (!config) return;
    const keys = Object.keys(config);
    let flag = false;
    let msg = `[Tinper] Some '${component}' properties will be deprecated: \n`;
    keys.forEach(item => {
        if (props[item]) {
            msg += ` '${item}', please use '${config[item]}' instead. \n`
            flag = true;
        }
    })
    // if (flag) {
    //     ubaReport(`[Tinper_Next_${component}]组件加载`)
    //     ubaTargetReportCount(`${component}`, props)
    // }
    flag && noteOnce(false, msg)
}

// export function note(valid, message) {
//     // Support uglify
//     if (
//         process.env.NODE_ENV !== "production" &&
// 		!valid &&
// 		console !== undefined
//     ) {
//         console.warn(`Note: ${message}`);
//     }
// }
//
// export function resetWarned() {
//     warned = {};
// }
//
// export function noteOnce(valid, message) {
//     call(note, valid, message);
// }

export const devWarning = (valid:boolean, component:string, message:string) => {
    warningOnce(valid, `[tinper: ${component}] ${message}`);
};

import {ComponentClass} from "react";
const prefix = "wui";

const getClsPrefix = (cName: string): string => {
    return [prefix, cName.toLowerCase()].join("-");
}

const WebUI = (config:Partial<{ name: string, defaultProps:any, propTypes:any }>):any => {
    const {name, defaultProps, propTypes} = config;
    if (!name) {
        console.error("请输入组件名");
        return;
    }
    return (Comp:ComponentClass) => {
        let pre = [prefix, name.toLowerCase()].join("-");
        Comp.defaultProps = {...defaultProps, ...{clsPrefix: pre}};
        if (propTypes) Comp.propTypes = propTypes;
        return Comp;
    };
};
export {prefix, getClsPrefix};
export default WebUI;

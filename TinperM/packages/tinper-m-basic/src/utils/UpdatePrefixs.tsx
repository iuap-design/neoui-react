import { ComponentClass } from 'react';
const muiPrefix = 'mui';

// 使用其他组件时可用
const getClsPrefix = (cName: string): string => [muiPrefix, cName.toLowerCase()].join('-')
// 开发当前组件可用
const WebUI = (config:Partial<{  defaultProps:any, propTypes:any }> = {}):any => {
  const { defaultProps, propTypes } = config;
  return (Comp:ComponentClass) => {
    Comp.defaultProps = { ...defaultProps, ...{ clsPrefix: muiPrefix } };
    if (propTypes) Comp.propTypes = propTypes;
    return Comp;
  };
};
export { muiPrefix, getClsPrefix };
export default WebUI;

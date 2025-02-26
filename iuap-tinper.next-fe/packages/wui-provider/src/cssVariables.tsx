import { updateCSS } from 'rc-util/lib/Dom/dynamicCSS';
import canUseDom from 'rc-util/lib/Dom/canUseDom';
import {prefix} from "../../wui-core/src/index"
// import { TinyColor } from '@ctrl/tinycolor';
// import { generate } from '@ant-design/colors';
// import { Theme } from './context';
// import devWarning from '../_util/devWarning';
const themeConfig = require('./../../wui-core/src/themeConfig');
import type {JSONLabelProps} from './iProvider'

const defaultPrefixCls = `${prefix}`;

const dynamicStyleMark = `-${defaultPrefixCls}-${Date.now()}-${Math.random()}`;
const themeMap = { ...themeConfig };
let winodwThis;
try {
    winodwThis = window; //  兼容 window globalThis（window 兼容IE）
} catch (error) {
    winodwThis = globalThis;
}

const isSupported = winodwThis.CSS && winodwThis.CSS.supports && winodwThis.CSS.supports('--wui-primary-color', '#e23');

const rootVarMap = { // root节点，基础和组件css变量引用了其他基础css变量 关系对应表
    [`--${prefix}-base-item-color-active`]: `--${prefix}-primary-color`,
    [`--${prefix}-base-item-color`]: `--${prefix}-base-text-color`,
    [`--${prefix}-base-item-color-disabled`]: `--${prefix}-base-text-color-disabled`,
    [`--${prefix}-input-color-disabled`]: `--${prefix}-base-text-color-disabled`,
    [`--${prefix}-input-bg`]: `--${prefix}-base-bg-color`,
    [`--${prefix}-input-bg-disabled`]: `--${prefix}-base-bg-color-disabled`,
    [`--${prefix}-picker-cell-bg-color-hover`]: `--${prefix}-primary-color-light`,
    [`--${prefix}-picker-cell-bg-color-selected`]: `--${prefix}-primary-color-light`,
    [`--${prefix}-pagination-color`]: `--${prefix}-base-text-color`,
    [`--${prefix}-pagination-color-hover`]: `--${prefix}-base-text-color`,
    [`--${prefix}-pagination-border-color`]: `--${prefix}-base-border-color`,
    [`--${prefix}-pagination-border-color-disabled`]: `--${prefix}-base-border-color-disabled`,
    [`--${prefix}-base-panel-bg-color`]: `--${prefix}-base-bg-color`
}

/* export function getStyle(globalPrefixCls, theme) {
  const variables = {};

  /!*const formatColor = (color, updater) => {
    let clone = color.clone();
    clone = updater?.(clone) || clone;
    return clone.toRgbString();
  };

  const fillColor = (colorVal, type) => {
    const baseColor = new TinyColor(colorVal);
    const colorPalettes = generate(baseColor.toRgbString());

    variables[`${type}-color`] = formatColor(baseColor);
    variables[`${type}-color-disabled`] = colorPalettes[1];
    variables[`${type}-color-hover`] = colorPalettes[4];
    variables[`${type}-color-active`] = colorPalettes[7];
    variables[`${type}-color-outline`] = baseColor.clone().setAlpha(0.2).toRgbString();
    variables[`${type}-color-deprecated-bg`] = colorPalettes[1];
    variables[`${type}-color-deprecated-border`] = colorPalettes[3];
  };

  // ================ Primary Color ================
  if (theme.primaryColor) {
    fillColor(theme.primaryColor, 'primary');

    const primaryColor = new TinyColor(theme.primaryColor);
    const primaryColors = generate(primaryColor.toRgbString());

    // Legacy - We should use semantic naming standard
    primaryColors.forEach((color, index) => {
      variables[`primary-${index + 1}`] = color;
    });
    // Deprecated
    variables['primary-color-deprecated-l-35'] = formatColor(primaryColor, c => c.lighten(35));
    variables['primary-color-deprecated-l-20'] = formatColor(primaryColor, c => c.lighten(20));
    variables['primary-color-deprecated-t-20'] = formatColor(primaryColor, c => c.tint(20));
    variables['primary-color-deprecated-t-50'] = formatColor(primaryColor, c => c.tint(50));
    variables['primary-color-deprecated-f-12'] = formatColor(primaryColor, c =>
        c.setAlpha(c.getAlpha() * 0.12),
    );

    const primaryActiveColor = new TinyColor(primaryColors[0]);
    variables['primary-color-active-deprecated-f-30'] = formatColor(primaryActiveColor, c =>
        c.setAlpha(c.getAlpha() * 0.3),
    );
    variables['primary-color-active-deprecated-d-02'] = formatColor(primaryActiveColor, c =>
        c.darken(2),
    );
  }

  // ================ Success Color ================
  if (theme.successColor) {
    fillColor(theme.successColor, 'success');
  }

  // ================ Warning Color ================
  if (theme.warningColor) {
    fillColor(theme.warningColor, 'warning');
  }

  // ================= Error Color =================
  if (theme.errorColor) {
    fillColor(theme.errorColor, 'error');
  }

  // ================= Info Color ==================
  if (theme.infoColor) {
    fillColor(theme.infoColor, 'info');
  }*!/

  // Convert to css variables
  const cssList = Object.keys(variables).map(
      key => `--${globalPrefixCls}-${key}: ${variables[key]};`,
  );

  return `
  :root {
    ${cssList.join('\n')}
  }
  `.trim();
}*/

function isJSON(str: string): boolean {
    if (typeof str === "string") {
        try {
            const obj = JSON.parse(str);
            if (obj && typeof obj === "object") {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    } else {
        return false;
    }
}
// 处理通过官网生成的Json文件或对象
function handleTheme(json: string): string {
    let copyData = isJSON(json) ? JSON.parse(json) : json;
    let globalCss = '';
    Object.keys(copyData).forEach(item=>{
        if (item && Array.isArray(copyData[item])) {
            copyData[item].forEach((label: JSONLabelProps) => {
                globalCss += label.property + ':' + label.value + ';' + '\n'
            })
        } else if (item) {
            globalCss += item + ':' + copyData[item] + ';' + '\n'
        }
    })
    let lastGlobalCss = `:root{\n${globalCss}}\n`
    return lastGlobalCss
}

// 判断是否存在link标签，并且引用tinper链接
function isLinkTinper() {
    const arr = document.getElementsByTagName('link');
    if (arr.length === 0) return false;
    let dom = null;
    for (let i = 0; i < arr.length; i++) {
        const regex = /tinper-next-(\w*)\.css/;
        if (arr[i].href && regex.test(arr[i].href)) {
            dom = arr[i];
        }
    }
    return dom
}

export function registerTheme(name: string, theme?: string) {
    if (isSupported) {
        themeMap[name] = theme ?? themeConfig[name];
    } else {
        console.error('浏览器暂不支持registerTheme方法')
    }
}
// const style = getStyle(globalPrefixCls, theme);

// if (canUseDom()) {
//   updateCSS(theme, `${dynamicStyleMark}-dynamic-theme`);
// }

export function updateTheme(theme: string | Array<string>, part?: boolean) {
    const themeAry = Array.isArray(theme) ? theme : [theme];
    const hasTheme = themeAry.some(v => !!themeMap[v]);
    if (canUseDom() && hasTheme) {
        if (isSupported) {

            if (part) { // 局部生效
                updateCSS('', `${dynamicStyleMark}-dynamic-theme`);
                return;
            }

            let styleStr: string = '';
            themeAry.forEach(item => {
                if (themeMap[item]) {
                    if (isJSON(themeMap[item]) || Object.prototype.toString.call(themeMap[item]) === '[object Object]') {
                        themeMap[item] = handleTheme(themeMap[item]);
                    }
                    styleStr += themeMap[item];
                }
            })
            if (styleStr && themeAry.length > 1) {
                styleStr = `:root{${styleStr.replace(/:root\{/g, '').replace(/\}/g, '')}}`
            }
            // console.log('styleStr===', styleStr)

            // if (isJSON(themeMap[theme]) || Object.prototype.toString.call(themeMap[theme]) === '[object Object]') {
            //     themeMap[theme] = handleTheme(themeMap[theme])
            // }
            const styleDom = document.querySelector(`#${defaultPrefixCls}-theme-style`)
            const updateDom = updateCSS(styleStr, `${dynamicStyleMark}-dynamic-theme`)
            if (styleDom === null) {
                updateDom.id = `${defaultPrefixCls}-theme-style`;
            } else if (styleDom && styleDom.tagName === 'STYLE' && !styleDom.isEqualNode(updateDom)) {
                const {parentNode} = styleDom
                parentNode?.removeChild(styleDom)
                updateDom.id = `${defaultPrefixCls}-theme-style`;
            }
        } else {
            const isDom = isLinkTinper();
            if (isDom) {
                themeAry.forEach(theme => {
                    const domHref = isDom.href.replace(/tinper-next-\w*\.css/g, `tinper-next-${theme}.css`);
                    isDom.href = domHref;
                })
            } else {
                console.error('浏览器暂不支持ConfigProvider来切换主题')
            }
        }
    }
}

// css字符串转换成对象
export function getTheme2Style(theme: string | Array<string>) {
    const themeAry = Array.isArray(theme) ? theme : [theme];
    const hasTheme = themeAry.some(v => !!themeMap[v]);
    if (hasTheme) {
        if (isSupported) {
            const styleArr: Array<string> = [];
            themeAry.forEach(item => {
                if (themeMap[item]) {
                    if (isJSON(themeMap[item]) || Object.prototype.toString.call(themeMap[item]) === '[object Object]') {
                        themeMap[item] = handleTheme(themeMap[item]);
                    }
                    let handleArr = themeMap[item].match(/--[^;]*:[^;]*;/g);
                    // console.log('handleArr', handleArr)
                    handleArr && styleArr.push(...handleArr);
                    if (item === 'dark') { // dark模式添加背景色
                        styleArr.push(`background-color:var(--${prefix}-base-bg-color);`);
                    }
                }
            })
            // console.log('styleArr', styleArr)
            // const styleArr: Array<string> = themeMap[theme].match(/--[^;]*;/g);
            const styleObj = {};
            styleArr && styleArr.forEach((item) => {
                const itemArr = item.slice(0, -1).split(':');
                styleObj[itemArr[0]] = itemArr[1];
            });
            for (let k in rootVarMap) { // root 节点 css变量 对应关系赋值
                styleObj[k] = styleObj[k] || styleObj[rootVarMap[k]] || 'unset';
                if (styleObj[k] === 'unset') {
                    delete styleObj[k];
                }
            }
            return styleObj;
        } else {
            console.error('浏览器暂不支持ConfigProvider来切换局部主题')
        }
    }
}

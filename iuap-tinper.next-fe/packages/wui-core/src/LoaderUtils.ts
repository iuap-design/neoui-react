/**
 * Created by Dio on 2016/4/12.
 */

/**
 * Css动态加载器
 * @src 文件相对路径
 * @onloadCss 加载完成后的回调
 * @basePath 项目路径
 */
export function loadCSS(src:string, onloadCss?:any, basePath?:string) {
    window.location.toString().substring(0, 1)
    if (!src || src.length == 0) return;
    let link = document.createElement('link');
    if (basePath && basePath.length > 0) {
        link.href = basePath + src;
    } else {
        link.href = src;
    }
    link.rel = 'stylesheet';
    if (onloadCss)link.onload = onloadCss;
    document.head.appendChild(link);
}
/**
 * Js动态加载器
 * @src 文件相对路径
 * @onloadCss 加载完成后的回调
 * @basePath 项目路径
 */
export function loadJS(src:string, onloadScript?:any, basePath?:string) {
    if (!src || src.length == 0) return;
    let script = document.createElement('script');
    script.src = src;
    if (basePath && basePath.length > 0) {
        script.src = basePath + src;
    } else {
        script.src = src;
    }
    script.type = 'text/javascript';
    if (onloadScript)script.onload = onloadScript;
    document.head.appendChild(script);
}

/**
 * 加载多个脚步文件
 * @param srcs {array}
 * @param onloaded {function} 当最后一个脚步文件加载完成后触发
 * @param basePath
 */
export function loadScripts(srcs:string[], onloaded?:any, basePath?:string) {
    if (srcs) {
        if (srcs.length > 1) {// 存在多个文件时一个个加载
            let src = srcs.shift();
            src && loadJS(src, function() {
                loadScripts(srcs, onloaded, basePath);
            }, basePath);
        } else if (srcs.length == 1) {// 当加载最后一个文件时
            let src = srcs.shift();
            src && loadJS(src, onloaded, basePath);
        }
    }
}
/**
 * 加载多个样式文件
 * @param srcs {array}
 * @param onloaded {function} 当最后一个样式文件加载完成后触发
 * @param basePath
 */
export function loadStyles(srcs:string[], onloaded?:any, basePath?:string) {
    if (srcs) {
        if (srcs.length > 1) {// 存在多个文件时一个个加载
            let src = srcs.shift();
            src && loadCSS(src, function() {
                loadStyles(srcs, onloaded, basePath);
            }, basePath);
        } else if (srcs.length == 1) {// 当加载最后一个文件时
            let src = srcs.shift();
            src && loadCSS(src, onloaded, basePath);
        }
    }
}

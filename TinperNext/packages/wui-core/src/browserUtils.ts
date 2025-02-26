/*
 * @Author: Mr.mjc
 * @Date: 2022-07-05 14:09:57
 * @LastEditors: Mr.mjc
 * @LastEditTime: 2022-07-08 17:50:46
 * @Description:
 * @FilePath: /next-ui/packages/wui-core/src/browserUtils.ts
 */
// 获取操作系统类型和浏览器类型
export function myBrowser() {
    var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
    var browserType = '', osType = '';

    if (userAgent.indexOf("Opera") > -1) { // 判断是否Opera浏览器
        browserType = "Opera"
    } else if (userAgent.indexOf("Firefox") > -1) { // 判断是否Firefox浏览器
        browserType = "FF";
    } else if (userAgent.indexOf("Chrome") > -1) {
        browserType = "Chrome";
    } else if (userAgent.indexOf("Safari") > -1) { // 判断是否Safari浏览器
        browserType = "Safari";
    } else if ((userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1) ||
        (userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1) // ie版本11
    ) { // 判断是否IE浏览器
        browserType = "IE";
    }
    if (userAgent.indexOf("Win") > -1) {
        osType = 'Win';
    } else if (userAgent.indexOf("Mac") > -1) {
        osType = 'Mac';
    }
    return { browserType, osType }
}

let scrollbarSize: number;


// 注意需要处理各系统及各浏览器的兼容性
export function measureScrollbar(selectors: string, _direction: string = 'vertical') {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
        return 0;
    }
    if (scrollbarSize) {// 计算一次即可
        return scrollbarSize;
    }
    let brow = myBrowser();
    let containerDom: Element = (selectors && document.querySelector(selectors)) || document.body;
    let doubleDiv = function() {
        let scrollDivParent = document.createElement('div');
        scrollDivParent.setAttribute("id", 'measureScrollbar_temp');
        scrollDivParent.style.position = 'absolute';
        scrollDivParent.style.top = '-9999px';
        scrollDivParent.style.overflow = 'scroll';
        // scrollDivParent.style.background = 'red';
        scrollDivParent.style.width = '50px';
        scrollDivParent.style.height = '100px';
        let scrollDivChild = document.createElement('div');
        // scrollDivChild.style.background = 'green';
        scrollDivChild.style.height = '200px';
        scrollDivChild.style.flex = "1";
        scrollDivParent.appendChild(scrollDivChild);
        let a = document.getElementById('measureScrollbar_temp');
        if (a) {
            containerDom.replaceChild(scrollDivParent, a);
        } else {
            containerDom.appendChild(scrollDivParent);
        }
        let barSize = scrollDivParent.getBoundingClientRect().width - scrollDivChild.getBoundingClientRect().width;
        containerDom.removeChild(scrollDivParent);
        // scrollDivParent = null;
        // scrollDivChild = null;
        return barSize;
    }
    let singleDiv = function() {
        const scrollDiv = document.createElement('div');
        scrollDiv.style.position = 'absolute';
        scrollDiv.style.top = '-9999px';
        scrollDiv.style.width = '50px';
        scrollDiv.style.height = '50px';
        scrollDiv.style.overflow = 'scroll';
        containerDom.appendChild(scrollDiv);
        let barSize = scrollDiv.offsetWidth - scrollDiv.scrollWidth;
        containerDom.removeChild(scrollDiv);
        return barSize;
    }
    if (brow.osType == 'Win') {
        switch (brow.browserType) {
            case "IE":
            case "FF":
                scrollbarSize = doubleDiv(); // window系统下firefox的offsetWidth同clientWidth一致，所以通过父子容器间带滚动条的墨盒尺寸计算出滚动条宽度
                break;
            default:
                scrollbarSize = singleDiv();// 注意：chrome浏览器可以自定义宽度::-webkit-scrollbar{width:8px}
        }
    } else if (brow.osType == 'Mac') {
        switch (brow.browserType) {
            case "FF":
                scrollbarSize = 8;
                break;
            default:
                scrollbarSize = singleDiv();
        }
    } else {
        scrollbarSize = singleDiv();
    }
    return scrollbarSize;
}

export function debounce(func: any, wait: number, immediate?: boolean) {
    let timeout: any;
    function cancel() {
        if (timeout !== undefined) {
            clearTimeout(timeout)
        }
    }
    function debounceFunc(this: any) {
        const that = this;
        const args = arguments;
        // https://fb.me/react-event-pooling
        if (args[0] && args[0].persist) {
            args[0].persist();
        }
        const later = () => {
            timeout = null;
            if (!immediate) {
                func.apply(that, args);
            }
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            later()
        }, wait); // 兼容火狐浏览器的写法
        if (callNow) {
            func.apply(that, args);
        }
    }

    debounceFunc.cancel = cancel

    return debounceFunc
}

export const detectZoom = () => {
    let winodwThis;
    try {
        winodwThis = window; //  兼容 window globalThis（window 兼容IE）
    } catch (error) {
        winodwThis = globalThis;
    }
    let ratio = 0,
        screen = winodwThis.screen,
        ua = navigator.userAgent.toLowerCase();

    if (winodwThis.devicePixelRatio !== undefined) {
        ratio = winodwThis.devicePixelRatio;
    } else if (~ua.indexOf('msie')) {
        // IE 独有的方式
        if ((screen as any).deviceXDPI && (screen as any).logicalXDPI) {
            ratio = (screen as any).deviceXDPI / (screen as any).logicalXDPI;
        }
    } else if (winodwThis.outerWidth !== undefined && winodwThis.innerWidth !== undefined) {
        ratio = winodwThis.outerWidth / winodwThis.innerWidth;
    }

    return ratio;
};
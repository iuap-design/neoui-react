export function myBrowser() {
    const userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
    let browserType = '';

    if (userAgent.indexOf("Opera") > -1) { // 判断是否Opera浏览器
        browserType = "Opera"
    } else if (userAgent.indexOf("Firefox") > -1) { // 判断是否Firefox浏览器
        browserType = "FF";
    } else if (userAgent.indexOf("Chrome") > -1) {
        browserType = "Chrome";
    } else if (userAgent.indexOf("Safari") > -1) { // 判断是否Safari浏览器
        browserType = "Safari";
    }
    return browserType
}

export const handleReportFunctionClick = ({functionId, functionName, entryMode, ...others}) => {
    const properties = {
        'entry_mode': entryMode,
        'function_id': functionId,
        'function_name': functionName,
        'top_domain': window.location.host,
        ...others
    }
    window.AnalysysAgent.track("function_click", properties)
}

export const handleReportButtonClick = ({entryMode, buttonId, buttonName, ...others}) => {
    const properties = {
        'entry_mode': entryMode,
        'button_id': buttonId,
        'button_name': buttonName,
        'top_domain': window.location.host,
        ...others
    }
    window.AnalysysAgent.track("button_click", properties)
}

export const isIE11 = () => {
    if((/Trident\/7\./).test(navigator.userAgent)) {
      return true;
    } else {
      return false;
    }
}

// 兼容ie11 domlist 无法使用foreach方法
export const querySelectorAll = (params) => {
    return Array.prototype.slice.call(document.querySelectorAll(params), 0)
}
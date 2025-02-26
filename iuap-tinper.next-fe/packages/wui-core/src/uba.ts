
/**
 * @description: 上报需要记录的组件使用频率情况和组件API使用频率情况
 * @return {*}
 */


type ubaReportKey = 'TN_component_frequency' | 'TN_API_frequency';

interface UbaReportContent {
    defineCode: string;
    reportKey: string;
}

const TINPER_NEXT_UBA_CODE = 'TINPER_NEXT';

const ubaReportKey = {
    'TN_component_frequency': `[组件使用频率]`,
    'TN_API_frequency': `[API使用频率]`,
}



export const ubaReport = (value: any, key?: string) => {
    let reportKey = (key || 'TN_component_frequency') as ubaReportKey
    let message: string;
    if (typeof value === 'string') {
        message = value;
    } else {
        message = value?.message;
    }

    const reportContent: UbaReportContent = {
        defineCode: TINPER_NEXT_UBA_CODE,
        reportKey: ubaReportKey[reportKey] + message,
    }
    try {
        (window as any).uba?.report(reportKey, reportContent)
    } catch (e) {
        console.log('TinperNext上报错误', e)
    }

    // (window as any).uba?.report(reportKey, reportContent)
};

// 封装API使用频率
export const ubaReportCount = (code: string, key?: string) => {
    (window as any).uba?.reportCountEvent(code, key)
}


export const ubaTargetReportCount = (component: string, target: Object = {}) => {
    for (let key in target) {
        ubaReportCount(`${component}_${key}`, 'TN_API_frequency')
    }
}

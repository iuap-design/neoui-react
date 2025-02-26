/**
 * layout 响应式布局相关方法
 * 20220210 lyy
 * */
export type Breakpoint = 'xxl' | 'xl' | 'lg'| 'md'| 'sm'| 'xs';
export type ScreenMap = Partial<Record<Breakpoint, boolean>>;
export type ResponsiveMap = Partial<Record<Breakpoint, string>>;
export const canUseDocElement = () => {
    return !!(
        typeof window !== 'undefined' &&
         window.document &&
         // window.document.createElement &&
         window.document.documentElement
    );
}

let flexGapSupported: boolean;

export const detectFlexGapSupported = () => {
    if (!canUseDocElement()) {
        return false;
    }

    if (flexGapSupported !== undefined) {
        return flexGapSupported;
    }

    // create flex container with row-gap set
    const flex = document.createElement('div');
    flex.style.display = 'flex';
    flex.style.flexDirection = 'column';
    flex.style.rowGap = '1px';

    // create two, elements inside it
    flex.appendChild(document.createElement('div'));
    flex.appendChild(document.createElement('div'));

    // append to the DOM (needed to obtain scrollHeight)
    document.body.appendChild(flex);
    flexGapSupported = flex.scrollHeight === 1; // flex container should be 1px high from the row-gap
    document.body.removeChild(flex);

    return flexGapSupported;
};
// 浏览器响应数组
export const responsiveArray: Breakpoint[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
// 根据媒体查询设置screens 对象
export const defaultResponsiveMap: Record<Breakpoint, string> = {
    'xs': '(max-width: 600px)',
    'sm': '(min-width: 600px)',
    'md': '(min-width: 1000px)',
    'lg': '(min-width: 1340px)',
    'xl': '(min-width: 1900px)',
    'xxl': '(min-width: 2500px)',
};
 type SubscribeFunc = (screens: ScreenMap) => void;
const subscribers = new Map();
let screens = {};
let subUid = 0;
export const responsiveObserve = {
    // 记录
    matchHandlers: {} as {
    [prop: string]: {
        mql: MediaQueryList;
        listener: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null;
    };
  },
    // 设置screens 对象
    setScreens(pointMap: ScreenMap) {
        screens = pointMap; // {xs: false, sm: true,...}
        subscribers.forEach(func => func(screens));
        return subscribers.size >= 1;
    },
    subscribe(func: SubscribeFunc, responsiveMap: ResponsiveMap = defaultResponsiveMap) {
        if (!subscribers.size) this.register(responsiveMap);
        subUid += 1;
        subscribers.set(subUid, func);
        func(screens);
        return subUid;
    },
    unsubscribe(token: number, responsiveMap: ResponsiveMap = defaultResponsiveMap) {
        subscribers.delete(token);
        if (!subscribers.size) this.unregister(responsiveMap);
    },
    register(responsiveMap: ResponsiveMap) {
        Object.keys(responsiveMap).forEach((screen: Breakpoint) => {
            const matchMediaQuery = responsiveMap[screen]; // '(max-width: 575px)',
            if (matchMediaQuery) {
                const listener = ({matches}: { matches: boolean }) => {
                    this.setScreens({
                        ...screens,
                        [screen]: matches,
                    });
                };
                const mediaQueryList = window.matchMedia(matchMediaQuery);
                mediaQueryList.addListener(listener);
                this.matchHandlers[matchMediaQuery] = {
                    mql: mediaQueryList,
                    listener,
                };
                // 根据gutter配置获取当前的screens对象
                listener(mediaQueryList);
            }
        });
    },
    unregister(responsiveMap: ResponsiveMap) {
        Object.keys(responsiveMap).forEach((screen: Breakpoint) => {
            const matchMediaQuery = responsiveMap[screen];
            if (matchMediaQuery) {
                const handler = this.matchHandlers[matchMediaQuery];
                handler && handler.mql && handler.mql.removeListener(handler.listener);
            }
        });
        // 移除所有
        subscribers.clear();
    },
}



export interface StoreConfig {
    name:string;
    init:object | Function;
    [key: string]: any
}

export type StoreType = StoreConfig | Function | undefined

export interface CreateViewProps {
    appCode?: string | null | undefined;
    pageCode?: string | null | undefined;
    billCode?: string | null | undefined;
    // jsPluginUrl?: string | null | undefined;
    // baseHost?: string | null | undefined;
    uiMeta: Record<string, any> | null;
    uiParser?: Record<string, any> | null;
    uiEvent?: Record<string, any> | null;
    uiParams?: Record<string, any> | null;
    uiStore?: StoreType;
    uiRunMode?: 'runtime' | 'design' | null;
    history?: any; // 路由相关的history
    location?: any; // 路由相关的location
    onCreateParser?: (arg: any) => void;
    // onViewAuthValidate?: any;
    globalParser?: Record<string, any> | ((uiParser:Record<string, any>) => Record<string, any>);
    globalEvent?: Record<string, any>| ((uiEvent:Record<string, any>) => Record<string, any>);
    globalParams?: Record<string, any>| ((uiParams:Record<string, any>) => Record<string, any>);
    globalActions?: Record<string, any>;
    onWillReceiveProps?: any;
    onWillMount?: any;
    onWillUpdate?: any;
    onDidMount?: any;
    onDidUpdate?: any;
    onWillUnmount?: any;
}

export interface CreateViewState {
    uiMeta: Record<string, any> | null;
    uiParser?: Record<string, any> | null;
    uiEvent?: Record<string, any> | null;
    uiParams?: Record<string, any> | null;
    uiStore?: Record<string, any> | null;
    refreshTime?: number;
}

export interface DynamicViewProps extends CreateViewProps{
}
export interface DynamicViewState extends CreateViewState{
}

export interface ViewItemLifeEvents {
    onViewWillMount?: Function|unknown|null; // 将要挂载的生命周期方法
    onViewDidMount?: Function|unknown|null; // 已挂载的生命周期方法
    onViewWillUpdate?: Function|unknown|null; // 将要更新的生命周期方法
    onViewDidUpdate?:Function|unknown|null; // 已更新的生命周期方法
    onViewWillUnmount?:Function|unknown|null; // 将要卸载的生命周期方法
    onViewObserveStore?:Function|unknown|null; // store变化时的生命周期方法
}

export interface ViewItemProps extends ViewItemLifeEvents{
    forwardKey:any // 透传给子元素的key
    forwardRef:any // 透传给子元素的ref
    meta:Record<string, any> | null, // 子元素的属性
    metaLastUpdate:number, // meta最后更新计时
    parser:any, // 子元素解析器（React组件）
    children?:any, // 子元素的子集视图
    event?:Record<string, any> | null, // 子元素支持的自定义事件
    sendAction?:any, // 子元素更新redux的公共方法
}
export interface ViewItemState{

}

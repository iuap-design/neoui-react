/**
 * Created by Dio.Zhu
 */
import React, {ReactInstance} from 'react';
import {Provider} from 'react-redux';
import _cloneDeep from 'clone';
import _deepmerge from 'deepmerge';
import ReduxUtils from "./ReduxUtils";
import TreeUtils from "../../wui-core/src/TreeUtils";
import {CreateViewProps, CreateViewState, StoreType, ViewItemLifeEvents} from './iDynamicView';
type StoreScope = "private"|"public"|undefined;
type GetStoreResult = {
    name:string,
    api?:{[key: string]:any}, // 旧规范-异步同步混合
    actions?:{[key: string]:any}, // 新规范-同步
    effects?:{[key: string]:any}, // 新规范-异步
    getState?:Function
};
const _isEmpty = function(value: any) {
    if (value === null || value === '' || value === undefined) return true;
    if (Array.isArray(value)) {
        return (value.length == 0);
    } else if (typeof value === 'object') {
        return (Object.keys(value).length == 0);
    } else {
        return !value;
    }
};
const _forEach = function(arr: any[], callback: (a: {[key: string]: any}, b: string) => void) {
    if (!arr) return;
    for (let idx in arr) {
        callback(arr[idx], idx);
    }
};
//  是否存在运行参数表达式
const hasParamPatten = (str: string) => {
    var patten = new RegExp('!{.+}', 'gm');
    return patten.test(str);
};

// // 格式化URL路径
// const formatUrlPath = function(baseHost?: string, url?: string) {
//     if (baseHost && url) {
//         if (_startsWith(url, 'http') || _startsWith(url, 'https')) {
//             return url;
//         } else {
//             return baseHost + (_startsWith(url, '/') ? '' : '/') + url;
//         }
//     } else {
//         return url;
//     }
// };

// html标签名
const HTML_TAGS = ['a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'b', 'base', 'basefont', 'bdi', 'bdo', 'bgsound', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'command', 'content', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'image', 'img', 'input', 'ins', 'isindex', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'listing', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'multicol', 'nav', 'nobr', 'noembed', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'plaintext', 'pre', 'progress', 'q', 'rb', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr', 'xmp'];


// store规范的关键词
const STORE_KEYS = ['name', 'init', 'initState', 'actions', 'effects'];

// 超级store对象的默认动作
const superStoreActions = {
    // 更新一个页面级store
    "pageStoreUpdate": function(preState:any, pageStoreName:string, pageStoreData:any) {
        if (!pageStoreName) return preState;
        preState[pageStoreName] = preState[pageStoreName] || {};
        preState[pageStoreName] = pageStoreData;
        return preState;
    },
    // 清除一个页面级store
    "pageStoreClear": function(preState:any, pageStoreName:string) {
        if (!pageStoreName) return preState;
        delete preState[pageStoreName];
        return preState;
    },
    // 页面store的action响应入口
    "pageStoreAction": function(preState:any, pageStoreName:string, actionFunction:Function, actionArgs:any) {
        if (!pageStoreName) return preState;
        if (typeof actionFunction == 'function') {
            return actionFunction(preState, ...actionArgs)
        }
        return preState;
    },
}
// 创建store的
const superStore = ReduxUtils.createStore('rootStore', undefined, superStoreActions);

// 私有化store相关的动作
const privateStoreActions = {
    // 更新一个私有化store
    "privateStoreUpdate": function(preState:any, storeName:string, storeData:any) {
        if (!storeName) return preState;
        return Object.assign(preState || {}, storeData);
    },
    // 清除一个私有化store
    "privateStoreClear": ()=>({}),
    // 私有化store的action响应入口
    "privateStoreAction": function(preState:any, storeName:string, actionFunction:Function, actionArgs:any) {
        if (!storeName) return preState;
        if (typeof actionFunction == 'function') {
            return actionFunction(preState, ...actionArgs)
        }
        return preState;
    }
}

//  存放原始数据的View，界面不可见。
class EmptyView extends React.Component {
    render() {
        return null;
    }
}
// 将"a.b.c.d"转化为嵌套对象{a:{b:{c:{d:value}}}}，并给最后一个对象赋值
function dotConvertToObject(str:string, value:any) {
    // 首先将字符串按"."分割成数组
    let arr = str.split(".");
    // 初始化结果为对象
    let result = {};
    let current;
    for (let i = 0;i < arr.length;i++) {
        if (!current)current = result;
        if (i == arr.length - 1) {
            current[arr[i]] = value;
        } else {
            current[arr[i]] = {};
            current = current[arr[i]];
        }
    }
    return result;
}

export default class CreateView extends React.Component<CreateViewProps, CreateViewState> {
     static RUN_MODE_RUNTIME = 'runtime';//  运行态
     static RUN_MODE_DESIGN = 'design';//  设计态
     static defaultProps = {
         appCode: null,
         pageCode: null,
         billCode: null, // 单据唯一标识
         // jsPluginUrl: null, // 二开扩展的js代码文件路径
         // baseHost: null, // 缺省的域名地址,如果jsPluginUrl使用的相对地址则默认使用此域名地址
         uiMeta: null, // UI元数据
         uiParser: null, // UI组件解析器{"ComponentName":Component,...}
         uiEvent: null, // UI事件处理器{"uikey":{"eventName":Function,...},...}
         uiParams: null, // UI参数解析器{"ParamName":Function,...}
         uiStore: null, // UI数据存储器{"ParamName":Function,...}
         uiRunMode: CreateView.RUN_MODE_RUNTIME, // 运行模式，默认为运行态-"runtime"，设计态-"design"
         // --------------------------------------
         onCreateParser: null, // 自定义动态注册视图解析器
         onViewAuthValidate: null, // 视图权限校验的回调函数
         globalParser: null, // 全局缺省视图解析器object|function
         globalEvent: null, // 全局缺省事件解析器object|function
         globalParams: null, // 全局缺省参数解析器object|function
         globalActions: null, // 全局缺省动作解析器object|function
         onWillReceiveProps: null, // 可扩展生命周期逻辑-WillReceiveProps
         onWillMount: null, // 可扩展生命周期逻辑-WillMount
         onWillUpdate: null, // 可扩展生命周期逻辑-WillUpdate
         onDidMount: null, // 可扩展生命周期逻辑-DidMount
         onDidUpdate: null, // 可扩展生命周期逻辑-DidUpdate
     };

     _refItems: { // 存储所有渲染出来的UI实例
         [key: string]: ReactInstance
     } = {};
     _nid2uiMetaMap:{[key: string]:any} = {};// {nid:uiMetaItem}的关系（tree2list结构）
     _uikey2nidMap:{[key: string]:string} = {}; // {uikey:nid}的关系（tree2list结构）
     _uikey2LifeMap:{[key:string]:ViewItemLifeEvents} = {}; // {uikey:各生命周期}的关系
     _uikeyHasNestedEvent:{[key:string]:any} = {}; // {uikey:各嵌套事件}的关系
     _storeCurrent:any; // store的provider对象
     _storeScope:StoreScope; // store的范围"public"|"private"（默认）
     _storeName:string = ''; // store的编码名称
     // _storeUUID:string = ''; // store的唯一id
     _storeActions:{[key: string]:any} = {}; // {syncActionName:syncActionFunction}的关系（store的操作集合）
     _storeEffects:{[key: string]:any} = {}; // {asyncActionName:asyncActionFunction}的关系（store的操作集合）
     // _storeObserves:{[key: string]:any} = {}; // {uikey:ObserveFunction}的关系（store的观察者集合）
     _storeUpdateCount:number = 0.00; // store更新计数器，确保每次更新后props变化能正常生效。
     constructor(props: CreateViewProps) {
         super(props);
         this._processUIStore(props.uiStore);
         let uiMeta = this._processUIMeta(props.uiMeta);// 注意uiMeta需在uiEvent之前之前执行，确保event中能拿到meta。
         let uiParams = this._processUIParams(props.uiParams!);
         let uiParser = this._processUIParser(props.uiParser);
         let uiEvent = this._processUIEvent(props.uiEvent);
         this._refItems = {};
         this.state = {
             uiParams, uiMeta, uiParser, uiEvent,
             refreshTime: 0// 记录刷新次数
         }
     }

     UNSAFE_componentWillReceiveProps(nextProps: CreateViewProps) {
         if (('uiParams' in nextProps) || ('uiParser' in nextProps) || ('uiEvent' in nextProps) || ('uiMeta' in nextProps) || ('uiStore' in nextProps)) {
             this._processUIStore(nextProps.uiStore);
             let uiMeta = this._processUIMeta(nextProps.uiMeta); // 注意uiMeta需在uiEvent之前之前执行，确保event中能拿到meta。
             let uiParams = this._processUIParams(nextProps.uiParams!);
             let uiParser = this._processUIParser(nextProps.uiParser);
             let uiEvent = this._processUIEvent(nextProps.uiEvent);
             this.setState({
                 uiParams, uiMeta, uiParser, uiEvent
                 , refreshTime: this.state.refreshTime! + 1
             });
         }
         if (typeof this.props.onWillReceiveProps == 'function') {
             this.props.onWillReceiveProps.call(this, nextProps);
         }
     }

     // 性能优化，只有当refreshTime发生变更时才触发执行render方法
     shouldComponentUpdate(_nextProps: CreateViewProps, nextState: CreateViewState) {
         return this.state.refreshTime !== nextState.refreshTime;
     }

     UNSAFE_componentWillMount() {
         // console.log('YYCreateView will mount');
         let { uiMeta, uiEvent } = this.state;
         this._callLifeEvent('onViewWillMount', { uiMeta, uiEvent });
         if (typeof this.props.onWillMount == 'function') {
             this.props.onWillMount.call(this);
         }
     }

     componentDidMount() {
         // console.log('YYCreateView did mount');
         let { uiMeta, uiEvent } = this.state;
         // let page = this as any;// 注意eval里面会使用到此变量
         // 运行逻辑公式
         if (uiMeta && uiMeta.logicFormula) {
             try {
                 let runTime = [];
                 runTime.push("this._logicFormulaRunTime = function(yy){");
                 //  runTime.push("console.log('yy-->',this,yy);");
                 runTime.push(uiMeta.logicFormula);
                 runTime.push("};");
                 runTime.push("this._logicFormulaRunTime({page:page});");
                 let jsCodeStr = runTime.join("");
                 //  console.log('------运行代码-----');
                 //  console.log(jsCodeStr);
                 eval(jsCodeStr);
             } catch (e) {
                 //  console.error('逻辑公式运行出错', e);
             }
         }
         this._callLifeEvent('onViewDidMount', { uiMeta, uiEvent });
         if (typeof this.props.onDidMount == 'function') {
             this.props.onDidMount();
         }
     }

     UNSAFE_componentWillUpdate(nextProps: CreateViewProps, nextState: CreateViewState) {
         // console.log('YYCreateView will update');
         let { uiMeta, uiEvent } = nextState;
         this._callLifeEvent('onViewWillUpdate', { uiMeta, uiEvent });
         if (typeof this.props.onWillUpdate == 'function') {
             this.props.onWillUpdate(nextProps, nextState);
         }
     }

     componentDidUpdate(prevProps: CreateViewProps, prevState: CreateViewState) {
         // console.log('YYCreateView did update');
         let { uiMeta, uiEvent } = prevState;
         this._callLifeEvent('onViewDidUpdate', { uiMeta, uiEvent });
         if (typeof this.props.onDidUpdate == 'function') {
             this.props.onDidUpdate(prevProps, prevState);
         }
     }

     componentWillUnmount() {
         let { uiMeta, uiEvent } = this.state;
         this._callLifeEvent('onViewWillUnmount', { uiMeta, uiEvent });
         if (typeof this.props.onWillUnmount == 'function') {
             this.props.onWillUnmount();
         }
     }

     // 调用指定的生命周期事件
     _callLifeEvent(eventName: string, { uiMeta, uiEvent }: any) {
         if (!uiMeta || !uiEvent) return;
         for (let uikey in this._uikey2LifeMap) {
             let itemLifeEvents = this._uikey2LifeMap[uikey];
             if (!itemLifeEvents || typeof itemLifeEvents[eventName] !== 'function') continue;
             let itemUI = this._findUI({ uikey });
             if (!itemUI) continue;// 匹配到组件才调用事件
             try {
                 itemLifeEvents[eventName].call(this, { uiMeta, item: itemUI });
             } catch (err) {
                 //  console.error('[事件回调失败]' + uikey + '.' + eventName, err);
             }
         }
     }

     // 回调指定的事件
     _callEvent(eventName: string, { uiMeta, uiEvent }: any) {
         if (!uiMeta || !uiEvent) return;
         for (let uikey in uiEvent) {
             let itemEvents = uiEvent[uikey];
             if (itemEvents && typeof itemEvents[eventName] == 'function') {
                 // let itemUI = this._findUI({ uiMeta, uikey });// 匹配到组件才调用事件
                 let itemUI = this._findUI({ uikey });// 匹配到组件才调用事件
                 if (itemUI) {
                     try {
                         let _itemUI = itemEvents[eventName].call(this, { uiMeta, item: itemUI });
                         if (_itemUI) itemUI = _itemUI;
                     } catch (err) {
                         //  console.error('[事件回调失败]' + uikey + '.' + eventName, err);
                     }
                 }
             }
         }
     }

     // 环境参数助手方法
     _processUIParams(uiParams: {[key: string]: any}) {
         const { globalParams } = this.props;
         let _globalParams = typeof globalParams == 'function' ? globalParams(uiParams) : globalParams;
         let _uiParams = Object.assign({}, _globalParams || {}, uiParams);
         //  globalParams、uiParams属性先不下沉所以这里一直是空对象，下面操作没有意义
         for (let key in _uiParams) {
             let param = _uiParams[key];
             if (typeof param == 'function') {// 处理函数类型的动态参数
                 _uiParams[key] = param.call(this);
             }
         }
         return _uiParams;
     }

     // 元数据助手方法
     _processUIMeta(uiMeta: any) {
         if (!uiMeta) return;
         let uiMetaCopy = uiMeta;
         this._nid2uiMetaMap = {};
         this._uikey2nidMap = {};
         let uiMetaTree = Array.isArray(uiMetaCopy) ? uiMetaCopy : [uiMetaCopy];
         TreeUtils.loopAll(uiMetaTree, (item:any)=>{
             if (!item) return;
             if (item.nid) {
                 this._nid2uiMetaMap[item.nid] = item;
             }
             if (item.uikey) {
                 this._uikey2nidMap[item.uikey] = item.nid;
             }
             delete item.api; // 清理历史挂载的api
         });
         return uiMetaCopy;
     }

     // store存储助手方法
     _processUIStore(uiStore:StoreType) {
         if (!uiStore) return;
         let innerStore = (typeof uiStore == 'function') ? uiStore(this) : uiStore;
         let storeConfig = innerStore || {};
         let configKeys = Object.keys(storeConfig);
         let pageStore:any;

         if (!configKeys.includes('name')) {
             console.error('初始化Store失败，缺少name配置');
             return;
         } else if (typeof storeConfig.name !== 'string') {
             console.error('初始化Store失败，name配置必须为string');
             return;
         }

         // 获取初始化store状态数据
         let storeInit = storeConfig.init || storeConfig.initState;
         if (!storeInit) {
             console.error('初始化Store失败，缺少initState配置');
             return;
         }
         if (typeof storeInit == 'function') {
             pageStore = storeInit();
         } else if (typeof storeInit == 'object') {
             pageStore = Object.assign({}, storeInit);
         } else {
             console.error('初始化Store失败，initState配置必须为object/function类型');
             return;
         }
         // 获取当前scope的名称
         this._storeName = storeConfig.name;
         // 获取当前scope的模式范围
         this._storeScope = ('initState' in storeConfig) ? 'private' : 'public'; // public为兼容的旧模式，private为推荐的新模式

         if (this._storeScope == 'private') {
             for (let sIdx in configKeys) {
                 if (!STORE_KEYS.includes(configKeys[sIdx])) {
                     console.error('初始化Store失败，存在非规范键值:' + configKeys[sIdx] + '，请符合规范[' + STORE_KEYS.join(',') + ']，');
                     return;
                 }
             }
         }

         // 绑定包装的action函数
         const bindCreateAction = function(currStore:any, currStoreName:string, currActionFunc:Function, currStoreScope:StoreScope) {
             return function(...actionFuncArgs:any[]) {
                 if (typeof currActionFunc == 'function') {
                     let action;
                     if (currStoreScope == "private") {
                         action = ReduxUtils.createAction('privateStoreAction', currStoreName as any, currActionFunc as any, actionFuncArgs as any);
                     } else {
                         action = ReduxUtils.createAction('pageStoreAction', currStoreName as any, currActionFunc as any, actionFuncArgs as any);
                     }
                     action && currStore.dispatch(action);
                 }
             }
         };

         // 绑定包装的异步函数
         const bindCreateAsyncAction = function(getStore:any, currActionFunc:Function) {
             return function() {
                 currActionFunc.call(this, getStore, ...arguments);
             }
         };

         // 旧模式-全局共享store
         const processPublicStore = ()=> {
             // 构造绑定外部action函数
             configKeys.forEach((eKey)=>{
                 if (STORE_KEYS.includes(eKey)) return; // 过滤掉生命周期方法
                 let actionFunc = storeConfig[eKey] as Function;
                 if (typeof actionFunc !== 'function') { // TODO Promise/async情况未区别处理
                     console.warn(`[绑定store事件失败]${eKey},检查是否为有效的Function`);
                     return;
                 }
                 if (eKey.startsWith('async')) { // 以async开头命名的函数，约定为 async function
                     this._storeActions[eKey] = bindCreateAsyncAction(this.getStore, actionFunc)
                 } else {
                     this._storeActions[eKey] = bindCreateAction(superStore, storeConfig.name, actionFunc, this._storeScope);
                 }
             });

             // 页面store初始化
             if (pageStore) {
                 let pageStoreUpdate = ReduxUtils.createAction('pageStoreUpdate', storeConfig.name, pageStore);
                 superStore.dispatch(pageStoreUpdate);
             } else { // 注意 允许外部重置清空页面store
                 let pageStoreClear = ReduxUtils.createAction('pageStoreClear', storeConfig.name);
                 superStore.dispatch(pageStoreClear);
             }
         }

         // 新模式-私有化store
         const processPrivateStore = ()=> {
             let actionKeys = Object.keys(storeConfig.actions || {});
             let effectKeys = Object.keys(storeConfig.effects || {});
             let storeData:any = {};
             storeData[this._storeName] = pageStore;
             this._storeCurrent = ReduxUtils.createStore(this._storeName, storeData, privateStoreActions);
             actionKeys.forEach((aKey)=>{
                 let actionFunc = storeConfig.actions[aKey] as Function;
                 if (typeof actionFunc !== 'function') { // TODO Promise/async情况未区别处理
                     console.warn(`[绑定store.actions事件失败]${aKey},检查是否为有效的Function`);
                     return;
                 }
                 this._storeActions[aKey] = bindCreateAction(this._storeCurrent, storeConfig.name, actionFunc, this._storeScope);
             });

             effectKeys.forEach((eKey)=>{
                 let effectFunc = storeConfig.effects[eKey] as Function;
                 if (typeof effectFunc !== 'function') { // TODO Promise/async情况未区别处理
                     console.warn(`[绑定store.effects事件失败]${eKey},检查是否为有效的Function`);
                     return;
                 }
                 this._storeEffects[eKey] = bindCreateAsyncAction(this.getStore, effectFunc)
             });
             // 页面store初始化
             if (pageStore) {
                 let pageStoreUpdate = ReduxUtils.createAction('privateStoreUpdate', storeConfig.name, pageStore);
                 this._storeCurrent.dispatch(pageStoreUpdate);
             } else { // 注意 允许外部重置清空页面store
                 let pageStoreClear = ReduxUtils.createAction('privateStoreClear', storeConfig.name);
                 this._storeCurrent.dispatch(pageStoreClear);
             }
         }

         // 初始化store上下文
         if (this._storeScope == 'private') {
             processPrivateStore()
         } else {
             processPublicStore();
         }

     }

     // 解析器助手方法
     _processUIParser(uiParser: any) {
         let { globalParser } = this.props;
         let _globalParser = (typeof globalParser == 'function') ? globalParser(uiParser) : globalParser;
         let _uiParser = Object.assign({}, _globalParser || {}, uiParser);
         return _uiParser;
     }

     // 事件助手方法
     _processUIEvent(uiEvent: any) {
         let {globalEvent} = this.props;
         let _innerEvent = (typeof uiEvent == 'function') ? uiEvent(this) : uiEvent;
         let _globalEvent = (typeof globalEvent == 'function') ? globalEvent(_innerEvent) : globalEvent;
         // 注意此次需要克隆，以防止引用共享
         let copyDefault = _globalEvent ? _cloneDeep(_globalEvent) : {};
         let copyUiEvent = _cloneDeep(_innerEvent);
         this._uikey2LifeMap = {}; // 初始化
         let _uiEvent = Object.assign(copyDefault, copyUiEvent);
         for (let uikey in _uiEvent) {
             let _itemEvents = _uiEvent[uikey];
             let uikeyWithLifeEvents:ViewItemLifeEvents = {}; // 生命周期事件
             let uikeyWithCustomNestEvents:any = {}; // 自定义嵌套事件
             if (!_itemEvents) continue;
             if (typeof _itemEvents !== 'object') {
                 console.error(`[绑定事件失败]非法格式：{"${uikey}":${(typeof _itemEvents)}}，需修正为：{"${uikey}":object}`);
                 continue;
             }
             for (let evtName in _itemEvents) {
                 try {
                     if (['onViewWillMount', 'onViewDidMount', 'onViewWillUpdate', 'onViewDidUpdate', 'onViewWillUnmount', 'onViewObserveStore'].includes(evtName)) {
                         // 当前视图具备的生命周期方法
                         uikeyWithLifeEvents[evtName] = _itemEvents[evtName].bind(this);
                         delete _itemEvents[evtName]; // 避免生命周期透传后被渲染到dom元素上
                     } else if (evtName.indexOf('.') > 0) { // 嵌套事件定义，例如：{"a.b.c":()=>{}}
                         if (evtName.startsWith('.') || evtName.endsWith('.')) {
                             console.error('[绑定事件失败]' + uikey + '[' + evtName + '],不能以"."开头或结尾');
                             continue;
                         }
                         let _nestEvent = dotConvertToObject(evtName, _itemEvents[evtName].bind(this));
                         uikeyWithCustomNestEvents = _deepmerge(uikeyWithCustomNestEvents, _nestEvent);
                         delete _itemEvents[evtName]; // 移除所有"a.b.c"格式事件
                     } else { // 其它自定义事件
                         _itemEvents[evtName] = _itemEvents[evtName].bind(this);
                     }
                 } catch (err) {
                     console.error('[绑定事件失败]' + uikey + '.' + evtName + ',检查是否为有效的Function', err);
                 }
             }
             if (Object.keys(uikeyWithCustomNestEvents).length > 0) {
                 Object.assign(_itemEvents, uikeyWithCustomNestEvents); // 合并绑定所有"a.b.c"格式事件
                 this._uikeyHasNestedEvent[uikey] = true;
             }
             this._uikey2LifeMap[uikey] = uikeyWithLifeEvents; // 绑定每个item具有的生命周期方法
         }
         return _uiEvent;
     }

     /**
      * 执行多个表单的验证 可以提取到Handler
      * @param options{
      *  formKeys:[]  // 需要进行验证的表单键值集合
      *  keepAll:true // 当设置为false时，验证过程中任意一表单存在错误则不再继续进行验证
      *  success:null // 所有表单都验证通过时触发的回调
      *  error:null   // keepAll=true时，所有表单验证后存在错误则触发回调；keepAll=false时，当任意一个表单验证不通过时触发回调；
      * }
      */
     validateForms(options: any) {
         let page = this as any;
         let { formKeys, keepAll, _index, formValues, formErrors, success, error } = Object.assign({
             formKeys: [],
             keepAll: true,
             _index: 0,
             formValues: {},
             formErrors: {},
             success: null,
             error: null
         }, options);
         if (_index >= formKeys.length) { //  所有表单校验完毕
             if (_isEmpty(formErrors)) {
                 if (typeof success == 'function') success({ formValues: formValues });
             } else {
                 if (typeof error == 'function') error({ formErrors, formValues });
             }
             return;
         }
         let formKey = formKeys[_index];
         let form = page.findUI(formKey);
         if (form && form.api && form.api.validateFields) {
             form.api.validateFieldsAndScroll((errors: any, values: any) => {
                 formValues[formKey] = values;
                 if (errors) {// 验证失败
                     formErrors[formKey] = errors;
                     if (keepAll === true) {// 任意表单出错任继续验证
                         page.validateForms(Object.assign(options, {
                             formValues: formValues,
                             formErrors: formErrors,
                             keepAll,
                             _index: _index + 1
                         }));
                     } else {// 任意表单出错则终止
                         if (typeof error == 'function') {
                             error({ formErrors, formValues, formKey, formIndex: _index });
                         }
                         return;
                     }
                 } else {// 验证通过，则继续验证
                     page.validateForms(Object.assign(options, {
                         formValues: formValues,
                         formErrors: formErrors,
                         keepAll,
                         _index: _index + 1
                     }));
                 }
             });
         }
     }

     /**
      * 刷新重绘页面
      */
     refresh = (callback:Function, state:any) => {
         let { refreshTime } = this.state;
         this.setState(Object.assign({ refreshTime: 1 + refreshTime! }, state), ()=> {
             callback && callback.call(this);
         });
     }

     /**
      * 获取当前页面
      */
     getPage() {
         return this
     }

     /**
      * 获取应用编码
      */
     getAppCode() {
         return this.props.appCode;
     }

     /**
      * 获取页面编码
      */
     getPageCode() {
         return this.props.pageCode;
     }

     /**
      * 获取页面单据唯一编码
      */
     getBillCode() {
         return this.props.billCode;
     }

     /**
     * 获取路由相关的history对象
     */
     getHistory() {
         return this.props.history;
     }

     /**
     * 获取路由相关的location对象
     */
     getLocation() {
         return this.props.location;
     }

     // /**
     //  * 获取扩展的js插件文件路径
     //  */
     // getJsPluginUrl(format = true) {
     //     if (!this.props.jsPluginUrl) return null;
     //     return format ? formatUrlPath(this.props.jsPluginUrl) : this.props.jsPluginUrl;
     // }

     // /**
     //  * 路由到指定页面
     //  * @param url   路由路径
     //  * @param query URL附加的参数（显示参数）
     //  * @param state 路由附加的参数（隐藏参数）
     //  */
     // routeTo = (url: string, query: string, state: any) => {
     //     if (!this.props.router) {
     //         console.error('调用routeTo失败,router不存在');
     //         return
     //     }
     //     let location = {};
     //     if (url) location.pathname = url;
     //     if (query) location.query = query;
     //     if (state) location.state = state;
     //     // this.props.history.push(url,_params);
     //     //  this.props.history.push(location);
     //     this.props.router.push(location); //  Router版本升级修改
     // };
     // /**
     //  * 获取路由传递的参数值（隐藏参数）
     //  */
     // getRouteParams = () => {
     //     if (!this.props.location && !this.props.params) {
     //         console.error('调用getRouteParams失败,location和params均不存在');
     //         return
     //     }
     //     return _isEmpty(this.props.location.state) ? (_isEmpty(this.props.params) ? null : this.props.params) : this.props.location.state;
     // };
     // /**
     //  * 获取路由传递的URL参数值（直接链接在URL的?后面的参数列表）（显示参数）
     //  */
     // getRouteQuery = () => {
     //     if (!this.props.location) {
     //         console.error('调用getRouteQuery失败,location不存在');
     //         return
     //     }
     //     return _isEmpty(this.props.location.query) ? null : this.props.location.query;
     // };
     // /**
     //  * 后退上一个页面
     //  */
     // goBack = () => {
     //     if (!this.props.router) {
     //         console.error('调用goBack失败,router不存在');
     //         return
     //     }
     //     this.props.router.goBack();
     // };
     // /**
     //  * 前进下一个页面
     //  */
     // goForward = () => {
     //     if (!this.props.router) {
     //         console.error('调用goForward失败,router不存在');
     //         return
     //     }
     //     this.props.router.goForward();
     // };
     // /**
     //  * 后退或前进到第N个页面
     //  * @param to n为正数则为前进，n为负数则为后退
     //  */
     // goTo = (to) => {
     //     if (!this.props.router) {
     //         console.error('调用goTo失败,router不存在');
     //         return
     //     }
     //     this.props.router.go(to);
     // };
     /**
      * 通过键值查找UI对象模型
      * @param uikey
      * @return object
      */
      findUI = (uikey: string) => {
          // if (this.state.uiMeta) {
          // let result = this._findUI({ uiMeta: this.state.uiMeta, uikey: uikey });
          let result = this._findUI({ uikey: uikey });
          //  if (!result) console.warn('[api.findUI]找不到：' + uikey);
          return result;
          // }
          // return null;
      }

      /**
      * 获取当前视图的store
      * @return object{
      *     name //store的名称
      *     api //store的action方法集合
      * }
      */
      getStore:()=>GetStoreResult = ()=>{
          let store:GetStoreResult = {
              name: this._storeName
          };
          if (this._storeScope == 'private') { // 新模式
              let privateStore = this._storeCurrent;
              store.actions = this._storeActions;
              store.effects = this._storeEffects;
              store.getState = function() {
                  let state = privateStore.getState();
                  return state;
              };
          } else { // 兼容旧模式
              store.api = this._storeActions;
              store.getState = function() {
                  let {rootStore} = superStore.getState();
                  return rootStore[this.name]
              };
          }
          return store
      }

      // _findUI(options: {uiMeta: CreateViewState['uiMeta']; uikey: string}) {
      _findUI(options: {uikey: string}) {
          let { uikey } = options;
          // let _uiMeta = Array.isArray(uiMeta) ? uiMeta : [uiMeta];
          // let results = TreeUtils.findWithPropName(_uiMeta, 'uikey', uikey, true, true);
          // if (results && results.length > 0) {
          //     results[0].api = this._findByRef(results[0].nid);// 扩展API对象
          //     return results[0];
          // }
          // return null;
          // 性能优化：依据映射关系查找，避免递归遍历
          let nid = this._uikey2nidMap[uikey];
          if (!nid) return;
          let uiMetaItem = this._nid2uiMetaMap[nid];
          if (uiMetaItem) {
              let refApi = this._findByRef(nid);// 扩展API对象;
              if (refApi) {
                  uiMetaItem.api = refApi;
              }
          }
          return uiMetaItem;
      }

      /**
      * 通过类型查找UI数据模型
      * @param uitype 解析器名称
      * @param options {
      *     loop 默认：true，是否递归遍历子集合
      *     only 默认：false，是否匹配到第一个就终止
      * }
      */
      findUIByType = (uitype:string, options:any) => {
          let opts = Object.assign({ loop: true, only: false }, options);
          if (this.state.uiMeta) {
              let _uiMeta = Array.isArray(this.state.uiMeta) ? this.state.uiMeta : [this.state.uiMeta];
              let results = TreeUtils.findWithPropName(_uiMeta, 'uitype', uitype, opts.loop, opts.only);
              if (results && results.length > 0) {
                  let that = this;
                  _forEach(results, function(item, index) {
                      results[index].api = that._findByRef(item.nid);// 扩展API对象
                  });
                  return results;
              }
          }
          return null;
      };

      // ref值指向nid值
      _findByRef(ref: string) {
          // TODO 目前存在缺陷，在折叠卡片页签第一次未展开时，无法通过refs获取内部组件
          return ref && this._refItems[ref] ? this._refItems[ref] : null;
      }

      // 环境参数替换 (因this.state.uiParams值一直为{}，所以_isEmpty(uiParams)为true，主要看_processUIParams方法，初始化)
      _processParams(node: {[key: string]: any}) {
          let uiParams = this.state.uiParams;
          if (_isEmpty(uiParams)) return;
          if (!node) return;
          let keys = [];
          // 过滤出包含运行参数的属性
          for (let key in node) {
              let value = node[key];
              if (value && (typeof value == 'string') && hasParamPatten(value)) {
                  keys.push(key);
              }
          }
          // 进行运行参数替换
          if (keys.length == 0) return;
          for (let idx in keys) {
              let propName = keys[idx];
              let propValue = node[propName];
              if (!propValue) break;
              for (let paramKey in uiParams) {
                  node[propName] = propValue.replace(new RegExp('!{' + paramKey + '}', 'gm'), uiParams[paramKey]);
                  if (!hasParamPatten(node[propName])) break;// 性能优化，如果替换一次后，就不存在需要替换的参数则跳过本次。
              }
          }
      }

      // 获取解析后的视图
      _getViewContent(options: { uiMeta: CreateViewState['uiMeta'], uiParser: CreateViewState['uiParser'], uiEvent: CreateViewState['uiEvent'] }) {
          // console.log('第'+this.state.refreshTime+'次进行视图解析');
          let { uiMeta, uiEvent, uiParser } = options;
          let views = null;
          if (uiMeta) {
              if (Array.isArray(uiMeta)) {
                  views = this._processViews(uiMeta, uiEvent, uiParser);
              } else {
                  views = this._processViews([uiMeta], uiEvent, uiParser);
              }
          }
          if (views && views.length > 0) {
              return Array.isArray(uiMeta) ? views : views[0];
          } else {
              return null;
          }
      }

      // 解析视图
      _processViews(items: CreateViewState['uiMeta'], uiEvent: CreateViewState['uiEvent'], uiParser: CreateViewState['uiParser']) {
          if (!Array.isArray(items)) return null;
          let views = [];
          let {uiRunMode, onCreateParser, globalActions, appCode, pageCode, billCode} = this.props;
          let _globalActions = typeof globalActions == 'function' ? globalActions() : globalActions;
          let that:any = this;
          for (let i = 0; i < items.length; i++) {
              let itemUI = items[i];
              if (!itemUI || _isEmpty(itemUI)) continue;
              // 解析子视图
              let childView = itemUI.children;
              let doEachChild = Array.isArray(itemUI.children);
              if (doEachChild) {
                  childView = this._processViews(itemUI.children, uiEvent, uiParser);
              }
              // 解析视图事件
              let itemEvents:{[key: string]:any} = {};
              if (itemUI.uikey && uiEvent) {
                  itemEvents = uiEvent[itemUI.uikey];
              }
              // 解析事件动作
              if (itemUI.uievents) {
                  if (!itemEvents) itemEvents = {};
                  // 解析绑定的所有事件
                  _forEach(itemUI.uievents, function(uiactions:any, uievent:string) {
                      // 解析对应事件下的动作列表
                      itemEvents[uievent] = function(ui:any, event:any, actions:any) {
                          for (let actSeq = 0; actSeq < actions.length; actSeq++) {
                              let action = actions[actSeq];
                              // 获取动作函数
                              let actionFunc = _globalActions ? _globalActions[action.uiaction] : null;
                              // 执行动作处理
                              if (typeof actionFunc == 'function') {
                                  actionFunc.call(this, {event, action, ui});
                              }
                          }
                      }.bind(that, itemUI, uievent, uiactions);
                  });
              }
              // //解析前的回调事件
              // if(itemEvents&&_isFunction(itemEvents['onParserBefore'])){
              //    let _itemUI = itemEvents['onParserBefore'].call(that,itemUI);
              //    if(_itemUI)itemUI = _itemUI;
              // }
              // 解析当前组件
              let UIComponent:any = null;
              if (typeof onCreateParser == 'function') {
                  UIComponent = onCreateParser({item: itemUI});
              }
              let HtmlComponent:any; // html标签组件
              if (!UIComponent) {
                  UIComponent = itemUI.uitype ? uiParser![itemUI.uitype] : null;
                  if (UIComponent == null && HTML_TAGS.includes(itemUI.uitype)) {
                      HtmlComponent = itemUI.uitype;
                  }
              }

              // 当前组件属性
              let itemProps = Object.assign({
                  // 为所有组件追加uiorigin属性，本属性提供了界面设计器解析构建页面时的特有属性
                  uiorigin: {appCode, pageCode, billCode}
              }, itemUI);
              // 清理掉组件属性上的API对象
              delete itemProps.api;
              // 环境参数替换
              this._processParams(itemProps); //  针对children属性目前不会生效，因为React.createElement时会重新覆盖children
              // 标识运行模式
              if (uiRunMode) itemProps.uirunmode = uiRunMode;// 注意react16下校验html元素属性大写会给予警告日志
              // 添加到视图集合，当uidisabled==true时，则不进行组件解析，返回原始数据。
              if (itemUI.uidisabled == true) {// 不进行组件解析
                  views.push(itemProps);
              } else if (UIComponent || HtmlComponent) {// 存在相关组件解析器
                  // 将当前UI元数据绑定到组件的ui属性
                  let privateProps:any = {};
                  if (itemUI.nid) {
                      privateProps.ref = (ui:any)=>this._refItems[itemUI.nid] = ui;
                      if (!itemUI.key) {
                          privateProps.key = pageCode + "_" + itemUI.nid;
                      }
                  }
                  let itemViewComponent = UIComponent || HtmlComponent;
                  // 如果存在store观察者生命周期
                  if (itemUI.uikey && this._uikey2LifeMap[itemUI.uikey] && this._uikey2LifeMap[itemUI.uikey].onViewObserveStore) {
                      // 连接redux后的观察者视图
                      itemViewComponent = ReduxUtils.connect(UIComponent || HtmlComponent, function(_itemNid:string, _itemUiKey:string, itemOnViewObserveStore:Function, preStore:any, ownProps:any) {
                          // this._storeUpdateCount = this._storeUpdateCount + 0.01;
                          // console.log('AAA----[onViewObserveStore][' + _itemUiKey + ']--》响应store变化，序号：' + this._storeUpdateCount, preStore.rootStore, ownProps);
                          let passStore:any;
                          if (this._storeScope == 'private') { // 新模式用法
                              passStore = preStore[this._storeName];
                          } else { // 兼容旧模式用法
                              passStore = preStore.rootStore;
                          }
                          let newChangeProps = itemOnViewObserveStore(passStore);
                          // 注意检查属性值不变化时，是否会引发组件render
                          let newFinalProps = Object.assign({}, ownProps, newChangeProps); // 注意返回新对象，否则不会触发子元素render更新
                          this._nid2uiMetaMap[_itemNid] = Object.assign(this._nid2uiMetaMap[_itemNid] || {}, newChangeProps); // 更新meta.props确保findUI获取的是更新后的值
                          return newFinalProps;
                      }.bind(this as any, itemUI.nid, itemUI.uikey, this._uikey2LifeMap[itemUI.uikey].onViewObserveStore));
                  }
                  let itemViewProps = Object.assign(itemProps, privateProps);
                  // 存在嵌套事件则采用深度合并，否则只需浅合并，以节省性能开销
                  if (this._uikeyHasNestedEvent[itemUI.uikey]) {
                      itemViewProps = _deepmerge(itemViewProps, itemEvents);
                  } else {
                      itemViewProps = Object.assign(itemViewProps, itemEvents);
                  }
                  // let itemViewProps = Object.assign({}, itemProps, privateProps, itemEvents);
                  let itemView = React.createElement(itemViewComponent, itemViewProps, childView);
                  if (itemView) views.push(itemView);

                  // // 处理视图是否拥有权限
                  // let authInfo = this.isHasAuthorityView({item: itemUI, appCode, pageCode});
                  // if (authInfo.enable) {// 已授权权限
                  //     itemView = React.createElement(UIComponent, itemViewProps, childView);
                  // } else {// 未授权权限
                  //     if (authInfo.viewMode == 'disabled') {// 未授权时显示为禁用
                  //         itemViewProps.roleDisabled = true;
                  //         itemView = React.createElement(UIComponent, itemViewProps, childView);
                  //     } else {// 未授权时不显示
                  //         itemView = null
                  //     }
                  // }
                  // if (itemView) views.push(itemView);
                  // let itemView= <UIComponent {...itemProps} ref={itemUI.nid} key={itemKey} {...itemEvents} children={childView} />;
                  // //解析后的回调事件
                  // if(itemEvents&&_isFunction(itemEvents['onParserAfter'])){
                  //    let _itemView = itemEvents['onParserAfter'].call(that,itemUI,itemView);
                  //    if(_itemView)itemView = _itemView;
                  // }
              } else {// 不存在相关组件解析器则返回包含元数据的空视图组件
                  let emptyView = React.createElement(EmptyView, itemProps);
                  views.push(emptyView);
              }
          }
          return views;
      }

      // // 指定uikey键值的视图组件是否有权限
      // isHasAuthorityView(options: { item: {nid: string;uidisabled: boolean; uitype: any; api: string; uievents: any[]; uikey: string; children: ReactNode}, appCode: string, pageCode: string }) {
      //     // enable-是否有授权权限、viewMode-当没有权限时的显示方式
      //     if (typeof this.props.onViewAuthValidate == 'function') {
      //         return this.props.onViewAuthValidate(options);
      //     } else {
      //         return { enable: true, viewMode: 'hidden' };
      //     }
      // }

      render() {
          let { uiMeta, uiParser, uiEvent } = this.state;
          // 获取解析后的视图
          let viewContent = this._getViewContent({ uiMeta, uiParser, uiEvent });
          if (this._storeScope == 'private') { // 新模式
              if (this._storeCurrent) {
                  return React.createElement(Provider, {store: this._storeCurrent}, viewContent);
              } else {
                  return viewContent;
              }
          } else { // 兼容旧模式
              return React.createElement(Provider, {store: superStore}, viewContent);
          }
      }
}

/**
 * Created by Dio
 * 基于Redux的动作处理
 */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {connect} from 'react-redux';
import thunk from 'redux-thunk';

// 通过dispatch扩展组件props对象属性
function defaultMapDispatchToProps(dispatch:Function) {
    return {
        // 发送一个动作指令
        sendAction: function() {
            // @ts-ignore
            dispatch(ReduxUtils.createAction.apply(this, arguments));
        }
    }
}

type ActionType = {type:string, actionKey:string, actionArgs: any};

const ReduxUtils = {
    // 标识封装的动作指令
    ACTION_KEY: "__REDUX_SEND_ACTION_DATA__",
    // 标识外部未知的动作指令
    UNKNOW_ACTION_KEY: "__REDUX_SEND_ACTION_UNKNOW__",
    // 初始化全局store
    createStore: function(name:string, initialState:any, actions:any) {
        /**
         * 状态容器三个核心方法：
         * subscribe用于监听事件，每当dispatch的时候会执行
         * dispatch用于分发action，这是改变状态容器中state的唯一途径
         * getState获取当前state
         * combineReducers用于将多个reducers合并成一个reducer函数
         * 需要注意的是合并之后每个子reducer只能处理状态容器上其对应的那部分状态
         * 比如counter这个reducer就只能修改store.getState().counter上的状态
         */
        const middleware = applyMiddleware(thunk);
        const createStoreWithMiddleware = compose(middleware);
        const listenActions = ReduxUtils.listen(actions);
        const reducers = {};
        reducers[name] = listenActions;
        // 将所有State组织成一个状态树来进行维护
        const rootReducer = combineReducers(reducers);
        const store = createStoreWithMiddleware(createStore)(rootReducer, initialState);
        return store;
    },
    // 监听接收到的动作
    listen: function(actions:any) {
        return function(state = {}, action:ActionType) {
            if (action.type == ReduxUtils.ACTION_KEY) {
                // 当前动作指令对应的处理函数
                let actionFunc = actions[action.actionKey];
                if (typeof actionFunc == 'function') {
                    // 将当前state和本动作相关的参数传递给动作处理函数
                    let callArgs = [state].concat(action.actionArgs);
                    // 获取动作处理函数返回的新状态
                    let newState = actionFunc.apply(this, callArgs);
                    // 如果动作处理函数无返回结果则返回原始状态，否则返回新状态
                    return newState == undefined ? state : newState;
                } else {
                    return state;
                }
            } else {
                return state;
            }
        }
    },
    /**
     * 将动作与组件进行连接
     * @param reactClass React组件
     * @param mapStateToProps 新状态映射给组件属性的回调函数
     * @param mapDispatchToProps 扩展组件属性的回调函数
     */
    connect: function(reactClass:any, mapStateToProps?:Function, mapDispatchToProps?:Function) {
        // 参数列表connect(mapStateToProps、mapDispatchToProps、mergeProps、options)
        return connect(mapStateToProps, function(dispatch:Function) {
            let _props = defaultMapDispatchToProps(dispatch);
            if (typeof mapDispatchToProps == 'function') {
                _props = Object.assign(_props, mapDispatchToProps(dispatch));
            }
            return _props;
        }, null, {forwardRef: true})(reactClass)
        // 第四个参数支持{forwardRef:true}
        // const ConnectedWrapper = connect(mapStateToProps, mapDispatchToProps || function() {
        //     return {} // 注意：使用空函数是避免dispatch渲染到dom上
        // })(reactClass)
        // return ConnectedWrapper;
    },
    // 创建一个动作指令
    createAction: function(actKey:string, ...actArgs:any) {
        let actionKey = actKey;// 动作指令标识
        if (!actionKey) {
            console.error('调用sendAction方法，需要将动作指令名称{string}作为第一个参数值');
            return {"type": ReduxUtils.UNKNOW_ACTION_KEY};
        }
        // 除动作指令标识以外的其它参数
        let actionArgs = [];
        for (let i = 0;i < actArgs.length;i++) {
            actionArgs.push(actArgs[i]);
        }
        // 构建动作指令包
        let newAction:ActionType = {
            type: ReduxUtils.ACTION_KEY,
            actionKey,
            actionArgs
        };
        return newAction;
    }
};

export default ReduxUtils;

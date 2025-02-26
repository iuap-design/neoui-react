# 动态视图 DynamicView

动态视图组件，根据json数据解析成视图

## API

<!--DynamicView-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| uiMeta| UI视图元数据，格式要求：{"nid":"唯一编码","uitype": "Button","uikey":"","children":[], ...}  | Object | - |
| uiEvent|  UI事件处理器(渲染的视图添加回调方法)，格式要求：{"uikey":{"eventName":Function,...},...} | Object | - |
| uiParser| UI组件解析器，格式要求：{"Button": ButtonComponent, "Layout": LayoutComponent, ...} | Object |空 |
| uiStore| UI组件存储器，格式要求：{name:"",init:{},[actionName]:()=>{}]}，具体见以下示例说明 | Object |空 |

## API结合后端服务
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| appCode| 应用编码| String | 空 |
| pageCode| 页面编码 | String | 空 |


## uiEvent内部支持的生命周期

| 生命周期 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| onViewWillMount| 视图装载前| function | 空 |
| onViewDidMount| 视图装载后 | function | 空 |
| onViewWillUpdate| 视图更新前 | function | 空 |
| onViewDidUpdate| 视图更新后 | function | 空 |
| onViewWillUnmount| 视图卸载前 | function | 空 |
| onViewObserveStore| 视图存储数据更新时，仅当uiStore存在时才生效，用于返回当前props与store状态的映射关系 | function | 空 |

## uiEvent使用说明
- 格式规范要求
```
const myEvent = {
    [uikey]:{
        [eventName]:function(){} //组件支持的自定义事件方法，其中eventName支持"a.b.c"路径格式
        ...
    }
}
```   
- 具体参考示例
```js

const myMeta = {
    "nid": "nid_1000",
    "uitype": "div",
    "uikey": 'div',
    "children": [
        {
            "nid": "nid_1001",
            "uititle": "输入框",
            "uitype": "Input",
            "uikey": 'input0'
        },
        {
            "nid": "nid_1002",
            "uitype": "Button",
            "uikey": 'button0'
        },
        {
            "nid": "nid_1003",
            "uitype": "Table",
            "uikey": 'table0'
        }
    ]
}
const myEvent = {
    "input0":{
        "onChange":function(e){
            console.log('输入框值变化:',e.target.value);
        }
    },
    "button0":{
        "onClick":function(e){
            console.log('按钮被点击',e);
        }
    },
    "table0":{
        /**
         * 针对嵌套的事件属性，例如：pagination:{onChange:function(){}}
         * 需采用"a.b.c"路径写法，见如下示例：
         **/
        "pagination.onChange":function(e){ // 支持嵌套属性的事件绑定 
            console.log('分页切换',e);
        }
    }
}

<DynamicView uiMeta={myMeta} uiEvent={myEvent} />
```

## uiStore使用说明
- 格式规范要求（新规范）
```js
const myStore = {
    "name": "myStore1",         // 必填 ，string 唯一的store存储名
    "initState": {},               // 必填，object|function 初始化store的状态数据
    "actions":{                // 同步更新store状态数据的自定义动作方法
        [actionName]:function(preState,...actionArgs){
            // change you store value ,exp: preState.count++
            return {...preState};
        },
        ...
    },
    "effects":{   // 异步处理store状态数据的自定义副作用方法
        [asyncName]:async function(getStore,...asyncArgs){
            let store = getStore();
            let storeState = store.getState();
            setTimeout(() => {
                store.actions.[actionName](...actionArgs) // 通过 store.actions.xxx() 调用同步action方法更新store状态数据 
            }, 1000)
        }
        ...
    }
}
const myEvent = {
    "uiKey":{
        "onViewDidMount":function(){
            let store = getStore();
            store.effects.[asyncName](...asyncArgs)
        },
        "onClick":function(){
            let store = getStore();
            store.actions.[actionName](...actionArgs)
        },
        "onViewObserveStore":function(preState){
            // 返回 props与store状态的映射关系
            return {
                propName: preState.inputName
            }
        }
    }
}

```   
- 规范使用示例（新规范）
```js

const myStore = {
    "name": "myStore1", // 必填 ，当前store唯一名
    "init": { // 必填，当前store数据初始模型
        "inputValue": "请输入内容",
        "inputStyle":{},
        "data": [{name: 'xxx1', code: 'yyy1', type: 1, dataIndex: 'abc'}]
    },
    //-----以下为自动定义操作更新store模型数据的同步action函数--------
    "actions":{
        "changeInputValue": function(preState, newInput) {
            preState.inputValue = newInput;
            return {...preState};
        },
        "changeInputStyle": function(preState,newInputStyle) {
            preState.inputStyle =  newInputStyle || {background: 'red'};
            return {...preState};
        },
        "changeTableData": function(preState, newData , total) {
            preState.data = newData || []; // 本页数据
            preState.total = total || 0;   // 总记录数
            return {...preState};
        },
    },
    //--------以下为自定义异步更新store模型数据方法--------
    "effects":{
        "asyncLoadData": async function(getStore,otherArgs){
            // 模拟异步请求等待返回表格数据
            let result1 = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    let tableMockData = [{id:'001',name:'行1'},{id:'002',name:'行2'}];
                    resolve(tableMockData);
                }, 1000)
            })
            // 模拟异步请求等待返回表格总记录数
            let result2 = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(999);
                }, 1000)
            })
            let store = getStore();
            // 调用api同步函数更新store数据状态
            store.actions.changeTableData(result1,result2);
        }
    }
}

const myEvent = {
    "myPage":{
        "onViewDidMount":function(){
            let store = this.getStore();
            store.effects.asyncLoadData();
        }  
    },
    "myInput":{
        "onViewObserveStore":function(preState){
            return {
                value: preState.inputValue,
                style: preState.inputStyle
            }
        }
    },
    "myButton":{
        "onClick":function(){
            let store = this.getStore();
            let storeState = store.getState();
            console.log('变更前',storeState);
            store.actions.changeInputValue('这是一个新值'+ new Date().getTime());
            console.log('变更后',storeState);
        }
    }
}

<DynamicView uiStore={myStore} uiEvent={myEvent} />

```

- 格式规范要求（旧规范，不再推荐，以后废弃）

```js
const myStore = {
    "name": "myStore1", // 必填 ，唯一的store存储名
    "init": {},           // 必填，初始化store的状态数据
    //同步 [选填]同步更新store数据暴露的动作方法
    [actionName]:function(rootStore,...args){
        // change you store value
        // rootStore[storeName]
        return {...rootStore};
    }, 
    //异步 [选填]约定键值命名以"async"开头，为异步更新store数据的动作方法
    async[ActionName]:async function(getStore,...args){
        let store = getStore();
        let storeState = store.getState();
        setTimeout(() => {
            store.api.actionName()        // 通过 store.api.xxx() 调用同步action方法更新store数据
        }, 1000)
    }
}
const myEvent = {
    "uiKey":{
        "onViewDidMount":function(){
            let store = getStore();
            store.api.[asyncName](...asyncArgs)
        },
        "onClick":function(){
            let store = getStore();
            store.api.[actionName](...actionArgs)
        },
        "onViewObserveStore":function(rootStore){
            let storeState = rootStore[storeName];
            // 返回 props与store状态的映射关系
            return {
                propName: storeState.inputName
            }
        }
    }
}

```

- 规范使用示例（旧规范用法）
```js

const myStore = {
    "name": "myStore1", // 必填 ，当前store唯一名
    "init": { // 必填，当前store数据初始模型
        "inputValue": "请输入内容",
        "inputStyle":{},
        "data": [{name: 'xxx1', code: 'yyy1', type: 1, dataIndex: 'abc'}]
    },
    //-----以下为自动定义操作更新store模型数据的同步action函数--------
    "changeInputValue": function(rootStore, newInput) {
        rootStore.myStore1.inputValue = newInput;
        return {...rootStore};
    },
    "changeInputStyle": function(rootStore,newInputStyle) {
        rootStore.myStore1.inputStyle =  newInputStyle || {background: 'red'};
        return {...rootStore};
    },
    "changeTableData": function(rootStore, newData , total) {
        rootStore.myStore1.data = newData || []; // 本页数据
        rootStore.myStore1.total = total || 0;   // 总记录数
        return {...rootStore};
    },
    //-----以下为异步更新store模型数据方法，注意"键值"命名以约定的"async"开头------
    "asyncLoadData": async function(getStore,otherArgs){
        // 模拟异步请求等待返回表格数据
        let result1 = await new Promise((resolve, reject) => {
            setTimeout(() => {
                let tableMockData = [{id:'001',name:'行1'},{id:'002',name:'行2'}];
                resolve(tableMockData);
            }, 1000)
        })
        // 模拟异步请求等待返回表格总记录数
        let result2 = await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(999);
            }, 1000)
        })
        let store = getStore();
        // 调用api同步函数更新store数据状态
        store.api.changeTableData(result1,result2);
    }
}

const myEvent = {
    "myPage":{
        "onViewDidMount":function(){
            let store = this.getStore();
            store.api.asyncLoadData();
        }  
    },
    "myInput":{
        "onViewObserveStore":function(preStore){
            return {
                value: preStore.myStore1.inputValue,
                style: preStore.myStore1.inputStyle
            }
        }
    },
    "myButton":{
        "onClick":function(){
            let store = this.getStore();
            let storeState = store.getState();
            console.log('变更前',storeState);
            store.api.changeInputValue('这是一个新值'+ new Date().getTime());
            console.log('变更后',storeState);
        }
    }
}

<DynamicView uiStore={myStore} uiEvent={myEvent} />
```

const delayEvent = async(prop:any, cb:Function, ...cbArgs:any[]) => {
    if (typeof prop != 'function') {
        return cb(...cbArgs);
    }
    const returnProp = prop();
    // 传入了 prop 普通类型的返回 直接调用
    if (!(returnProp instanceof Promise)) {
        return cb(...cbArgs);
    }
    // 返回 promise的情况; 决定是否 阻断 cb 调用
    try {
        const isAllowNext = await returnProp;
        if (isAllowNext === true) {
            return cb(...cbArgs);
        }
        // 不推荐的 业务reject 返回， 所有reject均视为错误
    } catch (error) {
        console.error(error)
    }
}
export default delayEvent

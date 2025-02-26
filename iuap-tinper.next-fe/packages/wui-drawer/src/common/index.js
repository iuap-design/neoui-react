export function bindAll(context, arrFunc) {
    arrFunc.forEach(item => {
        context[item] = context[item].bind(context);
    });
}

export function type(obj) {
    let toString = Object.prototype.toString;
    return toString.call(obj);
}

export function isNumber(obj) {
    return type(obj) == '[object Number]';
}

export function requestAnimationFrame(callback:any) {
    if (window.requestAnimationFrame) {
        window.requestAnimationFrame(callback)
    } else {
        window.setTimeout(callback, 1000 / 60);
    }
}

export function cancelAnimationFrame(id:number) {
    if (window.cancelAnimationFrame) {
        window.cancelAnimationFrame(id)
    } else {
        window.clearTimeout(id)
    }
}

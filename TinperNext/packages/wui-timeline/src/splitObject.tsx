export default function splitObject(obj: Record<string, any>, parts: string[]): any {
    const left : Record<string, any> = {};
    const right: Record<string, any> = {};
    Object.keys(obj).forEach((k) => {
        if (parts.indexOf(k) !== -1) {
            left[k] = obj[k];
        } else {
            right[k] = obj[k];
        }
    });
    return [left, right];
}

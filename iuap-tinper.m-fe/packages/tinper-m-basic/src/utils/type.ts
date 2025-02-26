/**
 * https://stackoverflow.com/a/59187769 Extract the type of an element of an array/tuple without
 * performing indexing
 */
export type ElementOf<T> = T extends (infer E)[] ? E : T extends readonly (infer F)[] ? F : never;


export type OrNull<T> = null | T;

export type Lang = 'zh' | 'zh-cn' | 'zh-tw' | 'en' | 'en-gb' | 'en-us' | 'vi' | 'vi-vn' | string;



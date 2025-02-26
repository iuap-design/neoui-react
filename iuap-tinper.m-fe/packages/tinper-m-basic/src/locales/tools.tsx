import { Uidmap } from './local.map';

export const globalLangs: any = {}

export const mapLangFn = (config: { [key: string]: string }) => {
  if (config.locale) {
    return config
  }
  const middleLocales: { [key: string]: string } = {}
  // 生成 component-key: value 的格式
  Object.entries(config).forEach(([key, value]) => {
    if (Uidmap[key] && typeof Uidmap[key] === 'string') {
      middleLocales[Uidmap[key]] = value
    } else if (Uidmap[key] && Array.isArray(Uidmap[key])) {
      Uidmap[key].forEach((k: string) => {
        middleLocales[k] = value
      })
    }
  })
  return transformArrayToNestedObject(Object.entries(middleLocales))
};

function transformArrayToNestedObject(arr: [string, any][]): any {
  const result: any = {};

  arr.forEach(([keyPathStr, value]) => {
    const keyPath = keyPathStr.split('-');
    let currentLevel = result;

    // 遍历keys数组，将每个key作为路径，构建嵌套对象
    for (let i = 0; i < keyPath.length - 1; i++) {
      const key = keyPath[i];
      if (!currentLevel[key]) {
        currentLevel[key] = {};
      }
      currentLevel = currentLevel[key];
    }

    // 设置最后一个key的值
    const lastKey = keyPath[keyPath.length - 1];
    currentLevel[lastKey] = value;
  });

  return result;
}

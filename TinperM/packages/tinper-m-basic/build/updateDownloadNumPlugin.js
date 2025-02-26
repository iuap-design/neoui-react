const fs = require('fs');
const path = require('path');
class UpdateDownloadNumPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('UpdateDownloadNumPlugin', (compilation, callback) => {
      const code = fs.readFileSync(path.join(process.cwd(), './build/updateDownloadNum.js'), 'utf-8');
      const outputFilePath = this.options.outputFilePath;

      // 读取原有的打包产物内容
      const originalCode = compilation.assets[outputFilePath].source();

      // 合并自定义代码和原有代码
      const mergedCode = originalCode + '\n' + code;

      // 更新打包产物内容
      compilation.assets[outputFilePath] = {
        source: () => mergedCode,
        size: () => mergedCode.length
      };

      callback();
    });
  }
}

module.exports = UpdateDownloadNumPlugin;

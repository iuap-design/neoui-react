const fs = require('fs');
const path = require('path');

// 读取包含多个 <svg> 标签的 JavaScript 文件内容
const fileContent = fs.readFileSync('src/iconfont/iconfont.js', 'utf8');

// 使用正则表达式提取每个 <svg> 标签的内容
const svgRegex = /<symbol[^>]*>[\s\S]*?<\/symbol>/gi;
let match;
let index = 1;

// 创建目录用于存储分离后的 SVG 文件
const outputDir = 'src/icons';
const iconsSrc = []
const icons = []
fs.mkdirSync(outputDir, { recursive: true });

// 迭代匹配所有的 <svg> 标签，并将其内容保存到单独的 SVG 文件中
while ((match = svgRegex.exec(fileContent)) !== null) {
  const svgContent = match[0];
  const {name, content} = convertSymbolToReactComponent(svgContent)
  const svgFileName = `${name}.tsx`;
  const svgFilePath = path.join(outputDir, svgFileName);

  fs.writeFileSync(svgFilePath, content);
  index++;
}

fs.writeFileSync(path.join(outputDir, '/index.tsx'), iconsSrc.join('\n'));
fs.writeFileSync(path.join(outputDir, '/icons.tsx'), `const icons = ${JSON.stringify(icons)};\nexport default icons`);

function convertSymbolToReactComponent(svgCode) {
  const idMatch = svgCode.match(/<symbol\s+id="([^"]+)"/);
  if (!idMatch) {
    throw new Error('Invalid symbol code. Missing id attribute.');
  }

  const id = idMatch[1];
  let componentName = id.replace('arc', '').replace(/-([a-zA-Z])/g, (match, p1) => p1.toUpperCase());
  componentName = componentName.substr(0, 1).toUpperCase() + componentName.substr(1)
  componentName = componentName.replace('-', '')
  iconsSrc.push(`export { default as ${componentName} } from './${componentName}.tsx';`)
  icons.push({
    name: componentName,
    id: id
  })

  // 替换标签名为组件名
  const replacedCode = svgCode.replace(/<symbol/g, `<svg`);
  const replacedEndCode = replacedCode.replace(/<\/symbol/g, `</svg`);

  // 添加 React 的属性和标签
  const reactPropsAddedCode = replacedEndCode.replace(/<([A-Za-z0-9]+)([^>]*)>/g, '<$1 width="0.32rem" height="0.32rem" viewBox="0 0 48 48" fill="currentColor" {...props}$2>');

  // 添加导出语句
  const exportStatement = `import React from 'react'\nexport default function ${componentName}(props) {\n  return ${reactPropsAddedCode};\n}`;

  return {
    name: componentName,
    content: exportStatement
  };
}

console.log('SVG files separated successfully.');

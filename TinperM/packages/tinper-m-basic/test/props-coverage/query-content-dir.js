const fs = require('fs');
const path = require('path');
const readline = require('readline')
const { coverageLog } = require('./table')
const { getFirstLine } = require('./utils')
const util = require('util');
const isWindows =  process.platform === 'win32'
console.log(process.platform)
let attrMap = {
  [path.join(__dirname, "../../src/components/check-list/src/CheckList.tsx")]: [
    "iCheckList.tsx",
    "CheckListProps",
  ],
  [path.join(__dirname, "../../src/components/picker/src/Picker.tsx")]: [
    "iPicker.tsx",
    "PickerProps",
  ],
  [path.join(
    __dirname,
    "../../src/components/input-number/src/InputNumber.tsx"
  )]: ["iInputNumber.tsx", "InputNumberProps"],
  [path.join(__dirname, "../../src/components/dropdown/src/Dropdown.tsx")]: [
    "iDropdown.tsx",
    "DropdownProps",
  ],
  [path.join(__dirname, "../../src/components/stepper/src/Stepper.tsx")]: [
    "iStepper.tsx",
    "StepperPropsCoverage",
  ],
  [path.join(__dirname, "../../src/components/picker-view/src/PickerView.tsx")]:
    ["iPickerView.ts", "PickerViewProps"],
  [path.join(__dirname, "../../src/components/selector/src/Selector.tsx")]: [
    "iSelector.tsx",
    "SelectorPropsCoverage",
  ],
  [path.join(
    __dirname,
    "../../src/components/date-picker-view/src/DatePickerView.tsx"
  )]: ["iDatePickerView.ts", "DatePickerViewProps"],
  [path.join(
    __dirname,
    "../../src/components/cascade-picker/src/CascadePicker.tsx"
  )]: ["iCascadePicker.ts", "CascadePickerProps"],
};
if (process.platform === 'linux') {
  attrMap = { ...attrMap, ...attrLinuxMap }
}
console.log(attrMap)
const readFile = async (filePath, filename, AllProps) => {
  const itemPath = path.join(filePath, filename);
  const firstLine = await getFirstLine(itemPath);
  // readFile方法读取文件内容
  const readFileFn = util.promisify(fs.readFile);

  const data = await readFileFn(itemPath, 'utf8').catch(error => console.log('\x1B[31m', `${filePath} ${filename}`));
  const targetFileName = (firstLine.split('*/')[0].split('/**')[1] || '').trim() ;
  let transferPath = path.resolve(`${filePath.split('__tests__')[0]}src/${targetFileName}`)

  transferPath = transferPath.split('\\').join('/');
  let props = AllProps[transferPath];
  if (!props) {
    console.error('\x1B[31m', `${itemPath} 没有获取到目标文件的 props`)
    process.exit()
  }
  const testedProps = [];
  const noTestProps = [];
  props.forEach(prop => {
    if (!data.includes(`test prop:: ${prop}`)) {
      if (noTestProps.includes(prop)) return;
      noTestProps.push(`${prop}`);
    } else {
      if (testedProps.includes(prop)) return;
      testedProps.push(`${prop}`);
    }
  });
  const componentPath = filePath.split('__tests__')[0].split('/components/')[1] ? filePath.split('__tests__')[0].split('/components/')[1] + targetFileName : `${filePath.split('__tests__')[0].split('src\\components\\')[1]}${targetFileName}`;
  coverageLog(componentPath, testedProps, noTestProps);
}
//  获取 组件 props 的变量名称
const getCompPropName = (line,) => {
  let lineSplitArr
  if (line.includes(' extends Component<')) {
    lineSplitArr = line.split(' extends Component<');
    // 处理propsA<T>
    lineSplitArr = ['', lineSplitArr[1].split('<')[0]];
    //  处理 propsA  && propsB
    lineSplitArr = ['', lineSplitArr[1].split(' ')[0].replace(/,/g, '')];
  } else if (line.includes(' extends React.Component<')) {
    lineSplitArr = line.split(' extends React.Component<');
  } else if (line.includes('React.FC<')) {
    lineSplitArr = ['', line.split('React.FC<')[1].split('>')[0]];
  } else if (line.includes('React.ForwardRefRenderFunction<')) {
    lineSplitArr = line.split('React.ForwardRefRenderFunction<');
    lineSplitArr = lineSplitArr[1].split(',');
  } else if (line.includes('React.forwardRef<')) {
    lineSplitArr = line.split('React.forwardRef<');
    lineSplitArr = ['', lineSplitArr[1].split(', ')[1].split('>')[0]];
  } else if (line.includes('props: Omit<')) {
    lineSplitArr = line.split('props: Omit<');
    lineSplitArr = ['', lineSplitArr[1].split(',')[0]];
  } else if (line.includes('(props: ')) {
    lineSplitArr = line.split('(props: ')
    lineSplitArr = lineSplitArr[1].split(/\)\s+\{/)
    lineSplitArr = [lineSplitArr[1].replace(/\<(.*)\>/,''), lineSplitArr[0]]
  }else if (line.includes('(p: ')) {
    lineSplitArr = line.split('(p: ')
    lineSplitArr = lineSplitArr[1].split(/\)\s+\{/)
    lineSplitArr = [lineSplitArr[1].replace(/\<(.*)\>/,''), lineSplitArr[0]]
  }
  if (lineSplitArr.length <= 1) {
    return;
  }
  let propName = lineSplitArr[1].trim().split('>')[0]
  propName = propName.split(',')[0]
  if (propName.match(/^[a-zA-Z0-9_-]{1,}/)) {
    return propName;
  }
  return '';
}

const getProps = (filePath, filename, AllProps) => {
  let componentPropName = ''
  let  firstSpaceNumber = 0;
  const props = []
  const itemPath = path.join(filePath, filename);
  const lineReader = readline.createInterface({ input: require('fs').createReadStream(itemPath, 'utf8') });
  const mapValue = attrMap[itemPath] || attrMap[filePath];
  // if (itemPath.includes('/CalendarHeader.tsx')) {
  lineReader.on('line', (line) => {
    // 搜索 tsx内关键字
    if (((line.includes('(props: ') || line.includes('(p: ')) && line.includes('function')) ||  line.includes(' extends Component<') || line.includes(' extends React.Component<')  || line.includes('React.FC<') || line.includes('React.ForwardRefRenderFunction<') || (!line.includes('return') && line.includes('React.forwardRef<'))) {
      componentPropName = getCompPropName(line);
    }
    if (mapValue && mapValue[1]) {
      componentPropName = mapValue[1]
    }
  }).on('pause', () => {
    if  (!componentPropName) return
    let propsFileName  = '';
    if (mapValue && mapValue[0]) {
      propsFileName = mapValue[0]
    } else {
      let name1 = filePath.includes('/') ? filePath.split('components/')[1].split('/src')[0] : filePath.split('components\\')[1].split('\\src')[0]
      if (name1.includes('-')) {
        const name1Arr  = name1.split('-');
        name1Arr[1] = name1Arr[1][0].toUpperCase() + name1Arr[1].substring(1);
        name1 =  name1Arr.join('');
      }
      propsFileName  = 'i' + name1[0].toUpperCase() + name1.substring(1) + '.tsx'
    }
	  let interfacePath = path.join(filePath, propsFileName);
    // 由于 Table 组件 src 内部存在 components 文件夹，需要单独处理
    if (propsFileName === 'iTable.tsx') {
      interfacePath = path.join(filePath.replace(/\/components$/, ''), propsFileName)
    }
    const iLinesReader = readline.createInterface({ input: require('fs').createReadStream(interfacePath, 'utf8') });
    let isInPropsLine  = false;
    const propsArr = []
    let count = 0;
    let count1 = 0;
    let hasContent = false
    let hasContent1 = false
    iLinesReader.on('line', (iLine) => {
      // 在 类型文件中检索 props 名称 找到后 向下 继续 找 {}内的属性
      if (iLine.includes(`interface ${componentPropName} `) || iLine.includes(`interface ${componentPropName}<`) || iLine.includes(`type ${componentPropName} `)) {
        // 找到后 开启 向下找寻
        isInPropsLine = true;
      }
      if (isInPropsLine) {

        if (iLine.includes('{')) {
          // 防止 { 和 componentPropName 不在同一行
          hasContent = true
          count ++
        }
        if (iLine.includes('(')) {
          // 防止 { 和 componentPropName 不在同一行
          hasContent1 = true
          count1 ++
        }
        if (iLine.includes(')')) {
          // 防止 { 和 componentPropName 不在同一行
          hasContent1 = false
          count1 --
        }
        if (iLine.includes(':') && !iLine.trim().startsWith('/') && !iLine.trim().startsWith('[') && !iLine.trim().startsWith('*') && hasContent && !count1 && (!firstSpaceNumber ||  firstSpaceNumber === iLine.split(':')[0].trimEnd().split(' ').length)) {
          if (!firstSpaceNumber) {
            firstSpaceNumber = iLine.split(':')[0].trimEnd().split(' ').length;
          }
          propsArr.push(iLine.split(':')[0].trim().split('?')[0])
        }
        if (iLine.includes('}')) {
          count --
        }
        if (count === 0 && hasContent ) {
          firstSpaceNumber = 0
          isInPropsLine = false
        }
      }
    }).on('pause', () => {
		    const transferPath = itemPath.toString().split('\\').join('/');
		    AllProps[transferPath] = propsArr;
    })
  })
}

const dirContentQuery = async (filePath, extension, excludedFolders, AllProps) => {
  const readdirFn = util.promisify(fs.readdir);
  let files;
  try {
    files = await readdirFn(filePath, 'utf8')
  } catch (error) {
    return console.log('error====', error);
  }
  const extensionArr = extension.split('test')
  await files.forEach(async (filename) => {
    //获取当前文件的绝对路径
    const filedir = path.join(filePath, filename);
    try {
      const statFn = util.promisify(fs.stat);

      const stats = await statFn(filedir);
      const isFile = stats.isFile();//是文件
      const isDir = stats.isDirectory();//是文件夹
      if (isFile && path.extname(filename).toLowerCase() === extensionArr[1] && filename.includes(extension)) {
        readFile(filePath, filename, AllProps)
      } else if (isFile && filePath.includes('src') && filePath.includes('src', filePath.indexOf('src') + 1)) {
        getProps(filePath, filename, AllProps)
      }
      if (isDir && !excludedFolders.includes(filename)) {
        dirContentQuery(filedir, extension, excludedFolders, AllProps);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
      }
    } catch (error) {
      console.warn('error1===', error);
    }
  }
  );
}
module.exports = { dirContentQuery }

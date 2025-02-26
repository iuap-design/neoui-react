const fs = require('fs');
const path = require("path");
const readline = require('readline')
const {coverageLog} = require('./table')
const {getFirstLine} = require('./utils')
const util = require('util');
const isWindows =  process.platform === "win32"
console.log(process.platform)
let attrMap = {
    [path.join(__dirname, "../../../packages/wui-input/src/Input.tsx")]: ["iInput.tsx", 'DefaultProps'],
    [path.join(__dirname, "../../../packages/wui-input-number/src/InputNumberGroup.tsx")]: ["iInputNumberGroup.tsx", ''],
    [path.join(__dirname, "../../../packages/wui-button/src/Button.tsx")]: ["", 'BaseButtonProps'],
    [path.join(__dirname, "../../../packages/wui-skeleton/src/Skeleton.tsx")]: ["", 'SkeletonProps'],
    [path.join(__dirname, "../../../packages/wui-datepicker/src")]: ["iPicker.tsx",''],
    [path.join(__dirname, "../../../packages/wui-message/src/Message.tsx")]: ["",'MessageProps'],
    [path.join(__dirname, "../../../packages/wui-select/src/index.tsx")]: ["",'SelectProps'],
    [path.join(__dirname, "../../../packages/wui-list/src/index.tsx")]: ["",'ListProps'],
    [path.join(__dirname, "../../../packages/wui-form/src/FormItem.tsx")]: ["",'FormItemProps'],
}
if (process.platform === "linux") {
    const  attrLinuxMap = {[path.join(__dirname, "../../../packages/wui-autocomplete/src")]: ["iAutoComplete.tsx", ''],
    [path.join(__dirname, "../../../packages/wui-backtop/src")]: ["iBackTop.tsx", ''],
    [path.join(__dirname, "../../../packages/wui-colorpicker/src")]: ["iColorPicker.tsx", ''],
    [path.join(__dirname, "../../../packages/wui-dynamicview/src")]: ["iDynamicView.tsx", ''],
    [path.join(__dirname, "../../../packages/wui-svgicon/src")]: ["iSvgIcon.tsx", ''],
    [path.join(__dirname, "../../../packages/wui-timepicker/src")]: ["iTimePicker.tsx", ''],
    [path.join(__dirname, "../../../packages/wui-treeselect/src")]: ["iTreeSelect.tsx", ''],}
    attrMap = {...attrMap,...attrLinuxMap}
}
console.log(attrMap)
const readFile = async (filePath, filename, AllProps) => {
	const itemPath = path.join(filePath, filename);
	const firstLine = await getFirstLine(itemPath);
	// readFile方法读取文件内容
	const readFileFn = util.promisify(fs.readFile);

  const data = await readFileFn(itemPath, 'utf8').catch(error => console.log('\x1B[31m', `${filePath} ${filename}`));
  const targetFileName = (firstLine.split('*/')[0].split('/**')[1] || '').trim() ;
  if (!targetFileName) {
    const component = filePath.split('next-ui/packages/')[1] && filePath.split('next-ui/packages/')[1].split('/test') && filePath.split('next-ui/packages/')[1].split('/test')[0]
    || (filePath.split('next-ui\\packages\\')[1]&&filePath.split('next-ui\\packages\\')[1].split('\\test') && filePath.split('next-ui\\packages\\')[1].split('\\test')[0])
    return coverageLog(component, ['-'], ['-'])
  }
  let transferPath = path.resolve(`${filePath.split('test')[0]}src/${targetFileName}`)

	transferPath = transferPath.split('\\').join('/');
	let props = AllProps[transferPath];
	if (!props) {
		console.error('\x1B[31m', `${itemPath} 没有获取到目标文件的 props`)
		process.exit()
	}
	const testedProps = [];
	const noTestProps = [];
	props.forEach(prop => {
		if (!data.includes(`test prop:: ${prop}`) && (prop !== 'id' && prop !== 'prefixCls' && prop !== 'clsPrefix' && prop !== 'className')) {
			if (noTestProps.includes(prop)) return;
			noTestProps.push(`${prop}`);
		} else {
			if (testedProps.includes(prop)) return;
			testedProps.push(`${prop}`);
		}
	});
	const componentPath = filePath.split('test')[0].split('/packages/')[1] ? filePath.split('test')[0].split('/packages/')[1] + targetFileName : `${filePath.split('test')[0].split('next-ui\\packages\\')[1]}${targetFileName}`;
    console.log(componentPath)
	coverageLog(componentPath, testedProps, noTestProps);
}
//  获取 组件 props 的变量名称
const getCompPropName = (line,) => {
    let lineSplitArr
    if (line.includes(' extends Component<')) {
        lineSplitArr = line.split(' extends Component<');
        // 处理propsA<T>
        lineSplitArr = ['',lineSplitArr[1].split('<')[0]];
        //  处理 propsA  && propsB
        lineSplitArr = ['',lineSplitArr[1].split(' ')[0]];
    } else if (line.includes(' extends React.Component<')) {
        lineSplitArr = line.split(' extends React.Component<');
    } else if (line.includes('React.FC<')) {
        lineSplitArr = line.split('React.FC<');
    } else if (line.includes('React.ForwardRefRenderFunction<')) {
        lineSplitArr = line.split('React.ForwardRefRenderFunction<');
        lineSplitArr = lineSplitArr[1].split(',');
    } else if (line.includes('React.forwardRef<')) {
        lineSplitArr = line.split('React.forwardRef<');
        lineSplitArr = lineSplitArr[1].split(',');
    }
        // console.log('line', line)
        // console.log('lineSplitArr', lineSplitArr)
        if (lineSplitArr.length <= 1) {
            return;
        }
        let propName = lineSplitArr[1].trim().split('>')[0]
        propName = propName.split(',')[0]
        // console.log('propName =====', propName)
        if (propName.match(/^[a-zA-Z0-9_-]{1,}/)) {
            // props.push(line.split(':')[0].trim());
            return propName;
        }
        return "";
}

const getProps = (filePath, filename, AllProps) => {
    let componentPropName = ""
    let  firstSpaceNumber = 0;
	const props = []
	const itemPath = path.join(filePath, filename);
	const lineReader = readline.createInterface({input: require('fs').createReadStream(itemPath, 'utf8')});
    const mapValue = attrMap[itemPath] || attrMap[filePath];
    // if (itemPath.includes('/CalendarHeader.tsx')) {
	lineReader.on('line', (line) => {
        // 搜索 tsx内关键字
        if (line.includes(' extends Component<') || line.includes(' extends React.Component<')  || line.includes('React.FC<') || line.includes('React.ForwardRefRenderFunction<') || (!line.includes('return')&&line.includes("React.forwardRef<"))) {
            componentPropName = getCompPropName(line);
        }
        if (mapValue && mapValue[1]) {
            componentPropName = mapValue[1]
        }
    }).on('pause', () => {
        
        if  (!componentPropName) return
        let propsFileName  = "";
        if (mapValue && mapValue[0]) {
            propsFileName = mapValue[0]
        } else {
            let name1 = filePath.includes('/') ? filePath.split('/src')[0].split('wui-')[1] : filePath.split('\\src')[0].split('wui-')[1]
            if (name1.includes("-")) {
                const name1Arr  = name1.split('-');
                name1Arr[1] = name1Arr[1][0].toUpperCase() + name1Arr[1].substring(1);
                name1 =  name1Arr.join("");
            }
            propsFileName  = 'i' + name1[0].toUpperCase() + name1.substring(1) + ".tsx"
        }

	    const interfacePath = isWindows ? path.join(filePath.split('\\src')[0], "src", propsFileName) : path.join(filePath.split('/src')[0], "src", propsFileName);
        // console.log('interfacePath',interfacePath, componentPropName, filePath)

        const iLinesReader = readline.createInterface({input: require('fs').createReadStream(interfacePath, 'utf8')});
        let isInPropsLine  = false;
        const propsArr = []
        let count = 0;
        let count1 = 0;
        let hasContent = false
        let hasContent1 = false
        iLinesReader.on('line', (iLine) => {
            // 在 类型文件中检索 props 名称 找到后 向下 继续 找 {}内的属性
            if (iLine.includes(`interface ${componentPropName} `) || iLine.includes(`interface ${componentPropName}<`)) {
                // 找到后 开启 向下找寻
                isInPropsLine = true;
            }
            
            if (isInPropsLine) {
               
                if (iLine.includes("{")) {
                    // 防止 { 和 componentPropName 不在同一行 
                    hasContent = true
                    count ++ 
                }
                if (iLine.includes("(")) {
                    // 防止 { 和 componentPropName 不在同一行 
                    hasContent1 = true
                    count1 ++ 
                }
                if (iLine.includes(")")) {
                    // 防止 { 和 componentPropName 不在同一行 
                    hasContent1 = false
                    count1 --
                }
                if (iLine.includes(":") && !iLine.trim().startsWith("/") && !iLine.trim().startsWith("[") && !iLine.trim().startsWith("*") && hasContent && !count1 && (!firstSpaceNumber ||  firstSpaceNumber === iLine.split(":")[0].trimEnd().split(" ").length)) {
                    if (!firstSpaceNumber) {
                        firstSpaceNumber = iLine.split(":")[0].trimEnd().split(" ").length;
                    }
                    propsArr.push(iLine.split(":")[0].trim().split("?")[0])
                }
                if (iLine.includes("}")) {
                    count --
                }
                if (count === 0 && hasContent ) {
                    firstSpaceNumber = 0
                    isInPropsLine = false
                }

            }
        }).on('pause', () => {
        // if (itemPath.includes('/Table.tsx')) {

            // console.log('componentPropName================2',componentPropName, interfacePath)
        // }
		    const transferPath = itemPath.toString().split('\\').join('/');

		    AllProps[transferPath] = propsArr;
            // if (transferPath.includes('Table.tsx')) {

                // console.log("on pause propsArr ===",AllProps)
            // }
        })
	})

// }

}

const dirContentQuery = async (filePath, extension, excludedFolders, AllProps) => {
	const readdirFn = util.promisify(fs.readdir);
	let files;
	try {
		files = await readdirFn(filePath, 'utf8')
	} catch (error) {
		return console.log('error====',error);
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
					if(['timepicker.test.js','keyboard.test.js'].includes(filename)) return
                    readFile(filePath, filename, AllProps)
				} else if (isFile && filePath.includes('src')) {
					getProps(filePath, filename, AllProps)
				}
				if (isDir && !excludedFolders.includes(filename)) {
					dirContentQuery(filedir, extension, excludedFolders, AllProps);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
				}
			} catch (error) {
				console.warn('error1===',error);
			}
		}
	);
}
module.exports = {
	dirContentQuery
}

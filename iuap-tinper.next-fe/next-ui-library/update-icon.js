// 由于更新图标过于麻烦，写下这个文件一键更新
const fs = require('fs');
const path = require('path');

const rootDirectory = '../'; // 根目录路径

const lib = process.argv[process.argv.length - 1].split('--lib=') && process.argv[process.argv.length-1].split('--lib=')[1] || 'bip';
const isBip = lib === 'bip';

// 查找根目录下bip以'font_2492714' 或 dev以'font_174583'开头的文件夹
fs.readdir(rootDirectory, (err, folders) => {
    if (err) {
        console.error('读取根目录失败:', err);
        return;
    }

    const targetFolder = folders.find((folder) => folder.startsWith(isBip ? 'font_2492714' : 'font_174583'));
    if (!targetFolder) {
        console.log(`未找到以${isBip ? 'font_2492714' : 'font_174583'}开头的文件夹, 检查是否正确解压至根目录`);
        return;
    }

    const folderPath = path.join(rootDirectory, targetFolder);
    const iconFilePath = path.join(rootDirectory, 'packages/wui-core/scss/');
    fs.stat(folderPath, (err, stats) => {
        if (stats.isDirectory()) {
            // 如果是文件夹，处理其中的文件
            console.log(`开始处理${targetFolder}文件夹`);
            updateIcon(folderPath, iconFilePath);
        }
    });
});

function updateIcon(folderPath, iconFilePath) {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('读取文件夹失败:', err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(folderPath, file);
            if (file === 'demo_index.html' || file === 'demo.css' || (isBip && file === 'iconfont.css') || file.endsWith('.ttf') || file.endsWith('.woff2')) {
                // 删除无用文件
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(`删除文件失败: ${file}`, err);
                    } else {
                        console.log(`已删除无用文件: ${file}`);
                    }
                });
            } else if (file.startsWith('iconfont.')) {
                // 如果文件名以'iconfont.'开头，重命名为'iconfont-next.'
                const newFileName = file.replace(/^iconfont\./, isBip ? 'iconfont-next.' : 'iconfont.');
                const newFilePath = path.join(folderPath, newFileName);

                if (file.endsWith('.json')) {
                    const oldData = JSON.parse(fs.readFileSync(path.join(iconFilePath, `${isBip ? 'iconfont-next.' : 'iconfont.'}json`), 'utf-8')).glyphs;
                    const newData = JSON.parse(fs.readFileSync(filePath, 'utf-8')).glyphs;
                    const { addedItems, removedItems } = compareResult(oldData, newData)

                    let nextCss = '';
                    let overrideCss = '';
                    addedItems.forEach(item => {
                        console.log('新增图标', item.font_class, item.name);
                        nextCss += `.uf.uf-${item.font_class}:before {\n    content: "\\${item.unicode}";\n}\n\n`;
                        overrideCss += `,\n.uf.uf-${item.font_class}:before`;
                    });

                    fs.writeFile(path.join(iconFilePath, `${isBip ? 'iconfont-next.' : 'iconfont.'}css`), nextCss, { flag: 'a' }, (err, data) => {
                        if (!err) console.log(`已更新文件: ${isBip ? 'iconfont-next.' : 'iconfont.'}css`);
                    });

                    isBip && fs.readFile(path.join(iconFilePath,  'iconfont-next-override.css'), 'utf-8', (err, data) => {
                        const modifiedContent = data.replace(' {', overrideCss + ' {');
                        fs.writeFileSync(path.join(iconFilePath, 'iconfont-next-override.css'), modifiedContent, 'utf-8');
                        console.log('已更新文件: iconfont-next-override.css');
                    });
                }

                fs.rename(filePath, newFilePath, (err) => {
                    if (err) {
                        console.error('重命名文件失败:', err);
                    } else {
                        const destinationFile = path.join(iconFilePath, newFileName);
                        fs.copyFileSync(newFilePath, destinationFile);
                        console.log(`已重命名和替换文件: ${file} -> ${newFileName}`);
                    }
                });
            }
        });
    });
}

function compareResult(oldData, newData) {
    const oldDataMap = new Map(oldData.map(item => [item.icon_id, item]));
    const addedItems = [];
    const removedItems = [];

    // 找到newData中的新增项
    newData.forEach(newItem => {
        if (!oldDataMap.has(newItem.icon_id)) {
            addedItems.push(newItem);
        } else {
            oldDataMap.delete(newItem.icon_id);
        }
    });

    // 找到oldData中被移除的项
    removedItems.push(...oldDataMap.values());

    return { addedItems, removedItems };
}
const axios = require('axios');
const { changlog } = require('./changelog.js');
const fs = require('fs');
const fetch = require('node-fetch');
const unzipper = require('unzipper');
var path = require('path');

// 目标文件夹
const targetFolder = path.join(__dirname, '../iuap-ucf');
// process.argv 参数
const argv = {};

// branch 默认环境参数
const defaultEnv = {
  snapshot: 'test',
  beta: 'daily',
  // 'release': 'pre',
};

function CopyDirectory(src, dest) {
  if (dest.indexOf('GIT_CH') === -1 && dest.indexOf('coverage') === -1 && !fs.existsSync(dest.slice(0, -'/bundle'.length))) {
    fs.mkdirSync(dest.slice(0, -'/bundle'.length));
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
  } else if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }
  const dirs = fs.readdirSync(src);
  dirs.forEach(function (item) {
    const itemPath = path.join(src, item);
    const temp = fs.statSync(itemPath);
    if (temp.isFile()) { // 是文件
      fs.copyFileSync(itemPath, path.join(dest, item));
    } else if (temp.isDirectory()) {
      CopyDirectory(itemPath + '/', path.join(dest, item));
    }
  });
}

const downloadAndUnzip = async (url, id, downloadFilePath) => {
  const localZip = path.join(__dirname, 'downloadedFile.zip');
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }
  try {
    const { data } = await axios({ method: 'get', url, responseType: 'stream' });
    // 创建写入流，将下载的ZIP文件保存到本地, 然后创建读取流，解压ZIP文件到目标文件夹
    data.pipe(fs.createWriteStream(localZip)).on('close', () => {
      fs.createReadStream(localZip).pipe(unzipper.Extract({ path: targetFolder }))
        .on('finish', () => {
          console.info('ZIP文件下载并解压完成。');
          // 删除下载的ZIP文件
          fs.unlinkSync(localZip);
          // 拷贝文件夹到指定目录
          setTimeout(() => {
            CopyDirectory(path.join(targetFolder, `${id}/${downloadFilePath}`), path.join(__dirname, '../lib/bundle'))
            if (fs.existsSync(path.join(__dirname, '../lib/bundle/coverage'))) {
              // 如果存在，则删除文件夹及其内容
              fs.rmdirSync(path.join(__dirname, '../lib/bundle/coverage'), { recursive: true });
              console.info('coverage文件夹删除成功');
            } else {
              console.info('coverage文件夹不存在');
            }
            if (fs.existsSync(path.join(__dirname, '../lib/bundle/cy-coverage'))) {
              // 如果存在，则删除文件夹及其内容
              fs.rmdirSync(path.join(__dirname, '../lib/bundle/cy-coverage'), { recursive: true });
              console.info('cy-coverage文件夹删除成功');
            } else {
              console.info('cy-coverage文件夹不存在');
            }
            console.info('成功拷贝文件到指定目录。', path.join(__dirname, '../lib/bundle'));
          }, 1000);
          // getChanglog();
        })
        .on('error', (error) => {
          console.error('解压过程中发生错误:', error);
        });
    });
  } catch (error) {
    console.error('下载过程中发生错误:', error);
  }

};

let pollingTimer;

async function getFiles(downloadFilePath) {
  const url = '';
  const fetchDataFromServer = async (id) => {
    const data = await fetch(``)
      .then(response => response.json())
      .catch(error => {
        // 处理请求错误
        console.error('Error fetching data:', error);
      });
    if (data && data.data[0] && data.data[0].status == 'done') {
      console.info('=======资源压缩包下载成功=========');
      console.info('=======开始解压拷贝=========');
      const url = `${data.data[0].cdn}/static/ucf-download/${data.data[0].id}.zip`;
      downloadAndUnzip(url, data.data[0].id, downloadFilePath);
      // eslint-disable-next-line no-undef
      clearInterval(pollingTimer);
    }
  }
  // 获取cdn 资源, 返回下载任务的id, 根据任务id轮询下载任务
  console.info('=======开始下载cdn资源=========')
  const res = await axios.post(url, {
    downloadFiles: [downloadFilePath],
    env: 'online' // 只有一个环境，值为'test'
  }, {
    headers: {
      AccessKey: 'c7eJ5y43QKXrLF41',
      AccessSecret: 'QUVG1lJHpFYN0lVFR4hsN84cN2njo3zx'
    }
  });
  if (res && res.data && res.data.task_id) {
    pollingTimer = setInterval(() => {
      fetchDataFromServer(res.data.task_id);
    }, 2000);
  }
}

const branchMap = {
  develop: 'snapshot',
  beta: 'beta',
  release: 'release',
}
const ucfPublish = () => {
  // 获取branch snapshot/beta/release
  const branchReg = new RegExp('-branch=([a-z]*)');
  // 获取版本号 例如 beta/4.6.0
  const versionReg = new RegExp('-version=(.*)');
  // 获取环境参数，test/daily/pre
  const envReg = new RegExp('-env=([a-z]*)');
  console.info('process.argv====', process.argv)
  process.argv.forEach(arg => {
    if (branchReg.test(arg)) {
      argv.branch = branchReg.exec(arg)[1];
      if (argv.branch) argv.env = defaultEnv[argv.branch];
    }
    if (envReg.test(arg)) {
      argv.env = envReg.exec(arg)[1];
    }
    if (versionReg.test(arg)) {
      argv.version = versionReg.exec(arg)[1];
    }
  });
  if (argv.version) {
    argv.currentVersion = argv.version;
    console.log('======当前版本======', argv.version);
    getFiles(`static/tinper-m/${argv.version}/`)
  } else {
    axios(').then(res => {
      const currentVersion = branchMap[argv.branch] ? res.data['dist-tags'][branchMap[argv.branch]] : argv.branch;
      argv.currentVersion = currentVersion;
      console.log('======当前版本======', currentVersion);
      getFiles(`static/tinper-m/${currentVersion}/`)
    })
  }

}

ucfPublish()

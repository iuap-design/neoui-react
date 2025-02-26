const fs = require('fs')
const path = require('path')
const pkg = require('../package.json')
const fetch = require('node-fetch');
const formData = require('form-data');
const axios = require('axios');
const version = pkg.version;
const gitContent = require('./gitversion.js');

function getFileArr(_path, arr) {
  if (!fs.existsSync(_path)) {
    console.error('coverage 查找不到，请查看');
    return
  }
  const files = fs.readdirSync(_path);
  files.map(item => {
    const filePath = path.join(_path, item)
    if (fs.statSync(filePath).isDirectory()) {
      getFileArr(filePath, arr)
    } else {
      arr.push('./' + filePath)
    }
  })
}

function fetchJFrog({ method, url, data }) {
  return axios({
    method,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
    },
    url,
    data: method !== 'get' ? data : undefined,
    params: method === 'get' ? data : undefined,
  }).then(res => res.data).catch(err => console.log(err, 333))
}

async function main() {
  const data = {
    path: '@tinper/m/-/@tinper/m-' + version + '.tgz',
    permDelete: true,
    repoKey: 'ynpm-private',
  }
  const result = await fetchJFrog({
    url: '',
    data,
    method: 'post'
  })
  console.log(result)
}

main()



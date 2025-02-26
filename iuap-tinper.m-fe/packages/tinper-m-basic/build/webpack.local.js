/**
 * 专属化分支使用
 */
const webpack = require('webpack');
const { merge } = require('webpack-merge')
const fs = require('fs');
const config = require('./webpack.prod')
const path = require('path');
const gitversion = require('../script/gitversion');

const banner = `FileName: [file]
Branch: ${gitversion.gitBranch}
Commitid: ${gitversion.commitId}
Modified Time: ${new Date()}
Copyright (c) yonyou, Inc. and its affiliates.`

let bannerPluginIndex

config.plugins.forEach((plugin, index) => {
  if(plugin.name === 'BannerPlugin'){
    bannerPluginIndex = index
  }
})

config.plugins.splice(bannerPluginIndex, 1)


module.exports = merge(config, {
  plugins: [
    new webpack.BannerPlugin({ banner: banner }),
    {
      apply: (complier) => {
        complier.hooks.afterEmit.tap('AfterEmitPlugin', complation => {
          if (fs.existsSync(path.join(__dirname, '../lib/bundle/coverage'))) {
            fs.rmdirSync(path.join(__dirname, '../lib/bundle/coverage'), { recursive: true });
            console.info('coverage文件夹删除成功');
          } else {
            console.info('coverage文件夹不存在');
          }
        })
      }
    }
  ]
})


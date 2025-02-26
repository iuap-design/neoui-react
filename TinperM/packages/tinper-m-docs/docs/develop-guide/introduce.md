---
nav: basic-components
group:
  title: 开发指南
  order: 0
order: 1
title: 介绍
toc: content
---
# TinperM
TinperM是一套基于 Yon Design 设计体系的 React 移动端组件库，为复杂移动应用的快速开发提供一致性移动UI解决方案，也是用友BIP产品一致使用的移动UI设计规范的实现
## 关键特性 
* 体积小，运行快，开箱即用的高质量 React 组件 
* 遵循BIP(商业创新平台)的UE设计规范
* 支持DTS变量体系，可实现主题定制及换肤能力
* 详细的文档+示例的友好使用体验，提供友好易用的API文档  
* 使用 TypeScript 编写，提供完整的类型定义  
* 组件属性单元测试覆盖率超过 95%，提供稳定性保障  
* 支持RPA自动化测试  
* 支持多格式、多时区、国际化以及多语扩展

## 兼容性
* iOS 12.0+
* Android 8.0+

## TinperM响应式适配
TinperM的响应式适配是指组件能够适应不同尺寸和分辨率的设备，以提供一致的用户体验。  
  
移动端常用单位说明：  
 * px：像素大小，固定值
 * %：百分比
 * em（不常用）：相对自身的font大小（当自身的字体大小也是em做单位时，才会以父元素的字体大小为基准单位）
 * rem（移动端主流）：相对根节点(html)的font大小
 * vw（视口宽度）：相对视口宽度比例，1vw相当于视口宽度的百分之一
 * vh（视口高度）：相对视口高度比例，1vh相当于视口高度的百分之一

TinperM采用rem为单位，以屏幕宽度375位基准，根节点html的font-size为50px，即1rem=50px进行计算。  

下面这个方法是根据设备和浏览器类型以及窗口大小动态调整页面的字体大小和视口设置，以实现跨设备的一致性体验。仅供参考。

```javascript
function (baseFontSize, psdWidth) {
  var _baseFontSize = baseFontSize || 100;
  var _psdWidth = psdWidth || 750;

  var doc = win.document;
  var ua = navigator.userAgent;
  var matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
  var UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
  var isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
  var isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
  var dpr = win.devicePixelRatio || 1;
  var docEl = doc.documentElement;
  // 为了消除安卓dpr乱标的比例
  var rate = 1;
  var scale = 1 / dpr;
  if (isIos) {
    // iOS下不用做什么
  } else if (matches && matches[1] > 534 || isUCHd) {
    // 有些兼容环境下, fontSize为100px的时候, 结果1rem=86px; 需要纠正viewport;
    docEl.style.fontSize = _baseFontSize + 'px';
    var div = doc.createElement('div');
    div.setAttribute('style', 'width: 1rem;display:none');
    docEl.appendChild(div);
    var trueWidth = win.getComputedStyle(div).width;
    docEl.removeChild(div);
    // 如果1rem的真实px跟html.fontSize不符. 那么就要加一个rate缩放了;
    if (trueWidth !== docEl.style.fontSize) {
      var trueWidthVal = parseInt(trueWidth, 10);
      rate = _baseFontSize / trueWidthVal;
      scale = scale * rate;
    }
  } else {
    // 如果是在PC或者安卓4.3(会闪屏)以下, 则正常展现.
    scale = 1;
  }

  var metaEl = doc.querySelector('meta[name="viewport"]');
  if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    doc.head.appendChild(metaEl);
  }
  metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',viewport-fit=cover');

  // width/750*100, 为了统一rem为0.01rem = 1px
  var setFontSize = function setFontSize() {
    docEl.style.fontSize = _baseFontSize / _psdWidth * docEl.clientWidth * rate + 'px';
  };
  setFontSize();
  win.addEventListener('resize', setFontSize);
};
```

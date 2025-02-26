# bee-animate

[![npm version](https://img.shields.io/npm/v/bee-animate.svg)](https://www.npmjs.com/package/bee-animate)
[![Build Status](https://img.shields.io/travis/tinper-bee/generator-tinper-bee/master.svg)](https://travis-ci.org/tinper-bee/bee-animate)
[![devDependency Status](https://img.shields.io/david/dev/tinper-bee/bee-animate.svg)](https://david-dm.org/tinper-bee/bee-animate#info=devDependencies)

react bee-animate component for tinper-bee

- transitionName 作为定义的动画名称，也是我们定义css动画样式的一部分。

```
//css
.move-enter, .move-appear {
  opacity: 0;
  animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  animation-duration: 2.5s;
  animation-fill-mode: both;
  animation-play-state: paused;
}

.move-leave {
  animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  animation-duration: .5s;
  animation-fill-mode: both;
  animation-play-state: paused;
}

.move-enter.move-enter-active, .move-appear.move-enter-active {
  animation-name: moveLeftIn;
  animation-play-state: running;
}

.move-leave.move-leave-active {
  animation-name: moveRightOut;
  animation-play-state: running;
}

@keyframes moveLeftIn {
  0% {
    transform-origin: 0 0;
    transform: translateX(30px);
    opacity: 0;
    background: #f5f5f5;
  }
  20% {
    transform-origin: 0 0;
    transform: translateX(0);
    opacity: 1;
  }
  80%{
    background: #eee;
  }
  100%{
    background: transparent;
    opacity: 1;
  }
}

@keyframes moveRightOut {
  0% {
    transform-origin: 0 0;
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform-origin: 0 0;
    transform: translateX(-30px);
    opacity: 0;
  }
}

//js

return (
    <Animate transitionName="move" />
)

```

- animation

Animate组件默认使用css3动画，当css3动画不兼容时，调用用户传入的animation对象来操作元素或是产生动画。

```
let animation = {
    /**
     * @param node 当前dom元素
     * @param callback 相应的回掉函数
     */
    enter: function(node, callback){
            //一些操作
            return {
                    stop:function(){

                      $(node).stop(true);
                    }
                  };
    },
    appear: function(node, callback){
            //一些操作
            return {
                    stop:function(){

                      $(node).stop(true);
                    }
                  };
    },
    leave: function(node, callback){
            //一些操作
            return {
                    stop:function(){

                      $(node).stop(true);
                    }
                  };
    }
}

return (
    <Animate animation={animation} />
)

```

## API

动画组件存在三个状态`enter`、`appear`、`leave`

|参数|说明|类型|默认值|
|:--|:---:|:--:|---:|
|component|动画最外层元素|ReactElement|span|
|animation|当不支持css3动画时，调用animation| Object |{}|
|transitionName|动画名称| String \| Object|
|transitionEnter|是否支持进入状态| Boolean|true|
|transitionLeave|是否支持离开状态| Boolean|true|
|transitionAppear|是否支持停留状态| Boolean|false|
|exclusive|多个子元素是否独立动画| Boolean|
|onEnd|结束时的回调函数| 函数||
|onEnter|开始时的回调函数| 函数|
|onLeave|离开时的回调函数| 函数|
|onAppear|停留时的回调函数| 函数|
|showProp|通过制定props设置子元素是否显示| String|

#### 开发调试

```sh
$ git clone https://github.com/tinper-bee/bee-animate
$ cd bee-animate
$ npm install
$ npm run dev
```

---
nav: basic-components
group:
  title: 开发指南
  order: 0
order: 4
title: 主题定制
toc: content
---
# 主题定制
## 主题颜色定制
TinperM设计规范和技术上支持灵活的样式定制，以满足业务和品牌上多样化的视觉需求，包括全局和指定组件的视觉定制。

从1.0.3版本开始，TinperM内置了一套暗黑模式的主题，只需要在页面的 html 标签上设置属性 data-prefers-color-scheme="dark" 即可启用。 

如果需要动态控制深色模式的切换，或者是不能直接控制 html 标签，那么可以使用 js 来设置属性：
```js
document.documentElement.setAttribute(
  'data-prefers-color-scheme',
  'dark'
)
``` 

## 深色与亮色(默认)DTS变量默认值对照

| 变量             | 默认值(深色)       | 默认值(亮色)        |
| :-------------: | :---------------: | :---------------: |
| --mui-color-primary | #EE2233       | #EE2233           |
| --mui-color-success | #299E46        | #299E46           |
| --mui-color-warning | #CC7700         | #E68600           |
| --mui-color-danger  | #DB0B00         | #F50C00           | 
| --mui-color-info    | #007AFF          | #006FE6           | 
| --mui-color-text    | #B6B6B6             | #404040              | 
| --mui-color-title-text | #DEDEDE          | #171717             | 
| --mui-color-text-secondary | #868686          | #737373             | 
| --mui-color-weak   | #666666          | #BFBFBF             | 
| --mui-color-light | #3B3C3F          | #E5E5E5             | 
| --mui-color-border | #212225          | #F5F5F5             | 
| --mui-color-background-lower | #121518          | #F5F5F5             | 
| --mui-color-background | #1B1D21          | #FFFFFF             | 
| --mui-color-background-higher | #3B3C3F          | #FFFFFF             | 
| --mui-color-highlight | #DB0B00          | #F50C00             | 
| --mui-color-white | #FFFFFF          | #FFFFFF             | 
| --mui-color-primary-text | #FFECEE          | #EE2233             | 
| --mui-color-fill-content | #212225          | #F5F5F5             | 
| --mui-border-color | #212225          | #F5F5F5             | 
| --ynfm-color-icon-stroke-btn                 | #DEDEDE       | #171717 |
| --ynfm-color-icon-stroke-btn-pressed         | #FAFAFA       | #111111 |
| --ynfm-color-icon-imageuploader              | #94a3b8       | #475569 |
| --ynfm-color-bg-mask-imageuploader           | #111111       | #171717 |
| --ynfm-color-text-stroke-btn-pressed         | #FAFAFA       | #111111 |
| --ynfm-color-text-textbtn                    | #DEDEDE       | #171717 |
| --ynfm-color-icon-iconbtn                    | #FAFAFA       | #111111 |
| --ynfm-color-text-input                      | #dedede       | #171717 |
| --ynfm-color-bg-avatar                       | #5F0003       | #FFE7E8 |
| --ynfm-color-text-input-readonly             | #dedede       | #171717 |
| --ynfm-color-text-cell-calendar              | #DEDEDE       | #171717 |
| --ynfm-color-icon-clear-input                | #666666       | #BFBFBF |
| --ynfm-color-icon-input                      | #666666       | #BFBFBF |
| --ynfm-color-divider-formitemwrapper         | #212225       | #F5F5F5 |
| --ynfm-color-bg-formitemwrapper-disabled     | #1B1D21       | #FFFFFF |
| --ynfm-color-text-title-formitemwrapper-readonly | #B6B6B6     | #404040 |
| --ynfm-color-text-title-calendar             | #DEDEDE       | #171717 |
| --ynfm-color-text-textbtn-navbar             | #DEDEDE       | #171717 |
| --ynfm-color-icon-clear-textarea             | #666666       | #BFBFBF |
| --ynfm-color-bg-form                         | #1b1d21       | #FFFFFF |
| --ynfm-color-text-title-navbar               | #DEDEDE       | #171717 |
| --ynfm-color-icon-iconbtn-navbar             | #DEDEDE       | #171717 |
| --ynfm-color-text-title-modal                | #DEDEDE       | #171717 |
| --ynfm-color-text-content-dialog             | #DEDEDE       | #171717 |
| --ynfm-color-text-title-dialog               | #DEDEDE       | #171717 |
| --ynfm-color-text-list-cascaderview          | #DEDEDE       | #171717 |
| --ynfm-color-text-tab-cascaderview           | #DEDEDE       | #171717 |
| --ynfm-color-text-tab-cascaderview-selected  | #DEDEDE       | #171717 |
| --ynfm-color-text-clearback-picker           | #DB0B00       | #ed0c0c |
| --ynfm-color-text-btn-searchbar              | #DEDEDE       | #171717 |
| --ynfm-color-text-content-searchbar          | #DEDEDE       | #171717 |
| --ynfm-color-text-selector                   | #DEDEDE       | #171717 |
| --ynfm-color-text-tag-selector               | #DEDEDE       | #171717 |
| --ynfm-color-text-textarea                   | #dedede       | #171717 |
| --ynfm-color-text-textarea-readonly          | #dedede       | #171717 |
| --ynfm-color-bg-title-indexbar               | #121518       | #F5F5F5 |
| --ynfm-color-text-tab-selected               | #DEDEDE       | #171717 |
| --ynfm-color-text-content-list               | #DEDEDE       | #171717 |
| --ynfm-color-text-actionsheet                | #dedede       | #171717 |
| --ynfm-color-text-dropdown                   | #dedede       | #171717 |
| --ynfm-color-text-tag-selector-selected      | #FFE7E8       | #EE2233 |
| --ynfm-color-text-textbtn-pressed            | #E5E5E5       | #555555 |
| --ynfm-color-icon-iconbtn-pressed            | #E5E5E5       | #555555 |
| --ynfm-color-icon-empty                      | #E5E5E5       | #555555 |
| --ynfm-color-text-content-empty              | #B6B6B6       | #404040 |
| --ynfm-color-text-secondarybtn-modal         | #E5E5E5       | #555555 |
| --ynfm-color-text-primarybtn-dialog          | #B6B6B6       | #404040 |
| --ynfm-color-text-marktext-slider            | #B6B6B6       | #404040 |
| --ynfm-color-text-title-formitemwrapper      | #B6B6B6       | #404040 |
| --ynfm-color-text-input-stepper              | #B6B6B6       | #404040 |
| --ynfm-color-icon-left-button-stepper        | #B6B6B6       | #404040 |
| --ynfm-color-icon-right-button-stepper       | #B6B6B6       | #404040 |
| --ynfm-color-icon-stroke-btn-disabled        | #A3A3A3       | #888888 |
| --ynfm-color-text-stroke-btn-disabled        | #A3A3A3       | #888888 |
| --ynfm-color-text-input-disabled             | #868686       | #737373 |
| --ynfm-color-text-hint-cell-calendar         | #868686       | #737373 |
| --ynfm-color-text-subtitle-navbar            | #B6B6B6       | #404040 |
| --ynfm-color-icon-closed-panel-modal         | #94A3B8       | #475569 |
| --ynfm-color-text-list-cascaderview-disabled | #868686       | #737373 |
| --ynfm-color-text-selector-disabled          | #868686       | #737373 |
| --ynfm-color-text-count-textarea             | #868686       | #737373 |
| --ynfm-color-text-textarea-disabled          | #868686       | #737373 |
| --ynfm-color-text-title-formitemwrapper-disabled | #868686    | #737373 |
| --ynfm-color-icon-item-tabbar                | #868686       | #737373 |
| --ynfm-color-text-item-tabbar                | #868686       | #737373 |
| --ynfm-color-text-describe-list              | #868686       | #737373 |
| --ynfm-color-text-actionsheet-disable        | #868686       | #737373 |
| --ynfm-color-text-placeholder-input          | #666666       | #BFBFBF |
| --ynfm-color-text-cell-calendar-disabled     | #666666       | #BFBFBF |
| --ynfm-color-text-magnitude-inputnumber      | #94a3b8       | #475569 |
| --ynfm-color-bg-magnitude-inputnumber        | #3b3c3f       | #E5E5E5 |
| --ynfm-color-text-weekmark-cell-calendar     | #666666       | #BFBFBF |
| --ynfm-color-icon-prefixicon-searchbar       | #666666       | #BFBFBF |
| --ynfm-color-text-placeholder-searchbar      | #666666       | #BFBFBF |
| --ynfm-color-border-selector                 | #3B3C3F       | #E5E5E5 |
| --ynfm-color-text-placeholder-textarea       | #666666       | #BFBFBF |
| --ynfm-color-border-stroke-btn-pressed       | #525252       | #D0D0D0 |
| --ynfm-color-text-fill-btn-disabled | #262626 | #F0F0F0 |
| --ynfm-color-border-stroke-btn-disabled | #262626 | #F0F0F0 |
| --ynfm-color-bg-selector-selected-disabled | #212225 | #F5F5F5 |
| --ynfm-color-border-bottom-form | #212225 | #F5F5F5 |
| --ynfm-color-border-divider-form | #212225 | #F5F5F5 |
| --ynfm-color-border-top-form | #212225 | #F5F5F5 |
| --ynfm-color-border-cell-pickerview | #212225 | #F5F5F5 |
| --ynfm-color-border-weekmark-calendar | #212225 | #F5F5F5 |
| --ynfm-color-border-content-dialog | #212225 | #F5F5F5 |
| --ynfm-color-border-tab-cascaderview | #212225 | #F5F5F5 |
| --ynfm-color-border-input | #262626 | #F0F0F0 |
| --ynfm-color-bg-switch-closed-disabled | #262626 | #F0F0F0 |
| --ynfm-color-bg-tag-selector | #121518 | #F5F5F5 |
| --ynfm-color-bg-track-progressbar | #3B3C3F | #E5E5E5 |
| --ynfm-color-bg-list-pressed | #1B1D21 | #FFFFFF |
| --ynfm-color-border-bottom-list | #212225 | #F5F5F5 |
| --ynfm-color-border-items-list | #212225 | #F5F5F5 |
| --ynfm-color-bg-tag-selector-selected | #5F0003 | #FFE7E8 |
| --ynfm-color-border-top-list | #212225 | #F5F5F5 |
| --ynfm-color-border-divider-actionsheet | #212225 | #F5F5F5 |
| --ynfm-color-bg-input-stepper | #121518 | #F5F5F5 |
| --ynfm-color-bg-left-button-stepper | #121518 | #F5F5F5 |
| --ynfm-color-bg-right-button-stepper | #121518 | #F5F5F5 |
| --ynfm-color-bg-stroke-btn-pressed | #171717 | #F9F9F9 |
| --ynfm-color-bg-iconbtn-pressed | #171717 |  #F9F9F9 |
| --ynfm-color-bg-gap-actionsheet | #121518 | #F5F5F5 |
| --ynfm-color-icon-fill-btn-disabled | #000000 | #FFFFFF |
| --ynfm-color-icon-fill-btn-pressed | #000000 | #FFFFFF |
| --ynfm-color-text-fill-btn-pressed | #000000 | #FFFFFF |
| --ynfm-color-bg-stroke-btn-disabled | #000000 | #FFFFFF |
| --ynfm-color-text-inverse-stroke-btn | #000000 | #FFFFFF |
| --ynfm-color-bg-iconbtn | #000000 | #FFFFFF |
| --ynfm-color-bg-actionsheet | #1B1D21 | #FFFFFF
| --ynfm-color-text-discribe-actionsheet | #B6B6B6 | #404040 |
| --ynfm-color-bg-iconbtn-disabled | #000000 | #FFFFFF |
| --ynfm-color-icon-inverse-iconbtn | #000000 | #FFFFFF |
| --ynfm-color-icon-fixedbtn | #000000 | #FFFFFF |
| --ynfm-color-icon-fixedbtn-disabled | #000000 | #FFFFFF |
| --ynfm-color-icon-fixedbtn-pressed | #000000 | #FFFFFF |
| --ynfm-color-text-fixedbtn | #000000 | #FFFFFF |
| --ynfm-color-text-fixedbtn-disabled | #000000 | #FFFFFF |
| --ynfm-color-text-fixedbtn-pressed | #000000 | #FFFFFF |
| --ynfm-color-bg-input-readonly | #1B1D21 | #FFFFFF |
| --ynfm-color-bg-input-disabled | #1B1D21 | #FFFFFF |
| --ynfm-color-text-cell-calendar-selected | #FFFFFF | #FFFFFF |
| --ynfm-color-text-title-dark-navbar | #000000 | #FFFFFF |
| --ynfm-color-text-textbtn-dark-navbar | #000000 | #FFFFFF |
| --ynfm-color-icon-iconbtn-dark-navbar | #000000 | #FFFFFF |
| --ynfm-color-text-subtitle-dark-navbar | #000000 | #FFFFFF |
| --ynfm-color-bg-navbar | #1B1D21 | #FFFFFF |
| --ynfm-color-bg-modal | #1b1d21 | #FFFFFF |
| --ynfm-color-border-selector-disabled | #3B3C3F | #E5E5E5 |
| --ynfm-color-bg-secondarybtn-modal | #000000 | #FFFFFF |
| --ynfm-color-bg-input-timerangepicker | #121518 | #F5F5F5 |
| --ynfm-color-bg-input-timerangepicker-selected | #5F0003 | #FFE7E8 |
| --ynfm-color-text-input-timerangepicker | #DEDEDE | #171717 |
| --ynfm-color-text-input-timerangepicker-selected | #FFE7E8 | #EE2233 |
| --ynfm-color-text-primarybtn-modal | #000000 | #FFFFFF |
| --ynfm-color-icon-imageviewer | #000000 | #FFFFFF |
| --ynfm-color-text-indicator-imageviewer | #000000 | #FFFFFF |
| --ynfm-color-bg-dialog | #1B1D21 | #FFFFFF |
| --ynfm-color-bg-toolbar | #1B1D21 | #FFFFFF |
| --ynfm-color-bg-second-btn-modal | #1B1D21 | #FFFFFF |
| --ynfm-background-popover | #000000 | #FFFFFF |
| --ynfm-color-bg-formitemwrapper | #1B1D21 | #FFFFFF |
| --ynfm-color-text-loading | #B6B6B6 | #404040 |
| --ynfm-color-border-inner-stepper | #121518 | #F5F5F5 |
| --ynfm-color-border-left-button-stepper | #121518 | #F5F5F5 |
| --ynfm-color-border-right-button-stepper | #121518 | #F5F5F5 |
| --ynfm-color-border-stepper | #121518 | #F5F5F5 |
| --ynfm-color-border-stepper-actived | #121518 | #F5F5F5 |
| --ynfm-color-icon-formitemwrapper | #666666 | #BFBFBF |
| --ynfm-color-border-second-btn-modal | #3B3C3F | #E5E5E5 |
| --ynfm-color-text-secondbt-modal | #DEDEDE | #171717 |
| --ynfm-color-bg-list | #1B1D21 | #FFFFFF |
| --ynfm-color-icon-rate | #3B3C3F | #E5E5E5 |
| --ynfm-color-icon-left-list | #DEDEDE | #171717 |
| --ynfm-color-text-progressbar | #DEDEDE | #171717 |
| --ynfm-color-icon-right-list | #666666 | #BFBFBF |
| --ynfm-color-text-content-list-disabled | #868686 | #737373 |
| --ynfm-color-text-describe-input | #868686 | #737373 |
| --ynfm-color-icon-dropdown | #94A3B8 | #475569 |
| --ynfm-color-bg-notice | #1b1d21 | #FFFFFF |
| --ynfm-color-border-notice | #1b1d21 | #FFFFFF |
| --ynfm-color-icon-textbtn | #DEDEDE | #171717 |
| --ynfm-color-text-texttag | #DEDEDE | #171717 |
| --ynfm-color-border-stroke-tag | #DEDEDE | #171717 |
| --ynfm-color-icon-stroke-tag | #DEDEDE | #171717 |
| --ynfm-color-text-stroke-tag | #DEDEDE | #171717 |
| --ynfm-color-icon-clear-stroke-tag | #DEDEDE | #171717 |
| --ynfm-color-text-stamp-tag                  | #DEDEDE          | #171717 |
| --ynfm-color-icon-stamp-tag                  | #DEDEDE          | #171717 |
| --ynfm-color-cursor-input                    | #007AFF          | #006FE6 |
| --ynfm-color-cursor-searchbar                | #007AFF          | #006FE6 |
| --ynfm-color-cursor-textarea                 | #007AFF          | #006FE6 |
| --ynfm-color-bg-track-progressbar-finished   | #007aff          | #006FE6 |
| --ynfm-color-text-unfold-ellipsis            | #007AFF          | #006FE6 |
| --ynfm-color-bg-cell-pickerview-selected     | #1b1d21          | #FFFFFF |
| --ynfm-color-bg-pickerview                   | #1b1d21          | #FFFFFF |
| --ynfm-color-border-dot-slider               | #3B3C3F          | #E5E5E5 |
| --ynfm-color-bg-line-slider                  | #3B3C3F          | #E5E5E5 |
| --ynfm-color-bg-handle-slider                | #FFFFFF          | #FFFFFF |
| --ynfm-color-bg-dot-slider                   | #1b1d21          | #FFFFFF |
| --ynfm-color-bg-handle-switch                | #FFFFFF          | #FFFFFF |
| --ynfm-color-bg-switch-closed                | #3B3C3F          | #E5E5E5 |
| --ynfm-color-text-fill-btn                   | #FFFFFF          | #FFFFFF |
| --ynfm-color-text-stroke-btn                 | #DEDEDE          | #171717 |
| --ynfm-color-bg-stroke-btn                   | #1B1D21          | #FFFFFF |
| --ynfm-color-bg-panel-calendar               | #1b1d21          | #FFFFFF |
| --ynfm-color-bg-input                        | #1B1D21          | #FFFFFF |
| --ynfm-color-bg-textarea                     | #1B1D21          | #FFFFFF |
| --ynfm-color-bg-panel-dark-popover           | #94A3B8          | #475569 |
| --ynfm-color-text-menu-popover               | #dedede          | #171717 |
| --ynfm-color-border-menu-popover             | #666666          | #BFBFBF |
| --ynfm-color-icon-menu-popover               | #FFFFFF          | #FFFFFF |
| --ynfm-color-border-menu-dark-popover        | #868686          | #737373 |
| --ynfm-color-text-menu-dark-popover          | #3B3C3F          | #E5E5E5 |
| --ynfm-color-border-divider-menu-dark-popover| #737373          | #737373 |
| --ynfm-color-text-inverse-menu-dasrk-popover | #171717          | #F9F9F9 |
| --ynfm-color-icon-inverse-menu-dark-popover  | #171717          | #F9F9F9 |
| --ynfm-color-border-stroke-btn               | #3B3C3F          | #E5E5E5 |
| --ynfm-color-bg-center-popup                 | #1B1D21          | #FFFFFF |
| --ynfm-color-bg-popup                        | #1B1D21          | #FFFFFF |
| --ynfm-background-popover                    | #3B3C3F          | #E5E5E5 |
| --ynfm-color-text-cell-pickerview-selected   | #DEDEDE          | #171717 |
| --ynfm-color-text-cell-pickerview            | #DEDEDE          | #171717 |
| --ynfm-color-text-second-btn-modal           | #DEDEDE          | #171717 |
| --ynfm-color-bg-group-selector               | #121518          | #F5F5F5 |
| --ynfm-color-text-group-selector             | #DEDEDE          | #171717 |
| --ynfm-color-text-content-modal              | #DEDEDE          | #171717 |
| --ynfm-color-bg-searchbar                    | #1B1D21          | #FFFFFF |
| --ynfm-color-bg-input-searchbar              | #121518          | #F5F5F5 |
| --ynfm-color-bg-btn-dialog                   | #1B1D21          | #FFFFFF |
| --ynfm-color-text-title-picker | #DEDEDE | #171717 |
| --ynfm-color-text-group-selector-selected | #FFE7E8 | #EE2233 |
| --ynfm-color-bg-mask-top-pickerview | linear-gradient(0deg, rgba(27, 29, 33, 0.3) 0%, rgba(27, 29, 33, 0.5) 50%, rgba(27, 29, 33, 0.8)) | linear-gradient(0deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.8)) |
| --ynfm-color-bg-mask-bottom-pickerview | linear-gradient(0deg, rgba(27, 29, 33, 0.3) 0%, rgba(27, 29, 33, 0.5) 50%, rgba(27, 29, 33, 0.8)) | linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.8)) |
| --mui-slider-tick-mask | rgba(0, 0, 0, .4) | rgba(0, 0, 0, .4) |
| --ynfm-color-bg-group-selector-selected | #5F0003 | #FFE7E8 |
| --ynfm-color-bg-panel-popover | #3b3c3f | #E5E5E5 |
| --ynfm-color-icon-suffixicon-searchbar | #94A3B8 | #475569 |
| --ynfm-color-icon-group-selector-selected | #FFE7E8 | #EE2233 |
| --ynfm-color-bg-fill-tag | #DEDEDE1A | #1717171A |
| --ynfm-color-icon-clear-fill-tag | #DEDEDE | #171717 |
| --ynfm-color-icon-fill-tag | #DEDEDE | #171717 |
| --ynfm-color-text-fill-tag | #DEDEDE | #171717 |
| --ynfm-color-bg-danger-tag | #DB0B001A | #F50C001A |
| --ynfm-color-bg-invalid-tag | #94A3B81A | #4755691A |
| --ynfm-color-bg-info-tag | #007AFF1A | #006FE61A |
| --ynfm-color-bg-start-tag | #0EA5E91A | #0EA5E91A |
| --ynfm-color-bg-success-tag | #299E461A | #299E461A |
| --ynfm-color-bg-warning-tag | #CC77001A |  #E686001A |
| --ynfm-color-text-danger-tag | #DB0B00 | #F50C00 |
| --ynfm-color-text-invalid-tag | #94A3B8 | #475569 |
| --ynfm-color-text-info-tag | #007AFF | #006FE6 |
| --ynfm-color-bg-notice-alert | #FFDFB3 | #FFF0DB |
| --ynfm-color-bg-notice-error | #FFCFCC | #FFE7E5 |
| --ynfm-color-bg-notice-info | #B8DAFF | #E0EFFF |
| --ynfm-color-bg-notice-success | #BEEECA | #DFF7E5 |
| --ynfm-color-border-notice-alert | #FFDFB3 | #FFF0DB |
| --ynfm-color-border-notice-error | #FFCFCC | #FFE7E5 |
| --ynfm-color-border-notice-info | #B8DAFF | #E0EFFF |
| --ynfm-color-border-notice-success | #BEEECA | #DFF7E5 |
| --ynfm-color-icon-notice | #94A3B8 | #475569 |
| --ynfm-color-icon-notice-alert | #CC7700 | #FFF0DB |
| --ynfm-color-icon-notice-error | #DB0B00 | #F50C00 |
| --ynfm-color-icon-notice-info | #007AFF | #006FE6 |
| --ynfm-color-icon-notice-success | #299E46 | #299E46 |
| --ynfm-color-text-notice-alert | #CC7700 | #E68600 |
| --ynfm-color-text-notice-error | #DB0B00 | #F50C00 |
| --ynfm-color-text-notice-info | #007AFF | #006FE6 |
| --ynfm-color-text-notice-success | #299E46 | #299E46 |
| --ynfm-color-text-start-tag | #0EA5E9 | #0EA5E9 |
| --ynfm-color-text-success-tag | #299E46 | #299E46 |
| --ynfm-color-text-warning-tag | #CC7700 | #E68600 |
| --ynfm-color-bg-primary-tag | #5F0003 | #FFE7E8 |
| --ynfm-color-text-primary-tag | #FFE7E8 | #EE2233 |
| --ynfm-color-text-compulsory-formitemwrapper | #DB0B00 | #F50C00 |
| --ynfm-color-text-verification-formitemwrapper | #DB0B00 | #F50C00 |
| --ynfm-color-bg-verification-formitemwrapper | #F50C001A | #F50C001A |
| --ynfm-color-bg-bubble-indexbar | #212225 | #F5F5F5 |
| --ynfm-color-border-bubble-indexbar | #3B3C3F | #E5E5E5 |
| --ynfm-color-text-bubble-indexbar | #DEDEDE | #171717 |
| --ynfm-color-text-indexbar | #B6B6B6 | #404040 |
| --ynfm-color-text-indexbar-selected | #FFFFFF | #FFFFFF |
| --ynfm-color-text-title-indexbar | #B6B6B6 | #404040 |
| --ynfm-color-bg-track-progresscircle | #3B3C3F | #E5E5E5 |
| --ynfm-color-bg-track-progresscircle-finished | #007AFF | #006FE6 |
| --ynfm-color-text-notice | #94a3b8 | #475569 |
| --ynfm-color-icon-bg-switch-closed | #868686 | #737373 |
| --ynfm-color-text-inner-switch-closed | #868686 | #737373 |
| --ynfm-color-bg-card | #1B1D21 | #FFFFFF |
| --ynfm-color-divider-title-card | #212225 | #F5F5F5 |
| --ynfm-color-text-content-card | #DEDEDE | #171717 |
| --ynfm-color-text-title-card | #DEDEDE | #171717 |
| --ynfm-color-bg-input-searchbar-focused | #121518 | #F5F5F5 |
| --ynfm-color-text-tab-disabled | #868686 | #737373 |
| --ynfm-color-text-tab | #868686 | #737373 |
| --ynfm-color-text-dangerbtn-dialog | #DB0B00 | #F50C00 |
| --ynfm-color-bg-form-disabled | #1B1D21 | #FFFFFF |
| --ynfm-color-bg-verification-form | #F50C001A | #F50C001A |
| --ynfm-color-icon-form | #666666 | #BFBFBF |
| --ynfm-color-text-compulsory-form | #DB0B00 | #F50C00 |
| --ynfm-color-text-discribe-form | #868686 | #737373 |
| --ynfm-color-text-title-form | #B6B6B6 | #404040 |
| --ynfm-color-text-title-form-disabled | #B6B6B6 | #404040 |
| --ynfm-color-text-title-form-readonly | #B6B6B6 | #404040 |
| --ynfm-color-text-verification-form | #DB0B00 | #F50C00 |
| --ynfm-color-bg-title-calendarpickerview | #121518 | #F5F5F5 |
| --ynfm-color-text-title-calendarpickerview | #DEDEDE | #171717 |
| --ynfm-color-icon-functionicon | #94A3B8 | #475569 |
| --ynfm-color-text-link | #007AFF | #006FE6 |
| --ynfm-color-bg-sidetabbar | #121518 | #F5F5F5 |
| --ynfm-color-bg-sidetabbar-selected | #212225 | #F5F5F5 |


## 定制方式
原理上是使用css变量定义的方式对全局变量或组件变量重新定义，用户可使用以下方式进行主题颜色定制  

使用:root对变量进行自定义
```css
:root{
  --mui-color-primary: #ee2233;
  --mui-color-success: #0FB981;
  --mui-color-warning: #F59E0D;
}
```

## 变更记录
TinperM在1.0.3版本中，对主题颜色及DTS变量进行了调整，具体变更如下：
### 废弃变量
1. 级联选择视图 CascaderView
废弃：--color-icon-tab 页签图标颜色 #EE2233 --ynfm-color-icon-tab-cascaderview
2. 开关 Switch
废弃：--color-bg-switch-closed-disabled 关闭禁用背景颜色 #F5F5F5 --ynfm-color-bg-switch-closed-disabled
3. 评分 Rate
废弃：--inactive-color-half 原始填充色（半选模式 - 左半侧） var(--mui-color-border)
### DTS 不支持的变量，已删
4. 多行文本 TextArea
--ynfm-text-align-textarea-count
--ynfm-text-align-textarea
5. 浮动面板 FloatingPanel
--mui-floating-panel-z-index
6. 浮框 Popup
--ynfm-center-popup-z-index
--ynfm-popup-z-index
7. 序列 IndexBar
--ynfm-sticky-offset-top-indexbar
8. 水印 WaterMark
--mui-water-mark-z-index
9. 背景蒙层 Mask
--mui-mask-z-index
10. 气泡弹出框 Popover
--ynfm-z-index-popover
### 修改的 DTS 变量名
11. 气泡弹出框 Popover
--ynfm-arrow-size-popover  改成  --ynfm-size-arrow-panel-popover
--ynfm-background-popover  改成  --ynfm-color-bg-panel-popover
--ynfm-font-weight-popover  改成  --ynfm-font-weight-text-menu-popover
--ynfm-border-radius-popover  改成  --ynfm-border-radius-panel-popover
--ynfm-font-size-popover  改成  --ynfm-font-size-text-menu-popover
--ynfm-color-text-popover  改成  --ynfm-color-text-menu-popover
--ynfm-box-shadow-popover  改成  --ynfm-box-shadow-popover
--ynfm-vertical-padding-popover  改成  --ynfm-space-padding-vertical-popover
--ynfm-horizontal-padding-popover  改成  --ynfm-space-padding-horizontal-popover
12. 多页签
--ynfm-content-padding-tab  改成  --ynfm-spacing-padding-content-tab
13. 导航栏
--ynfm-border-bottom-navbar  改成  
--ynfm-color-border-bottom-navbar, --ynfm-border-width-bottom-navbar, --ynfm-border-style-bottom-navbar
14. 通告栏
--ynfm-font-size-next-notice  改成  --ynfm-font-size-text-notice

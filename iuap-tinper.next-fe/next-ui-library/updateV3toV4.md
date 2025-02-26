<!-- # 从tinper-bee（v2.x/v3.x）到tinper-next（v4.x）

本文档将帮助你从 tinper-bee v2.x/v3.x 版本升级到 tinper-next v4.x 版本

TinperNext 即"钉耙新(xia)一代UI库"[官网链接](https://yondesign.yonyou.com) 是一套基于 React.js 的组件库，它从丰富的企业级中后台应用场景中实战沉淀而来，为复杂应用的快速开发提供一致性 UI 解决方案。-->

## v4.0有哪些变化？

### 设计规范调整

- 默认样式规范调整，全部遵循YonBIP的设计规范，涉及到样式规范调整的组件有：
    - Alert
    - AutoComplete
    - BackTop
    - Badge
    - Breadcrumb
    - Button
    - Message
    - Carousel
    - Checkbox
    - DatePicker
    - Dropdown
    - InputNumber
    - Menu
    - Message
    - Modal
    - Notification
    - Pagination
    - Popconfirm
    - Popover
    - Progress
    - Radio
    - Rate
    - Select
    - Slider
    - Switch
    - Table
    - Tabs
    - Tag
    - TimePicker
    - Tooltip
    - Transfer
    - Tree
    - TreeSelect
    - ~~Loading~~ Spin
    - ~~FormControl~~ Input
    - ~~Panel/PanelGroup~~ Collapse
- 不兼容的样式名变化
    - "u-"前缀变更为"wui-"前缀(即：WebUI缩写)，统一替换的正则表达式为：匹配 (.*?)\.u- 替换为 $1.wui-
    - .u-form-control 样式名变更为 .wui-input
    - .u-panel 样式名变更为 .wui-collapse
    - .u-loading 样式名变更为 .wui-spin

- 图标库按BIP风格更新

### 命名规范调整

- 以Antd命名规范为标准原则进行调整，对以下组件规范名进行重命名：

  | tinper-bee(v2.x/v3.x) | tinper-next(v4.x) / antd(v4.x) |
  | --- | --- |
  |~~ProgressBar~~|Progress.Bar|
  |~~Viewer~~|Image|
  |~~Loading~~|Spin|
  |~~FormControl~~|Input|
  |~~CarouselFigure~~|Carousel|
  |~~Con~~|Layout|
  |~~Form.FormItem~~|Form.Item|
  |~~Step~~|Steps.Step|
  |~~Step.Steps~~|Steps|
  |~~PanelGroup~~|Collapse|
  |~~Panel~~|Collapse.Panel|
  |~~ButtonGroup~~|Button.Group|
  |~~RadioButton~~|Radio.Button|
  |~~RadioGroup~~|Radio.Group|
  |~~CheckboxGroup~~|Checkbox.Group|
  |~~Datepicker~~|DatePicker|

### 移除废弃

- ~~LoadingState~~ 组件移除，使用 Button 的 loading 属性进行代替。
- ~~PageLayout~~ 组件移除，不再作为基础组件。
- ~~Tile~~ 组件移除，不再作为基础组件。
- ~~Label~~ 组件移除，不再作为基础组件，使用Form.Item代替。
- ~~FormGroup~~ 组件移除，不再作为基础组件，使用Form.Item代替。
- ~~Navbar~~ 组件移除，不再作为基础组件。
- ~~SearchPanel~~ 组件移除，不再作为基础组件。
- ~~Dnd~~ 组件移除，不再作为基础组件，直接使用开源react-beautiful-dnd、react-draggable代替。
- ~~Transition~~ 后期将会移除，仅库内部私用，不再对外提供导出。
- ~~Animate~~ 后期将会移除，仅库内部私用，不再对外提供导出。
- ~~Overlay~~ 后期将会移除，仅库内部私用，不再对外提供导出。

### 新增调整

- 原来需要单独引入的组件已经融合到组件库，涉及以下组件：
    - Datepicker日期选择组件
    - Timepicker时间选择组件
    - Calendar日历组件
    - ~~CarouselFigure~~ Carousel走马灯
    - ~~Viewer~~ Image 图片查看器

### 组件重构

- Steps/Step
    - 由原来的Step.Steps规范为Steps.Step

  以前：
   ```js
  import { Step } from 'tinper-bee';
  const Steps = Step.Steps
   ```
  现在：
   ```js
  import { Steps } from '@tinper/next-ui';
  const { Step } = Steps
  
  ```

- Collapse/Panel/PanelGroup组件合并
    - 现在新的Collapse与Panel/PanelGroup进行了合并重构，如需使用旧版的Collapse效果请直接使用"bee-collapse"包。

  以前：
  ```js
  import { Panel,PanelGroup } from 'tinper-bee'; 
  ```
  现在：
  ```js
  import { Collapse } from '@tinper/next-ui'; //Collapse 即原来的PanelGroup
  const { Panel } = Collapse;
  ```

- Carousel/CarouselFigure组件合并
    - 使用原来的CarouselFigure进行重构，并重命名为Carousel

- Clipboard
    - 内部实现由第三方clipboard换成react-to-clipboard，体积更小了

- Table

  以前：
  ```js
  import multiSelect from 'bee-table/bulid/lib/multiSelect';
  import singleSelect from 'bee-table/bulid/lib/singleSelect';
  import bigData from 'bee-table/bulid/lib/bigData';
  import dragColumn from 'bee-table/bulid/lib/dragColumn';
  import filterColumn from 'bee-table/bulid/lib/filterColumn';
  import sort from 'bee-table/bulid/lib/sort';
  import sum from 'bee-table/bulid/lib/sum';
  ```
  现在：
  ```js
  import {Table} from '@tinper/next-ui';
  const { multiSelect,singleSelect,bigData,dragColumn,filterColumn,sort,sum } = Table;
  ```

- Form/Form.Item 待补充说明

### 其它规范调整

- 统一了组件引入方式，单个组件和多组件引入使用统一包，不再提供单个包。

   ```
   //以前
   import { Button } from 'tinper-bee';                //引入一个按钮组件
   or
   import { Button, Select, Tree} from 'tinper-bee';   //引入按钮、下拉、树等多个组件
   or
   import Button from 'bee-button';                    //引入一个按钮组件，4.x以后不再支持
   import Select from 'bee-select';                    //引入一个下拉组件，4.x以后不再支持
   import Tree from 'bee-tree';                        //引入一个树型组件，4.x以后不再支持
   （类似以上单个包引入方式间接增加了代码量及依赖包，所以不再支持此方式）
   
   //现在：
   import { Button } from '@tinper/next-ui';                //引入一个按钮组件
   or
   import { Button, Select, Tree} from '@tinper/next-ui';   //引入按钮、面板、输入框等多个组件
   ```
- 统一了组件目录命名，具有更明确的标识意义了
   ```
   以前目录名："bee-xxx"  //"bee"即 基础组件
   现在目录名："wui-xxx"  //"wui"即 web ui 缩写，旨在标识为 web/桌面端组件
   以后将推出："mui-xxx"  //"mui"即 mobile ui 缩写，旨在标识为 移动端组件
   ```

## 注意事项

- 关于antd库迁移过程的一些不兼容问题 由于有些事件参数列表antd和tinper低版本不一致，例如：有些控件tinper-bee的onChange(value,event）而antd的onChange(event,value)
  即参数列表为反的，为了保障向下兼容及对antd的事件参数列表支持，增加了特定属性(即启用antd特定模式)：antd={true}，以下组件包含此antd属性：
    - Anchor
    - Checkbox
    - Radio
    - InputNumber
    - Input
    - Spin
    - 以上组件可以通过\<ConfigProvider antd={true} \>...\</ConfigProvider\>进行全局统一配置（详见ConfigProvider组件示例）

const FieldTypes = {
  string: 'string',
  number: 'number',
  boolean: 'boolean',
  object: 'object',
  date: 'date',
  action: 'action',
  child: 'child',
  array: 'array'
}

const UIObject = {
  Containers: 'containers',
  Controls: 'controls'
}
const UIExtClass = {
  Container: 'xcontainer',
  Control: 'xcontrol',
  Button: 'xbutton'
}
const ModelProps = {
  GridModel: 'GridModel',
  SimpleModel: 'SimpleModel',
  ListModel: 'ListModel',
  ReferModel: 'ReferModel',
  VM: 'VM'
}
const SysProps = {
  DATA_COLLECTION: 'DATA_COLLECTION',
  DATA_FIELD: 'DATA_FIELD',
  ACTION: 'ACTION',
  CHILDREN_FIELD: 'CHILDREN_FIELD'
}
const TypeProps = {
  LayoutContainer: 'layoutContainer',
  DataContainer: 'dataContainer',
  BasicControls: 'basicControls',
  FormControls: 'formControls',
  FunctionalControls: 'functionalControls',
  BusinessControls: 'businessControls',
  InterfaceControls: 'interfaceControls'
}

/**
 * 适配页面元数据的输入类型定义
 */
const MetaTypes = {
  /**
     * 下拉选择
     * 配合options属性使用
     */
  Select: 'Select',
  /**
     * 文本输入
     */
  Text: 'Text',
  /**
     * 开关按钮
     */
  Bool: 'Bool',
  /**
     * 数字输入
     */
  Number: 'Number',
  /**
     * 勾选框
     */
  Checkbox: 'Checkbox',
  /**
     * 颜色面板
     */
  Color: 'Color',
  /**
     * 图标库
     */
  Icon: 'Icon',
  /**
     * 选择日期
     */
  Date: 'Date',
  /**
     * 选择时间
     */
  Time: 'Time',
  /**
     * 参照
     */
  Refer: 'Refer',
  /**
     * 下拉选择树
     */
  SelectTree: 'SelectTree',
  /**
     * 多行文本框
     */
  Textarea: 'Textarea',
  /**
     * JSON编辑器
     */
  Json: 'Json',
  /**
     * CSS的样式配置器
     */
  CssStyle: 'CssStyle',
  /**
     * 多表头合并设计器
     */
  TitleGroup: 'TitleGroup',
  /**
     * 动作事件设计器
     */
  EventActions: 'EventActions',
  /**
     * 计算公式设计器
     */
  MathFormula: 'MathFormula',
  /**
     * 逻辑公式设计器
     */
  LogicFormula: 'LogicFormula',
  /**
     * 富文本图标框（仅限配套的富文本框使用）
     */
  EditorIcons: 'EditorIcons',
  /**
     * 分页配置器
     */
  Pagination: 'Pagination',
  /**
     * 带开关的文本输入框
     */
  SwitchText: 'SwitchText',
  /**
     * 枚举档案选择（仅限配套的枚举档案使用）
     */
  EnumSelect: 'EnumSelect',
  /**
     * 参照映射关联项配置（仅限配套的参照使用）
     */
  ReferEditRelation: 'ReferEditRelation',
  /**
     * 数据表格本地数据配置（仅限配套的表格使用）
     */
  LocalData: 'LocalData',
  /**
     * 表格行操作菜单（仅限配套的表格使用）
     */
  RowMenu: 'RowMenu',
  /**
     * 筛选栏配置（仅限配套的筛选栏配置）
     */
  FilterAreaConfig: 'FilterAreaConfig',
  /**
     * Echart图表属性配置器
     */
  EChartData: 'EChartData',
  /**
     * 参照带入配置（仅限配套的iuap参照配置）
     */
  ReferLookup: 'ReferLookup',

  /**
     * 带Iframe的弹窗
     */
  IframeModal: 'IframeModal',

  /**
     * CSS的样式配置器
     */
  Style: 'Style',

  /**
     * 单选配置器
     */
  Radio: 'Radio',

  /**
     * 多语配置器
     */
  MultiLang: 'MultiLang',

  /**
   * 自定义配置器
   */
  Custom: 'Custom',
  /**
   * 表明一个分组的开始
   */
  Group: 'Group',
}


module.exports = {
  FieldTypes,
  UIObject,
  TypeProps,
  MetaTypes
}

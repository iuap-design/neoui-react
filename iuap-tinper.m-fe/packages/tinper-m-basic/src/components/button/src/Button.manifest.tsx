const { MetaTypes, UIObject, TypeProps } = require('../../../utils/ManifestsProps.ts')

module.exports = {
  name: '按钮',
  code: 'Button',
  label: '按钮',
  icon: 'ynfcomponent ynfc-Button',
  type: TypeProps.FormControls,
  uiObject: UIObject.Controls,
  props: [
    {
      code: 'style',
      name: '自定义样式',
      metaProps: { styleParams: ['appearance', 'font', 'border'] },
      metaType: MetaTypes.Style,
    },
    {
      name: '按钮类型',
      code: 'mode',
      metaType: MetaTypes.Select,
      defaultValue: 'default',
      metaProps: JSON.stringify({
        options: [
          { value: 'default', text: '普通按钮' },
          { value: 'primary', text: '主按钮' },
          { value: 'warning', text: '警告按钮' },
          { value: 'ghost', text: '幽灵按钮' },
          { value: 'text', text: '文字按钮' }
        ]
      })
    },
    {
      name: '按钮大小',
      code: 'size',
      metaType: MetaTypes.Select,
      defaultValue: 'large',
      metaProps: JSON.stringify({
        options: [
          { value: 'large', text: '大' },
          { value: 'middle', text: '中' },
          { value: 'small', text: '小' }
        ]
      })
    },
    {
      name: '是否可见',
      code: 'visible',
      metaType: MetaTypes.Bool,
      showDesign: true,
      defaultValue: true
    },
    {
      name: '是否加载中',
      code: 'loading',
      metaType: MetaTypes.Bool,
      showDesign: true,
      defaultValue: false
    },
    {
      name: '加载状态图标',
      code: 'loadingIcon',
      metaType: 'IframeModal',
      defaultValue: '',
      showDesign: false,
      designConfig: {
        type: 'IframeModal',
        isRequired: true,
        props: {
          caption: '加载状态图标',
          description: '加载状态图标',
          disabled: null,
          funName: 'iuapMdd.ButtonSetIcon',
          iframeId: 'ButtonSetIconIfr',
          width: '1000',
          openType: 'function'
        }
      }
    },
    {
      name: '加载状态文字',
      code: 'loadingText',
      type: MetaTypes.Text
    },
    {
      name: '按钮图标库',
      code: 'icon',
      metaType: 'IframeModal',
      defaultValue: '',
      showDesign: false,
      designConfig: {
        type: 'IframeModal',
        isRequired: true,
        props: {
          modalCode: '',
          caption: '按钮图标库',
          description: '配置按钮图标',
          disabled: null,
          funName: 'iuapMdd.ButtonSetIcon',
          iframeId: 'ButtonSetIconIfr',
          width: '1000',
          openType: 'function'
        }
      }
    },
    {
      name: '图标位置',
      code: 'iconPosition',
      metaType: MetaTypes.Select,
      defaultValue: 'left',
      metaProps: JSON.stringify({
        options: [
          { value: 'top', text: '上' },
          { value: 'right', text: '右' },
          { value: 'bottom', text: '下' },
          { value: 'left', text: '左' }
        ]
      })
    },
    {
      name: '样式类名',
      code: 'className',
      type: MetaTypes.Text
    },
    {
      name: '是否禁用',
      code: 'disabled',
      metaType: MetaTypes.Bool,
      showDesign: true,
      defaultValue: false
    },
    {
      name: 'dom标识',
      code: 'fieldid',
      type: MetaTypes.Text
    },
    {
      name: '样式类名前缀',
      code: 'clsPrefix',
      type: MetaTypes.Text
    }
  ],
  events: [
    {
      code: 'onClick',
      name: '单击事件'
    }
  ]
}

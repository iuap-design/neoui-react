/** FormItemWrapper.tsx */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import FormItemWrapper from '../src/index'
import { mount } from '@tests/mount'
import { muiPrefix } from '@utils/UpdatePrefixs'
import Close from '@tinper/m-icons/lib/cjs/Close'

const prefixFormItemWrapper = `${muiPrefix}-form-item-wrapper`;
const fieldid = 'FormItemWrapper_test'

describe('FormItemWrapper Component', () => {
  let wrapper: any
  // 渲染
  it('component: FormItemWrapper, <test prop:: fieldid>', () => {
    wrapper = mount(<FormItemWrapper fieldid={fieldid} />)
    expect(wrapper.find(`.${prefixFormItemWrapper}-box`).prop('fieldid')).toEqual(`${fieldid}_form-item-wrapper-box`);
  });

  // 标题 && 副标题 && 内容
  it('component: FormItemWrapper, <test prop:: label > <test prop:: showLabel > <test prop:: subLabel > <test prop:: children >', () => {
    wrapper = mount(<FormItemWrapper label="Label" subLabel='SubLabel' children="Content" />);
    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(screen.getByText('SubLabel')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    // 显示标题
    wrapper.setProps({label: 'Label', showLabel: false})
    expect(wrapper.exists(`.${prefixFormItemWrapper}-label`)).toEqual(false);
  });


  // 自定义样式-clsPrefix
  it('component: FormItemWrapper, <test prop:: clsPrefix >', () => {
    const customClsPrefix = 'custom-cls';
    wrapper = mount(<FormItemWrapper clsPrefix={customClsPrefix} />)
    expect(wrapper.exists(`.${prefixFormItemWrapper}`)).toEqual(false);
    const newClassName = `${customClsPrefix}-form-item-wrapper`;
    expect(wrapper.exists(`.${newClassName}`)).toEqual(true);
  })

  // 自定义样式-className
  it('component: FormItemWrapper, <test prop:: className > <test prop:: labelCls > <test prop:: contentCls > <test prop:: errorCls > <test prop:: rightIconCls >', () => {
    const customCls = 'custom-cls';
    ['className', 'labelCls', 'contentCls', 'errorCls', 'rightIconCls'].forEach((item) => {
      wrapper = mount(<FormItemWrapper {...{ [item]: customCls }} label='标题' error errorText='错误' rightIcon='RightIcon' />)
      expect(wrapper.exists(`.${customCls}`)).toEqual(true);
    })
  })

  // 自定义样式-className
  it('component: FormItemWrapper, <test prop:: style >, <test prop:: labelStyle > <test prop:: contentStyle > <test prop:: wrapStyle >', () => {
    const customStyle = {
      background: '#FFFFFF'
    };

    const styleMap: {[key: string]: string}= {
      labelStyle: `${prefixFormItemWrapper}-label`,
      contentStyle: `${prefixFormItemWrapper}-content`,
      wrapStyle: `${prefixFormItemWrapper}`,
      style: `${prefixFormItemWrapper}`
    };

    ['style', 'labelStyle', 'contentStyle', 'wrapStyle'].forEach((item) => {
      wrapper = mount(<FormItemWrapper {...{ [item]: customStyle }} label='标题' children='Content' />)
      expect(wrapper.find(`.${styleMap[item]}`).props().style.background).toEqual('rgb(255, 255, 255)');
    })
  })

  // 错误
  it('component: FormItemWrapper, <test prop:: error > <test prop:: errorText > ', () => {
    render(<FormItemWrapper error errorText="This is an error" />);
    const error = screen.getByText('This is an error');
    expect(error).toBeInTheDocument();
  });

  // 图标
  it('component: FormItemWrapper, <test prop:: rightIcon > <test prop:: showIcon > <test prop:: labelIcon > <test prop:: showExtraLabelIcon >', () => {
    const rightIcon = <Close className='right-icon' />;
    const labelIcon = <Close className='label-icon' />;
    wrapper = mount(<FormItemWrapper showIcon={false} rightIcon={rightIcon} showExtraLabelIcon={false} labelIcon={labelIcon} label='图标相关' />);
    expect(wrapper.exists('.right-icon')).toEqual(false);
    expect(wrapper.exists('.label-icon')).toEqual(false);
    wrapper = mount(<FormItemWrapper showIcon rightIcon={rightIcon} showExtraLabelIcon labelIcon={labelIcon} label='图标相关' />);
    expect(wrapper.exists('.right-icon')).toEqual(true);
    expect(wrapper.exists('.label-icon')).toEqual(true);
  });

  // 点击事件
  it('component: FormItemWrapper, <test prop:: onClick >', () => {
    const handleClick = jest.fn();
    wrapper = mount(<FormItemWrapper fieldid={fieldid} onClick={handleClick} />)
    const element = wrapper.find(`.${prefixFormItemWrapper}`).getDOMNode()
    fireEvent.click(element);
    expect(handleClick).toHaveBeenCalled();
  });

  // 属性：分割线, 单行, 必填, 只读
  it(`component: FormItemWrapper, <test prop:: singleLine > <test prop:: splitLine > <test prop:: required > <test prop:: readOnly > <test prop:: disabled >`, () => {
    const clsMap: {[key: string]: string} = {
      splitLine: `${prefixFormItemWrapper}-split`,
      singleLine: 'single-line',
      required: 'required',
      readOnly: `${prefixFormItemWrapper}-readonly`,
      disabled: `${prefixFormItemWrapper}-disabled`
    };

    ['splitLine', 'singleLine', 'required', 'readOnly', 'disabled'].forEach((item) => {
      wrapper = mount(<FormItemWrapper {...{ [item]: true }} label='标题' fieldid={fieldid} />)
      expect(wrapper.exists(`.${clsMap[item]}`)).toEqual(true)
    })
  });

  // 属性：readOnlyContent
  it(`component: FormItemWrapper, <test prop:: readOnlyContent >`, () => {
    const readOnlyContent = <span className='readonly-content'>--</span>
    wrapper = mount(<FormItemWrapper readOnly={false} readOnlyContent={readOnlyContent} />)
    expect(wrapper.exists('.readonly-content')).toEqual(false)
    wrapper.setProps({readOnly: true})
    expect(wrapper.exists('.readonly-content')).toEqual(true)
  });

  // 属性：tips
  it(`component: FormItemWrapper, <test prop:: tips >`, () => {
    const tips = '帮助'
    wrapper = mount(<FormItemWrapper label='标题示意' tips={tips} />)
    wrapper.find(`.${prefixFormItemWrapper}-label-tips`).simulate('click')
    expect(screen.getByText(tips)).toBeInTheDocument()
  });

  // 属性：wrapMode
  it(`component: FormItemWrapper, <test prop:: wrapMode>`, () => {
    wrapper = mount(<FormItemWrapper label='标题示意' />);
    expect(wrapper.find(`.${prefixFormItemWrapper}-label`).hasClass(`${prefixFormItemWrapper}-label-word`)).toEqual(true);

    wrapper = mount(<FormItemWrapper label='标题示意' wrapMode='word'/>);
    expect(wrapper.find(`.${prefixFormItemWrapper}-label`).hasClass(`${prefixFormItemWrapper}-label-word`)).toEqual(true);

    wrapper = mount(<FormItemWrapper label='标题示意' wrapMode='letter'/>);
    expect(wrapper.find(`.${prefixFormItemWrapper}-label`).hasClass(`${prefixFormItemWrapper}-label-letter`)).toEqual(true);
  });
})

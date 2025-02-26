/** Tag.tsx */
import React from 'react'
import { screen, fireEvent } from '@testing-library/react';
import { mount } from '@tests/mount'
import Tag from '../src/index'
import Icon from '../../icon/src/index'

import { muiPrefix } from '@utils/UpdatePrefixs'

const prefixTag = `${muiPrefix}-tag`;

describe('Tag Component', () => {
  it('render, <test prop:: fieldid>', () => {
    const fieldid = 'Tag_test'
    const wrapper = mount(<Tag fieldid={fieldid} />)
    const element = wrapper.find(`[fieldid="${fieldid}"]`);
    // class toHaveAttribute
    expect(element.getDOMNode()).toBeInTheDocument();
  });
  ['left', 'right', 'center'].forEach(item => {
    it('textAlign test, <test prop:: textAlign>', () => {
      const wrapper = mount(<Tag textAlign={item} />);
      const element = wrapper.find(`.${prefixTag}`);
      // style toequal
      expect(element.getDOMNode()).toHaveAttribute('style', `text-align: ${item};`);
    })
  });
  it('label test, <test prop:: label>', () => {
    const labelText = 'label_test'
    const wrapper = mount(<Tag label={labelText} />);
    const element = wrapper.find(`.${prefixTag}-text`);
    expect(element.text()).toBe(labelText);
  })

  it('onClick && readOnly false test, <test prop:: onClick>, <test prop:: readOnly>', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Tag onClick={onClick} readOnly={false} />);
    const element = wrapper.find(`.${prefixTag}`);
    //  ;
    expect(element.props().class).toBe('mui-tag mui-tag-fill-solid mui-tag-operational');
    wrapper.find(`.${prefixTag}`).simulate('click');
    expect(element.props().class).toBe('mui-tag mui-tag-fill-solid mui-tag-operational mui-tag-selected');

    // fireEvent.click(element.getDOMNode());
    expect(onClick).toHaveBeenCalled();
  });

  it('onChange && readOnly false test, <test prop:: onChange>, <test prop:: readOnly>', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Tag onChange={onChange} readOnly={false} />);
    const element = wrapper.find(`.${prefixTag}`);
    //  ;
    expect(element.props().class).toBe('mui-tag mui-tag-fill-solid mui-tag-operational');
    wrapper.find(`.${prefixTag}`).simulate('click');
    expect(element.props().class).toBe('mui-tag mui-tag-fill-solid mui-tag-operational mui-tag-selected');

    // fireEvent.click(element.getDOMNode());
    expect(onChange).toHaveBeenCalled();
  });

  it('onClick && readOnly true test, <test prop:: onClick>, <test prop:: readOnly>', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Tag onClick={onClick} readOnly={true} />);
    const element = wrapper.find(`.${prefixTag}`);
    //  ;
    expect(element.props().class).toBe('mui-tag mui-tag-fill-solid mui-tag-color-default');
    // wrapper.find(`.${prefixTag}`).simulate('click');
    // expect(element.props().class).toBe('mui-tag mui-tag-fill-solid mui-tag-color-default');
    // expect(onClick).not.toHaveBeenCalled();
  });

  it('leftIcon reactnode test, <test prop:: leftIcon>', () => {
    const iconNode = <Icon type='archeart' color='#EE2233'/>;
    const wrapper = mount(<Tag className={'test-tag'} leftIcon={iconNode} />);
    // parent  children
    // .html
    expect(wrapper.find(`.${prefixTag}-left-icon`).props().class).toBe('mui-icon mui-tag-left-icon mui-icon-md');
  })

  it('leftIcon string test, <test prop:: leftIcon>', () => {
    const wrapper = mount(<Tag className={'test-tag'} leftIcon="archeart" />);
    // parent  children
    // .html
    expect(wrapper.find(`.${prefixTag}-left-icon`).props().class).toBe('mui-icon mui-tag-left-icon mui-icon-md');
  })

  it('rightIcon reactnode test, <test prop:: rightIcon>', () => {
    const iconNode = <Icon type='archeart' color='#EE2233'/>;
    const wrapper = mount(<Tag className={'test-tag'} rightIcon={iconNode} />);
    // parent  children
    expect(wrapper.find(`.${prefixTag}-right-icon`).props().class).toBe('mui-icon mui-tag-right-icon mui-icon-md');
  })

  it('rightIcon string test, <test prop:: rightIcon>', () => {
    const wrapper = mount(<Tag className={'test-tag'} rightIcon="archeart" />);
    // parent  children
    // .html todo
    expect(wrapper.find(`.${prefixTag}-right-icon`).props().class).toBe('mui-icon mui-tag-right-icon mui-icon-md');
  })

  // lineNum  不支持WebkitLineClamp
  it('lineNum test, <test prop:: lineNum>', () => {
    const wrapper = mount(<Tag color="default" fill="solid" lineNum={2}
      innerStyle={{ color: 'red', WebkitLineClamp: 2 }}
      label="我是超长可以省略标签我是超长可以省略标签我是超长可以省略标签我是超长可以省略标签" />);
    const element = wrapper.find(`.${prefixTag}-text`);
    //  ;

    // 测 innerStyle
    expect(element.props().style.color).toBe('red');
  })

  it('textLength test, <test prop:: textLength>', () => {
    const wrapper = mount(<Tag color="default" fill="solid" textLength={2}
      label="我是超长可以省略标签" />);
    const element = wrapper.find(`.${prefixTag}-text`);
    expect(element.text()).toBe('我是...');
  })

  it('visible false test, <test prop:: visible>', () => {
    const wrapper = mount(<Tag visible={false} />)
    const element = wrapper.find(`.${prefixTag}`);
     ;

    // class toHaveAttribute
    expect(element.length).toBe(0);
  });

  it('visible true test, <test prop:: visible>', () => {
    const wrapper = mount(<Tag visible={true} />)
    const element = wrapper.find(`.${prefixTag}`);

    // class toHaveAttribute
    expect(element.length).toBe(1);
  });

  it('prefix test, <test prop:: prefix>', () => {
    const wrapper = mount(<Tag color="default" fill="solid" prefix="$" label="15" />);
    expect(wrapper.find(`.${prefixTag}-clamp-prefix`).text()).toBe('$');
  })
  it('suffix test, <test prop:: suffix>', () => {
    const wrapper = mount(<Tag color="default" fill="solid" suffix="$" label="15" />);
    expect(wrapper.find(`.${prefixTag}-clamp-suffix`).text()).toBe('$');
  })

  it('className test, <test prop:: className>', () => {
    const wrapper = mount(<Tag className="test-classname" />);
    expect(wrapper.find(`.${prefixTag}`).hasClass('test-classname')).toBeTruthy();
  })

  it('style test, <test prop:: style>', () => {
    const wrapper = mount(<Tag style={{ display: 'flex' }} />);
    expect(wrapper.find(`.${prefixTag}`).props().style.display).toBe('flex');
  })

  it('closeIcon reactnode test, <test prop:: closeIcon>', () => {
    const iconNode = <Icon type='archeart' color='#EE2233'/>;
    const wrapper = mount(<Tag className={'test-tag'} closable closeIcon={iconNode} />);
    expect(wrapper.find(`.${prefixTag}-close-icon`).getDOMNode()).toBeInTheDocument();
  })

  it('closeIcon string test, <test prop:: closeIcon>', () => {
    const wrapper = mount(<Tag className={'test-tag'} closable closeIcon="archeart" />);
    expect(wrapper.find(`.${prefixTag}-close-icon`).getDOMNode()).toBeInTheDocument();
  })

  it('innerStyle test, <test prop:: innerStyle>', () => {
    const wrapper = mount(<Tag innerStyle={{ color: 'green' }} />);
    expect(wrapper.find(`.${prefixTag}-text`).props().style.color).toBe('green');
  })

  it('clsPrefix test, <test prop:: clsPrefix>', () => {
    const wrapper = mount(<Tag clsPrefix="testClassPre" />);
    expect(wrapper.find('.testClassPre-tag').getDOMNode()).toBeInTheDocument();
  })

  it('disabled test, <test prop:: disabled>', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Tag onClick={onClick} readOnly={false} disabled />);
    const element = wrapper.find(`.${prefixTag}`);
    expect(element.props().class).toBe('mui-tag mui-tag-fill-solid mui-tag-operational mui-tag-disabled');
    // wrapper.find(`.${prefixTag}`).simulate('click');
    // expect(onClick).not.toHaveBeenCalled();
  });

  it('selected test, <test prop:: selected>', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Tag onClick={onClick} readOnly={false} selected />);
    const element = wrapper.find(`.${prefixTag}`);
    expect(element.props().class).toBe('mui-tag mui-tag-fill-solid mui-tag-operational mui-tag-selected');
    wrapper.find(`.${prefixTag}`).simulate('click');
    expect(element.props().class).toBe('mui-tag mui-tag-fill-solid mui-tag-operational');
    expect(onClick).toHaveBeenCalled();
  });

  it('small test, <test prop:: small>', () => {
    const wrapper = mount(<Tag small />);
    expect(wrapper.find(`.${prefixTag}`).props().class).toBe('mui-tag mui-tag-small mui-tag-fill-solid mui-tag-color-default');
  })

  it('round test, <test prop:: round>', () => {
    const wrapper = mount(<Tag round />);
    expect(wrapper.find(`.${prefixTag}`).props().class).toBe('mui-tag mui-tag-fill-solid mui-tag-round mui-tag-color-default');
  })

  it('closable true onClose test, <test prop:: onClose>, <test prop:: closable>', () => {
    const onClose = jest.fn();
    const wrapper = mount(<Tag onClose={onClose} readOnly={false} closable />);
    const element = wrapper.find(`.${prefixTag}`);
    wrapper.find(`.${prefixTag}-close`).simulate('click');
    expect(onClose).toHaveBeenCalled();
    expect(element.getDOMNode()).not.toBeInTheDocument();

  });

  it('closable true afterClose test, <test prop:: afterClose>, <test prop:: closable>', () => {
    const onClose = jest.fn();
    const afterClose = jest.fn();
    const wrapper = mount(<Tag onClose={onClose} afterClose={afterClose} readOnly={false} closable />);
    wrapper.find(`.${prefixTag}-close`).simulate('click');
    expect(onClose).toHaveBeenCalled();
    expect(afterClose).toHaveBeenCalled();
  });

  ['default', 'primary', 'success', 'warning', 'danger', '#666666'].forEach(item => {
    it('color test, <test prop:: color>', () => {
      const wrapper = mount(<Tag color={item} fill="solid" label="标签" />);
      if (item === '#666666') {
        expect(wrapper.find(`.${prefixTag}`).props().class).toBe('mui-tag mui-tag-fill-solid mui-tag-color-string');
      } else {
        expect(wrapper.find(`.${prefixTag}`).props().class).toBe(`mui-tag mui-tag-fill-solid mui-tag-color-${item}`);
      }
    })
  });

  ['solid', 'outline', 'none'].forEach(item => {
    it('fill test, <test prop:: fill>', () => {
      const wrapper = mount(<Tag color="default" fill={item} label="标签" />);
      expect(wrapper.find(`.${prefixTag}`).props().class).toBe(`mui-tag mui-tag-fill-${item} mui-tag-color-default`);
    })
  });
  ['info', 'success', 'warning', 'danger', 'invalid', 'start'].forEach(item => {
    it('signatureText test, <test prop:: signatureText>', () => {
      const wrapper = mount(<Tag color={item} signatureText='test-st' fill="signature" />);
      expect(wrapper.find(`.${prefixTag}-signature-text`).instance().innerHTML).toBe('test-st');
    })
  });
})

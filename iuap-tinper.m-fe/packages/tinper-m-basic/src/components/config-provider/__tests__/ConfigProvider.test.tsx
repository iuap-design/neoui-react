/** ConfigProvider.tsx */
import React from 'react'
import { render, debug } from '@testing-library/react'
import { mount } from '@tests/mount'
import { ConfigProvider } from '@tinper/m';

describe('ConfigProvider Component', () => {
  it('component: ConfigProvider, <test prop:: locale>', () => {
    const wrapper = render(<ConfigProvider locale='zh-CN'></ConfigProvider>)
    const { locale } = ConfigProvider.getTinpermLocaleConfig()
    expect(locale.locale).toEqual('zh-CN');
  });
  it('component: ConfigProvider, <test prop:: children>', () => {
    const children_fieldid = 'provider_children';
    const wrapper = mount(<ConfigProvider children={<div fieldid={children_fieldid} />} />);
    expect(wrapper.find(`[fieldid="${children_fieldid}"]`)).toHaveLength(1)
  });

})


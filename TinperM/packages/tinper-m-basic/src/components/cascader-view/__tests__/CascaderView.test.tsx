/**CascaderView.tsx */
import type { CascaderViewProps } from '../src/iCascaderView';
import { render, renderHook, screen } from '@testing-library/react';
import { CascaderView } from '@/index';
import { customFileNameOptions, options } from '../demos/data';
import userEvent from '@testing-library/user-event';
import React, { useId } from 'react';

describe('CascaderView Component', () => {
  const renderCascaderView = (props: Partial<CascaderViewProps> = {}) => {
    const onChange = jest.fn();
    const onTabsChange = jest.fn();
    const {result: {current: fieldid}} = renderHook(useId)

    const {container} = render(<CascaderView onChange={onChange} fieldid={fieldid} onTabsChange={onTabsChange}
                                             options={options} {...props} />);

    const user = userEvent.setup()

    return {
      container,
      user,
      onChange,
      onTabsChange,
      fieldid
    }
  }

  it('should render correct', () => {
    const {container} = renderCascaderView();

    expect(container.firstChild).toMatchSnapshot()
  });

  describe('<test prop:: defaultValue>', () => {
    it('should render correct defaultValue', () => {
      renderCascaderView({defaultValue: ['浙江', '杭州', '西湖区']})

      expect(screen.getByRole('tab', {selected: true})).toHaveTextContent('西湖区')
    });
  });

  describe('<test prop:: fieldNames>', () => {
    it('should render the same options', () => {
      const {container} = renderCascaderView({
        options: customFileNameOptions,
        fieldNames: {label: '属性', value: '值', children: '子节点'}
      });


    });
  });

  describe('<test prop:: onChange> <test prop:: onTabsChange> <test prop:: value> ', () => {
    it('should called onChange with selected Value', async () => {
      const {container, user, onChange} = renderCascaderView()

      await user.click(screen.getByText(options[0].label))

      expect(onChange).toHaveBeenCalledWith(
        [options[0].value],
        {
          items: [options[0]],
          isLeaf: false
        })

      await user.click(screen.getByText(options[0].children[0].label))

      expect(onChange).toHaveBeenCalledWith(
        [options[0].value, options[0].children[0].value],
        {
          items: [options[0], options[0].children[0]],
          isLeaf: false
        })

      await user.click(screen.getByText(options[0].children[0].children[0].label))

      expect(onChange).toHaveBeenCalledWith(
        [options[0].value, options[0].children[0].value, options[0].children[0].children[0].value],
        {
          items: [options[0], options[0].children[0], options[0].children[0].children[0]],
          isLeaf: true
        })


    });
  })



  describe('<test prop:: activeIcon>',  () => {
    it('should have activeIcon for selected option',   () => {
     renderCascaderView({value: ['浙江', '杭州', '西湖区'], activeIcon:'icon' });

      expect( screen.getAllByText('icon')).toHaveLength(3)

    });
  });

  describe('<test prop:: options>', () => {
    it('should render correct options', async () => {
      const {container, user} = renderCascaderView()


      await user.click(screen.getByText(options[0].label))


      await user.click(screen.getByText(options[0].children![0].label))



    });

  });

  describe('<test prop:: placeholder>', () => {
    it('should have placeholder for unSelected tab title', async () => {

      const {user} = renderCascaderView({placeholder: 'placeholder'});

      await user.click(screen.getByText(options[0].label))

      expect(screen.getByRole('tab', {selected: true})).toHaveTextContent('placeholder')

      await user.click(screen.getByRole('tab', {name: options[0].label}))

      expect(screen.getByRole('tab', {selected: true})).not.toHaveTextContent('placeholder')

    });
  });



  describe('<test prop:: loading>', () => {
    it('should render skeletion', () => {
      const { container } = renderCascaderView({loading: true});

      expect(container.querySelector('.mui-cascader-view-skeleton')).toBeInTheDocument();
    });

  });

  describe('<test prop:: fieldid>', () => {
    it('should have fieldid', () => {
      const {fieldid, container} = renderCascaderView();

      expect(container.firstChild).toHaveAttribute('fieldid', expect.stringContaining(fieldid))


    });
  });

  describe('<test prop:: clsPrefix>', () => {
    it('should contain mui clsPrefix default', async () => {
      const {container} = renderCascaderView()



      expect(container.firstChild).toHaveClass(/^mui/)
    });
    it('should contain provided clsPrefix', async () => {
      const {container} = renderCascaderView({clsPrefix: 'test'})


      expect(container.firstChild).toHaveClass(/^test/)


    });


  })



});

/** Popover.tsx */

import {Popover} from "@tinper/m";

import {render, screen} from "@testing-library/react";
import React, {useId} from 'react';
import userEvent from "@testing-library/user-event";
import type {PopoverProps} from '../src'

describe('Popover Component', () => {
  const content = 'Popover Content'

  const renderPopover = (props: Partial<PopoverProps> = {}) => {
    const onVisibleChange = jest.fn();
    const onBubble = jest.fn()
    const App = () => {
      return (
        <div onClick={onBubble} id="ww">
          <Popover
            content={content}
            onVisibleChange={onVisibleChange}
            {...props}
          >
            <button>Open Popover</button>
          </Popover>
        </div>
      )
    }
    const {container, baseElement} = render(
     <App />
    );
    return {
      container,
      baseElement,
      element: container.firstChild?.firstChild,
      user: userEvent.setup(),
      trigger: screen.getByRole('button', {name: /open popover/i}),
      getFloating: () => screen.getByRole('tooltip'),
      queryFloating: () => screen.queryByRole('tooltip'),
      onVisibleChange,
      onBubble,


    }
  }


  describe('<test prop:: defaultVisible> <test prop:: content> <test prop:: children>', () => {
    it('should render popover content when defaultVisible is provided', () => {
      renderPopover({defaultVisible: true});

      expect(screen.getByText(content)).toBeInTheDocument();
    });

    it('should not render popover content when trigger is clicked', async () => {

      const {user, trigger, getFloating} = renderPopover({defaultVisible: true});

      await user.click(trigger);

      expect(getFloating()).toHaveClass(/hidden/i)
    });

  });

  describe('<test prop:: visible>', () => {
    it('should render popover content when visible is provided', () => {
      renderPopover({visible: true});

      expect(screen.getByText(content)).toBeInTheDocument();
    });

    it('should always render popover when trigger is clicked', async () => {
      // render(<Popover
      //   content={content}
      //   visible
      // >
      //   <button>Open Popover</button>
      // </Popover>)
      //
      // const user = userEvent.setup();
      // const button = screen.getByRole('button', {name: /open popover/i})
      // await user.click(button);
      //
      // const popover = screen.getByRole('tooltip')
      const {user, trigger, getFloating} = renderPopover({visible: true});

      await user.click(trigger);

      expect(getFloating()).not.toHaveClass(/hidden/i)
    });
  });

  describe('<test prop:: destroyOnHide>', () => {
    it('should destory when destroyOnHide is provided ', async () => {
      const {user, trigger} = renderPopover({defaultVisible: true, destroyOnHide: true});

      await user.click(trigger);

      const floating = screen.queryByRole('tooltip')
      expect(floating).not.toBeInTheDocument()


    });
  });

  describe('<test prop:: mode>', () => {
    it('should default render light', () => {
      const {getFloating} = renderPopover({defaultVisible: true});

      expect(getFloating()).toHaveClass(/light/i)
    });

    it('should  render dark ', () => {
      const {getFloating} = renderPopover({defaultVisible: true, mode: 'dark'});

      expect(getFloating()).toHaveClass(/dark/i)
    });

  });

  describe('<test prop:: onVisibleChange>', () => {
    it('should call onVisibleChange with true ', async () => {
      const {user, trigger, onVisibleChange} = renderPopover();

      await user.click(trigger);

      expect(onVisibleChange).toHaveBeenCalledWith(true)

      await user.click(trigger);
      await user.click(trigger);
      expect(onVisibleChange).toHaveBeenCalledWith(true)

    });

    it('should call onVisibleChange with false', async () => {
      const {user, trigger, onVisibleChange} = renderPopover({defaultVisible: true});

      await user.click(trigger);
      expect(onVisibleChange).toHaveBeenCalledWith(false)

      await user.click(trigger);
      await user.click(trigger);
      expect(onVisibleChange).toHaveBeenCalledWith(false)

    });
  });

  describe('<test prop:: stopPropagation>', () => {
    it('should  prevent event bubbling  ', async () => {
      const {onBubble, getFloating, trigger, user} = renderPopover({defaultVisible: true});

      await user.click(getFloating());

      expect(onBubble).not.toHaveBeenCalled()
    });

    it('should bubble when stopPropagation is empty', async () => {
      const {onBubble, getFloating, trigger, user} = renderPopover({defaultVisible: true, stopPropagation: []});

      await user.click(getFloating());

      expect(onBubble).toHaveBeenCalled()
    });
  })

  describe('<test prop:: trigger>  <test prop:: getContainer>  <test prop:: placement>', () => {
    it('should default trigger click  ', async () => {
      const {onBubble, getFloating, trigger, user} = renderPopover();

      await user.click(trigger)

      expect(getFloating()).toBeInTheDocument()

    });

    it('should not trigger when trigger is empty',async () => {
      const {onBubble, queryFloating, trigger, user} = renderPopover({trigger: ''});

      await user.click(trigger)

      expect(queryFloating()).not.toBeInTheDocument()
    });

  })

  describe('<test prop:: fieldid>', () => {
    it('should contain fieldid', () => {
      const {element, getFloating} = renderPopover({defaultVisible: true, fieldid: 'fieldid'})

    });
  })

  describe('<test prop:: clsPrefix>', () => {
    it('should contain mui clsPrefix default', () => {
      const { getFloating } = renderPopover({defaultVisible: true})

      expect(getFloating()).toHaveClass(/^mui/)
    });
    it('should contain provided clsPrefix', () => {
      const { getFloating } = renderPopover({defaultVisible: true, clsPrefix: 'test'})

      expect(getFloating()).toHaveClass(/^test/)
    });
  })

})

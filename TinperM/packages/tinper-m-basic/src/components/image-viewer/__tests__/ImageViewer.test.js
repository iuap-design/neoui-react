/** ImageViewer.tsx */
import React, { useState, useRef } from 'react'
import { screen, fireEvent, render, within, cleanup, waitFor } from '@testing-library/react';
import { mount } from '@tests/mount'
import { Button, ImageViewer, Modal } from '@tinper/m'
import { muiPrefix } from '@utils/UpdatePrefixs'

const prefixImageViewer = `${muiPrefix}-image-viewer`;

const demoImages2 = [
  'https://images.unsplash.com/photo-1620476214170-1d8080f65cdb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80',
  'https://images.unsplash.com/photo-1601128533718-374ffcca299b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3128&q=80',
  'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3113&q=80',
  'https://images.unsplash.com/photo-1624993590528-4ee743c9896e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=1000&q=80',
]
describe('ImageViewer Component',  () => {
  it('fieldid test, <test prop:: fieldid>', async () => {
    const fieldid = 'imageViewer_test'
    const wrapper = mount(<ImageViewer visible image={demoImages2[0]} fieldid={fieldid} />)
      await waitFor(() => {
        const element = wrapper.find(`[fieldid="${fieldid}"]`);
        expect(element.getDOMNode()).toBeInTheDocument();
      })
  });
  it('clsPrefix test, <test prop:: clsPrefix>', () => {
    const wrapper = mount(<ImageViewer visible image={demoImages2[0]} clsPrefix="testClassPre" />);
    expect(wrapper.find('.testClassPre-image-viewer').getDOMNode()).toBeInTheDocument();
  })
  it('component: ImageViewer, <test prop:: className>', async () => {
    const className = 'test-classname'
    const wrapper = mount(<ImageViewer visible image={demoImages2[0]} className={className} />);
    expect(wrapper.find('.test-classname').getDOMNode()).toBeInTheDocument();
  });
  it('style test, <test prop:: style>', async () => {
    const wrapper = mount(<ImageViewer visible image={demoImages2[0]} style={{display: "block"}} />);
    await waitFor(() => {
      expect(wrapper.find(`.${prefixImageViewer}`).props().style.display).toBe('block');
    })
  })

  it('visible test, <test prop:: visible>', async () => {
    const wrapper = mount(<ImageViewer visible image={demoImages2[0]} />)
    await waitFor(() => {
      const image = wrapper.find(`.${prefixImageViewer}`);
      expect(image.length).toBe(1);
    })
  });

  it('image test, <test prop:: image>', async () => {
    const wrapper = mount(<ImageViewer visible image={demoImages2[0]} />)
    await waitFor(() => {
      const image = wrapper.find(`.${prefixImageViewer}`);
      expect(image.length).toBe(1);
    })
  });

  it('renderFooter test, <test prop:: renderFooter>', async () => {
    const renderFooter = (image: string, index: number) => (
      <div className="footer">
        <div
          className="footerButton"
          onClick={() => {
            console.log('Loading...')
          }}
        >
          查看原图
        </div>
      </div>
    )
    const wrapper = mount(<ImageViewer visible image={demoImages2[0]} renderFooter={renderFooter} />)
    await waitFor(() => {
       ;
      expect(screen.getByText('查看原图')).toBeInTheDocument();
    })
  });

  // it('maxZoom test, <test prop:: maxZoom>', async () => {
  //   const wrapper = mount( <ImageViewer visible
  //                                       maxZoom={10}
  //                                       image={demoImages2[0]} />);
  //   await waitFor(() => {
  //     const image = wrapper.find(`.${prefixImageViewer}`);
  //      ;
  //     expect(image.getDOMNode()).toBeVisible()
  //   })
  // });

  // it('onClose test, <test prop:: onClose>', () => {
  //   const onClose = jest.fn();
  //   const wrapper = mount( <ImageViewer visible
  //                                       onClose={onClose}
  //                                       image={demoImages2[0]} />);
  //    ;
  //   wrapper.find(`.${prefixImageViewer}-slide`).simulate('touchend');
  //   expect(onClose).toHaveBeenCalled();
  // });

  // it('afterClose test, <test prop:: afterClose>', () => {
  //   const onClose = jest.fn();
  //   const afterClose = jest.fn();
  //   const wrapper = mount( <ImageViewer visible
  //                                       onClose={onClose}
  //                                       image={demoImages2[0]} />);
  //    ;
  //   wrapper.find(`.${prefixImageViewer}-slide`).simulate('touchstart');
  //   expect(onClose).toHaveBeenCalled();
  //   expect(afterClose).toHaveBeenCalled();
  // });

  const defaultGetContainer = () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.className = 'test-getcontainer';
    div.style.width = '300px';
    div.style.height = '300px';
    return div;
  };

  it('getContainer test, <test prop:: getContainer>', async() => {
    const wrapper = mount( <ImageViewer visible getContainer={defaultGetContainer}
                                        image={demoImages2[0]}  />);
      await waitFor(() => {
        const element = wrapper.find(`.test-getcontainer`);
         ;
        expect(element.find(`.${prefixImageViewer}`).getDOMNode()).toBeInTheDocument();
      })
  })
})

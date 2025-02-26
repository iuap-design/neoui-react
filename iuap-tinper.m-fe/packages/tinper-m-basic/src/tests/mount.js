import React from 'react';
import { render, fireEvent } from '@testing-library/react';
const match = (selector, element) => {
  const parentNode = element.parentNode;
  if (!parentNode.querySelectorAll(selector).length) {
    return false
  }
  const liIndex = Array.prototype.indexOf.call(parentNode.children, element)
  if (parentNode.querySelector(selector)===parentNode.children[liIndex]) {
    return true
  }
  return false
}

const getStyleFromString = (styleString) => {
  const styleArr = styleString.split(';')
  return styleArr.reduce((pre, current) => {
    if (!current) {
      return pre
    }
    const [key, value] = current.split(': ');
    return { ...pre, [key.trim()]: value }
  }, {})

}

const eventTypeMap = {
  compositionend: 'compositionEnd',
  compositionstart: 'compositionStart',
  compositionupdate: 'compositionUpdate',
  keydown: 'keyDown',
  keypress: 'keyPress',
  keyup: 'keyUp',
  focusin: 'focusIn',
  focusout: 'focusOut',
  contextmenu: 'contextMenu',
  dblclick: 'dblClick',
  dragend: 'dragEnd',
  dragenter: 'dragEnter',
  dragexit: 'dragExit',
  dragleave: 'dragLeave',
  dragover: 'dragOver',
  dragstart: 'dragStart',
  mousedown: 'mouseDown',
  mouseenter: 'mouseEnter',
  mouseleave: 'mouseLeave',
  mousemove: 'mouseMove',
  mouseout: 'mouseOut',
  mouseover: 'mouseOver',
  mouseup: 'mouseUp',
  popstate: 'popState',
  touchcancel: 'touchCancel',
  touchend: 'touchEnd',
  touchmove: 'touchMove',
  touchstart: 'touchStart',
  canplay: 'canPlay',
  canplaythrough: 'canPlayThrough',
  durationchange: 'durationChange',
  loadeddata: 'loadedData',
  loadedmetadata: 'loadedMetadata',
  loadstart: 'loadStart',
  ratechange: 'rateChange',
  timeupdate: 'timeUpdate',
  volumechange: 'volumeChange',
  animationstart: 'animationStart',
  animationend: 'animationEnd',
  animationiteration: 'animationIteration',
  transitioncancel: 'transitionCancel',
  transitionend: 'transitionEnd',
  transitionrun: 'transitionRun',
  transitionstart: 'transitionStart',
  doubleclick: 'doubleClick',
  pointerover: 'pointerOver',
  pointerenter: 'pointerEnter',
  pointerdown: 'pointerDown',
  pointermove: 'pointerMove',
  pointerup: 'pointerUp',
  pointercancel: 'pointerCancel',
  pointerout: 'pointerOut',
  pointerleave: 'pointerLeave',
  gotpointercapture: 'gotPointerCapture',
  lostpointercapture: 'lostPointerCapture'
}
export const mount = (component) => {
  const { container, rerender, baseElement, unmount, debug } = render(component);
  let find
  const reactWrapper = (node1) => {
    let node = node1
    return {
      length: node ? 1 : 0,
      getDOMNode: () => node,
      name: () => node.tagName.toLowerCase(),
      hasClass: (cls) => node.className.includes(cls),
      simulate: (eventType, ...options) => {
        if (!node) {
          debug()
        }
        fireEvent[eventTypeMap[eventType] || eventType](node, ...options)
      },
      instance: () => node,
      prop: (v) => (node[v] || node.getAttribute(v)) ?? undefined,
      props: () => {
        const obj = {}
        node.getAttributeNames().forEach(name => {
          if (name === 'style') {
            obj[name] = getStyleFromString(node.getAttribute(name))
            return
          }
          obj[name] = node[name] || node.getAttribute(name)
        });
        return obj
      },
      text: () => node.innerText || node.textContent || node.innerHTML,
      find: (matcher) => find(matcher, node),
      exists: (selector) => {
        if (selector) {
          return node.querySelectorAll(selector).length > 0
        }
        return !!node
      },
      update: () => undefined,
      childAt: (atIndex) => {
        const _node = node.children[atIndex]
        return { ..._node, ...reactWrapper(_node) }

      }
    }
  };
    // {a>bc>d}
  find = (matcher, container2) => {
    let nodes = container.querySelectorAll(matcher);
    if (container2 && container2.querySelectorAll(matcher).length) {
      nodes = container2.querySelectorAll(matcher);
    } else if (!nodes.length) {
      nodes = document.querySelectorAll(matcher);
    }
    // find 返回值
    // if (!nodes.length) {
    //     return []
    // }
    return {
      // ...obj,
      ...reactWrapper(nodes[0]),
      length: nodes.length,
      some: (selector) => {
        let hasSelector = false
        nodes.forEach(_ => {
          if (match(selector, _)) {
            hasSelector = true
          }
        })
        return hasSelector
      },
      exists: (selector) => {
        if (selector) {
          return nodes[0].querySelectorAll(selector).length > 0
        }
        return nodes?.length > 0
      },
      // NOTE: innerText is not implemented by jsdom
      text: () =>
      // if (nodes[0].innerText?.includes('二八') || nodes[0].innerHTML.includes('二八')) {
      //     console.log(nodes[0].innerText, nodes[0].textContent, nodes[0].innerHTML)
      // }
      // const returnVal = ''
      // if (nodes[0].innerHTML.includes('</')) {
      //     nodes[0].innerHTML.match(/\>(.+)\<\//)
      // }
        nodes[0].innerText || nodes[0].textContent || nodes[0].innerHTML
      ,
      first: () => {
        const node = nodes[0]
        return { ...node, ...reactWrapper(node) }
      },
      // childAt: (atIndex) => {
      //     const node  = nodes[atIndex]

      //     return {...node,...reactWrapper(node)}

      // },
      children: () => {
        const children = nodes[0].children
        return children

      },
      at: (atIndex) => {
        const node = nodes[atIndex]
        return { ...node, ...reactWrapper(node) }

      },
      last: () => {
        const node = nodes[nodes.length - 1]
        return { ...node, ...reactWrapper(node) }

      },
      instance: () => nodes[0],
      getDOMNode: () => nodes[0],
      prop: (v) => (nodes[0][v] || nodes[0].getAttribute(v)) ?? undefined,
      update: () => undefined,
      find: (matcher) => find(matcher, nodes[0]),
      hasClass: (cls) => nodes[0].className.includes(cls),
      simulate: (eventType, ...options) => {
        fireEvent[eventTypeMap[eventType] || eventType](nodes[0], ...options)
      },
      forEach: (callBack) => nodes.forEach((item, index) => {
        callBack({ ...item, ...reactWrapper(item) }, index)
      })
    };
  }
  // mount 的返回值
  return {
    ...reactWrapper(container.children[0]),
    find,

    html: () => container.innerHTML,
    setProps: (props) => {
      const updatedComponent = React.cloneElement(component, props);
      rerender(updatedComponent);
      // debug()
    },
    unmount: () => unmount(),
    update: () => undefined,
    instance: () => container.children[0],
    exists: (selector) => {

      if (selector) {
        return container.querySelectorAll(selector).length > 0 || baseElement.querySelectorAll(selector).length > 0
      }
      return container.children?.length > 0
    },
    debug: debug,
    props: () => {
      const obj = {}
      container.children[0].getAttributeNames().forEach(name => {
        if (name === 'style') {
          obj[name] = getStyleFromString(container.children[0].getAttribute(name))
          return
        }
        obj[name] = container.children[0][name] || container.children[0].getAttribute(name)
      });
      return obj
    },

  };
};
export const shallow = mount

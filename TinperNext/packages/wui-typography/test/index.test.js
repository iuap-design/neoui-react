/** Tag.tsx */
import exp from "constants";
import { mount, shallow } from "../../../next-ui-library/test/common/mount";
import { screen } from "@testing-library/react";
import React from "react";
import {
  attrsTest,
  eventsTest,
  testStyle,
  actWait,
  sleep,
} from "../../../next-ui-library/test/common/index";
import { prefix } from "../../wui-core/src/updatePrefix";
import Icon from "../../wui-icon/src/index";
import Typography from "../src/index";
import Base from "../src/base";
import useEllipsis from "../src/useEllipsis";
import ResizeObserver from 'resize-observer-polyfill';
import { findDOMNode } from 'react-dom';

const typographyPrefix = `.${prefix}-typography`;

const defaultConfig = {
  rows: 0.2, // div 高度模拟为100，相应的row 缩小为0.2，行高则计算为100 * 0.2 = 20
  ellipsisStr: "...",
  ellipsis: true,
  showPopover: true,
  direction: "end",
  expandable: true,
  defaultExpanded: true,
};
let defaultText = `A design is a plan or specification for the construction of an object or system or for the
implementation of an activity or process. A design is a plan or specification for the
construction of an object or system or for the implementation of an activity or process. A design is a plan or specification for the construction of an object or system or for the
implementation of an activity or process. A design is a plan or specification for the
construction of an object or system or for the implementation of an activity or process.`;

jest.mock('resize-observer-polyfill', () => {
    const React = require('react');

    const RefResizeObserver = (callBack) => {
        const disconnect = jest.fn();
        const observe = jest.fn();
        let entry = [{ contentRect: { width: 200 } }]
        callBack(entry);
        return {
            disconnect,
            observe
        };
    // class RefResizeObserver extends React.Component {
    //     constructor(props) {
    //         super();
    //     }
    //     onResize = (entry) => {
    //         this.props.onResize?.(entry);
    //     };
    //     disconnect = jest.fn();
    //     observe = jest.fn();
    //     componentDidMount() {
    //         this.onResize(this);
    //     }
    //     render() {
    //         return this.props.children;
    //     }
    }
  return {
    __esModule: true,
    default: RefResizeObserver,
  };
});
jest.spyOn(HTMLDivElement.prototype, 'offsetWidth', 'get').mockReturnValue(20)
jest.spyOn(HTMLDivElement.prototype, 'offsetHeight', 'get').mockReturnValue(100)

describe("Typography Test", () => {
  it("component: Paragraph, <test prop:: defaultExpanded>， <test prop:: expandable>", async () => {
    const wrapper = mount(
      <div style={{ width: "20px", position: "relative" }}>
        <Typography.Paragraph
            className="demo-ellipsis"
            ellipsis={{
                ...defaultConfig,
            }}
        >
          {defaultText}
        </Typography.Paragraph>
      </div>
    );
    // console.log(wrapper.html());

    expect(wrapper.find(`${typographyPrefix}-operation-expand`).length).toBe(1);
    expect(wrapper.find(`${typographyPrefix}-operation-expand`).text()).toBe("收起");
  });

  it("component: useEllipsis, <test prop:: ellipsis>", () => {
    const wrapper = shallow(
        <Typography.Paragraph
            ellipsis={{
                        ...defaultConfig,
                        defaultExpanded: false,
                        direction: 'start',
                    }}
        >
            {defaultText}
        </Typography.Paragraph>
    );
    expect(wrapper.find(`${typographyPrefix}-operation-expand`).length).toBe(1);
    expect(wrapper.find(`${typographyPrefix}-operation-expand`).text()).toBe("展开");
  });
  it("component: Paragraph, <test prop:: cssEllipsis>", () => {
    const demo = (_rows) => (
        <div style={{ width: "20px", position: "relative" }}>
            <Typography.Paragraph
                ellipsis={{
                    rows: _rows,
                    ellipsisStr: '...',
                    cssEllipsis: true,
                }}
            >
            {defaultText}
            </Typography.Paragraph>
        </div>
    );
    const wrapper = mount(demo(0.2));
    expect(wrapper.find(`${typographyPrefix}-simple-ellipsis`).length).toBe(1);
    const css_wrapper = mount(demo(2));
  });

  it("component: useEllipsis, <test prop:: direction>", () => {
    const demo = (_direction) => (
        <Typography.Paragraph
            ellipsis={{
                        ...defaultConfig,
                        defaultExpanded: false,
                        direction: _direction,
                    }}
        >
            {defaultText}
        </Typography.Paragraph>
    )
    const wrapper = shallow(demo('start'));
    expect(wrapper.find(`${typographyPrefix}-operation-expand`).length).toBe(1);
    expect(wrapper.find(`${typographyPrefix}-operation-expand`).text()).toBe("展开");
    shallow(demo('middle'));
    shallow(demo('end'));
  });
});

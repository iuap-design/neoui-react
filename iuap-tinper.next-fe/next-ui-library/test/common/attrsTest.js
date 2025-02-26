import {mount} from './mount';
import React from "react";
import {prefix} from '../../../packages/wui-core/src/updatePrefix';
import {actWait, sleep} from "./utils";
import {render, screen, fireEvent} from "@testing-library/react";

/**
 * selector与classname 配合使用，
 * 同时存在代表要根据具体类进行匹配，
 * 同时不存在代表，只匹配基本快照
 */
export const attrsTest = ({
    title, // 描述
    Component, // 当前组件
    wrapper,
    attrs, // 需要增加的属性
    testAttr = {},
    selector, // 需要匹配的选择器 (与classname同时存在或同时不存在)
    classnames = [], // 类名 default           (与selector同时存在或同时不存在)
    act = false
}) => {
    describe(title, () => {
        test(title + " " + Object.keys(attrs)[0], async () => {

            if (!wrapper) {
                wrapper = mount(<Component {...attrs} />);
                if (act) {
                    await actWait();
                }
            } else {
                wrapper.setProps({...attrs})
            }

            if (!selector || !classnames) return
            try {
                expect(classnames.every(c => wrapper.find(selector).first().hasClass(c))).toBe(true);
            } catch (error) {
                expect(wrapper.find(selector).first().getDOMNode()).toMatchSnapshot();
                throw (error);
            }
            if (Object.values(testAttr).length) {
                wrapper.setProps({...testAttr})
                wrapper.update();
                if (act) {
                    await actWait();
                }
                if (!wrapper.find(selector).first().exists()) {
                    expect(wrapper.find(selector).first()).toHaveLength(0)
                } else {
                    expect(classnames.every(c => wrapper.find(selector).first().hasClass(c))).toBe(false);
                }
            }

        })
    })
}
export const attrsTestByLength = ({
    title, // 描述
    Component, // 当前组件
    wrapper,
    beforeTest, // func
    attrs, // 需要增加的属性
    selector, // 需要匹配的选择器 (与classname同时存在或同时不存在)
    nodeCount, // 类名 default           (与selector同时存在或同时不存在)
    testAttrArr = [], //[ {nodeCount: number, other}]
    afterTest, // func
    act = false
}) => {
    describe(title, () => {
        test(title + " " + 'it should have length ' + (nodeCount || testAttrArr[0]?.nodeCount), async () => {

            if (!wrapper) {
                wrapper = mount(<Component {...attrs} />);
            }
            wrapper.setProps({...attrs})
            if (act) {
                await actWait();
            }
            if (beforeTest) {
                beforeTest(wrapper);
                await sleep(300)
                wrapper.update();
            }
            if (!selector) return;
            if (typeof nodeCount === 'number' && nodeCount >= 0) {
                try {
                    expect(wrapper.find(selector).length).toBe(nodeCount)
                } catch (error) {
                    expect(wrapper).toMatchSnapshot()
                    throw (error)
                }
            }

            if (testAttrArr.length) {
                for (let obj of testAttrArr) {
                    const {nodeCount: count, ...attr} = obj
                    wrapper.setProps(attr);
                    if (act) {
                        await actWait();
                    }
                    try {
                        expect(wrapper.find(selector)).toHaveLength(count)
                    } catch (error) {
                        expect(wrapper).toMatchSnapshot()
                        throw (error)
                    }
                }
            }
            if (afterTest) {
                afterTest(wrapper)
            }

        })
    })
}
export const testRootDomClsPrefix = ({
    name,
    Component, // current component
    selector,
    attr = {}
}) => {
    describe(`${name} : test cls-prefix`, () => {
        it(`the ${name} root class should beggin with ${prefix}`, () => {
            const wrapper = mount(<Component {...attr} />);
            const rootDom = selector ? wrapper.find(selector) : wrapper;
            try {
                if(!rootDom?.getDOMNode().getAttribute('class').includes(prefix)) {
                    wrapper.debug();
                    expect(rootDom).toMatchSnapshot();
                }
            } catch (error) {
                wrapper.debug();
            }
            
            expect(rootDom?.getDOMNode().getAttribute('class')).toContain(prefix);
            // wrapper.unmount();
        })
    })
}
export const testPropClassName = ({
    name,
    Component, // current component
    selector,
    attr = {}
}) => {
    describe(`${name} test props : className `, () => {
        it(`the ${name} component's root dom should has class "demo-yogi"`, () => {
            const wrapper = mount(<Component {...attr} className="demo-yogi" />);
            const rootDom = selector ? wrapper.find(selector) : wrapper;
            try {
                if (!rootDom.hasClass("demo-yogi")) {
                    expect(rootDom).toMatchSnapshot();
                    wrapper.debug()
                }
            } catch (error) {
                    wrapper.debug()
            }
            
            expect(rootDom.hasClass("demo-yogi")).toBe(true);
            // wrapper.unmount();
        })
    })
}
export const testPropId = ({
    Component, // current component
    selector,
    id,
    clsPrefix
}) => {
    describe('test props id', () => {
        it(`the dom should contain ${clsPrefix}`, () => {
            const wrapper = mount(<Component />);
            wrapper.setProps({id});
            const idSelector = selector ? wrapper.find(selector).first() : wrapper.find('div').first();
            expect(idSelector).instance().props.id.toBe(id);
        })
    })
}
export const testPropFieldid = ({name, Component, selector, attr = {}}) => {
    describe('test props fieldid', () => {
        it(`${name} component's first dom should contain fieldid named demo_fieldid`, async() => {
            const {children, ...otherProps} = attr;
            const wrapper = mount(<Component fieldid="demo_fieldid" children={children} {...otherProps} />);
            // wrapper.setProps({...otherProps});
            // wrapper.update();
            await sleep(100)

            const fieldSelector = selector ? wrapper.find(selector).first() : wrapper;
            if (!fieldSelector?.getDOMNode()?.getAttribute('fieldid')?.startsWith('demo_fieldid')) {
                wrapper.debug();
                expect(fieldSelector.getDOMNode()).toMatchSnapshot();
            }
            expect(fieldSelector.getDOMNode()?.getAttribute('fieldid')?.startsWith?.('demo_fieldid')).toBeTruthy();
            wrapper.unmount();
        })
    })
}
export const testStyle = ({
    title,
    Component, // current component
    attr={},
    selector,
    style
}) => {
    describe(`${title}`, () => {
        let wrapper;
        beforeEach(()=> {
            wrapper = mount(<Component {...attr}/>);
            wrapper.setProps({style});
        })
        Object.entries(style).forEach(item => {
            it(`the dom should contain ${item[0]}: ${item[1]}`, () => {
                const styleSelector = wrapper.find(selector).first();
                expect(styleSelector.getDOMNode().style[item[0]]).toBe(item[1]);
            })
        })

    })
}
export const testCustomStyle = ({
    title,
    Component, // current component
    selector,
    attrs,
    verifyStyle,
    wrapper,
    act = false
}) => {
    describe(`${title}`, () => {
        const styleArr = Object.entries(verifyStyle)
        it(`the dom should contain ${styleArr[0][0]}: ${styleArr[0][1]}`, async () => {
            if (!wrapper) {
                wrapper = mount(<Component {...attrs} />);
            }
            wrapper.setProps(attrs);
            wrapper.update()
            if (act) {
                await actWait();
            }
            const styleSelector = wrapper.find(selector).first();
            try {
                expect(styleSelector.getDOMNode().style[styleArr[0][0]]).toBe(styleArr[0][1]);
            } catch (error) {
                expect(wrapper.getDOMNode()).toMatchSnapshot();
                throw (error);
            }

        })
    })
}
export const testChildren = ({
    title,
    Component, // current component
    attrs,
    selector
}) => {
    describe(`${title}`, () => {
        it(`the children length should be 1`, () => {
            const wrapper = mount(<Component {...attrs} />);
            expect(wrapper.find(selector)).toHaveLength(1)
        })
    })
}
export const testCustomeText = ({ title, Component, selector, attrs, wrapper, text, act }) => {
    describe(`${title}`, () => {
        it(`${title} should be ${text} text`, async () => {
            if(!wrapper) {
                wrapper = mount(<Component {...attrs} />);
            }
            wrapper.setProps(attrs)
            wrapper.update()
            if (act) {
                await actWait()
            }
            try{
                expect(wrapper.find(selector).first().text()).toEqual(text)
            } catch (error) {
                expect(wrapper.getDOMNode()).toMatchSnapshot();
                throw (error)
            }
        })
    })
}

/**
 * @desc 测试options类对多语string改span的兼容
 * @param {string} title
 * @param {ReactNode} ParentComp 子组件必须配合父组件使用时传入，如：Menu
 * @param {ReactNode} Component 待测子组件，形如：Menu.SubMenu
 * @param {Object} attrs 其他需传入的属性，如：打开面板的open
 * @param {string} itemsKey items数据集属性名，如：options、ranges、items
 * @param {string} propKey item项中待测属性名，如：items[0].title的title、ranges[0].label的label
 * @param {ReactNode} contentNode item项中待测属性值，如：<span>我是str2jsx测试节点</span>
 * @param {string} selector span选择器
 * @param {string} text span的文本内容
 * @param {string} propType 'text' | 'attr' | 'item' | 'arr'；其中 text: 文本，attr: img.alt等属性，item: options[i].label等，arr: string[] Rate.tooltips等属性
 */
export const testMultiLang = ({
    title,
    Component,
    selector,
    propType,
    attrName,
    attrs,
    wrapper,
    text,
    ParentComp,
    parentProps,
    itemsKey,
    propKey,
    contentNode,
    beforeCb
}) => {
    if(!selector) return
    describe(`${title}`, () => {
        it(`it should be ${text} ${propType}`, () => {
            if (propType === 'item') {
                attrs[itemsKey][0][attrName || propKey] = contentNode // 唯一比text多处理的参数行
            } else if (propType === 'arr') {
                attrs[itemsKey][0] = contentNode // 唯一比text多处理的参数行
            } 
            if (!wrapper) {
                if (ParentComp) {
                    wrapper = mount(
                        <ParentComp {...parentProps}>
                            <Component {...attrs} />
                        </ParentComp>
                    )
                } else {
                    wrapper = mount(<Component {...attrs} />)
                }
            }
            wrapper.update()
            try {
                if (propType === 'attr') {
                    beforeCb?.(wrapper)
                    expect(wrapper.find(selector).at(0).getDOMNode()[attrName || propKey]).toContain(text)
                } else if (['item', 'text'].includes(propType)) {
                    beforeCb?.(wrapper)
                    expect(wrapper.find(selector).at(0).text()).toContain(text)
                }
            } catch (error) {
                expect(wrapper.getDOMNode()).toMatchSnapshot()
                throw error
            }
            wrapper.unmount()
        })
    })
}

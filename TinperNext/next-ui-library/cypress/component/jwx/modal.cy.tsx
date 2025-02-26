import React from 'react';
import { Modal, Icon } from '../../../../packages';
import IsMaximizeDemo from './isMaximizeDemo';
import NestedModal from './nestedModal';
import { ModalSize } from '../../../../packages/wui-modal/src/iModal';

describe('modal.cy.tsx', () => {
    it('should mount correctly and closable', () => {
        cy.mount(<Modal visible closable>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>).then(() => {
            cy.get('.close').should('be.visible').then(() => {
                cy.compareSnapshot('1-modal-mount-correctly')
                cy.get('.close').click()
                cy.compareSnapshot('1-modal-closed')
            })
        })
    });
    it('should show at poistion { x: 20, y: 20 }', () => {
        cy.mount(<Modal visible showPosition={{ x: 20, y: 20 }}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>).then(() => {
            cy.compareSnapshot('2-modal-showPosition')
        })
    });
    ["sm", "md", "lg", "xlg"].forEach(size => {
        it(`should render size ${size}`, () => {
            cy.mount(<Modal visible size={size as ModalSize} />).then(() => {
                cy.compareSnapshot(`3-modal-size-${size}`)
            })
        });
    });
    ["zh-cn", "zh-tw", "en-us", "vi-vn", "id-id"].forEach(lang => {
        it(`should render locale ${lang}`, () => {
            cy.mount(<Modal visible locale={lang} />).then(() => {
                cy.compareSnapshot(`4-modal-language-${lang}`)
            })
        });
    });
    it('should render a custom close icon', () => {
        cy.mount(<Modal visible closeIcon={<Icon type="uf-close-c-o" />} />).then(() => {
            cy.compareSnapshot('5-modal-custom-close')
        })
    });
    it('should render a custom title', () => {
        cy.mount(<Modal visible title={<div>自定义标题</div>} />).then(() => {
            cy.compareSnapshot('6-modal-custom-title')
        })
    });
    it('should render a cancelText', () => {
        cy.mount(<Modal visible cancelText='自定义取消' />).then(() => {
            cy.compareSnapshot('7-modal-custom-cancelText')
        })
    });
    it('should render a okText', () => {
        cy.mount(<Modal visible okText='自定义确定' />).then(() => {
            cy.compareSnapshot('8-modal-custom-okText')
        })
    });
    it('modal-nomask', () => {
        cy.mount(<Modal mask={false} visible />).then(() => {
            cy.compareSnapshot('9-modal-nomask')
        })
    });
    [0, 100, 500, 3000].forEach((val) => {
        it(`modal-width`, () => {
            cy.mount(<Modal visible width={val} />).then(() => {
                cy.compareSnapshot(`10-modal-width-${val}`)
            })
        });
        it(`modal-height`, () => {
            cy.mount(<Modal visible height={val} />).then(() => {
                cy.compareSnapshot(`10-modal-height-${val}`)
            })
        });
        it(`modal-width-minwidth-minWidth`, () => {
            cy.mount(<Modal visible width={val} minWidth={400} maxWidth={1000} />).then(() => {
                cy.compareSnapshot(`10-modal-width-${val}-with-minWidth`)
            })
        });
        it(`modal-width-minHeight-maxHeight`, () => {
            cy.mount(<Modal visible height={val} minHeight={400} maxHeight={1000} />).then(() => {
                cy.compareSnapshot(`10-modal-height-${val}-with-minHeight`)
            })
        });
    });
    it('containerStyle', () => {
        cy.mount(<Modal visible containerStyle={{ width: 500, background: 'yellow' }} />).then(() => {
            cy.compareSnapshot('11-modal-containerStyle')
        })
    });
    // centered and showposition同时使用会报错
    // it('centered and showposition', () => {
    //     cy.mount(<Modal visible centered showPosition={{ x: 20, y: 20 }} />).then(() => {
    //         cy.compareSnapshot('12-modal-centered-showposition')
    //         // Uncaught Error: Maximum update depth exceeded. 

    //     })
    // });
    it('modal-maskClosable', () => {
        // 解决点击modal遮罩层后不能关闭的bug 
        const onMaskClick = cy.spy();
        cy.mount(<Modal visible maskClosable onMaskClick={onMaskClick} />).then(() => {
            cy.get('.wui-modal-mask').click().then(() => {
                cy.compareSnapshot('13-modal-mask-closed')
                expect(onMaskClick).to.have.been.calledOnce
            })
        })
    });
    it('keybord', () => {
        const onEscapeKeyUp = cy.spy();
        const onOk = cy.spy();
        const onCancel = cy.spy();
        cy.mount(<Modal visible keyboard onEscapeKeyUp={onEscapeKeyUp} />).then(() => {
            cy.get('body').type('{esc}').then(() => {
                expect(onEscapeKeyUp).to.have.been.calledOnce
                cy.compareSnapshot('14-modal-esc')
            })
        })
        cy.mount(<Modal visible keyboard onOk={onOk} />).then(() => {
            cy.get('body').type('{alt}Y').then(() => {
                expect(onOk).to.have.been.calledOnce
                cy.compareSnapshot('15-modal-{alt}Y')
            })
        })
        cy.mount(<Modal visible keyboard onCancel={onCancel} />).then(() => {
            cy.get('body').type('{alt}N').then(() => {
                expect(onCancel).to.have.been.calledOnce
                cy.compareSnapshot('16-modal-{alt}N')
            })
        })
    });
    it('nestedModal draggle keyboard', () => {
        // 解决弹窗嵌套出现残影问题 
        // 解决嵌套modal 按esc 同时关闭的问题 
        // 解决嵌套modal draggle 同时拖拽的问题 
        cy.mount(<NestedModal />).then(() => {
            cy.get('.open1').click()
            cy.get('.open2').click()
            cy.get('.modal2 .wui-modal-header-dnd-handle').trigger('mousedown', { which: 1 })
                .trigger('mousemove', { clientX: 400 })
                .trigger('mousemove', { clientY: 400 })
                .trigger('mouseup')
            cy.compareSnapshot('17-nested-modal-dragged')
            cy.get('body').type('{esc}')
            cy.compareSnapshot('17-nested-modal-esc')
        })
    });
    it('isMaximize position', () => {
        cy.mount(<IsMaximizeDemo />).then(() => {
            cy.get('.open1').click();
            cy.compareSnapshot('18-isMaximize-fullscreen')

            //缩小时会居中
            cy.get('.modal1 .maximize').click();
            cy.compareSnapshot('18-will-center-when-minimize')

            //第二个modal在指定范围最大化
            cy.get('.close').eq(0).click();
            cy.get('.open2').click();
            cy.compareSnapshot('18-isMaximize-container')

            //缩小时会居中
            cy.get('.modal2 .maximize').click();
            cy.compareSnapshot('18-will-center-when-minimize2')

            // 拖拽之后
            cy.get('.modal2 .wui-modal-header-dnd-handle').trigger('mousedown', { which: 1 })
                .trigger('mousemove', { clientX: 100, clientY: 100 })
                .trigger('mouseup')
            cy.compareSnapshot('18-position-after-drag')

            //拖拽之后，放大再缩小，不会重新居中
            cy.get('.modal2 .maximize').click();
            cy.get('.modal2 .maximize').click();
            cy.compareSnapshot('18-position-after-drag-and-donot-center')
        })
    });
    it('resizable', () => {
        // QDJCJS-9238 解决resize可以到屏幕上方窗口外 
        cy.mount(<Modal visible resizable>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>).then(() => {
            cy.compareSnapshot('19-before-resize')
            cy.get('[style="position: absolute; user-select: none; width: 20px; height: 20px; left: -10px; top: -10px; cursor: nw-resize;"]')
                .trigger('mousedown', { which: 1 })
                .trigger('mousemove', { force: true, which: 1, eventConstructor: 'MouseEvent', clientX: -500 })
                .trigger('mousemove', { force: true, which: 1, eventConstructor: 'MouseEvent', clientX: -500 })
                .trigger('mousemove', { force: true, which: 1, eventConstructor: 'MouseEvent', clientY: -100 })
                .trigger('mousemove', { force: true, which: 1, eventConstructor: 'MouseEvent', clientY: -100 }) 
                .trigger('mouseup', { force: true })
            cy.compareSnapshot('19-after-resize')
        })
    });
    it('resizable with large contebt', () => {
        // 修复 resizable时 初始化 内容过大 resize边界和content边界不一致问题 
        // 修复modal resize和draggabble 同时存在时拖动到边角 生成滚动条
        cy.mount(<Modal draggable visible resizable maxWidth={"1000"} maxHeight={"500px"} minWidth={400} minHeight={200}>
            <Modal.Body>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>

                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal.Body>
        </Modal>).then(() => {
            cy.compareSnapshot('20-before-resize')
            cy.get('[style="position: absolute; user-select: none; width: 20px; height: 20px; left: -10px; top: -10px; cursor: nw-resize;"]')
                .trigger('mousedown', { which: 1 })
                .trigger('mousemove', { force: true, which: 1, eventConstructor: 'MouseEvent', clientX: -500, clientY: -100 })
                .trigger('mouseup', { force: true })
            cy.compareSnapshot('20-after-resize-to-big') //拖拽变大
            cy.get('[style="position: absolute; user-select: none; width: 20px; height: 20px; left: -10px; top: -10px; cursor: nw-resize;"]')
                .trigger('mousedown', { which: 1 })
                .trigger('mousemove', { force: true, which: 1, eventConstructor: 'MouseEvent', clientX: 500, clientY: 500 })
                .trigger('mouseup', { force: true })
            cy.compareSnapshot('20-after-resize-to-smoll') //拖拽变小
            cy.get('.wui-modal-header-dnd-handle').trigger('mousedown', { which: 1 })
                .trigger('mousemove', { clientX: 300, clientY: -500 })
                .trigger('mouseup')
            cy.compareSnapshot('20-drag') //拖拽整个弹窗到上方靠近窗口边界
            cy.get('[style="position: absolute; user-select: none; width: 20px; height: 20px; left: -10px; top: -10px; cursor: nw-resize;"]')
                .trigger('mousedown', { which: 1 })
                .trigger('mousemove', { force: true, which: 1, eventConstructor: 'MouseEvent', clientX: -200, clientY: -200 })
                .trigger('mouseup', { force: true })
            cy.compareSnapshot('20-resize-after-drag') //再次拖拽变大
        })
    });
    it('resizable when centered', () => {
        // 解决了窗体大小通过交互变化时 不能强制居中的问题 
        cy.mount(<Modal visible resizable centered>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>).then(() => {
            cy.compareSnapshot('21-centered-before-resize')
            cy.get('[style="position: absolute; user-select: none; width: 20px; height: 20px; left: -10px; top: -10px; cursor: nw-resize;"]')
                .trigger('mousedown', { which: 1 })
                .trigger('mousemove', { force: true, which: 1, eventConstructor: 'MouseEvent', clientX: -500, clientY: -100 })
                .trigger('mouseup', { force: true })
            cy.compareSnapshot('21-centered-after-resize-to-big') //拖拽变大
            cy.get('[style="position: absolute; user-select: none; width: 20px; height: 20px; left: -10px; top: -10px; cursor: nw-resize;"]')
                .trigger('mousedown', { which: 1 })
                .trigger('mousemove', { force: true, which: 1, eventConstructor: 'MouseEvent', clientX: 500, clientY: 500 })
                .trigger('mouseup', { force: true })
            cy.compareSnapshot('22-centered-after-resize-to-smoll') //拖拽变小
        })
    });
    it('resizable when showposition', () => {
        // 使用固定位置时 改变窗口不会使 modal 居中
        cy.mount(<Modal visible resizable showPosition={{ x: 20, y: 20 }}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>).then(() => {
            cy.compareSnapshot('23-showposition-before-resize')
            cy.get('[style="position: absolute; user-select: none; width: 20px; height: 20px; left: -10px; top: -10px; cursor: nw-resize;"]')
                .trigger('mousedown', { which: 1 })
                .trigger('mousemove', { force: true, which: 1, eventConstructor: 'MouseEvent', clientX: 500, clientY: 500 })
                .trigger('mouseup', { force: true })
            cy.compareSnapshot('23-showposition-after-resize') 
        })
    });
})

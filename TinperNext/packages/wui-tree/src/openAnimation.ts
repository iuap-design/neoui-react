import {cssAnimation} from '../../wui-core/src';
import {prefix} from "../../wui-core/src/index";

function animate(node: HTMLElement, show: boolean, done: Function) {
    let height: number;
    return cssAnimation(node, `${prefix}-motion-collapse`, {
        start() {
            if (!show) {
                node.style.height = `${node.offsetHeight}px`;
            } else {
                height = node.offsetHeight;
                node.style.height = '0';
            }
        },
        active() {
            node.style.height = `${show ? height : 0}px`;
        },
        end() {
            node.style.height = '';
            done();
        },
    });
}

const animation = {
    enter(node: HTMLElement, done: Function) {
        return animate(node, true, done);
    },
    leave(node: HTMLElement, done: Function) {
        return animate(node, false, done);
    },
    appear(node: HTMLElement, done: Function) {
        return animate(node, true, done);
    },
};

export default animation;

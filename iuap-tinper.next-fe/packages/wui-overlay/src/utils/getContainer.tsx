import ReactDOM from 'react-dom';
import { ContainerNode } from './IUtils';

/**
 * 获取容器组件
 * @param  {[type]} container        [description]
 * @param  {[type]} defaultContainer [description]
 * @return {[type]}                  [description]
 */
export default function getContainer(container: ContainerNode, defaultContainer: HTMLElement): HTMLElement {
    container = typeof container === 'function' ? (container as (h?: HTMLElement) => HTMLElement)() : container;
    return (ReactDOM.findDOMNode(container) || defaultContainer) as HTMLElement;
}

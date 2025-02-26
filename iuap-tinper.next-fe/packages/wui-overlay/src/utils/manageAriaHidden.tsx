const BLACKLIST = ['template', 'script', 'style'];

let isHidable = ({nodeType, tagName}: {nodeType: number; tagName: string;}) =>
    nodeType === 1 && BLACKLIST.indexOf(tagName.toLowerCase()) === -1;

let siblings = (container: HTMLElement, mount: HTMLElement[], cb: (n: HTMLElement)=> void) => {
    mount = [].concat(mount as any);

    [].forEach.call(container.children, node => {
        if (mount.indexOf(node) === -1 && isHidable(node)) {
            cb(node);
        }
    });
};

export function ariaHidden(show: boolean, node:HTMLElement) {
    if (!node) {
        return;
    }
    if (show) {
        node.setAttribute('aria-hidden', 'true');
    } else {
        node.removeAttribute('aria-hidden');
    }
}

export function hideSiblings(container: HTMLElement, mountNode: HTMLElement[]) {
    siblings(container, mountNode, node => ariaHidden(true, node));
}

export function showSiblings(container: HTMLElement, mountNode: HTMLElement[]) {
    siblings(container, mountNode, node => ariaHidden(false, node));
}

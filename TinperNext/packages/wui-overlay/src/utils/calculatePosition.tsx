import getOffset from 'dom-helpers/query/offset';
import getPosition from 'dom-helpers/query/position';
import getScrollTop from 'dom-helpers/query/scrollTop';
import { Placement } from '../iOverlay';

import ownerDocument from './ownerDocument';

function getContainerDimensions(containerNode: HTMLElement) {
    let width, height, scroll;

    if (containerNode.tagName === 'BODY') {
        width = document.body.scrollWidth;
        height = document.body.scrollHeight;

        scroll =
			getScrollTop(ownerDocument(containerNode).documentElement) ||
			getScrollTop(containerNode);
    } else {
        ({width, height} = getOffset(containerNode));
        scroll = getScrollTop(containerNode);
    }

    return {width, height, scroll};
}

function getTopDelta(top: number, overlayHeight: number, container: HTMLElement, padding: number) {
    const containerDimensions = getContainerDimensions(container);
    const containerScroll = containerDimensions.scroll;
    const containerHeight = containerDimensions.height;

    const topEdgeOffset = top - padding - containerScroll;
    const bottomEdgeOffset = top + padding - containerScroll + overlayHeight;

    if (topEdgeOffset < 0) {
        return -topEdgeOffset;
    } else if (bottomEdgeOffset > (containerHeight - containerScroll)) {
        return containerHeight - bottomEdgeOffset - containerScroll;
    } else {
        return 0;
    }
}

function getLeftDelta(left: number, overlayWidth: number, container: HTMLElement, padding: number) {
    const containerDimensions = getContainerDimensions(container);
    const containerWidth = containerDimensions.width;

    const leftEdgeOffset = left - padding;
    const rightEdgeOffset = left + padding + overlayWidth;

    if (leftEdgeOffset < 0) {
        return -leftEdgeOffset;
    } else if (rightEdgeOffset > containerWidth) {
        return containerWidth - rightEdgeOffset;
    }

    return 0;
}

export default function calculatePosition(placement: Placement, overlayNode: HTMLElement, target: HTMLElement, container: HTMLElement, padding: number) {
    const childOffset = container.tagName === 'BODY' ?
        getOffset(target) : getPosition(target, container);

    const {height: overlayHeight, width: overlayWidth} =
		getOffset(overlayNode);

    let positionLeft, positionTop, arrowOffsetLeft, arrowOffsetTop, inverseArrow;

    if (/^left|^right/.test(placement)) {
        positionTop = childOffset.top + (childOffset.height - overlayHeight) / 2;

        if (/left/.test(placement)) {
            positionLeft = childOffset.left - overlayWidth;
        } else {
            positionLeft = childOffset.left + childOffset.width;
        }

        if (/Top/.test(placement)) {
            positionTop = childOffset.top;
        } else if (/Bottom/.test(placement)) {
            positionTop = childOffset.top + childOffset.height - overlayHeight;
        }

        const topDelta = getTopDelta(
            positionTop, overlayHeight, container, padding
        );
        const leftDelta = getLeftDelta(
            positionLeft, overlayWidth, container, padding
        );
        // 内容超出
        if (leftDelta > 0) {
            inverseArrow = true;
            positionLeft = childOffset.left + childOffset.width + 6;
        } else if (leftDelta < 0) {
            inverseArrow = true;
            positionLeft = childOffset.left - overlayWidth - 6;
        } else {
            positionLeft += leftDelta;
        }
        positionTop += topDelta;
        arrowOffsetTop = 50 * (1 - 2 * topDelta / overlayHeight) + '%';
        arrowOffsetLeft = 0;

    } else if (/^top|^bottom/.test(placement)) {
        positionLeft = childOffset.left + (childOffset.width - overlayWidth) / 2;

        if (/top/.test(placement)) {
            positionTop = childOffset.top - overlayHeight;
        } else {
            positionTop = childOffset.top + childOffset.height;
        }

        if (/Left/.test(placement)) {
            positionLeft = childOffset.left;
        } else if (/Right/.test(placement)) {
            positionLeft = childOffset.left + (childOffset.width - overlayWidth);
        }


        const leftDelta = getLeftDelta(
            positionLeft, overlayWidth, container, padding
        );
        const topDelta = getTopDelta(
            positionTop, overlayHeight, container, padding
        );
        positionLeft += leftDelta;
        arrowOffsetLeft = 50 * (1 - 2 * leftDelta / overlayWidth) + '%';
        arrowOffsetTop = 0;
        if (topDelta > 0) {
            inverseArrow = true;
            positionTop = childOffset.top + childOffset.height + 6;
        } else if (topDelta < 0) {
            inverseArrow = true;
            positionTop = childOffset.top - overlayHeight - 6;
        } else {
            positionTop += topDelta;
        }

        // if((positionLeft + panelWidth) > docWidth)
        //         left = docWidth - panelWidth - 10;
        //     if(left < 0)
        //         left = 0;

        //      if((top + panelHeight) > docHeight) {
        //  top = docHeight - panelHeight - 10;
        //  }

        //      if(top < 0)
        //          top = 0;

    } else {
        throw new Error(
            `calcOverlayPosition(): No such placement of "${placement}" found.`
        );
    }

    return {positionLeft, positionTop, arrowOffsetLeft, arrowOffsetTop, inverseArrow, width: overlayWidth};
}

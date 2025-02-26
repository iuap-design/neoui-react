import React, { useMemo, useRef, useState, CSSProperties, useEffect, useLayoutEffect, LegacyRef } from 'react';
import { throttleByRaf } from './util';
import { EllipsisConfig } from './iTypography';

interface IEllipsis extends EllipsisConfig {
  width: number;
  renderMeasureContent: (slicedNode: any, isEllipsis: boolean) => React.ReactNode;
  expanding?: boolean;
  simpleEllipsis?: boolean;
  renderOperations?: (isEllipsis: boolean) => React.ReactNode;
}

// line-height baseline
const MEASURE_LINE_HEIGHT_TEXT = 'hxj';

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum MEASURE_STATUS {
  INIT = 0,
  BEFORE_MEASURE = 1,
  MEASURING = 2,
  MEASURE_END = 3,
  NO_NEED_ELLIPSIS = 4,
}

export enum DirectionIndex {
    START = -1,
    MIDDLE = 0.5,
    END = 0
}

function useEllipsis(props: React.PropsWithChildren<IEllipsis>) {
    const {
        children,
        rows = 1,
        width,
        expanding,
        renderMeasureContent,
        simpleEllipsis,
        onEllipsis,
        suffix,
        expandNodes,
        expandable,
        ellipsisStr,
        direction = 'end',
        renderOperations,
    } = props;
    const singleRowNode = useRef<HTMLDivElement>();
    const mirrorNode = useRef<HTMLDivElement>();
    const [binarySearchIndex, setBinarySearchIndex] = useState([0, 0, 0]);
    const [lineHeight, setLineHeight] = useState(0);
    const [status, setStatus] = useState(MEASURE_STATUS.NO_NEED_ELLIPSIS);
    const [startLoc, midLoc, endLoc] = binarySearchIndex;
    const [isEllipsis, setIsEllipsis] = useState(false);

    const nodeList = useMemo(() => React.Children.toArray(children), [children]);
    const closedLoc = useRef(0);
    useEffect(() => {
        onEllipsis && onEllipsis(isEllipsis);
    }, [isEllipsis]);

    const isSimpleNode = (node: React.ReactElement) => {
        return typeof node === 'string' || typeof node === 'number';
    };

    const getTotalLen = (list: typeof nodeList) => {
        let total = 0;
        list.forEach((node) => {
            if (isSimpleNode(node as React.ReactElement)) {
                total += String(node).length;
            } else {
                total += 1;
            }
        });
        return total;
    };

    const totalLen = useMemo(() => getTotalLen(nodeList), [nodeList]);

    const updateSearchIndex = throttleByRaf((searchIndex) => setBinarySearchIndex(searchIndex));

    // 获取节点全部文本内容
    const getAllTextContent = (node: React.ReactElement) => {
        let textContent = '';
        if (isSimpleNode(node)) {
            return textContent += String(node);
        } else if (React.isValidElement(node) && node.props) {
            const { children = '' } = node.props as React.HTMLAttributes<any>;
            if (Array.isArray(children)) {
                children.forEach((child) => {
                    getAllTextContent(child);
                });
            } else {
                getAllTextContent(children as React.ReactElement);
            }
        }

        return textContent;
    }

    const getSlicedNode = (sliceLen: number, isEllipsis: boolean) => {
        const slicedNode: React.ReactNode[] = [];
        let currentLen = 0;
        let currentEllipsisStr = ellipsisStr !== undefined
            ? ellipsisStr
            : '...';
        let operations = renderOperations && renderOperations(isEllipsis);
        if (sliceLen >= totalLen) {
            return nodeList;
        }
        if (direction === 'end') {
            for (const index in nodeList) {
                const node = nodeList[index] as React.ReactElement;
                if (currentLen >= sliceLen) {
                    return slicedNode;
                }
                const currentNodeLen = isSimpleNode(node) ? String(node).length : 1;
                if (currentNodeLen >= sliceLen - currentLen - 2) { // 留两个字符的余量
                    if (isSimpleNode(node)) {
                        slicedNode.push(String(node).slice(0, sliceLen - currentLen - 2));
                    } else {
                        const allText = getAllTextContent(node);
                        if (allText.length > sliceLen - currentLen - 2) {
                            slicedNode.push(allText.slice(0, sliceLen - currentLen - 2));
                        } else {
                            slicedNode.push(node);
                        }
                    }
                    slicedNode.push(currentEllipsisStr);
                    slicedNode.push(operations)
                    currentLen = sliceLen;
                    return slicedNode;
                }
                currentLen += currentNodeLen;
                slicedNode.push(node);
            }
        } else if (direction === 'start') {
            for (let index = nodeList.length; index > 0; index--) {
                const node = nodeList[index - 1];
                if (currentLen >= sliceLen) {
                    return slicedNode;
                }
                const currentNodeLen = isSimpleNode(node as React.ReactElement) ? String(node).length : 1;
                if (currentNodeLen >= sliceLen - currentLen - 2) { // 留两个字符的余量
                    slicedNode.push(String(node).slice(-(sliceLen - currentLen)));
                    slicedNode.unshift(operations);
                    slicedNode.unshift(currentEllipsisStr);
                    currentLen = sliceLen;
                    return slicedNode;
                }
                currentLen += currentNodeLen;
                slicedNode.push(node);
            }
        } else if (direction === 'middle') {
            let frontLen = 0;
            let backLen = 0;
            for (const index in nodeList) {
                const frontNode = nodeList[index];
                const backNode = nodeList[nodeList.length - Number(index) - 1];
                slicedNode.push(currentEllipsisStr);
                slicedNode.push(operations);
                if (frontLen + backLen >= sliceLen) {
                    return slicedNode;
                }
                const currentFrontNodeLen = isSimpleNode(frontNode as React.ReactElement) ? String(frontNode).length : 1;
                const currentBackNodeLen = isSimpleNode(backNode as React.ReactElement) ? String(backNode).length : 1;
                if (currentFrontNodeLen >= sliceLen / 2 - frontLen - 1) { // 留1个字符的余量
                    slicedNode.unshift(String(frontNode).slice(0, sliceLen / 2 - frontLen));
                    frontLen = sliceLen / 2;
                }
                if (currentBackNodeLen >= sliceLen / 2 - backLen - 1) {
                    slicedNode.push(String(backNode).slice(-(sliceLen / 2 - backLen)));
                    backLen = sliceLen / 2;
                }
                frontLen += currentFrontNodeLen;
                backLen += currentBackNodeLen;
                return slicedNode;
            }
        }
        return slicedNode;
    };

    const measure = () => {
        if (lineHeight) {
            if (status === MEASURE_STATUS.INIT) {
                const maxHeight = rows * lineHeight;
                const mirrorHeight = mirrorNode.current?.offsetHeight || 0;
                const currentEllipsis = mirrorHeight > maxHeight;
                // simpleEllipsis 和 expanding 情况下: 只用判断空间是否足够，不用计算折叠零界
                if (!currentEllipsis || simpleEllipsis || expanding) {
                    setStatus(MEASURE_STATUS.MEASURE_END);
                    setIsEllipsis(currentEllipsis);
                    setBinarySearchIndex([0, totalLen, totalLen]);
                } else {
                    setIsEllipsis(true);
                    setStatus(MEASURE_STATUS.BEFORE_MEASURE);
                }
            } else if (status === MEASURE_STATUS.BEFORE_MEASURE) {
                const totalWidth = singleRowNode?.current?.offsetWidth || 0;
                const closedWidth = rows * width;
                if (totalWidth > rows * width) {
                    const startRatio = Math.max(closedWidth / totalWidth - 0.1, 0);
                    const endRatio = Math.min(closedWidth / totalWidth + 0.1, 1);
                    const closedStartLoc = Math.floor(startRatio * totalLen);
                    const closedEndLoc = Math.ceil(endRatio * totalLen);
                    const closedMiddleLoc = Math.floor((closedStartLoc + closedEndLoc) / 2);
                    closedLoc.current = closedMiddleLoc;
                }
                setStatus(MEASURE_STATUS.MEASURING);
            } else if (status === MEASURE_STATUS.MEASURING) {
                if (startLoc !== endLoc - 1) {
                    const mirrorHeight = mirrorNode.current?.offsetHeight || 0;
                    const maxHeight = rows * lineHeight;
                    let nextStartLoc = startLoc;
                    let nextEndLoc = endLoc;
                    if (mirrorHeight <= maxHeight) {
                        nextStartLoc = midLoc;
                    } else {
                        nextEndLoc = midLoc;
                    }
                    const nextMidLoc = Math.floor((nextEndLoc + nextStartLoc) / 2);
                    updateSearchIndex([nextStartLoc, nextMidLoc, nextEndLoc]);
                } else {
                    updateSearchIndex([startLoc, startLoc, startLoc]);
                    setStatus(MEASURE_STATUS.MEASURE_END);
                }
            }
        }
    };

    useLayoutEffect(() => {
        if (props.rows && width) {
            setBinarySearchIndex([0, Math.floor(totalLen / 2), totalLen]);
            setStatus(MEASURE_STATUS.INIT);
        } else {
            setStatus(MEASURE_STATUS.NO_NEED_ELLIPSIS);
        }
    }, [
        totalLen,
        simpleEllipsis,
        expanding,
        width,
        suffix,
        expandNodes,
        expandable,
        ellipsisStr,
        props.rows,
        direction,
    ]);

    useLayoutEffect(() => {
        if (singleRowNode.current && status === MEASURE_STATUS.INIT) {
            const offsetHeight = singleRowNode.current.offsetHeight;
            setLineHeight(offsetHeight);
        }
    }, [status]);

    useLayoutEffect(() => {
        measure();
    }, [status, midLoc, startLoc, endLoc, lineHeight]);

    const basicStyle: CSSProperties = {
        zIndex: -999,
        position: 'fixed',
        opacity: 0,
        padding: 0,
        margin: 0,
    };

    const singleRowNodeStyle: CSSProperties = {
        whiteSpace: 'nowrap',
        ...basicStyle,
    };

    // 用css省略的话，需要覆盖单行省略样式
    const mirrorNodeStyle: CSSProperties = simpleEllipsis
        ? {
            textOverflow: 'clip',
            ...basicStyle,
        }
        : basicStyle;

    let ellipsisNode;
    if (status === MEASURE_STATUS.INIT || status === MEASURE_STATUS.BEFORE_MEASURE) {
        ellipsisNode = (
            <div>
                <div ref={singleRowNode as LegacyRef<HTMLDivElement>} style={singleRowNodeStyle}>
                    {status === MEASURE_STATUS.INIT
                        ? MEASURE_LINE_HEIGHT_TEXT
                        : renderMeasureContent(children, false)}
                </div>
                <div ref={mirrorNode as LegacyRef<HTMLDivElement>} style={{ width, ...mirrorNodeStyle }}>
                    {renderMeasureContent(children, isEllipsis)}
                </div>
            </div>
        );
        ellipsisNode = ellipsisNode.props.children;
    } else if (status === MEASURE_STATUS.MEASURING) {
    // 计算过程中的占位展示，避免计算造成的抖动
    // 不能设置 width 否则在 table 中会再次造成 resize
        const showStyle = {
            height: lineHeight * rows,
            overflow: 'hidden',
        };
        ellipsisNode = (
            <div>
                <div ref={mirrorNode as LegacyRef<HTMLDivElement>} style={{ width, ...mirrorNodeStyle }}>
                    {renderMeasureContent(getSlicedNode(midLoc, isEllipsis), isEllipsis)}
                </div>
                <div style={showStyle}>{getSlicedNode(closedLoc.current, isEllipsis)}</div>
            </div>
        );
        ellipsisNode = ellipsisNode.props.children;
    } else if (status === MEASURE_STATUS.MEASURE_END) {
        ellipsisNode = renderMeasureContent(getSlicedNode(midLoc, isEllipsis), isEllipsis);
    } else if (status === MEASURE_STATUS.NO_NEED_ELLIPSIS) {
        ellipsisNode = renderMeasureContent(children, false);
    }
    return { ellipsisNode, isEllipsis, measureStatus: status };
}

export default useEllipsis;

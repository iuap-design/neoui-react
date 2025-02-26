import { Align } from './iDropdown';

type Placements = Record<string, Align>

const autoAdjustOverflow = {
    adjustX: 1,
    adjustY: 1,
};
const adjustXOverflow = {
    adjustX: 1,
    adjustY: 0,
}

const targetOffset: [number, number] = [0, 0];

export const placements: Placements = {
    topLeft: {
        points: ['bl', 'tl'],
        overflow: autoAdjustOverflow,
        offset: [0, -4],
        targetOffset: targetOffset,
    },
    topCenter: {
        points: ['bc', 'tc'],
        overflow: autoAdjustOverflow,
        offset: [0, -4],
        targetOffset,
    },
    topRight: {
        points: ['br', 'tr'],
        overflow: autoAdjustOverflow,
        offset: [0, -4],
        targetOffset,
    },
    bottomLeft: {
        points: ['tl', 'bl'],
        overflow: autoAdjustOverflow,
        offset: [0, 4],
        targetOffset,
    },
    bottomCenter: {
        points: ['tc', 'bc'],
        overflow: autoAdjustOverflow,
        offset: [0, 4],
        targetOffset,
    },
    bottomRight: {
        points: ['tr', 'br'],
        overflow: autoAdjustOverflow,
        offset: [0, 4],
        targetOffset,
    },
    topLeftNoAdjustY: {
        points: ['bl', 'tl'],
        overflow: adjustXOverflow,
        offset: [0, -4],
        targetOffset,
    },
    topCenterNoAdjustY: {
        points: ['bc', 'tc'],
        overflow: adjustXOverflow,
        offset: [0, -4],
        targetOffset,
    },
    bottomLeftNoAdjustY: {
        points: ['tl', 'bl'],
        overflow: adjustXOverflow,
        offset: [0, 4],
        targetOffset,
    },
    bottomCenterNoAdjustY: {
        points: ['tc', 'bc'],
        overflow: adjustXOverflow,
        offset: [0, 4],
        targetOffset,
    },
    bottomRightNoAdjustY: {
        points: ['tr', 'br'],
        overflow: adjustXOverflow,
        offset: [0, 4],
        targetOffset,
    },
};

export default placements;

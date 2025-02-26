import type {AlignType} from 'rc-trigger/lib/interface';

const autoAdjustOverflow = {
    adjustX: 1,
    adjustY: 1
};
const targetOffset = [0, 0];

const placements: {[placement: string]: AlignType} = {
    bottomLeft: {
        points: ['tl', 'bl'],
        overflow: autoAdjustOverflow,
        offset: [0, 4], // 下拉框的偏移量 added by: gx
        targetOffset
    },
    bottomRight: {
        points: ['tr', 'br'],
        overflow: autoAdjustOverflow,
        offset: [0, 4],
        targetOffset
    },
    topRight: {
        points: ['br', 'tr'],
        overflow: autoAdjustOverflow,
        offset: [0, 0],
        targetOffset
    },
    topLeft: {
        points: ['bl', 'tl'],
        overflow: autoAdjustOverflow,
        offset: [0, 0],
        targetOffset
    }
};

export default placements;

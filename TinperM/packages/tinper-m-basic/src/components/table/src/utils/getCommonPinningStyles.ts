import { CSSProperties } from 'react'
export const getCommonPinningStyles = (column: any): CSSProperties => {
  const isPinned = column.getIsPinned()
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left')
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right')
  return {
    boxShadow: isLastLeftPinnedColumn
      ? '-4px 0 4px -4px gray inset'
      : isFirstRightPinnedColumn
        ? '4px 0 4px -4px gray inset'
        : undefined,
    left: isPinned === 'left' ? `${column.getStart('left') / 50}rem` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right') / 50}rem` : undefined,
    position: isPinned ? 'sticky' : 'relative',
    // width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  }
}

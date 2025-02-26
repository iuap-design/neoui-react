export type PullStatus = 'pulling' | 'canRelease' | 'refreshing' | 'complete'

export interface PullToRefreshProps {
  onRefresh: () => Promise<any>
  pullingText?: React.ReactNode
  canReleaseText?: React.ReactNode
  refreshingText?: React.ReactNode
  completeText?: React.ReactNode
  completeDelay: number
  headHeight?: number
  threshold?: number
  disabled?: boolean
  renderText?: (status: PullStatus) => React.ReactNode
  children?: React.ReactNode,
  fieldid?: string
  clsPrefix: string
  className?: string
}

import { NativeProps } from '@utils/NativeProps'

export interface InfiniteScrollProps extends NativeProps {
  fieldid?: string
  clsPrefix: string
  className?: string
  hasMore: boolean
  loadMore: (isRetry: boolean) => Promise<void>
  onEndReached: () => void
  threshold: number,
  children: React.ReactNode | ((hasMore: boolean, failed: boolean, retry: () => void, clsPrefix: string) => React.ReactNode),
}

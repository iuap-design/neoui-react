import './Skeleton.less'
import { Skeleton, SkeletonParagraph, SkeletonTitle } from './Skeleton'
import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent'

export type { SkeletonProps, SkeletonTitleProps } from './iSkeleton'

export default attachPropertiesToComponent(Skeleton, {
  Title: SkeletonTitle,
  Paragraph: SkeletonParagraph,
})

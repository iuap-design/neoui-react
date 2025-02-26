import React from 'react'
import { createErrorBlock } from './CreateErrorBlock'
import type { ReactElement } from 'react'

import errorImage from '@assets/errorImage.svg'
import disconnectedImage from '@assets/disconnected.svg'


const imageRecord: Record<
  'default' | 'disconnected' | 'failed' | 'denied' | 'error',
  ReactElement
> = {
  default: errorImage,
  disconnected: disconnectedImage,
  failed: errorImage,
  denied: errorImage,
  error: errorImage
}


export const ErrorBlock = createErrorBlock(imageRecord)

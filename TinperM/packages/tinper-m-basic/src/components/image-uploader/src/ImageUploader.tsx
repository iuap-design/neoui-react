import React, { useRef, useState, useImperativeHandle } from 'react'
import type { CSSProperties } from 'react'
import { mergeProps } from '@utils/WithDefaultProps'
import { ImageViewerShowHandler } from '@components/image-viewer/src/index'
import PreviewItem from './PreviewItem'
import { usePropsValue } from '@hooks/UsePropsValue'
import { useUnmount, useSize, useIsomorphicLayoutEffect } from 'tne-fw-fe/hooks'
import { Space, Grid, ImageViewer } from '../../../index'
import { withNativeProps } from '@utils/NativeProps'
import { measureCSSLength } from '@utils/MeasureCssLength'
import { useConfig } from '@components/config-provider/src/index';
import { ImageUploadItem, ImageUploaderRef, ImageUploaderProps, Task } from './iImageUploader'
import Plus from '@tinper/m-icons/lib/cjs/Plus'
import CloseCircleFill from '@tinper/m-icons/lib/cjs/CloseCircleFill'
import WebUI from '@utils/UpdatePrefixs'

const defaultProps = {
  disableUpload: false,
  deletable: true,
  showUpload: true,
  multiple: false,
  maxCount: 0,
  defaultValue: [] as ImageUploadItem[],
  accept: 'image/*',
  preview: true,
  showFailed: true,
  imageFit: 'cover',
}

const ImageUploader = React.forwardRef<ImageUploaderRef, ImageUploaderProps>((p, ref) => {
  const { locale } = useConfig()
  const props = mergeProps(defaultProps, p)
  const { columns, clsPrefix, fieldid } = props
  const _clsPrefix = `${clsPrefix}-image-uploader`
  const { deleteIcon = <CloseCircleFill className={`${_clsPrefix}-cell-delete-icon`} style={{ width: '0.36rem', height: '0.36rem' }}/> } = props

  const [value, setValue] = usePropsValue(props)
  const [tasks, setTasks] = useState<Task[]>([])

  const containerRef = useRef<HTMLDivElement>(null)

  const containerSize = useSize(containerRef)
  const gapMeasureRef = useRef<HTMLDivElement>(null)
  const [cellSize, setCellSize] = useState<number>(80)

  const inputRef = useRef<HTMLInputElement>(null)

  useIsomorphicLayoutEffect(() => {
    const gapMeasure = gapMeasureRef.current
    if (columns && containerSize && gapMeasure) {
      const width = containerSize.width
      const gap = measureCSSLength(
        window.getComputedStyle(gapMeasure).getPropertyValue('height')
      )
      setCellSize((width - gap * (columns - 1)) / columns)
    }
  }, [containerSize?.width])

  const style: CSSProperties & {
    '--cell-size': string
  } = { '--cell-size': cellSize + 'px', }

  useIsomorphicLayoutEffect(() => {
    setTasks(prev =>
      prev.filter(task => {
        if (task.url === undefined) return true
        return !value.some(fileItem => fileItem.url === task.url)
      })
    )
  }, [value])

  useIsomorphicLayoutEffect(() => {
    props.onUploadQueueChange?.(
      tasks.map(item => ({ id: item.id, status: item.status }))
    )
  }, [tasks])

  const idCountRef = useRef(0)

  const { maxCount, onPreview, renderItem } = props

  async function processFile(file: File, fileList: File[]) {
    const { beforeUpload } = props

    let transformedFile: File | null | undefined = file

    transformedFile = await beforeUpload?.(file, fileList)

    return transformedFile
  }

  function getFinalTasks(tasks: Task[]) {
    return props.showFailed
      ? tasks
      : tasks.filter(task => task.status !== 'fail')
  }

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.persist()
    const { files: rawFiles } = e.target
    if (!rawFiles) return
    let files = [].slice.call(rawFiles) as File[]
    e.target.value = '' // HACK: fix the same file doesn't trigger onChange

    if (props.beforeUpload) {
      const postFiles = files.map(file => processFile(file, files))

      await Promise.all(postFiles).then(filesList => {
        files = filesList.filter(Boolean) as File[]
      })
    }

    if (files.length === 0) {
      return
    }

    if (maxCount > 0) {
      const exceed = value.length + files.length - maxCount
      if (exceed > 0) {
        files = files.slice(0, files.length - exceed)
        props.onCountExceed?.(exceed)
      }
    }

    const newTasks = files.map(
      file =>
        ({
          id: idCountRef.current++,
          status: 'pending',
          file,
        } as Task)
    )

    setTasks(prev => [...getFinalTasks(prev), ...newTasks])
    const newVal: ImageUploadItem[] = []
    await Promise.all(
      newTasks.map(async (currentTask, index) => {
        try {
          const result = await props.upload(currentTask.file)
          newVal[index] = result
          setTasks(prev => prev.map(task => {
            if (task.id === currentTask.id) {
              return {
                ...task,
                status: 'success',
                url: result.url,
              }
            }
            return task
          }))
        } catch (e) {
          setTasks(prev => prev.map(task => {
            if (task.id === currentTask.id) {
              return {
                ...task,
                status: 'fail',
              }
            }
            return task
          }))
          throw e
        }
      })
    ).catch(error => console.error(error))
    setValue(prev => prev.concat(newVal))
  }

  const imageViewerHandlerRef = useRef<ImageViewerShowHandler | null>(null)

  function previewImage(index: number) {
    imageViewerHandlerRef.current = ImageViewer.Multi.show({
      images: value.map(fileItem => fileItem.url),
      defaultIndex: index,
      onClose: () => {
        imageViewerHandlerRef.current = null
      },
    })
  }

  useUnmount(() => {
    imageViewerHandlerRef.current?.close()
  })

  const finalTasks = getFinalTasks(tasks)

  const showUpload =
    props.showUpload &&
    (maxCount === 0 || value.length + finalTasks.length < maxCount)

  const renderImages = () => value.map((fileItem, index) => {
    const originNode = (
      <PreviewItem
        preCls={_clsPrefix}
        fieldid={fieldid ? fieldid + '_image_uploader_' + index : undefined}
        key={fileItem.key ?? index}
        url={fileItem.thumbnailUrl ?? fileItem.url}
        deletable={props.deletable}
        deleteIcon={deleteIcon}
        imageFit={props.imageFit}
        onClick={() => {
          if (props.preview) {
            previewImage(index)
          }
          onPreview && onPreview(index, fileItem)
        }}
        onDelete={async () => {
          const canDelete = await props.onDelete?.(fileItem)
          if (canDelete === false) return
          setValue(value.filter((x, i) => i !== index))
        }}
      />
    )
    return renderItem ? renderItem(originNode, fileItem, value) : originNode
  })

  const contentNode = (
    <>
      {renderImages()}
      {tasks.map((task, index) => {
        if (!props.showFailed && task.status === 'fail') {
          return null
        }
        return (
          <PreviewItem
            key={task.id}
            file={task.file}
            deletable={task.status !== 'pending'}
            deleteIcon={deleteIcon}
            status={task.status}
            imageFit={props.imageFit}
            fieldid={fieldid ? fieldid + '_image_uploader_' + index : undefined}
            preCls={_clsPrefix}
            onDelete={() => {
              setTasks(tasks.filter(x => x.id !== task.id))
            }}
          />
        )
      })}
      <div
        className={`${_clsPrefix}-upload-button-wrap`}
        fieldid={fieldid ? fieldid + '_image_uploader_upload_button_wrap' : undefined}
        style={showUpload ? undefined : { display: 'none' }}
      >
        {props.children || (
          <span
            className={`${_clsPrefix}-cell ${_clsPrefix}-upload-button`}
            role='button'
            aria-label={locale.ImageUploader.upload}
          >
            <span className={`${_clsPrefix}-upload-button-icon`}>
              <Plus style={{ width: '0.48rem', height: '0.48rem' }} />
            </span>
          </span>
        )}
        {!props.disableUpload && (
          <input
            ref={inputRef}
            capture={props.capture}
            accept={props.accept}
            multiple={props.multiple}
            type='file'
            fieldid={fieldid ? fieldid + '_image_uploader_input' : undefined}
            className={`${_clsPrefix}-input`}
            onChange={onChange}
            aria-hidden
          />
        )}
      </div>
    </>
  )

  useImperativeHandle(ref, () => ({
    get nativeElement() {
      return inputRef.current
    },
  }))

  return withNativeProps(
    props,
    <div className={_clsPrefix} ref={containerRef} fieldid={fieldid ? fieldid + '_image_uploader' : undefined}>
      {columns ? (
        <Grid
          className={`${_clsPrefix}-grid`}
          fieldid={fieldid ? fieldid + '_image_uploader' : undefined}
          columns={columns}
          style={style}
        >
          <div className={`${_clsPrefix}-gap-measure`} ref={gapMeasureRef} />
          {contentNode.props.children}
        </Grid>
      ) : (
        <Space className={`${_clsPrefix}-space`} wrap block fieldid={fieldid ? fieldid + '_image_uploader_space' : undefined}>
          {contentNode.props.children}
        </Space>
      )}
    </div>
  )
}
)

export default WebUI({ defaultProps })(ImageUploader)

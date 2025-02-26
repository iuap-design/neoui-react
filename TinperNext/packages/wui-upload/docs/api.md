# 上传 Upload

Upload可以将资源（web page,text,picture,video...）传到远程服务器

## API

<!--Upload-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|accept|接受上传的文件类型, 详见 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)|string|无|
|name|发到后台的文件参数名|string|'file'|
|defaultFileList|默认已上传的文件列表|object[]|-|
|fileList|已上传的文件列表,多用于onChange事件里|array|-|
|action|上传的服务器地址|string|-|
|data|上传所需参数或返回上传参数的方法|    object &#124; (file) => object|-|
|size|上传文件的大小限制单位是byte|number|1024000|
|headers|设置请求的头部信息 兼容ie10以上|object|-|
|showUploadList|是否展示文件列表, 可设为一个对象，用于单独设定 `showPreviewIcon` 和 `showRemoveIcon`, 可通过removeIcon自定义删除图标|Boolean or { showPreviewIcon?: boolean, showRemoveIcon?: boolean, removeIcon?: ReactElement }|true| 4.4.4 |
|multiple|是否支持多文件上传 兼容ie10以上|bool|false|
|mergeFiles|是否合并上传文件数组|bool|false|
|accept|设置文件接收类型|string|-|
|beforeUpload|上传文件之前的钩子，参数为上传的文件，若返回 `false` 则停止上传。支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，resolve 时开始上传（ resolve 传入 `File` 或 `Blob` 对象则上传 resolve 传入对象）。注意：IE9 不支持该方法。|(file, fileList) => boolean &#124; Promise|-|
|customRequest|通过覆盖默认的上传行为，可以自定义自己的上传实现|Function|-|
|onChange|当上传状态改变之后执行的回调函数|Function|-|
|listType|内置的样式，支持text和picture|string|'text'|
|onRemove|点击移除文件时的回调，返回值为 false 时不移除。支持返回一个 Promise 对象，Promise 对象 resolve(false) 或 reject 时不移除。|Function(file): boolean &#124; Promise|-|
|supportServerRender|服务端渲染时需要打开这个|boolean|false|
|disabled|是否禁用，设置为 true 后前端禁止删除已上传文件|boolean|false|
|withCredentials|上传请求时是否携带 cookie|boolean|false|
|removeText|移除文件的文本|string|-|
|enterDragger|拖拽上传，当鼠标拖拽文件进入 Dragger 区域时触发|Function|-|
|leaveDragger|拖拽上传，当鼠标拖拽文件离开 Dragger 区域时触发|Function|-|
|onPreview|点击文件链接或预览图标时的回调|Function|-|
|onDownload|点击下载文件时的回调，如果没有指定，则默认跳转到文件 url 对应的标签页|Function|-|
|downloadText|下载文件的文本|string|-|
|progress|自定义进度条样式(参照progress组件type为line时的参数，把相应的属性及值组合成数组), 可以设置为null，当值为null时上传时不显示进度条(注：4.4.6版本添加值为null的功能)|object &#124; null|-|
|directory|支持上传文件夹|bool|false|
|fieldid|自动化测试专用属性| string |    -|
|uploadClassName|点击或拖拽操作区div层自定义className| string |-|
|xsrf|是否启用默认请求头部添加X-XSRF-TOKEN字段（window.tnsSdk.readXscfToken()有返回值时生效.注意确保页面已引入tnsSdk.js，否则window.tnsSdk为undefined）| boolean |true| 4.4.1 |
|iconRender|自定义显示 icon(上传的文件列表每项前面的图标或图片)| () => React.ReactElement |-| 4.4.4 |
|itemRender|自定义上传列表项| (originNode: React.ReactElement, file: UploadFile, fileList: UploadFile[], actions: {}) => React.ReactNode |-| 4.4.5 |
|dragable|可拖拽列表| boolean |false| 4.4.5 |
|onDrag|拖拽列表的回调函数，在dragable为true时有效| (result: object) => void |-| 4.4.5 |
|maxCount|限制上传数量。当为 1 时，始终用最新上传的文件代替当前文件| number |-| - |

### fieldid 场景说明

| 场景     | 生成规则说明                | 版本  |
| -------- | --------------------------- | ----- |
| 根元素   | fieldid                    | 4.3.0 |
| 预览图标   | fieldid + "\-preview"  | 4.3.0 |
| 删除图标 | fieldid + "\-del"        | 4.3.0 |
| 下载图标 | fieldid + "\-download" | 4.3.0 |
| 关闭图标 | fieldid + "\-close" | 4.3.0 |

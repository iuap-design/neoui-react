const version = (process.env.GIT_VERSION + "") || '4.0.0';
export { version };

export { default as Button } from './wui-button/src';
export type { ButtonProps } from './wui-button/src/iButton';

export { default as Badge } from './wui-badge/src';
export type { BadgeProps } from './wui-badge/src/iBadge';

export { default as Alert } from './wui-alert/src';
export type { AlertProps } from './wui-alert/src/iAlert';

export { default as ButtonGroup } from './wui-button-group/src';
export type { ButtonGroupProps } from './wui-button-group/src/iButtonGroup';

export { default as Input } from './wui-input/src';
export type { InputProps } from './wui-input/src/iInput';

export { default as Calendar } from './wui-calendar/src';
export type { CalendarProps } from './wui-calendar/src/iCalendar';

export { default as Form } from './wui-form/src';
export type { UnionFormInstance as FormInstance, FormProps, FormItemProps } from './wui-form/src/iForm';

export { default as Layout, Row, Col } from './wui-layout/src';
export type { BasicProps, SiderProps, RowProps, ColProps, SpliterProps } from './wui-layout/src/iLayout';

export { default as InputGroup } from './wui-input-group/src';
export type { InputGroupProps, InputGroupAddonProps } from './wui-input-group/src/iInputGroup';

export { default as InputNumber } from './wui-input-number/src';
export type { InputNumberProps } from './wui-input-number/src/iInputNumber';
export type { InputNumberGroupProps } from './wui-input-number/src/iInputNumberGroup';

export { default as Checkbox } from './wui-checkbox/src';
export type { CheckboxProps, CheckboxGroupProps} from './wui-checkbox/src/iCheckbox';

export { default as Pagination } from './wui-pagination/src';
export type { PaginationProps } from './wui-pagination/src/iPagination';

export { default as Progress } from './wui-progress/src';
export type {ProgressProps, ProgressLineProps, ProgressCircleProps, ProgressBarProps, ProgressStepProps} from './wui-progress/src/iProgress';

export { default as Radio } from './wui-radio/src';
export type { RadioGroupProps, RadioProps} from './wui-radio/src/iRadio';

export { default as Switch } from './wui-switch/src';
export type { SwitchProps } from './wui-switch/src/iSwitch';

export { default as Tooltip } from './wui-tooltip/src';
export type { TooltipProps } from './wui-tooltip/src/iTooltip';

export { default as Dropdown } from './wui-dropdown/src';
export type { DropDownProps as DropdownProps } from './wui-dropdown/src/iDropdown';

export { default as DatePicker } from './wui-datepicker/src';
export type { DatePickerProps, RangePickerProps } from './wui-datepicker/src/iPicker';

export { default as Collapse } from './wui-collapse/src';
export type { CollapseProps } from './wui-collapse/src/iCollapse';

export { default as Select } from './wui-select/src';
export type { SelectProps, SelectValue } from './wui-select/src/iSelect';

export { default as Icon } from './wui-icon/src';
export type { IconProps } from './wui-icon/src/iIcon';

export { default as Menu } from './wui-menu/src';
export type { MenuProps, SubMenuProps, MenuItemProps } from './wui-menu/src/iMenu';

export { default as Upload } from './wui-upload/src';
export type { UploadProps, DraggerProps } from './wui-upload/src/iUpload';

export { default as Breadcrumb } from './wui-breadcrumb/src';
export type { BreadcrumbProps } from './wui-breadcrumb/src/iBreadcrumb';

export { default as Message } from './wui-message/src';
export type { MessageProps } from './wui-message/src/iMessage';

export { default as ErrorMessage } from './wui-error-message/src';
export type { ErrorMessageProps } from './wui-error-message/src/iErrorMessage';

export { default as Notification } from './wui-notification/src';
export type {
    NotificationProps,
    NoticeProps
} from './wui-notification/src/iNotification';

export { default as Popconfirm } from './wui-popconfirm/src';
export type { PopconfirmProps } from './wui-popconfirm/src/iPopconfirm';

export { default as Modal } from './wui-modal/src';
export type { ModalFooterProps, ModalHeaderProps, ModalTitleProps, ModalBodyProps, ModalRootProps as ModalProps, ModalConfirmProps} from './wui-modal/src/iModal';

export { default as Tabs } from './wui-tabs/src';
export type { TabProps, TabsProps, TabPaneProps, SearchTabsProps } from './wui-tabs/src/iTabs';

export { default as Cascader } from './wui-cascader/src';
export type { CascaderProps } from './wui-cascader/src/iCascader';

export { default as Spin } from './wui-spin/src';
export type { SpinProps } from './wui-spin/src/iSpin';

export { default as Table } from './wui-table/src';
export type {
    TableProps,
    ColumnType
} from './wui-table/src/iTable';

export { default as Tree } from './wui-tree/src';
export type { TreeProps, TreeNodeProps } from './wui-tree/src/iTree';

export { default as Clipboard } from './wui-clipboard/src';
export type { ClipboardProps } from './wui-clipboard/src/iClipboard';

export { default as Rate } from './wui-rate/src';
export type { RateProps } from './wui-rate/src/iRate';

export { default as Steps } from './wui-steps/src';
export type { StepsProps, StepProps } from './wui-steps/src/iSteps';

export { default as Timeline } from './wui-timeline/src';
export type { TimelineProps } from './wui-timeline/src/iTimeline';

export { default as Transfer } from './wui-transfer/src';
export type { TransferProps } from './wui-transfer/src/iTransfer';

export { default as BackTop } from './wui-backtop/src';
export type { BackTopProps } from './wui-backtop/src/iBackTop';

export { default as Slider } from './wui-slider/src';
export type { SliderSingProps as SliderProps } from './wui-slider/src/iSlider';

export { default as AutoComplete } from './wui-autocomplete/src';
export type { AutoCompleteProps } from './wui-autocomplete/src/iAutoComplete';

export { default as Locale } from './wui-locale/src';
export { default as EnUS } from './wui-locale/src/en_US';
export { default as ZhCN } from './wui-locale/src/zh_CN';
export { default as ZhTW } from './wui-locale/src/zh_TW';
export type { LocaleType } from './wui-locale/src/iLocale';

export { default as Popover } from './wui-popover/src';
export type { PopoverProps } from './wui-popover/src/iPopover';

export { default as Anchor } from './wui-anchor/src';
export type { AnchorProps, AnchorLinkProps } from './wui-anchor/src/iAnchor';

export { default as ColorPicker } from './wui-colorpicker/src';
export type { ColorPickerProps } from './wui-colorpicker/src/iColorPicker';

export { default as Tag } from './wui-tag/src';
export type { TagProps } from './wui-tag/src/iTag';

export { default as Affix } from './wui-affix/src';
export type { AffixProps } from './wui-affix/src/iAffix';

export { default as Drawer } from './wui-drawer/src';
export type { DrawerProps } from './wui-drawer/src/iDrawer';

export { default as TreeSelect } from './wui-treeselect/src';
export type { TreeSelectProps } from './wui-treeselect/src/iTreeSelect';

export { default as TimePicker } from './wui-timepicker/src';
export type { TimePickerProps } from './wui-timepicker/src/iTimePicker';

export { default as Image } from './wui-image/src';
export type { ImageProps } from './wui-image/src/iImage';

export { default as SvgIcon } from './wui-svgicon/src';
export type { SvgIconProps } from './wui-svgicon/src/iSvgIcon';

export { default as Carousel } from './wui-carousel/src';
export type { CarouselProps } from './wui-carousel/src/iCarousel';

export { default as Space } from './wui-space/src';
export type { SpaceProps } from './wui-space/src/iSpace';

export { default as Empty } from './wui-empty/src';
export type { EmptyProps } from './wui-empty/src/iEmpty';

export { default as Avatar } from './wui-avatar/src';
export type { AvatarProps } from './wui-avatar/src/iAvatar';

export { default as Card } from './wui-card/src';
export type { CardProps } from './wui-card/src/iCard';

export { default as ConfigProvider } from './wui-provider/src';
export type { ConfigProviderProps } from './wui-provider/src/iProvider';

export { default as Divider } from './wui-divider/src';
export type { DividerProps } from './wui-divider/src/iDivider';

export { default as List } from './wui-list/src';
export type { ListProps } from './wui-list/src/iList';

export { default as Skeleton } from './wui-skeleton/src';
export type { SkeletonProps, SkeletonButtonProps, SkeletonImageProps, SkeletonInputProps, SkeletonAvatarProps } from './wui-skeleton/src/iSkeleton';

// export { default as DynamicView } from './wui-dynamicview/src';
// export type { DynamicViewProps } from './wui-dynamicview/src/iDynamicView';

export { default as Typography} from './wui-typography/src';
export type { TypographyParagraphProps, EllipsisConfig } from './wui-typography/src/iTypography';


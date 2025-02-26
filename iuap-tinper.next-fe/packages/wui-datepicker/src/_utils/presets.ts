import moment from 'moment';
import { DatePickerProps } from '../iPicker';

const presetList = [
    {
        label: '今天',
        key: 'today',
        value: moment().startOf('day'),
    },
    {
        label: '昨天',
        key: 'yesterday',
        value: moment().startOf('day').add(-1, 'd'),
    },
    {
        label: '明天',
        key: 'tomorrow',
        value: moment().startOf('day').add(1, 'd'),
    },
    {
        label: '一周后',
        key: 'oneWeekLater',
        value: moment().startOf('day').add(1, 'w'),
    },
    {
        label: '一月后',
        key: 'oneMonthLater',
        value: moment().startOf('day').add(1, 'M'),
    },
    {
        label: '半年后',
        key: 'halfYearLater',
        value: moment().startOf('day').add(6, 'M'),
    },
    {
        label: '一年后',
        key: 'oneYearLater',
        value: moment().startOf('day').add(1, 'y'),
    },
]

const presetKeys = presetList.map(item => item.key)

export const getPresets = (presets: DatePickerProps['presets']) => {
    if (presets === true) {
        return presetList
    } else if (Array.isArray(presets)) {
        return presets.map(item => {
            if (typeof item === 'string' && presetKeys.includes(item)) {
                return presetList.find(presetItem => presetItem.key === item)
            } else if (typeof item === 'object' && item.key && item.label && item.value) {
                return item
            }
        })
    }
}

export const getActivePresetLabel = ({presets, activePresetKey}: any) => {
    let activePresetLabel = ''
    if (Array.isArray(presets)) {
        presets.map(range => {
            if (range.key === activePresetKey || range.label === activePresetKey) {
                activePresetLabel = range.label
            }
        })
    }
    return activePresetLabel
}

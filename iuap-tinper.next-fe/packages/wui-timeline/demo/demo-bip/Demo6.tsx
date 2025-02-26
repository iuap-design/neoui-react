/**
 *
 * @title mode
 * @description 使用 label 标签单独展示时间。
 *
 */

import React, { useState } from 'react';
import { Timeline, Radio, Switch, Tag } from '@tinper/next-ui';

const morningList = [
    {
        time: '06:00 - 12:00',
        color: 'success',
        text: '早班'
    },
    {
        time: '06:00 - 08:00',
        color: '#F0F0F0',
        text: '巡检路线：重型机械设备巡检'
    },
    {
        time: '08:00 - 10:00',
        color: '#F0F0F0',
        text: '巡检路线：轻型机械设备巡检'
    },
    {
        time: '10:00 - 12:00',
        color: '#F0F0F0',
        text: '巡检路线：燃油机械设备巡检'
    }
]
const noonList = [
    {
        time: '12:00 - 18:00',
        color: 'warning',
        text: '中班'
    },
    {
        time: '12:00 - 14:00',
        color: '#F0F0F0',
        text: '巡检路线：重型机械设备巡检'
    },
    {
        time: '14:00 - 16:00',
        color: '#F0F0F0',
        text: '巡检路线：轻型机械设备巡检'
    },
    {
        time: '16:00 - 18:00',
        color: '#F0F0F0',
        text: '巡检路线：燃油机械设备巡检'
    }
]
const evenList = [
    {
        time: '18:00 - 24:00',
        color: 'info',
        text: '晚班'
    },
    {
        time: '18:00 - 20:00',
        color: '#F0F0F0',
        text: '巡检路线：重型机械设备巡检'
    },
    {
        time: '20:00 - 22:00',
        color: '#F0F0F0',
        text: '巡检路线：轻型机械设备巡检'
    },
    {
        time: '22:00 - 24:00',
        color: '#F0F0F0',
        text: '巡检路线：燃油机械设备巡检'
    }
]

const list = [
    {
        childList: morningList
    },
    {
        childList: noonList
    },
    {
        childList: evenList
    }
]

const Demo1: React.FC = () => {
    const [mode, setMode] = useState<'left' | 'alternate' | 'right'>('left');
    const [checked, setChecked] = useState<boolean>(false);

    const onChange = (e: any) => {
        setMode(e.target.value);
    };

    const onSwitchChange = (b: boolean) => {
        setChecked(b)
    }

    const getTitle = (text: string, time: string, color: string) => {
        return (
            <div style={{position: 'relative', top: -1}}>
                <span style={{fontWeight: 'bold', fontSize: 14, marginRight: 10, verticalAlign: 'middle'}}>{text}</span>
                <Tag bordered color={color}>{time}</Tag>
            </div>
        )
    }

    return (
        <>
            <Radio.Group
                onChange={onChange}
                value={mode}
                antd
                style={{
                    marginBottom: 10,
                }}
            >
                <Radio value="left">Left</Radio>
                <Radio value="right">Right</Radio>
                <Radio value="alternate">Alternate</Radio>
            </Radio.Group>
            <div style={{
                marginBottom: 20,
            }}>
                reverse: <Switch checked={checked} onChange={onSwitchChange}/>
            </div>
            <Timeline mode={mode} reverse={checked} fieldid={'field'}>
                {
                    list.map((item, i) => {
                        const {childList} = item;
                        return (
                            <Timeline.Group key={i} size={30}>
                                {
                                    childList.map((item, k) => {
                                        const {text, time, color} = item;
                                        const child = k === 0 ? getTitle(text, time, color!) : (<div style={{fontSize: 14}}>{text}</div>)
                                        const label = k === 0 ? null : time;
                                        return (
                                            <Timeline.Item color={color} label={label} key={`${text}-${k}`}>
                                                {child}
                                            </Timeline.Item>
                                        )
                                    })
                                }
                            </Timeline.Group>
                        )
                    })
                }
            </Timeline>
        </>
    );
};


export default Demo1;

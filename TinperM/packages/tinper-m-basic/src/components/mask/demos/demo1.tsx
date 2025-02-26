/**
 * @title 基础用法
 * @description Mask 背景蒙层用法示例
 */
import React, { useState } from 'react'
import type { FC } from 'react'
import { Button, Mask } from '@tinper/m'
import './demo.less'

// 基础用法
const Simple: FC = () => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <Button onClick={() => setVisible(true)} mode='default' size='middle' >显示背景蒙层</Button>
            <Mask visible={visible} onMaskClick={() => setVisible(false)} fieldid="mask1" />
        </>
    )
}

// 自定义内容
const WithContent: FC = () => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <Mask visible={visible} onMaskClick={() => setVisible(false)} fieldid="mask2">
                <div className={'mask-demo-overlay-content'}>内容</div>
            </Mask>
            <Button onClick={() => setVisible(true)} mode='default' size='middle'>显示带内容的背景蒙层</Button>
        </>
    )
}

// 背景蒙层的颜色深度 - 深一些
const Thick: FC = () => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <Mask
                visible={visible}
                onMaskClick={() => setVisible(false)}
                opacity='thick'
                fieldid="mask3"
            />
            <Button onClick={() => setVisible(true)} mode='default' size='middle' style={{ marginBottom: '0.24rem' }}>显示深一些的背景蒙层</Button>
        </>
    )
}

// 背景蒙层的颜色深度 - 浅一些
const Thin: FC = () => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <Mask
                visible={visible}
                onMaskClick={() => setVisible(false)}
                opacity='thin'
                fieldid="mask4"
            />
            <Button onClick={() => setVisible(true)} mode='default' size='middle' style={{ marginBottom: '0.24rem' }}>显示浅一些的背景蒙层</Button>
        </>
    )
}

// 背景蒙层的颜色深度 - 自定义
const CustomOpacity: FC = () => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <Mask
                visible={visible}
                onMaskClick={() => setVisible(false)}
                opacity={0.9}
                fieldid="mask5"
            />
            <Button onClick={() => setVisible(true)} mode='default' size='middle' >
                显示自定义透明度的背景蒙层
            </Button>
        </>
    )
}

// 背景蒙层的颜色 - 自定义
const CustomColor: FC = () => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <Mask
                visible={visible}
                onMaskClick={() => setVisible(false)}
                color='rgba(238,34,51,0.5)'
                fieldid="mask6"
            />
            <Button onClick={() => setVisible(true)} mode='default' size='middle'>显示自定义颜色的背景蒙层</Button>
        </>
    )
}

// 白色的背景蒙层
const White: FC = () => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <Button onClick={() => setVisible(true)} mode='default' size='middle' style={{ marginBottom: '0.24rem' }}>显示白色的背景蒙层</Button>
            <Mask
                color='white'
                visible={visible}
                onMaskClick={() => setVisible(false)}
                fieldid="mask7"
            />
        </>
    )
}

export default () => {
    return (
        <>
            <h3>基础用法</h3>
            <Simple />

            <h3>背景蒙层的颜色深度</h3>
            <Thin />
            <Thick />
            <CustomOpacity />

            <h3>背景蒙层的颜色</h3>
            <White />
            <CustomColor />

            <h3>自定义内容</h3>
            <WithContent />
        </>
    )
}
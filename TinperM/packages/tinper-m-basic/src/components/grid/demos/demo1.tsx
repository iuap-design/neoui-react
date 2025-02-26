/**
 * @title 基础用法
 * @description 基础的栅格布局。
 */
import React from 'react'
import { Grid } from '@tinper/m'
import './demo1.less'

export default () => {
  return (
    <>
      <h3>基础用法</h3>
      <div className='wrapClass'>
        <Grid columns={3} gap={8} fieldid='grid1'>
          <Grid.Item fieldid='grid-item1'>
            <div className='grid-demo-item-block'>A</div>
          </Grid.Item>
          <Grid.Item fieldid='grid-item2'>
            <div className='grid-demo-item-block'>B</div>
          </Grid.Item>
          <Grid.Item fieldid='grid-item3'>
            <div className='grid-demo-item-block'>C</div>
          </Grid.Item>
          <Grid.Item fieldid='grid-item4'>
            <div className='grid-demo-item-block'>D</div>
          </Grid.Item>
          <Grid.Item fieldid='grid-item5'>
            <div className='grid-demo-item-block'>E</div>
          </Grid.Item>
        </Grid>
      </div>

      <h3>控制格子的跨度</h3>
      <div className='wrapClass'>
        <Grid columns={3} gap={8} fieldid='grid2'>
          <Grid.Item fieldid='grid-item6'>
            <div className='grid-demo-item-block'>A</div>
          </Grid.Item >
          <Grid.Item span={2} fieldid='grid-item7'>
            <div className='grid-demo-item-block'>B</div>
          </Grid.Item>
          <Grid.Item span={2} fieldid='grid-item8'>
            <div className='grid-demo-item-block'>C</div>
          </Grid.Item>
          <Grid.Item fieldid='grid-item9'>
            <div className='grid-demo-item-block'>D</div>
          </Grid.Item>
          <Grid.Item span={3} fieldid='grid-item99'>
            <div className='grid-demo-item-block'>E</div>
          </Grid.Item>
        </Grid>
      </div>

    </>
  )
}

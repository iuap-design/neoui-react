/**
 * @title 组件状态
 * @description 组件状态
 */
import React, { useCallback, useState } from 'react'
import { DatePicker, Button } from '@tinper/m';
import './demo.less';
import { columns } from './data';

const now = new Date()

// 自定义每列的渲染内容
function CustomColumnRender() {
  const [visible, setVisible] = useState(false);

  const labelRenderer = useCallback((type: string, data: number) => {
    const labels = {
      year: '年',
      month: '月',
      day: '日',
      hour: '时',
      minute: '分',
      second: '秒',
    };

    type Precision = keyof typeof labels;

    const label = labels[type as Precision] ;
    return `${data}${label}`;
  }, []);

  const handleButtonClick = () => {
    setVisible(true);
  };

  const handleDatePickerClose = () => {
    setVisible(false);
  };

  const handleDatePickerConfirm = (val: Date | null) => {
    alert(val?.toString());
  };

  return (
    <>
      <Button onClick={handleButtonClick}>选择</Button>
      <DatePicker
        title="时间选择"
        visible={visible}
        onClose={handleDatePickerClose}
        defaultValue={now}
        max={now}
        precision="minute"
        onConfirm={handleDatePickerConfirm}
        renderLabel={labelRenderer}
      />
    </>
  );
}

//分钟数递增步长设置
function MinuteStep() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <DatePicker title='时间选择'
        visible={visible}
        minuteStep={2}
        precision='minute'
        onClose={() => setVisible(false)}
        onConfirm={(val) => alert(val?.toString())}
      />
      <Button onClick={() => setVisible(true)}>选择</Button>
    </>
  )
}

//禁用不弹出
function Disabled() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <DatePicker title='时间选择'
        visible={visible}
        disabled
        onClose={() => setVisible(false)}
        onConfirm={(val) => alert(val?.toString())}
      />
      <Button onClick={() => setVisible(true)}>选择</Button>
    </>
  )
}


//过滤时间
function Filter() {
  const [visible, setVisible] = useState(false)
  const filterValue = {
    year: (y:number, { date }: {date: Date}) => y % 2 === 0,
    month: (m:number, { date }: {date: Date}) => m % 2 === 0,
    day: (d:number, { date }: {date: Date}) => d % 3 === 0,
    hour: (h: number, { date }: {date: Date}) => h % 4 === 0,
    minute: (m: number, { date }: {date: Date}) => m % 6 === 0,
    second: (s: number, { date }: {date: Date}) => s % 5 === 0,
  }
  return (
    <>
      <DatePicker title='时间选择'
        min={new Date(2024, 0, 1)}
        max={new Date(2034, 0, 1)}
        visible={visible}
        filter={filterValue}
        onClose={() => setVisible(false)}
        precision='second'
        onConfirm={(val) => alert(val?.toString())}
      />
      <Button onClick={() => setVisible(true)}>选择</Button>
    </>
  )
}


// 指令式调用
function PromptDatePicker() {
  return (
    <Button
      onClick={async () => {
        const value = await DatePicker.prompt({ columns, })
        alert(`你选择了 ${value}`)
      }}
    >
      弹出
    </Button>
  )

}





const Demo3 = () => (
  <div className="date-picker-demo">

    <>
      <h3>自定义每列的渲染内容</h3>
      <CustomColumnRender />
    </>
    <>
      <h3>分钟数递增步长设置</h3>
      <MinuteStep />
    </>
    <>
      <h3>禁用</h3>
      <Disabled />
    </>
    <>
      <h3>过滤时间</h3>
      <Filter />
    </>
    <>
      <h3>指令式调用</h3>
      <PromptDatePicker />
    </>
  </div>
)

export default Demo3

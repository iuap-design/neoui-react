/**
 * @title 组件精度
 * @description 组件精度
 */
import React, { useCallback, useState } from 'react'
import { DatePicker, Button } from '@tinper/m';
import './demo.less';

const now = new Date()


//控制选择精度
function Precision() {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const handleButtonClick1 = () => {
    setVisible1(true);
  };

  const handleButtonClick2 = () => {
    setVisible2(true);
  };

  const handleDatePickerClose1 = () => {
    setVisible1(false);
  };

  const handleDatePickerClose2 = () => {
    setVisible2(false);
  };

  const handleDatePickerConfirm1 = (val: Date | null) => {
    alert(val?.toDateString());
  };

  const handleDatePickerConfirm2 = (val: Date | null) => {
    alert(val?.toString());
  };

  return (
    <>
      <Button onClick={handleButtonClick1}>年-月</Button>
      {visible1 && (
        <DatePicker
          visible={visible1}
          onClose={handleDatePickerClose1}
          precision='month'
          onConfirm={handleDatePickerConfirm1}
        />
      )}

      <Button onClick={handleButtonClick2}>年-月-日-时-分</Button>
      {visible2 && (
        <DatePicker
          visible={visible2}
          onClose={handleDatePickerClose2}
          precision='minute'
          onConfirm={handleDatePickerConfirm2}
        />
      )}
    </>
  );
}

const weekdayToZh = (weekday: number) => {
  const weekdays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  return weekdays[weekday - 1] || weekday;
}

// 周选择器
function DayOfWeek() {
  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)

  const labelRenderer = useCallback((type: string, data: number) => {
    switch (type) {
    case 'year':
      return `${data}年`
    case 'week':
      return `${data}周`
    case 'week-day':
      return weekdayToZh(data)
    default:
      return data
    }
  }, [])

  const openDatePicker1 = () => {
    setVisible1(true)
  }

  const closeDatePicker1 = () => {
    setVisible1(false)
  }

  const openDatePicker2 = () => {
    setVisible2(true)
  }

  const closeDatePicker2 = () => {
    setVisible2(false)
  }

  const handleConfirm = (val: Date | null) => {
    alert(val?.toDateString())
  }

  return (
    <>
      <>
        <Button onClick={openDatePicker1}>周选择</Button>
        <DatePicker
          visible={visible1}
          onClose={closeDatePicker1}
          renderLabel={labelRenderer}
          onConfirm={handleConfirm}
          precision='week'
        />
      </>
      <>
        <Button onClick={openDatePicker2}>周天选择</Button>
        <DatePicker
          visible={visible2}
          onClose={closeDatePicker2}
          renderLabel={labelRenderer}
          onConfirm={handleConfirm}
          precision='week-day'
        />
      </>
    </>
  )
}


//12小时制
const TwelveHours = () => {
  const [visible, setVisible] = useState(false);

  const handleOpenDatePicker = () => {
    setVisible(true);
  };

  const handleCloseDatePicker = () => {
    setVisible(false);
  };

  const handleConfirmDatePicker = (val: Date | null) => {
    alert(val?.toString());
  };

  return (
    <>
      <DatePicker
        title='时间选择'
        visible={visible}
        use12hours
        precision='minute'
        onClose={handleCloseDatePicker}
        onConfirm={handleConfirmDatePicker}
        min={new Date(2020, 4, 5, 4)}
        max={new Date(2020, 7, 1, 6)}
      />
      <Button onClick={handleOpenDatePicker}>选择</Button>
    </>
  );
};

//时间范围控制
function DateRange() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <DatePicker title='时间选择'
        visible={visible}
        onClose={() => setVisible(false)}
                  precision='week'
        onConfirm={(val) => alert(val?.toDateString())}
        min={new Date(2020, 4, 5)}
        max={new Date(2030, 7, 1)}
      />
      <Button onClick={() => setVisible(true)}>选择</Button>
    </>
  )
}

const Demo2 = () => (
  <div className="date-picker-demo">

    <>
      <h3>控制选择精度</h3>
      <Precision />
      <h3>周选择</h3>
      <DayOfWeek />
      <h3>12小时制</h3>
      <TwelveHours />
      <h3>时间范围</h3>
      <DateRange/>
    </>
  </div>
)






export default Demo2

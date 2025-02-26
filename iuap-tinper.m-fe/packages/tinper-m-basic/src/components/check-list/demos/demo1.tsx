/**
 * @title 基础用法
 * @description: 基础用法
 */
import React from 'react'
import { CheckList } from '@tinper/m'
import RadioButtonOn from '@tinper/m-icons/lib/cjs/RadioButtonOn';
import CheckmarkCircle from '@tinper/m-icons/lib/cjs/CheckmarkCircle';
import CheckmarkCircleFill from '@tinper/m-icons/lib/cjs/CheckmarkCircleFill';

function BasicDemo() {
  return (
    <CheckList  defaultValue={["A"]}>
      <CheckList.Item value="A">A</CheckList.Item>
      <CheckList.Item value="B">B</CheckList.Item>
      <CheckList.Item value="C" disabled>
        C
      </CheckList.Item>
      <CheckList.Item value="D" readOnly>
        D
      </CheckList.Item>
    </CheckList>
  );
}


function MultCheckDemo() {
  return (
    <CheckList multiple defaultValue={["A", 'B']}>
      <CheckList.Item value="A">A</CheckList.Item>
      <CheckList.Item value="B">B</CheckList.Item>
      <CheckList.Item value="C">
        C
      </CheckList.Item>
    </CheckList>
  );
}
function NondeselectableDemo() {
  return (
    <CheckList deselectable={false} >
      <CheckList.Item value="A">A</CheckList.Item>
      <CheckList.Item value="B">B</CheckList.Item>
      <CheckList.Item value="C" >
        C
      </CheckList.Item>
      <CheckList.Item value="D" >
        D
      </CheckList.Item>
    </CheckList>
  );
}

function MultLeftCheckDemo() {
  return (
    <CheckList extraAlign="left" multiple defaultValue={["A", "B"]}>
      <CheckList.Item value="A">A</CheckList.Item>
      <CheckList.Item value="B">B</CheckList.Item>
      <CheckList.Item value="C" >
        C
      </CheckList.Item>
    </CheckList>
  );
}




function CustomInconDemo() {
  return (
    <CheckList
      extraAlign="left"
      activeIcon={<RadioButtonOn style={{ width: '0.44rem', height: '0.44rem' }}/>}
      defaultValue={["A"]}
    >
      <CheckList.Item value="A">A</CheckList.Item>
      <CheckList.Item value="B">B</CheckList.Item>
      <CheckList.Item value="C" >
        C
      </CheckList.Item>
    </CheckList>
  );

}


function ExtraDemo() {
  return (
    <CheckList
      defaultValue={["A"]}
      extra={(active) =>
        active ? <CheckmarkCircleFill style={{ width: '0.44rem', height: '0.44rem' }}/> : <CheckmarkCircle style={{ width: '0.44rem', height: '0.44rem' }}/>
      }
    >
      <CheckList.Item value="A">A</CheckList.Item>
      <CheckList.Item value="B">B</CheckList.Item>
      <CheckList.Item value="C">C</CheckList.Item>
    </CheckList>
  );
}


function ReadonlyDemo() {
  return (
    <CheckList defaultValue={["A"]} readOnly>
      <CheckList.Item value="A">A</CheckList.Item>
      <CheckList.Item value="B">B</CheckList.Item>
      <CheckList.Item value="C" >
        C
      </CheckList.Item>
    </CheckList>
  );
}

function DisabledDemo() {
  return (
    <CheckList defaultValue={["A"]} disabled>
      <CheckList.Item value="A">A</CheckList.Item>
      <CheckList.Item value="B">B</CheckList.Item>
      <CheckList.Item value="C">C</CheckList.Item>
    </CheckList>
  );
}




export default () => {
  return (
    <>
      <h3>基础用法</h3>
      <BasicDemo />
      <h3>多选</h3>
      <MultCheckDemo />
      <h3>不可取消选中</h3>
      <NondeselectableDemo />
      <h3>左侧位置</h3>
      <MultLeftCheckDemo />
      <h3>自定义选中图标</h3>
      <CustomInconDemo />
      <h3>自定义列表右侧区域</h3>
      <ExtraDemo />
      <h3>只读</h3>
      <ReadonlyDemo />
      <h3>禁用</h3>
      <DisabledDemo />
    </>
  );
}

import React, {useState} from 'react';
import Steps from '../../../../packages/wui-steps/src';
import {prefix} from '../../../../packages/wui-core/src/updatePrefix';
import type {StepsType, StepsSize, StepStatus} from '../../../../packages/wui-steps/src/iSteps';

Cypress.config({
  viewportWidth: 1000,
  viewportHeight: 500,
}) 


const { Step } = Steps;
const prefixCls = `${prefix}-steps`

const typeArr:Array<StepsType> = ['default', 'number', 'dot', 'arrow'];
const sizeArr:Array<StepsSize> = ['default', 'small'];
const statusArr:Array<StepStatus> = ['finish', 'process', 'error', 'wait'];

const defaultLen = 4;
const defaultCurrent = 2;
const moreLen = 20;
const moreCurrent = 10;

function getArr(len: number) {
  var arr = (new Array(len)).fill(0);
  arr.forEach((_item, i) => {
    arr[i] = i;
  })
  return arr;
}

function getTitle(c: number, i:number) {
  if (c === i) return '进行中'
  let txt = c > i ? '已完成' : '未开始';
  return txt;
}

function BaseStep(props: any) {
    return (<Steps {...props}>
        {
          getArr(defaultLen).map(item => {
            return (<Step title={getTitle(defaultCurrent, item)} description="这是一段描述" />)
          })
        }
      </Steps>)
}

function MoreStep(props: any) {
    const [current, setCurrent] = useState(moreCurrent);
    const change = (v: number) => {
        setCurrent(v);
    }

    return (
        <Steps {...props} onChange={change} current={current} more>
            {
                getArr(moreLen).map((item, i) => {
                    return (<Step title={`${i + 1}${getTitle(moreCurrent, item)}`} disabled={i === 5} description="这是一段描述" />)
                })
            }
        </Steps>
    )
}

function ItemsStep(props: any) {
  const description = "这是一段描述";
  const items = [
      {
          title: '已完成',
          description
      },
      {
          title: '已完成',
          subTitle: 'Time 00:00:08',
          description
      },
      {
          title: '进行中',
          description
      },
      {
          title: '未开始'
      }
  ]
  return (
    <Steps current={2} items={items} {...props} />
  )
}

describe('Steps.cy.tsx-default', () => {
  it('should mount', () => {

    cy.mount((<BaseStep current={defaultCurrent} />));
    cy.wait(300);
    cy.compareSnapshot('default');

  });
})

describe('Steps.cy.tsx-direction', () => {

  it('should mount vertical', () => {

    cy.mount((<>
        {
        typeArr.slice(0, 3).map(item => {
            return (<div style={{float: 'left', width: 250}}>
                <BaseStep current={defaultCurrent} type={item} direction="vertical"/>
                <br />
                <br />
            </div>)
        }) 
        }
    </>))
    cy.wait(300);
    cy.compareSnapshot('direction-vertical');

  });
})

describe('Steps.cy.tsx-type', () => {
  it('should mount type', () => {

    cy.mount((<>
        {
        typeArr.map(item => {
            return (<>
                <BaseStep current={defaultCurrent} type={item}/>
                <br />
                <br />
            </>)
        }) 
        }
    </>))
    cy.wait(300);
    cy.compareSnapshot(`type`);

  });
})

describe('Steps.cy.tsx-status', () => {
  it('should mount status', () => {

    cy.mount((<>
        {
        statusArr.map(item => {
            return (<>
                <BaseStep current={defaultCurrent} status={item}/>
                <br />
                <br />
            </>)
        }) 
        }
    </>))
    cy.wait(300);
    cy.compareSnapshot(`status`);

  });

  it('should mount step status', () => {

    const list = statusArr.map(item => {
      return (<>
      <Steps current={defaultCurrent}>
        {
          getArr(defaultLen).map(i => {
            return (<Step status={i === defaultCurrent ? item : undefined} title={getTitle(defaultCurrent, i)} description="这是一段描述" />)
          })
        }
      </Steps>
      <br />
      <br />
      </>);
    })

    cy.mount((<>{list}</>))
    cy.wait(300);
    cy.compareSnapshot(`step-status`);

  });
})

describe('Steps.cy.tsx-size', () => {
  it('should mount size', () => {

    cy.mount((<>
        {
        sizeArr.map(item => {
            return (<>
                <BaseStep current={defaultCurrent} size={item}/>
                <br />
                <br />
            </>)
        }) 
        }
    </>))
    cy.wait(300);
    cy.compareSnapshot(`size`);

  });
})

describe('Steps.cy.tsx-disabled', () => {
  it('should mount disabled', () => {

    cy.mount((<Steps current={defaultCurrent}>
      {
        getArr(defaultLen).map(item => {
          return (<Step disabled={item === defaultLen - 1} title={getTitle(defaultCurrent, item)} description="这是一段描述" />)
        })
      }
    </Steps>));
    cy.wait(300);
    cy.compareSnapshot('disabled');

  });
})

describe('Steps.cy.tsx-more', () => {
  it('more default and arrow', () => {

    (['default', 'arrow']).forEach(item => {
        cy.mount((<MoreStep type={item} />));
        cy.wait(500);
        cy.compareSnapshot(`more-${item}-1`);
        cy.get(`.${prefixCls} > div:first`).find(`.${prefixCls}-tab-more-select`).trigger('mouseover');
        cy.wait(500);
        cy.compareSnapshot(`more-${item}-2-dropdown`);
        cy.get(`.${prefix}-dropdown:not('.${prefix}-dropdown-hidden') > ul > li`).eq(5).click();
        cy.compareSnapshot(`more-${item}-3-dropdown-disabled-click`);
        cy.get(`.${prefixCls} > div:first`).find(`.${prefixCls}-tab-more-select`).trigger('mouseover');
        cy.wait(500);
        cy.compareSnapshot(`more-${item}-4-dropdown`);
        cy.get(`.${prefix}-dropdown:not('.${prefix}-dropdown-hidden') > ul > li`).eq(3).click();
        cy.compareSnapshot(`more-${item}-5-dropdown-click`);
      })

  });

  it('should mount more length less', () => {

    cy.mount((<BaseStep current={defaultCurrent} more onChange={() => {}} />));
    cy.wait(300);
    cy.compareSnapshot('more-less-1');
    cy.get(`.${prefix}-steps-step-wrapper > div`).eq(1).click();
    cy.compareSnapshot('more-less-2');
    cy.get(`.${prefix}-steps-step-wrapper > div`).eq(2).click();
    cy.compareSnapshot('more-less-3');

    cy.get(`.${prefix}-steps-step-wrapper > div`).eq(1).realHover()
    cy.compareWithOptions('more-less-4-hover', {
      capture: 'runner',
      clip: {x: 800, y: 80, width: 800, height: 400 }
    })

  });

})

describe('Steps.cy.tsx-locale', () => {
  
  it('should mount locale', () => {
    cy.mount((<>
      <MoreStep type={'arrow'} /><br /><br />
      <MoreStep type={'arrow'} locale={'en-us'} /><br /><br />
      <MoreStep type={'arrow'} locale={'zh-tw'} /><br /><br />
      <MoreStep type={'arrow'} locale={'vi-vn'} /><br /><br />
      </>));
      cy.wait(300);
      cy.compareSnapshot(`locale`);
  })

})

describe('Steps.cy.tsx-items', () => {
  
  it('should mount items', () => {
    cy.mount((<ItemsStep />));
    cy.wait(300);
    cy.compareSnapshot(`items`);
  })

})
import React from 'react';
import Timeline from '../../../../packages/wui-timeline/src';
import {Tag, Icon} from '../../../../packages/index'
import type {TimelineColor, TimelineMode, TimelineGroupSize} from '../../../../packages/wui-timeline/src/iTimeline';

Cypress.config({
  viewportWidth: 1200,
  viewportHeight: 1000,
}) 

const { Item } = Timeline;

const colorArr:Array<TimelineColor> = ['primary', 'success', 'info', 'danger', 'warning', 'green'];
const sizeArr:Array<TimelineGroupSize> = ['small', 'middle', 'large', 30];
const modeArr:Array<TimelineMode> = ['left', 'right', 'alternate'];

const list = [
  'Create a services site 2015-09-01',
  'Solve initial network problems 2015-09-01',
  'Technical testing 2015-09-01',
  'Network problems being solved 2015-09-01'
]

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

const groupList = [
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

const getTitle = (text: string, time: string, color: string) => {
  return (
      <div style={{position: 'relative', top: -1}}>
          <span style={{fontWeight: 'bold', fontSize: 14, marginRight: 10, verticalAlign: 'middle'}}>{text}</span>
          <Tag bordered color={color}>{time}</Tag>
      </div>
  )
}

describe('Timeline.cy.tsx-default', () => {
  it('should mount', () => {

    cy.mount((<Timeline>
      {
        list.map(item => {
          return (<Item>{item}</Item>)
        })
      }
    </Timeline>));
    cy.compareSnapshot('default');

  });
})

describe('Timeline.cy.tsx-pending', () => {
  it('should mount', () => {

    cy.mount((<Timeline pending={<div>See more</div>}>
      {
        list.map(item => {
          return (<Item>{item}</Item>)
        })
      }
    </Timeline>));
    cy.compareSnapshot('pending');

  });
})

describe('Timeline.cy.tsx-pendingDot', () => {
  it('should mount pendingDot', () => {

    cy.mount((<Timeline pending={<div>See more</div>} pendingDot={<Icon type="uf-gengduo" />}>
      {
        list.map(item => {
          return (<Item>{item}</Item>)
        })
      }
    </Timeline>));
    cy.wait(500);
    cy.compareSnapshot('pendingDot');

  });
})

describe('Timeline.cy.tsx-reverse', () => {
  it('should mount', () => {

    cy.mount((<Timeline reverse>
      {
        list.map(item => {
          return (<Item>{item}</Item>)
        })
      }
    </Timeline>));
    cy.compareSnapshot('reverse');

  });
})

describe('Timeline.cy.tsx-color', () => {
  it('should mount', () => {

    colorArr.forEach(item => {
      cy.mount((<Timeline>
        {
          list.map(c => {
            return (<Item color={item}>{c}</Item>)
          })
        }
      </Timeline>));
      cy.compareSnapshot(`color-${item}`);
    })

  });
})

describe('Timeline.cy.tsx-label', () => {
  it('should mount', () => {

    cy.mount((<Timeline>
      {
        morningList.map(item => {
          const {text, time} = item
          return (<Item label={time}>{text}</Item>)
        })
      }
    </Timeline>));
    cy.compareSnapshot(`label`);

  });
})

describe('Timeline.cy.tsx-mode', () => {
  it('should mount', () => {

    modeArr.forEach(item => {
      cy.mount((<Timeline mode={item}>
        {
          list.map(c => {
            return (<Item>{c}</Item>)
          })
        }
      </Timeline>));
      cy.compareSnapshot(`mode-default-${item}`);
    })

    modeArr.forEach(item => {
      cy.mount((<Timeline mode={item}>
        {
          morningList.map(item => {
            const {text, time} = item
            return (<Item label={time}>{text}</Item>)
          })
        }
      </Timeline>));
      cy.compareSnapshot(`mode-label-${item}`);
    })

    modeArr.forEach(item => {
      cy.mount((<Timeline mode={item}>
                  {
                      groupList.map((item, i) => {
                          const {childList} = item;
                          return (
                              <Timeline.Group key={i}>
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
              </Timeline>));
      cy.compareSnapshot(`mode-group-${item}`);
    })

  });
})

describe('Timeline.cy.tsx-group-size', () => {
  it('should mount', () => {

    sizeArr.forEach(s => {
      cy.mount((<Timeline>
                  {
                      groupList.map((item, i) => {
                          const {childList} = item;
                          return (
                              <Timeline.Group key={i} size={s}>
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
              </Timeline>));
      cy.compareSnapshot(`group-size-${s}`);
    })

  });
})
import React from 'react';

import {Progress} from '../../../../packages';


describe('progress.cy.tsx', () => {
    
    it(`it should type`, () => {
        cy.mount(
            <div>
                <Progress fieldid="demo" percent={30} showInfo={false}/>
                <Progress percent={30} steps={5}/>
                <Progress percent={70} status="exception"/>
                <Progress percent={100}/>
                <Progress percent={100} strokeWidth={20}/>
                <Progress type="circle" percent={75}/>
                <Progress type="circle" percent={70} status="exception"/>
                <Progress type="circle" percent={100}/>
                <div style={{ width: 170 }}>
                <Progress percent={30} size="small"/>
                <Progress percent={50} size="small" status="active"/>
                <Progress percent={70} size="small" status="exception"/>
                <Progress percent={100} size="small"/>
            </div>
            <Progress type="circle" percent={30} width={80}/>
                <Progress type="circle" percent={70} width={80} status="exception"/>
                <Progress type="circle" percent={100} width={80}/>
                <Progress strokeLinecap="square" type="circle" percent={75}/>
                <Progress strokeLinecap="square" type="dashboard" percent={75}/>
                <Progress type="circle" percent={50} gapPosition={'top'}/>
                <Progress type="circle" percent={50} gapPosition={'bottom'}/>
                <Progress type="circle" percent={50} gapPosition={'right'}/>
                <Progress type="circle" percent={50} gapPosition={'left'}/>
            </div>);
        cy.compareSnapshot(`all`)
    })
})
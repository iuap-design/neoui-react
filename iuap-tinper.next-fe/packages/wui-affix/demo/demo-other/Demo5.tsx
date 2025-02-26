/**
 *
 * @title offsetBottom Affix
 * @description 触发固定的距离屏幕顶部高度等于offetBottom
 *
 */

import React, {Component} from 'react';
import {Button, Affix} from '@tinper/next-ui';
class Affix5 extends Component<{}> {
    render() {
	 return (
	   <div className='affixtest'>
                <Affix offsetBottom={20}>
                    <Button colors="primary">20px to affix bottom demo5</Button>
                </Affix>
	   </div>
	 )
    }
}

export default Affix5

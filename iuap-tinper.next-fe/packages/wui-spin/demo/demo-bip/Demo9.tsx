/**
 *
 * @title loadingType为cricle
 * @description
 * @type bip
 */

import {Spin, Pagination} from '@tinper/next-ui';
import React, {useState, useRef} from 'react';

const App: React.FC = () => {
    const [activePage, setActivePage] = useState<number>(1);
    const pageRef = useRef(null);

    const handleSelect = (activePage: number) => {
        setActivePage(activePage)
    };
    const onPageSizeChange = (activePage: number, _pageSize: number) => {
        setActivePage(activePage)
    };
    return (
        <div>
            <Spin loadingType='cricle' spinning getPopupContainer={() => pageRef.current} />
            <Pagination ref={pageRef} style={{display: 'inline-flex', position: 'relative'}} showSizeChanger pageSizeOptions={["10", "20", "30", "50", "80"]} total={300} defaultPageSize={20} current={activePage} onChange={handleSelect} onPageSizeChange={onPageSizeChange}/>
        </div>
    )
}


export default App;

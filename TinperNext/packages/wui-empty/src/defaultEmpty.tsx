import * as React from 'react';
import { EmptyProps } from './iEmpty';

const defaultEmpty = (props: EmptyProps) => {
    const {className, fieldid} = props;
    return (
        <img fieldid={fieldid ? `${fieldid}_empty_img` : undefined} className={className}/>
    );
};

export default defaultEmpty;

import React from 'react';
import CreateView from './CreateView';
import GlobalParser from "./GlobalParser";
import {DynamicViewProps} from "./iDynamicView";

const DynamicView = React.forwardRef((props:DynamicViewProps, ref:any) => {
    const globalParserExtend = ()=>{
        let mergeGlobalParser;
        if (typeof props.globalParser == 'function') {
            mergeGlobalParser = props.globalParser(GlobalParser)
        }
        if (!mergeGlobalParser) {
            mergeGlobalParser = GlobalParser;
        }
        return mergeGlobalParser;
    };
    return <CreateView {...props} globalParser={globalParserExtend} ref={ref} />;
});

export default DynamicView;

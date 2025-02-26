
import { ComponentClass } from 'react';
import Bar from './Bar';
import { PartialProgressBarProps, ProgressProps } from './iProgress';
import Progress from './Progress';

Progress.Bar = Bar;
export default Progress as (ComponentClass<Partial<ProgressProps>> & {Bar: PartialProgressBarProps});

import React from 'react';

import { NotificationProps, Notification, Button } from '../../../../packages'

let newNotification: any = null;
Notification.newInstance({position: 'topRight'}, n => newNotification = n);
export default (props: Partial<NotificationProps>) => {
    const simpleFn = () => {
        newNotification!.notice({
            color: 'successlight',
            content: <span>这是一个提示</span>,
            onClose() {
                console.log('simple close');
            },
            ...props
        });
    }
    return  <div className="demoPadding">
    <Button colors="secondary" onClick={simpleFn}>simple show</Button>
</div>
}
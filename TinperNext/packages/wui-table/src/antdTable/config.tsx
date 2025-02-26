/*
 * @Author: Mr.mjc
 * @Date: 2021-11-09 16:41:08
 * @LastEditors: Mr.mjc
 * @LastEditTime: 2023-01-06 10:07:07
 * @Description:
 * @FilePath: /next-ui/packages/wui-table/src/antdTable/config.tsx
 */
export const pageConf = {
    topLeft: {
        top: true,
        position: 'flex-start'
    },
    topCenter: {
        top: true,
        position: 'center'
    },
    topRight: {
        top: true,
        position: 'flex-end'
    },
    bottomLeft: {
        top: false,
        position: 'flex-start'
    },
    bottomCenter: {
        top: false,
        position: 'center'
    },
    bottomRight: {
        top: false,
        position: 'flex-end'
    }
}

export const sizeMap = {
    'default': 'md',
    'middle': 'lg',
    'small': 'sm',
}

export const sortTypeMap = {
    'flat': undefined,
    'up': 'ascend',
    'down': 'descend'
}

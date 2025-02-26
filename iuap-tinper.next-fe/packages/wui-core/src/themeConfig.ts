const themeConfig = {
    default: {},
    red: {
        '--wui-primary-color': '#EB5230',
        '--wui-primary-color-hover': '#D7401E',
        '--wui-primary-color-active': '#D7401E',
        '--wui-primary-color-light': 'rgba(235, 82, 48, 0.1)'
    },
    green: {
        '--wui-primary-color': '#02A14B',
        '--wui-primary-color-hover': '#069346',
        '--wui-primary-color-active': '#069346',
        '--wui-primary-color-light': 'rgba(2, 161, 75, 0.1)'
    },
    blue: {
        '--wui-primary-color': '#2A82FF',
        '--wui-primary-color-hover': '#2271E1',
        '--wui-primary-color-active': '#2271E1',
        '--wui-primary-color-light': 'rgba(42, 130, 255, 0.1)'
    },
    yellow: {
        '--wui-primary-color': '#D89649',
        '--wui-primary-color-hover': '#CF8329',
        '--wui-primary-color-active': '#CF8329',
        '--wui-primary-color-light': 'rgba(216, 150, 73, 0.1)'
    },
    dark: {
        '--wui-base-bg-color': '#141414',
        '--wui-base-text-color': '#fff',
        '--wui-base-panel-bg-color': '#404551',
        '--wui-base-bg-color-disabled': '#333',
        '--wui-input-color': '#fff',
        '--wui-input-border-color': '#606656',
        '--wui-input-border-color-hover': '#808080',
        '--wui-input-suffix-icon-color': 'rgba(255,255,255,.5)',
        '--wui-input-suffix-icon-color-hover': 'rgba(255,255,255,.8)',
        '--wui-base-clear-icon-color': 'rgba(255,255,255,.5)',
        '--wui-base-clear-icon-color-hover': 'rgba(255,255,255,.8)',
        '--wui-base-clear-icon-bg-color': 'var(--wui-base-bg-color)',
        '--wui-input-bg-disabled': '#333333',
        '--wui-input-bg-color-required': 'transparent',
        '--wui-base-item-bg-hover': 'rgba(255,255,255, .15)',
        '--wui-base-item-bg-active': 'rgba(255,255,255, .15)',
        '--wui-base-item-bg-selected': 'rgba(255,255,255, .25)',
        '--wui-base-item-bg-selected-hover': 'rgba(255,255,255, .25)',
        '--wui-table-head-bg-color': 'var(--wui-base-panel-bg-color)',
        '--wui-calendar-table-header-bg-color': 'var(--wui-base-panel-bg-color)',
        '--wui-calendar-header-switcher-focus-bg-color': '#000',
        '--wui-card-head-bg-color': 'var(--wui-base-panel-bg-color)',
        '--wui-tabs-color': '#fff',
        '--wui-tabs-overflow-btn-color': '#ccc',
        '--wui-tabs-line-color-default': '#fff',
        '--wui-tabs-line-color': '#fff',
        '--wui-tabs-line-color-active': '#fff',
        '--wui-tabs-line-bg-color-hover': 'transparent',
        '--wui-tabs-card-bg-color-hover': 'var(--wui-base-bg-color)',
        '--wui-tabs-card-nav-bg-color': 'var(--wui-base-bg-color)',
        '--wui-tabs-card-bg-color-active': 'var(--wui-base-bg-color)',
        '--wui-button-default-bg-color-hover': 'var(--wui-base-bg-color)',
        '--wui-button-default-color': '#fff',
        '--wui-button-default-color-hover': '#fff',
        '--wui-button-default-color-active': '#fff',
        '--wui-button-default-border-color': '#505766',
        '--wui-button-default-border-color-hover': '#bbb',
        '--wui-button-default-border-color-active': '#fff',
        'background-color': 'var(--wui-base-bg-color)'
    }
}

// export default themeConfig // 该资源将在postbuild被以require方式引用，不可改为export default的es module形式
module.exports = themeConfig

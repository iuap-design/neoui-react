/**
 * This source code is quoted from rc-util.
 * homepage: https://github.com/react-component/util
 */
import ReactDOM from 'react-dom';

function defaultGetContainer() {
    const container = document.createElement('div');
    document.body.appendChild(container);
    return container;
}

export default function getContainerRenderMixin(this:any, config:any) {
    const {
        autoMount = true,
        autoDestroy = true,
        isVisible,
        getComponent,
        getContainer = defaultGetContainer,
    } = config;

    let mixin:any;

    function renderComponent(instance:any, componentArg?:any, ready?:Function) {
        if (!isVisible || instance._component || isVisible(instance)) {
            if (!instance._container) {
                instance._container = getContainer(instance);
            }
            let component;
            if (instance.getComponent) {
                component = instance.getComponent(componentArg);
            } else {
                component = getComponent(instance, componentArg);
            }
            ReactDOM.unstable_renderSubtreeIntoContainer(instance,
                component, instance._container,
                function callback(this:any) {
                    instance._component = this;
                    if (ready) {
                        ready.call(this);
                    }
                });
        }
    }

    if (autoMount) {
        mixin = {
            ...mixin,
            componentDidMount() {
                renderComponent(this);
            },
            componentDidUpdate() {
                renderComponent(this);
            },
        };
    }

    if (!autoMount || !autoDestroy) {
        mixin = {
            ...mixin,
            renderComponent(componentArg?:any, ready?:any) {
                renderComponent(this, componentArg, ready);
            },
        };
    }

    function removeContainer(instance:any) {
        if (instance._container) {
            const container = instance._container;
            ReactDOM.unmountComponentAtNode(container);
            container.parentNode.removeChild(container);
            instance._container = null;
        }
    }

    if (autoDestroy) {
        mixin = {
            ...mixin,
            componentWillUnmount() {
                removeContainer(this);
            },
        };
    } else {
        mixin = {
            ...mixin,
            removeContainer() {
                removeContainer(this);
            },
        };
    }

    return mixin;
}

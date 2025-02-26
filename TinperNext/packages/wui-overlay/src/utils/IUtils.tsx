import {
    ReactInstance
} from 'react';
export interface AddEventLReturn {
    remove: () => void
}
export type ContainerNode = ReactInstance | null | undefined | ((h?: HTMLElement) => HTMLElement);
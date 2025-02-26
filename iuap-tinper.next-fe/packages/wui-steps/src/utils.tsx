/**
 * This source code is quoted from rc-steps.
 * homepage: https://github.com/react-component/steps
 */
export function isFlexSupported() {
    if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
        const {documentElement} = window.document;
        return 'flex' in documentElement.style ||
			'webkitFlex' in documentElement.style ||
			'Flex' in documentElement.style ||
			'msFlex' in documentElement.style;
    }
    return false;
}

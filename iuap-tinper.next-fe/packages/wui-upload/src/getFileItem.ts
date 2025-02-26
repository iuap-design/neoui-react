/**
 * This source code is quoted from rc-upload.
 * homepage: https://github.com/react-component/upload
 */
import { DefaultListArr } from './iUpload'
export default function getFileItem(file: DefaultListArr, fileList: DefaultListArr[]) {
    let matchWay = (!file.uid) ? 'byName' : 'byUid';
    let target = fileList.filter((item) => {
        if (matchWay === 'byName') {
            return item.name === file.name;
        }
        return item.uid === file.uid;
    })[0];
    return target;
}

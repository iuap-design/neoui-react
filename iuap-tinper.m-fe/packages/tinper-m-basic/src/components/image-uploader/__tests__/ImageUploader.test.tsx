/** ImageUploader.tsx */
import React, { useState } from 'react'
import { mount } from '@tests/mount'
import { ImageUploader} from '@tinper/m'
import type { ImageUploadItem } from '@tinper/m'
import { muiPrefix } from '@utils/UpdatePrefixs'
import { sleep } from '@utils/Sleeps';
import EyeOff from '@tinper/m-icons/lib/cjs/EyeOff'

const prefixImageUploader = `${muiPrefix}-image-uploader`;
const prefixImageViewer = `${muiPrefix}-image-viewer`;
const prefixGrid = `${muiPrefix}-grid`;
const prefixSpace = `${muiPrefix}-space`;

async function mockUpload(file: File) {
    await sleep(3000)
    return {
        url: URL.createObjectURL(file),
    }
}

async function mockUploadFail() {
    await sleep(3000)
    throw new Error('Fail to upload')
}

function Basic() {
    const [fileList, setFileList] = useState<ImageUploadItem[]>([
        {
            url: 'a',
        },
    ])

    const [fileList1, setFileList1] = useState<ImageUploadItem[]>([
        {
            url: 'a',
        },
        {
            url: 'b',
        }
    ])

    return (
        <ImageUploader
            value={fileList1}
            onChange={setFileList}
            upload={mockUpload}
            defaultValue={fileList}
            maxCount={2}
        />
    )
}

function NewTh() {
    const [fileList, setFileList] = useState<ImageUploadItem[]>([
        {
            url: 'a',
        }
    ])

    return (
        <ImageUploader
            columns={5}
            className='test-class'
            style={{ color: 'red' }}
            value={fileList}
            fieldid="fieldid-test"
            onChange={setFileList}
            upload={mockUpload}
            deleteIcon={<EyeOff />}
        />
    )
}

describe(('ImageUploader Component'), () => {
    let wrapper: any;
    let wrapper1: any;
    beforeEach(() => {
        wrapper = mount(<Basic />);
        wrapper1 = mount(<NewTh />);
    })
    afterEach(() => {
        wrapper && wrapper.length && wrapper.unmount();
        wrapper1 && wrapper1.length && wrapper1.unmount();
    })
    it('className test, <test prop:: className>', () => {
        expect(wrapper1.find(`.${prefixImageUploader}`).hasClass('test-class')).toEqual(true)
    });
    it('style test, <test prop:: style>', () => {
        expect(wrapper1.find(`.${prefixImageUploader}`).prop('style').color).toEqual('red')
    });
    it('columns test, <test prop:: columns>', () => {
        expect(wrapper.find(`.${prefixImageUploader}`).exists(`.${prefixGrid}`)).toEqual(false)
        expect(wrapper.find(`.${prefixImageUploader}`).exists(`.${prefixSpace}`)).toEqual(true)

        expect(wrapper1.find(`.${prefixImageUploader}`).exists(`.${prefixGrid}`)).toEqual(true)
        expect(wrapper1.find(`.${prefixImageUploader}`).exists(`.${prefixSpace}`)).toEqual(false)
        expect(wrapper1.find(`.${prefixGrid}`).prop('style')['_values']['--columns']).toEqual("5")
    });
    it('deleteIcon test, <test prop:: deleteIcon>', () => {
        expect(wrapper.find(`.${prefixImageUploader}-cell-delete`).find('svg').prop('class')).toEqual(`${prefixImageUploader}-cell-delete-icon`)
        expect(wrapper.find(`.${prefixImageUploader}-cell-delete`).find('svg').prop('id')).toEqual('arcclose-circle-Fill')

        expect(wrapper1.find(`.${prefixImageUploader}-cell-delete`).find('svg').prop('class')).toEqual(undefined)
        expect(wrapper1.find(`.${prefixImageUploader}-cell-delete`).find('svg').prop('id')).toEqual('arceye-off')
    });
    it('value && defaultValue test, <test prop:: value>, <test prop:: defaultValue>', () => {
        expect(wrapper.find('img').length).toEqual(2)
        expect(wrapper1.find('img').length).toEqual(1)
    });
    it('maxCount test, <test prop:: maxCount>', () => {
        expect(wrapper.find(`.${prefixImageUploader}-upload-button-wrap`).last().prop('style').display).toEqual('none')
        expect(wrapper1.find(`.${prefixImageUploader}-upload-button-wrap`).last().prop('style').display).toEqual('')
    });
    ['contain', 'cover', 'fill', 'none', 'scale-down'].forEach(item => {
        it('imageFit test, <test prop:: imageFit>', () => {
            function ImageFit() {
                const [fileList, setFileList] = useState<ImageUploadItem[]>([
                    { url: 'a' }
                ])
                return (
                    <ImageUploader
                        value={fileList}
                        onChange={setFileList}
                        upload={mockUpload}
                        imageFit={item}
                    />
                )
            };
            const wrapperTemq = mount(<ImageFit />);
            expect(wrapperTemq.find('img').prop('style')['object-fit']).toBe(item);
            wrapperTemq.unmount()
        })
    });
    it('children test, <test prop:: children>', () => {
        function ImageFit() {
            const [fileList, setFileList] = useState<ImageUploadItem[]>([
                { url: 'a' }
            ])
            return (
                <ImageUploader
                    value={fileList}
                    onChange={setFileList}
                    upload={mockUpload}
                    children={<div className='children-test'>123</div>}
                />
            )
        };
        const wrapperTemq = mount(<ImageFit />);
        expect(wrapperTemq.find(`.${prefixImageUploader}-upload-button-wrap`).find('.children-test').instance().innerHTML).toEqual('123');
        wrapperTemq.unmount();
    });
    ['camera', 'camcorder', 'microphone'].forEach(item => {
        it('capture test, <test prop:: capture>', () => {
            function ImageFit() {
                const [fileList, setFileList] = useState<ImageUploadItem[]>([
                    { url: 'a' }
                ])
                return (
                    <ImageUploader
                        value={fileList}
                        onChange={setFileList}
                        upload={mockUpload}
                        capture={item}
                    />
                )
            };
            const wrapperTemq = mount(<ImageFit />);
            expect(wrapperTemq.find('input').prop('capture')).toBe(item);
            wrapperTemq.unmount()
        })
    });
    it('fieldid test, <test prop:: fieldid>', () => {
        expect(wrapper.find(`.${prefixImageUploader}`).prop('fieldid')).toEqual(undefined);
        expect(wrapper1.find(`.${prefixImageUploader}`).prop('fieldid')).toEqual('fieldid-test_image_uploader');
        expect(wrapper1.find(`.${prefixImageUploader}-grid`).prop('fieldid')).toEqual('fieldid-test_image_uploader_grid');
        expect(wrapper1.find(`.${prefixImageUploader}-cell-wrapper`).at(0).prop('fieldid')).toEqual('fieldid-test_image_uploader_0_item_cell_wrapper');
        expect(wrapper1.find(`.${prefixImageUploader}-cell-image`).at(0).prop('fieldid')).toEqual('fieldid-test_image_uploader_0_item_image');
        expect(wrapper1.find(`.${prefixImageUploader}-cell-delete`).at(0).prop('fieldid')).toEqual('fieldid-test_image_uploader_0_item_cell_delete');
        expect(wrapper1.find(`.${prefixImageUploader}-upload-button-wrap`).at(0).prop('fieldid')).toEqual('fieldid-test_image_uploader_upload_button_wrap');
        expect(wrapper1.find(`.${prefixImageUploader}-input`).at(0).prop('fieldid')).toEqual('fieldid-test_image_uploader_input');
    });
    it('clsPrefix test, <test prop:: clsPrefix>', () => {
        const cls = 'clsTest';
        const clsImageUploader = cls + '-image-uploader';
        function ImageFit() {
            const [fileList, setFileList] = useState<ImageUploadItem[]>([
                { url: 'a' }
            ])
            return (
                <ImageUploader
                    value={fileList}
                    onChange={setFileList}
                    upload={mockUpload}
                    clsPrefix={cls}
                />
            )
        };
        const wrapperTemq1 = mount(<ImageFit />);
        expect(wrapperTemq1.exists(`.${clsImageUploader}`)).toEqual(true);
        expect(wrapperTemq1.exists(`.${clsImageUploader}-space`)).toEqual(true);
        expect(wrapperTemq1.exists(`.${clsImageUploader}-cell`)).toEqual(true);
        expect(wrapperTemq1.exists(`.${clsImageUploader}-cell-image`)).toEqual(true);
        expect(wrapperTemq1.exists(`.${clsImageUploader}-cell-delete`)).toEqual(true);
        expect(wrapperTemq1.exists(`.${clsImageUploader}-upload-button-wrap`)).toEqual(true);
        expect(wrapperTemq1.exists(`.${clsImageUploader}-input`)).toEqual(true);
        wrapperTemq1.unmount()
    });
    it('showUpload test, <test prop:: showUpload>', () => {
        function ImageFit() {
            const [fileList, setFileList] = useState<ImageUploadItem[]>([
                { url: 'a' }
            ])
            return (
                <ImageUploader
                    value={fileList}
                    onChange={setFileList}
                    upload={mockUpload}
                    showUpload={false}
                />
            )
        };
        const wrapperTemq = mount(<ImageFit />);
        expect(wrapperTemq.find(`.${prefixImageUploader}-upload-button-wrap`).prop('style').display).toEqual('none');
        wrapperTemq.unmount()
    });
    it('preview test, <test prop:: preview>', async () => {
        function ImageFit() {
            const [fileList, setFileList] = useState<ImageUploadItem[]>([
                { url: 'a' }
            ])
            return (
                <ImageUploader
                    value={fileList}
                    onChange={setFileList}
                    upload={mockUpload}
                    preview={false}
                />
            )
        };
        const wrapperTemq = mount(<ImageFit />);
        wrapperTemq.find('img').simulate('click');
        expect(wrapperTemq.exists(`.${prefixImageViewer}-content`)).toEqual(false);
        wrapperTemq.unmount()
    });
    it('multiple test, <test prop:: multiple>', async () => {
        function ImageFit() {
            const [fileList, setFileList] = useState<ImageUploadItem[]>([
                { url: 'a' }
            ])
            return (
                <ImageUploader
                    value={fileList}
                    onChange={setFileList}
                    upload={mockUpload}
                    multiple={true}
                />
            )
        };
        const wrapperTemq = mount(<ImageFit />);
        expect(wrapperTemq.find(`.${prefixImageUploader}-input`).prop('multiple')).toEqual(true);
        wrapperTemq.unmount()
    });
    it('disableUpload test, <test prop:: disableUpload>', () => {
        function ImageFit() {
            const [fileList, setFileList] = useState<ImageUploadItem[]>([
                { url: 'a' }
            ])
            return (
                <ImageUploader
                    value={fileList}
                    onChange={setFileList}
                    upload={mockUpload}
                    disableUpload={true}
                />
            )
        };
        const wrapperTemq = mount(<ImageFit />);
        expect(wrapperTemq.find(`.${prefixImageUploader}`).exists(`.${prefixImageUploader}-input`)).toEqual(false);
        wrapperTemq.unmount()
    });
    it('deletable test, <test prop:: deletable>', () => {
        function ImageFit() {
            const [fileList, setFileList] = useState<ImageUploadItem[]>([
                { url: 'a' }
            ])
            return (
                <ImageUploader
                    value={fileList}
                    onChange={setFileList}
                    upload={mockUpload}
                    deletable={false}
                />
            )
        };
        const wrapperTemq = mount(<ImageFit />);
        expect(wrapperTemq.find(`.${prefixImageUploader}`).exists(`.${prefixImageUploader}-cell-delete`)).toEqual(false);
        wrapperTemq.unmount()
    });
    ['image/gif', 'image/jpeg', 'image/jpg', 'image/png', 'image/*'].forEach(item => {
        it('accept test, <test prop:: accept>', () => {
            function ImageFit() {
                const [fileList, setFileList] = useState<ImageUploadItem[]>([
                    { url: 'a' }
                ])
                return (
                    <ImageUploader
                        value={fileList}
                        onChange={setFileList}
                        upload={mockUpload}
                        accept={item}
                    />
                )
            };
            const wrapperTemq = mount(<ImageFit />);
            expect(wrapperTemq.find('input').prop('accept')).toBe(item);
            wrapperTemq.unmount()
        })
    });
});
// function
describe('function test', () => {
    it('onDelete test, <test prop:: onDelete>', () => {
        const onDelete = jest.fn();
        function ImageFit() {
            const [fileList, setFileList] = useState<ImageUploadItem[]>([
                { url: 'a' }
            ])
            return (
                <ImageUploader
                    value={fileList}
                    onChange={setFileList}
                    upload={mockUpload}
                    onDelete={onDelete}
                />
            )
        };
        const wrapperTemq = mount(<ImageFit />);
        expect(onDelete).toHaveBeenCalledTimes(0);
        wrapperTemq.find(`.${prefixImageUploader}`).find(`.${prefixImageUploader}-cell-delete`).simulate('click');
        expect(onDelete).toHaveBeenCalledTimes(1);
        wrapperTemq.unmount()
    });
    it('onPreview test, <test prop:: onPreview>', async () => {
        const onPreview = jest.fn();
        function ImageFit() {
            const [fileList, setFileList] = useState<ImageUploadItem[]>([
                { url: 'a' }
            ])
            return (
                <ImageUploader
                    value={fileList}
                    onChange={setFileList}
                    upload={mockUpload}
                    onPreview={onPreview}
                />
            )
        };
        const wrapperTemq = mount(<ImageFit />);
        expect(onPreview).toHaveBeenCalledTimes(0);
        wrapperTemq.find('img').simulate('click');
        expect(onPreview).toHaveBeenCalledTimes(1);
        wrapperTemq.unmount()
    });
})


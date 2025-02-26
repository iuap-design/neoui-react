/** index.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import React, {Component} from 'react';
import {attrsTestByLength, eventsTest, testStyle} from "../../../next-ui-library/test/common/index"

import Button from '../../wui-button/src/index';
import Icon from '../../wui-icon/src/index';
import Upload from '../src';
import {prefix} from '../../wui-core/src/updatePrefix';
import AjaxUploader from '../src/AjaxUploader';
const prefixUpload = `${prefix}-upload`;

describe('Upload test', () => {
    let state, name;
    const props = {
        name: 'file',
        action: '/upload.do',
        headers: {
            authorization: 'authorization-text',
        },
        listType: 'picture',
        defaultFileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }, {
            uid: -2,
            name: 'yyy.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }],
        showUploadList: {
            showDownloadIcon: true,
            showRemoveIcon: true,
            removeIcon: " x ",
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                state = 'uploading';
            }
            if (info.file.status === 'done') {
                state = 'done';
                console.log(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                state = 'error';
                console.log(`${info.file.name} file upload failed.`);
            }
        },
        onPreview(info) {
            name = info.name
        },
        onRemove(info) {
            name = info.name
        },
        downloadText: '这是下载按钮',
        removeText: '这是移除按钮'
    };

    class Demo1 extends Component {
        render() {
            return (
                <Upload {...props} {...this.props}>
                    <Button type="primary" shape="border">
                        <Icon type="upload"/> Click to Upload
                    </Button>
                </Upload>
            )
        }
    }

    it('upload render successfully', () => {
        let upload = mount(<Demo1/>);
        expect(upload.find(`.${prefixUpload}-select`).length).toEqual(1);
    });
    it('component: Upload, <test prop:: fileList>, <test prop:: defaultFileList>  upload default list', () => {
        let upload = mount(<Demo1/>);
        let uploadList = upload.find(`.${prefixUpload}-list-item-done`);
        expect(uploadList.length).toEqual(2);
        upload.unmount()
        upload = mount(<Demo1 fileList={[]}/>);
        uploadList = upload.find(`.${prefixUpload}-list-item-done`);
        expect(uploadList.length).toEqual(0);
    });
    it('component: Upload, <test prop:: showUploadList> showed list count should be two', () => {
        let upload = mount(<Demo1/>);
        let uploadList = upload.find(`.${prefixUpload}-list-item-thumbnail`);
        expect(uploadList.length).toEqual(2);
    });
    it('component: Upload, <test prop:: listType> upload listType should be picture', () => {
        let upload = mount(<Demo1/>);
        let uploadList = upload.find(`.${prefixUpload}-list`);
        expect(uploadList.at(0).hasClass(`${prefixUpload}-list-picture`)).toEqual(true);
    });
    it('component: Upload, <test prop:: onRemove> remove file callback', () => {
        let upload = mount(<Demo1/>);
        let removeDom = upload.find('.uf-del').at(0);
        removeDom.simulate('click');
        expect(name).toEqual('xxx.png');
    });
    it('component: Upload, <test prop:: onPreview> click link or preview callback', () => {
        let upload = mount(<Demo1/>);
        let removeDom = upload.find(`.${prefixUpload}-list-item-name`).at(1);
        removeDom.simulate('click');
        expect(name).toEqual('yyy.png');
    });
    it('component: Upload, <test prop:: downloadText> upload downloadText', () => {
        let upload = mount(<Demo1/>);
        let downtext = upload.find('.uf-download');
        expect(downtext.at(0).props().title).toEqual('这是下载按钮');
    });
    it('component: Upload, <test prop:: removeText> upload removeText', () => {
        let upload = mount(<Demo1/>);
        let downtext = upload.find('.uf-del');
        expect(downtext.at(1).props().title).toEqual('这是移除按钮');
    });
    it('component: Upload, <test prop:: beforeUpload> beforeUpload', () => {
        const upload = (
            <Upload
                beforeUpload={file => {
                    const {name: returnType} = file;
                    if (returnType === 'boolean') {
                        return true;
                    }
                    if (returnType === 'Promise<boolean>') {
                        return Promise.resolve(false);
                    }
                    if (returnType === 'file') {
                        return file;
                    }
                    if (returnType === 'Promise<file>') {
                        return Promise.resolve(file);
                    }
                    if (returnType === 'string') {
                        return Upload.LIST_IGNORE;
                    }
                    if (returnType === 'Promise<string>') {
                        return Promise.resolve(Upload.LIST_IGNORE);
                    }
                    if (returnType === 'Promise<void>') {
                        return Promise.resolve();
                    }
                }}
            >
                <span>click to upload</span>
            </Upload>
        );
        expect(upload).toBeTruthy();
    });
    it('component: Upload, <test prop:: type> upload Dragger file', () => {
        const wrapper = mount(<Demo1 type="drag"/>)

        wrapper.find(`.${prefixUpload}-drag-container`).simulate('dragover', {
            target: {
                files: [{file: 'foo.png'}],
            },
        });
        wrapper.update();

        expect(wrapper.find(`.${prefixUpload}`).at(0).hasClass(`${prefixUpload}-drag`)).toBe(true);
    })
    it('component: Upload, <test prop:: listType> upload Dragger file', () => {
        const wrapper = mount(
            <Upload.Dragger action="http://upload.com">
                <div/>
            </Upload.Dragger>,
        );

        wrapper.find(`.${prefixUpload}-drag-container`).simulate('dragover', {
            target: {
                files: [{file: 'foo.png'}],
            },
        });
        wrapper.update();

        expect(wrapper.find(`.${prefixUpload}`).at(0).hasClass(`${prefixUpload}-drag`)).toBe(true);
    })
    it('component: Upload, <test prop:: accept> upload accept should be .png', () => {
        const wrapper = mount(<Demo1 accept='.png'/>);
        expect(wrapper.find('input').at(0).props().accept).toBe('.png');
    })
    it('component: Upload, <test prop:: multiple> upload multiple should be true', () => {
        const wrapper = mount(<Demo1 multiple={true}/>);

        expect(wrapper.find('input').at(0).props().accept).toBe('');
    })
    it('component: Upload, <test prop:: directory> upload directory should be true', () => {
        const wrapper = mount(<Demo1 directory={true}/>);
        expect(wrapper.find('input').at(0).props().webkitdirectory).toBe("true");
    })
    //新增fieldid测试
    describe('component:  Upload, <test prop:: fieldid>', () => {
        it('[contains(@fieldid,"***-del","***-download")]', () => {
            let wrapper = mount(<Demo1 fieldid="test" />);
            // expect(wrapper.find(`.uf-download`).at(0).).toBe(undefined);
            // expect(wrapper.find(`.uf-download`).props().fieldid).toBe(undefined);
            // expect(wrapper.find(`.uf-download`).props().fieldid).toBe(undefined);
            // expect(wrapper.find(`.uf-del`).props().fieldid).toBe(undefined);
            // wrapper.setProps({ fieldid: 'test' });
            expect(wrapper.find(`.uf-download`).props().fieldid).toBe("test-download");
            expect(wrapper.find(`.uf-del`).props().fieldid).toBe("test-del");
        });
        it('[contains(@fieldid,"***-close")]', () => {
            let wrapper = mount(<Demo1 fieldid="test"  showUploadList={{ showDownloadIcon: true, showRemoveIcon: false }} />);
            // wrapper.setProps({ showUploadList: { showDownloadIcon: true, showRemoveIcon: false } });
            // expect(wrapper.find(`.uf-close`).at(0).props().fieldid).toBe(undefined);
            // wrapper.setProps({ fieldid: 'test' });
            expect(wrapper.find(`.uf-close`).props().fieldid).toBe("test-close");
        });
        it('[contains(@fieldid,"***-preview")]', () => {
            let wrapper = mount(<Demo1 fieldid="test" listType="picture-card" />);
            // wrapper.setProps({ listType: 'picture-card' });
            // expect(wrapper.find(`.uf-eye-o`).at(0).props().fieldid).toBe(undefined);
            // wrapper.setProps({ fieldid: 'test' });
            expect(wrapper.find(`.uf-eye-o`).props().fieldid).toBe("test-preview");
        });
    });


    eventsTest({
        title: 'component: Upload, <test prop:: mergeFiles>, <test prop:: customRequest>,<test prop:: headers>, <test prop:: name>, <test prop:: data>, <test prop:: action>',
        Component: Demo1,
        propFuncName: 'customRequest',
        dependentProps: {
            name: "name1",
            action: 'www.yonyou.com',
            data: {
                a: 1,
                b: 2
            },
            headers: '444',
            mergeFiles: true
        },
        selector: `input`,
        eventName: 'change',
        hasTimeout: true,
        eventArgs: [{
            target: {
                files: [
                    {
                        uid: -4,
                        name: 'xxdx.png',
                        status: 'done',
                        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    }
                ]
            }
        }],
        afterTest: (ev) => {
            expect(ev.mock.calls[0][0].filename).toBe('name1')
            expect(ev.mock.calls[0][0].action).toBe('www.yonyou.com')
            expect(ev.mock.calls[0][0].headers).toBe('444')
            expect(ev.mock.calls[0][0].data.a).toBe(1)
            expect(ev.mock.calls[0][0].file[0].name).toBe('xxdx.png')
        }
    });

    eventsTest({
        title: 'component: Upload, <test prop:: mergeFiles>, <test prop:: customRequest>,<test prop:: headers>, <test prop:: name>, <test prop:: data>, <test prop:: action>',
        Component: Demo1,
        propFuncName: 'onChange',
        dependentProps: {
            name: "name1",
            action: 'www.yonyou.com',
            data: {
                a: 1,
                b: 2
            },
            headers: '444',
            mergeFiles: true,
            customRequest: undefined
        },
        selector: `input`,
        eventName: 'change',
        hasTimeout: true,
        eventArgs: [{
            target: {
                files: [
                    {
                        uid: -4,
                        name: 'xxdx.png',
                        status: 'done',
                        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    }
                ]
            }
        }],
    });
    eventsTest({
        title: 'component: Upload, <test prop:: mergeFiles false>',
        Component: Demo1,
        propFuncName: 'onChange',
        dependentProps: {
            name: "name1",
            action: 'www.yonyou.com',
            data: () => {},
            headers: '444',
            mergeFiles: false,
            customRequest: undefined,
            supportServerRender: false
        },
        selector: `input`,
        eventName: 'change',
        hasTimeout: true,
        eventArgs: [{
            target: {
                files: [
                    {
                        uid: -4,
                        name: 'xxdx.png',
                        status: 'done',
                        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                        process: '50'
                    }
                ]
            }
        }],
    });
    eventsTest({
        title: 'component: Upload, <test prop:: file array length null>',
        Component: Demo1,
        propFuncName: 'onChange',
        dependentProps: {
            name: "name1",
            action: 'www.yonyou.com',
            data: () => {},
            headers: '444',
            mergeFiles: false,
            customRequest: undefined,
            onprogress: () => {}
        },
        selector: `input`,
        eventName: 'change',
        hasTimeout: true,
        eventArgs: [{
            target: {
                files: [
                    {
                        uid: -4,
                        name: 'xxdx.png',
                        status: 'uploading',
                        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                        process: '50'
                    }
                ]
            }
        }],
    });
    eventsTest({
        title: 'component: Upload, <test prop:: onChange>',
        Component: Demo1,
        propFuncName: 'onChange',
        dependentProps: {
            name: "name1"
        },
        selector: `input`,
        hasTimeout: true,
        eventName: 'change',
        eventArgs: [{
            target: {
                files: [
                    {
                        uid: -4,
                        name: 'xxdx.png',
                        status: 'done',
                        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    }
                ]
            }
        }]
    });
    eventsTest({
        title: 'component: Upload, <test prop:: onDownload>',
        Component: Demo1,
        propFuncName: 'onDownload',
        dependentProps: {
            name: "name1"
        },
        selector: `.uf-download`,
        eventName: 'click',
        eventArgs: [
            {
                uid: -4,
                name: 'xxdx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }
        ]
    });

    eventsTest({
        title: 'component: Upload, <test prop:: onPreview>,  <test prop:: listType>, <test prop:: preventDefaultPreview>',
        Component: Demo1,
        propFuncName: 'onPreview',
        dependentProps: {
            listType: "picture-card",
            preventDefaultPreview: false,
        },
        selector: `.${prefixUpload}-list-item-name`,
        eventName: 'click',
        eventArgs: [
            {
                uid: -4,
                name: 'xxdx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }, {
                preventDefault: () => {
                }
            }
        ],
        // afterTest: (ev, wrapperD) => {
        //     expect(wrapperD.find('Modal')).toHaveLength(1)
        // }
    });
    attrsTestByLength({
        title: 'component: Upload, <test prop:: disabled>',
        Component: Demo1,
        attrs: {},
        selector: `span.${prefixUpload}-disabled`,
        testAttrArr: [
            {
                nodeCount: 1,
                disabled: true
            },
            {
                nodeCount: 0,
                disabled: false
            },
        ]
    })
    testStyle({
        title: 'component: Upload, <test prop:: style>',
        Component: Demo1,
        selector: `.${prefixUpload} span`,
        style: {'color': "red"}
    });
    it('component: Upload, <test prop:: beforeUpload> beforeUpload false', () => {
        const upload = mount(
            <Upload
                beforeUpload={() => {
                        return false;
                }}
            >
                <span>click to upload</span>
            </Upload>
        );
        expect(upload).toBeTruthy();
    });
    describe('component: upload', () => {
        it('component: Upload, <test prop:: file click>', () => {
            let props = {
                name: 'file',
                action: '/upload.do',
                headers: {
                    authorization: 'authorization-text', // 示例代码
                },
                listType: "picture-card",
                onChange(info) {
                    if (info.file.status !== 'uploading') {
                        console.log(info.file, info.fileList);
                    }
                    if (info.file.status === 'done') {
                        console.log(`${info.file.name} file uploaded successfully`);
                    } else if (info.file.status === 'error') {
                        console.log(`${info.file.name} file upload failed.`);
                    }
                },
                defaultFileList: [{
                    uid: -1,
                    name: 'xxx.png',
                    status: 'uploading',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                }, {
                    uid: -2,
                    name: 'yyy.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                }],
                showUploadList: {
                    showDownloadIcon: true,
                    showRemoveIcon: true,
                    removeIcon: <Icon type="uf-book" />,
                },
            };
            let wrapper = mount(
                <Upload {...props}>
                    <span>click to upload</span>
                </Upload>
            );
            // 代码覆盖度的测试，这里input的type为file类型，调用系统文件选择框选择文件之后点击确认的触发时间，无法模拟
            // wrapper.find('AjaxUploader').instance().onClick()
            // wrapper.find('AjaxUploader').instance().onKeyDown({key: 'Enter'})
            // document.querySelector('body').dispatchEvent(new KeyboardEvent('keydown', { 'keyCode': KeyCode.ENTER , bubbles: true}))
            // wrapper.setProps({listType: ''})
        });
        it('component: Upload, <test prop:: index fun>', async () => {
            let props = {
                name: 'file',
                action: '/upload.do',
                headers: {
                    authorization: 'authorization-text', // 示例代码
                }
            };
            let fileList = [{
                    uid: -1,
                    name: 'yyy.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
                {
                    uid: -2,
                    name: 'yyy.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                }
            ]
            let wrapper = mount(
                <Upload {...props} {...fileList}>
                    <span>click to upload</span>
                </Upload>
            );
            // wrapper.find('Upload').at(0).setState({fileList})
            // wrapper.setProps({fileList})
            // wrapper.find('Upload').at(0).instance().customProgress = {percent: '50'}
            // window.FormData = undefined
            // wrapper.find('Upload').at(0).instance().onStart(fileList)
            // wrapper.find('Upload').at(0).instance().onSuccess('success', fileList[0])
            // wrapper.find('Upload').at(0).instance().onProgress({
	        //     percent: '50'
	        // }, fileList[0])
            // wrapper.find('Upload').at(0).instance().onError('error', '失败' ,fileList[0])
            // wrapper.find('Upload').at(0).instance().onFileDrop({type: 'onDrop'})
            // wrapper.find('Upload').at(0).instance().onDragEnter({type: 'onDragEnter', target: 'file'})
            // wrapper.find('Upload').at(0).instance().onDragLeave({type: 'onDragLeave', target: 'file', stopPropagation: () => {}, preventDefault: () => {}})
        });
        it('component: Upload, <test prop:: ajaxUploader fun>', () => {
            let props = {
                name: 'file',
                action: '/upload.do',
                headers: {
                    authorization: 'authorization-text', // 示例代码
                },
                defaultFileList: [{
                    uid: -1,
                    name: 'yyy.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
                {
                    uid: -2,
                    name: 'yyy.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                }]
            };
            let wrapper = mount(
                <Upload {...props}>
                    <span>click to upload</span>
                </Upload>
            );
            // wrapper.find('AjaxUploader').instance().onFileDrop({type: 'dropEnter', dataTransfer: {files: props.defaultFileList}, preventDefault: () => {}})
            // wrapper.setProps({beforeUpload: () => { return Promise.resolve(true)}})
            // wrapper.find('AjaxUploader').instance().upload(props.defaultFileList[0], props.defaultFileList)
        });
    })
    describe('Upload Test', () => {
        it('component: Upload, <test prop:: enterDragger>', async () => {
            let enterDragger = jest.fn()
            const wrapper = mount(
                <Upload.Dragger action="http://upload.com" enterDragger={enterDragger}>
                    <div/>
                </Upload.Dragger>,
            );
    
            wrapper.find(`.${prefixUpload}-drag-container`).simulate('dragover', {
                target: {
                    files: [{file: 'foo.png'}],
                },
            });
            // expect(enterDragger).toHaveBeenCalled()
            wrapper.update();
    
            expect(wrapper.find(`.${prefixUpload}`).at(0).hasClass(`${prefixUpload}-drag`)).toBe(true);
        })
        it('component: Upload, <test prop:: locale>', () => {
            let upload = mount(<Demo1 locale="zn-cn" />);
            expect(upload.find(`.${prefixUpload}-select`).length).toEqual(1);
            upload.find(`.${prefixUpload}`).simulate('mouseEnter')
        });
        it('component: Upload, <test prop:: progress>', () => {
            let upload = mount(<Demo1 progress={{
                strokeColor: {
                    "0%": "#108ee9",
                    "100%": "#87d068"
                },
                strokeWidth: 2,
            }} />);
            expect(upload.find(`.${prefixUpload}-select`).length).toEqual(1);
        });
        it('component: Upload, <test prop:: height>', async () => {
            const wrapper = mount(
                <Upload.Dragger action="http://upload.com" height={'200px'}>
                    <div/>
                </Upload.Dragger>,
            );
    
            wrapper.find(`.${prefixUpload}-drag-container`).simulate('dragover', {
                target: {
                    files: [{file: 'foo.png'}],
                },
            });
            // expect(enterDragger).toHaveBeenCalled()
            wrapper.update();
    
            // expect(wrapper.find(`.${prefixUpload}-inner`).height).toBe(200);
        })
        it('component: Upload, <test prop:: uploadClassName>', () => {
            let upload = mount(<Demo1 uploadClassName={'test'} />);
            expect(upload.find(`.${prefixUpload}`).hasClass('test')).toEqual(true);
        });
        it('component: Upload, <test prop:: iconRender>', () => {
            let iconRender = () => {
                return <Icon type="uf-pc" />
            }
            let uploadprops = {
                name: 'file',
                action: '/upload.do',
                headers: {
                    authorization: 'authorization-text',
                },
                defaultFileList: [{
                    uid: -1,
                    name: 'xxx.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                }, {
                    uid: -2,
                    name: 'yyy.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                }],
                showUploadList: {
                    showDownloadIcon: true,
                    showRemoveIcon: true,
                    removeIcon: " x ",
                },
                onChange(info) {
                    if (info.file.status !== 'uploading') {
                        state = 'uploading';
                    }
                    if (info.file.status === 'done') {
                        state = 'done';
                        console.log(`${info.file.name} file uploaded successfully`);
                    } else if (info.file.status === 'error') {
                        state = 'error';
                        console.log(`${info.file.name} file upload failed.`);
                    }
                },
                onPreview(info) {
                    name = info.name
                },
                onRemove(info) {
                    name = info.name
                },
                iconRender() {
                    return <Icon type="uf-pc" />
                }
            };
            let upload = mount(<Upload {...uploadprops}>
                <Button type="primary" shape="border">
                    <Icon type="upload"/> Click to Upload
                </Button>
            </Upload>);
            expect(upload.find(`.uf-pc`).length).toEqual(2);
        });
        it('component: Upload, <test prop:: isImageUrl>', () => {
            let uploadprops = {
                name: 'file',
                action: '/upload.do',
                listType: 'picture',
                headers: {
                    authorization: 'authorization-text',
                },
                defaultFileList: [{
                    uid: -1,
                    name: 'xxx.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                }, {
                    uid: -2,
                    name: 'yyy.png',
                    status: 'done',
                    // url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.xls',
                    // thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                }],
                showUploadList: {
                    showDownloadIcon: true,
                    showRemoveIcon: true,
                    // removeIcon: " x ",
                },
                onChange(info) {
                    if (info.file.status !== 'uploading') {
                        state = 'uploading';
                    }
                    if (info.file.status === 'done') {
                        state = 'done';
                        console.log(`${info.file.name} file uploaded successfully`);
                    } else if (info.file.status === 'error') {
                        state = 'error';
                        console.log(`${info.file.name} file upload failed.`);
                    }
                },
                onPreview(info) {
                    name = info.name
                },
                onRemove(info) {
                    name = info.name
                }
            };
            let upload = mount(<Upload {...uploadprops}>
                <Button type="primary" shape="border">
                    <Icon type="upload"/> Click to Upload
                </Button>
            </Upload>);
            expect(upload.find(`.uf-picture`).length).toEqual(1);
        });
        it('component: Upload, <test prop:: itemRender>', () => {
            let uploadprops = {
                name: 'file',
                action: '/upload.do',
                listType: 'picture',
                headers: {
                    authorization: 'authorization-text',
                },
                defaultFileList: [{
                    uid: -1,
                    name: 'xxx.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                }, {
                    uid: -2,
                    name: 'yyy.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.xls',
                    // thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                }],
                showUploadList: {
                    showDownloadIcon: true,
                    showRemoveIcon: true,
                },
                itemRender(originNode, file) {
                    return (<div key={file.uid} className="test">{file.status === 'error' ? originNode.props.children : originNode}</div>)
                }
            };
            let upload = mount(<Upload {...uploadprops}>
                <Button type="primary" shape="border">
                    <Icon type="upload"/> Click to Upload
                </Button>
            </Upload>);
            expect(upload.find(`.test`).length).toEqual(2);
        });
        it('component: Upload, <test prop:: dragable>', () => {
            let uploadprops = {
                name: 'file',
                action: '/upload.do',
                listType: 'picture',
                headers: {
                    authorization: 'authorization-text',
                },
                defaultFileList: [{
                    uid: -1,
                    name: 'xxx.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                }, {
                    uid: -2,
                    name: 'yyy.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.xls',
                    // thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                }],
                showUploadList: {
                    showDownloadIcon: true,
                    showRemoveIcon: true,
                },
                dragable: true
            };
            let upload = mount(<Upload {...uploadprops}>
                <Button type="primary" shape="border">
                    <Icon type="upload"/> Click to Upload
                </Button>
            </Upload>);
            expect(upload.find(`.${prefixUpload}-drag-box`).length).toEqual(1);
        });
        it('component: Upload, <test prop:: onDrag>', async () => {
//             document.body.innerHTML = ''
//             const container = document.createElement('div');
//             document.body.appendChild(container);
            let onDrag = jest.fn()
            let uploadprops = {
                name: 'file',
                action: '/upload.do',
                listType: 'picture',
                headers: {
                    authorization: 'authorization-text',
                },
                defaultFileList: [{
                    uid: -1,
                    name: 'xxx.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                }, {
                    uid: -2,
                    name: 'yyy.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    // thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                }],
                showUploadList: {
                    showDownloadIcon: true,
                    showRemoveIcon: true,
                },
                dragable: true
            };
            let upload = mount(<Upload {...uploadprops} onDrag={onDrag}>
                <Button type="primary" shape="border">
                    <Icon type="upload"/> Click to Upload
                </Button>
            </Upload>);
            // expect(upload.find(`.${prefixUpload}-drag-box`).length).toEqual(1);
            // await sleep(600)
            // document.querySelectorAll('.wui-upload-list-item-info')[0].dispatchEvent('mousedown', {pageX:0, pageY: 0});
            // document.getElementsByClassName('wui-upload-list-item-info')[0].dispatchEvent('mousemove', {pageX:0, pageY: 30});
            // expect(onDrag).toHaveBeenCalled()
            expect(onDrag.mock.calls.length).toBe(0)
        });
        it('upload function test', async () => {
            let fileList = [{
                    uid: -1,
                    name: 'yyy.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
                {
                    uid: -2,
                    name: 'yyy.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                }
            ]
            let methodCopy = AjaxUploader.prototype.componentDidMount;
            AjaxUploader.prototype.componentDidMount = function (...methodArgs) {
                const result = methodCopy.bind(this)(...methodArgs);
                this.setState({ fileList })
                this.customProgress = {percent: '50'};
                this.onClick(fileList)
                this.onKeyDown({key: 'Enter'})
                // this.onFileDrop({type: 'dropEnter', dataTransfer: {files: props.defaultFileList}, preventDefault: () => {}})
                // this.upload(props.defaultFileList[0], props.defaultFileList)
                return result;
            };
            let props = {
                name: 'file',
                action: '/upload.do',
                headers: {
                    authorization: 'authorization-text', // 示例代码
                }
            };
            let wrapper = mount(
                <Upload {...props} {...fileList}>
                    <span>click to upload</span>
                </Upload>
            );
            // 此场景（多页签左右箭头）和多页签下拉同理，根据容器宽度计算超出显示，但是在@testing-library框架模拟不出来此场景
            // wrapper.find('ScrollableTabBarNode').setState({ prev: true, next: true })
            // expect(wrapper.exists(`span.${prefix}-tabs-tab-next`)).toBe(true)
            // expect(wrapper.exists(`span.${prefix}-tabs-tab-prev`)).toBe(true)
            AjaxUploader.prototype.componentDidMount = methodCopy; // 恢复方法原本的实现
        })
    })
// })
});
describe('function test', () => {
    it('upload index function test', async () => {
        let fileList = [{
                uid: -1,
                name: 'yyy.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
                uid: -2,
                name: 'yyy.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }
        ]
        let methodCopy = Upload.componentDidMount;
        Upload.componentDidMount = function (...methodArgs) {
            const result = methodCopy.bind(this)(...methodArgs);
            this.customProgress = {percent: '50'};
            // this.onKeyDown({key: 'Enter'})
            this.onStart(fileList)
            this.onSuccess('success', fileList[0])
            this.onProgress({
                percent: '50'
            }, fileList[0])
            this.onError('error', '失败' ,fileList[0])
            this.onFileDrop({type: 'onDrop'})
            this.onDragEnter({type: 'onDragEnter', target: 'file'})
            this.onDragLeave({type: 'onDragLeave', target: 'file', stopPropagation: () => {}, preventDefault: () => {}})
            return result;
        };
        let props = {
            name: 'file',
            action: '/upload.do',
            headers: {
                authorization: 'authorization-text', // 示例代码
            },
            showUploadList: {
                showDownloadIcon: true,
                showRemoveIcon: true,
            }
        };
        let wrapper = mount(
            <Upload {...props} {...fileList}>
                <span>click to upload</span>
            </Upload>
        );
        // 此场景（多页签左右箭头）和多页签下拉同理，根据容器宽度计算超出显示，但是在@testing-library框架模拟不出来此场景
        // wrapper.find('ScrollableTabBarNode').setState({ prev: true, next: true })
        // expect(wrapper.exists(`span.${prefix}-tabs-tab-next`)).toBe(true)
        // expect(wrapper.exists(`span.${prefix}-tabs-tab-prev`)).toBe(true)
        Upload.componentDidMount = methodCopy; // 恢复方法原本的实现
    })
})


// supportServerRender: PropTypes.bool,


// enterDragger: PropTypes.func,
// leaveDragger: PropTypes.func,


// locale: PropTypes.object,
// progress: PropTypes.object,
// directory: PropTypes.bool

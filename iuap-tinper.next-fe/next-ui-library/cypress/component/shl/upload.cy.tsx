import React from 'react'
import { Upload, Button } from '../../../../packages'
const { Dragger } = Upload

describe('Upload View', () => {
    const demo3props = {
        action: '/upload.do',
        defaultFileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://p0.ssl.qhimgs4.com/t01f7d55ce57edb3d46.jpg',
                thumbUrl: 'https://p0.ssl.qhimgs4.com/t01f7d55ce57edb3d46.jpg',
            }, {
                uid: -2,
                name: 'zzz.png',
                status: 'done',
                url: 'https://p0.ssl.qhimgs4.com/t01f7d55ce57edb3d46.jpg',
                thumbUrl: 'https://p0.ssl.qhimgs4.com/t01f7d55ce57edb3d46.jpg',
            }],
        showUploadList: {
            showDownloadIcon: true,
            showRemoveIcon: true,
            removeIcon: " x ",
        }
    }
    it('upload type', () => {
        cy.mount((
            <div>
                <Upload {...demo3props}>
                    <Button>上传</Button>
                </Upload>
                <br />
                <br />
                <Upload {...demo3props} listType="picture">
                    <Button>上传</Button>
                </Upload>
                <br />
                <br />
                <Upload {...demo3props} listType="picture-card">
                    <Button>上传</Button>
                </Upload>
                <br />
                <br />
            </div>
        ))
        cy.wait(3000)
        cy.compareSnapshot('upload-type')
    })
    it('upload drag', () => {
        cy.mount((
            <div style={{width: '600px'}}>
                <Dragger>
                    <p>把文件拖入指定区域，完成上传，同样支持点击上传。</p>
                    <p>支持单个或批量上传。严禁上传公司数据或其他 band 文件。</p>
                </Dragger>
            </div>
        ))
        cy.wait(1000)
        cy.get('.wui-upload-drag').realHover()
        // cy.wait(1000)
        // cy.compareSnapshot('upload-drag')
        cy.compareWithOptions('upload-drag', {
            capture: 'runner',
            clip: {x: 450, y: 0, width: 1000, height: 400 }
        })
    })
    it('upload locale', () => {
        cy.mount((
            <div style={{width: '600px'}}>
                <Upload {...demo3props} listType="picture" locale={'zh-cn'}>
                    <Button>上传</Button>
                </Upload>
                <br />
                <br />
                <Upload {...demo3props} listType="picture" locale={'zh-tw'}>
                    <Button>上传</Button>
                </Upload>
                <br />
                <br />
                <Upload {...demo3props} listType="picture" locale={'en-us'}>
                    <Button>上传</Button>
                </Upload>
                <br />
                <br />
            </div>
        ))

        cy.get('.uf-download').realHover()
        // cy.get('.uf-del').realHover()
        // cy.get('.uf-download').eq(1).realHover()
        // cy.get('.uf-del').eq(1).realHover()
        // cy.get('.uf-download').eq(2).realHover()
        // cy.get('.uf-del').eq(2).realHover()
        // cy.viewport(300, 300)
        cy.wait(1000)
        // cy.get('.uf-download').should('have.title', '下载文件')
        cy.get('.uf-download').eq(0).invoke('attr', 'title').should('include', '下载文件')
        cy.get('.uf-download').eq(2).invoke('attr', 'title').should('include', '下載文件')
        cy.get('.uf-download').eq(4).invoke('attr', 'title').should('include', 'download')
        cy.get('.uf-del').eq(0).invoke('attr', 'title').should('include', '移除文件')
        cy.get('.uf-del').eq(2).invoke('attr', 'title').should('include', '移除文件')
        cy.get('.uf-del').eq(4).invoke('attr', 'title').should('include', 'delete')
        // cy.compareSnapshot('upload-locale')
        cy.compareWithOptions('upload-locale', {
            capture: 'runner',
            clip: {x: 450, y: 0, width: 1000, height: 600 }
        })
            
    })
})
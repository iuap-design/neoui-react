/**
 *
 * @title 异步加载图片
 * @description 设置  asyncLoad={true}
 *
 */
import {Button, Image} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo3 extends Component<{}, {pictureSrc: string[]}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            pictureSrc: [],
        }
    }

	get = () => {
	    // todo: 此处模拟请求拉取图片
	    // fetch('https://mock.yonyoucloud.com/mock/360/viewer/getPic')
	    //     .then(response => response.json())
	    //     .then(data => {
	    //         console.log(data)
	    //         this.setState({
	    //             pictureSrc: data.pictureSrc
	    //         })
	    //     })
	}

	loadPic = () => {
	    window.setTimeout(() => {
	        this.setState({
	            pictureSrc: [
	                'http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-1-min.jpg'
	            ]
	        })
	    }, 100)
	}

	UNSAFE_componentWillMount() {
	    this.get();
	}

	addPicture = () => {
	    let pictureSrc = this.state.pictureSrc;
	    pictureSrc.push('http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-2-min.jpg');
	    this.setState({
	        pictureSrc
	    })
	}

	render() {
	    return (
	        <div className='demo'>
	            <Button colors="primary" onClick={this.addPicture} style={{'marginBottom': '10px'}}>点击新增图片</Button>
	            <Image
	                asyncLoad={true}
	                src={"src"}
	            >
	                <div>
	                    {this.state.pictureSrc ?
	                        this.state.pictureSrc.map((item, index) => {
	                            return (<img key={index} src={item} alt="Picture"/>)
	                        }) : null
	                    }
	                </div>
	            </Image>
	        </div>

	    )
	}
}

export default Demo3;

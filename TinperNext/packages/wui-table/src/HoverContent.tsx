import React, { Component } from 'react'
// import { createPortal } from 'react-dom'
import { DefaultRecordType } from './interface';


interface HoverContentProps {
    // hoverContentClass?: string,
    children?: React.ReactNode,
    ref?: any,
    store: { setState: (partial: any) => void; getState: () => any; subscribe: (listener: any) => void;};
    // hoverContentStyle?: React.CSSProperties;
    hoverContent?: (data?: DefaultRecordType | null, index?: number | null) => JSX.Element | null;
}

interface HoverContentState {
    currentHoverKey?: string | number | null,
    currentRecord?: DefaultRecordType | null,
    currentIndex?: number | null,
    hoverContentClass?: any,
    hoverContentStyle?: React.CSSProperties;
}

class HoverContent extends Component<HoverContentProps, HoverContentState> {
    unsubscribe: any;
    originStyle: React.CSSProperties;
    listener: (() => void) | null;
    constructor(props: HoverContentProps) {
        super(props)
        this.state = {
            currentHoverKey: null,
            currentRecord: null
        }
        this.listener = null;
        this.originStyle = {}
    }

    componentDidMount() {
        if (!this.unsubscribe) {
            const { store } = this.props;
            const { currentHoverKey } = this.state;
            this.listener = () => {
                let storeHeight = store.getState().hoverContentStyle?.height;
                let stateHeight = this.state.hoverContentStyle?.height;
                if (store.getState().currentHoverKey !== currentHoverKey || store.getState().currentHoverKey == null || storeHeight !== stateHeight) {
                    this.setState({
                        currentHoverKey: store.getState().currentHoverKey,
                        currentRecord: store.getState().currentRecord,
                        currentIndex: store.getState().currentIndex,
                        hoverContentClass: store.getState().hoverContentClass,
                        hoverContentStyle: store.getState().hoverContentStyle
                    });
                }
                this.originStyle = {}
            }
            this.unsubscribe = store.subscribe(this.listener);
        }
    }

    componentWillUnmount() {
        // const { store } = this.props
	    // if (this.unsubscribe && this.listener) {
	    //     store.unsubscribe(this.listener)
        //     this.listener = null
	    // }
        if (this.unsubscribe) {
			this.unsubscribe();
			this.unsubscribe = null;
		}
		this.listener = null; // Ensure reference is cleared
    }


    onRowHoverMouseEnter = () => {
        const { store } = this.props;
        store.setState({
            currentRecord: this.state.currentRecord,
	        currentHoverKey: this.state.currentHoverKey,
            currentIndex: this.state.currentIndex
        })
        this.originStyle.display = 'block'
    }

    onRowHoverMouseLeave = () => {
        const { store } = this.props;
        store.setState({
            currentRecord: null,
	        currentHoverKey: null,
            currentIndex: null
        })
        this.originStyle.display = 'none'
    }

    render() {
        const { hoverContent } = this.props;
        const { currentRecord, currentIndex, hoverContentClass, hoverContentStyle } = this.state;
        let style = {...hoverContentStyle, ...this.originStyle}
        return (
            <div
                style={style}
                className={hoverContentClass}
                onMouseEnter={this.onRowHoverMouseEnter}
                onMouseLeave={this.onRowHoverMouseLeave}
            >
                { currentRecord && hoverContent ? hoverContent(currentRecord, currentIndex as number) : null}
            </div>
        )
    }
}

export default HoverContent
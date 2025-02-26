import classNames from 'classnames';
// import PropTypes from 'prop-types';
import * as React from 'react';
import {ConfigContext} from "../../wui-provider/src/context";
import SkeletonAvatar from './Avatar';
import SkeletonButton from './Button';
import Element from './Element';
import SkeletonImage from './Image';
import SkeletonInput from './Input';
import Paragraph from './Paragraph';
import Title from './Title';
import { SkeletonProps, SkeletonAvatarProps, SkeletonParagraphProps } from './iSkeleton';
import {getNid} from "../../wui-core/src/index"


// export const skeletonProps = {
//     active: PropTypes.bool,
//     loading: PropTypes.bool,
//     className: PropTypes.string,
//     children: PropTypes.node,
//     avatar: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
//     title: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
//     paragraph: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
//     round: PropTypes.bool,
// }

function getComponentProps<T>(prop: T | boolean | undefined): T | {} {
    if (prop && typeof prop === 'object') {
        return prop;
    }
    return {};
}


function getAvatarBasicProps(hasTitle: boolean, hasParagraph: boolean): SkeletonAvatarProps {
    if (hasTitle && !hasParagraph) {
        // Square avatar
        return {size: 'large', shape: 'square'};
    }

    return {size: 'large', shape: 'circle'};
}

function getTitleBasicProps(hasAvatar: boolean, hasParagraph: boolean) {
    if (!hasAvatar && hasParagraph) {
        return {width: '38%'};
    }

    if (hasAvatar && hasParagraph) {
        return {width: '50%'};
    }

    return {};
}

function getParagraphBasicProps(hasAvatar: boolean, hasTitle: boolean) {
    const basicProps: SkeletonParagraphProps = {};

    // Width
    if (!hasAvatar || !hasTitle) {
        basicProps.width = '61%';
    }

    // Rows
    if (!hasAvatar && hasTitle) {
        basicProps.rows = 3;
    } else {
        basicProps.rows = 2;
    }

    return basicProps;
}

const Skeleton = (props: SkeletonProps) => {
    const {
        className,
        children,
        avatar = false,
        title = true,
        paragraph = true,
        active = false,
        round = false,
        loading,
        fieldid
    } = props;
    const {getPrefixCls} = React.useContext(ConfigContext);
    const prefixCls = getPrefixCls('skeleton');
    // 如果处于加载状态，则渲染骨架屏，否则直接渲染内部原dom
    if (loading || !('loading' in props)) {
        const hasAvatar = !!avatar;
        const hasTitle = !!title;
        const hasParagraph = !!paragraph;

        // Avatar 属于骨架屏header部分
        let avatarNode;
        if (hasAvatar) {
            const avatarProps: SkeletonAvatarProps = {
                prefixCls: `${prefixCls}-avatar`,
                ...getAvatarBasicProps(hasTitle, hasParagraph),
                ...getComponentProps(avatar),
            };
            // We direct use SkeletonElement as avatar in skeleton internal.
            avatarNode = (
                <div className={`${prefixCls}-header`}>
                    <Element {...avatarProps} />
                </div>
            );
        }

        let contentNode;
        if (hasTitle || hasParagraph) {
            // Title
            let $title;
            if (hasTitle) {
                const titleProps = {
                    prefixCls: `${prefixCls}-title`,
                    ...getTitleBasicProps(hasAvatar, hasParagraph),
                    ...getComponentProps(title),
                };

                $title = <Title {...titleProps} />;
            }

            // Paragraph
            let paragraphNode;
            if (hasParagraph) {
                const paragraphProps = {
                    prefixCls: `${prefixCls}-paragraph`,
                    ...getParagraphBasicProps(hasAvatar, hasTitle),
                    ...getComponentProps(paragraph),
                };

                paragraphNode = <Paragraph {...paragraphProps} />;
            }

            contentNode = (
                <div className={`${prefixCls}-content`}>
                    {$title}
                    {paragraphNode}
                </div>
            );
        }

        const cls = classNames(
            prefixCls,
            {
                [`${prefixCls}-with-avatar`]: hasAvatar,
                [`${prefixCls}-active`]: active,
                [`${prefixCls}-round`]: round,
            },
            className,
        );
        let adapterNid = getNid(props)

        return (
            <div fieldid={fieldid} className={cls} {...adapterNid}>
                {avatarNode}
                {contentNode}
            </div>
        );
    }

    return children;
};

// Skeleton.propTypes = skeletonProps;

interface SkeletonCom
  extends React.FC<SkeletonProps & React.RefAttributes<HTMLElement>> {
    Button: typeof SkeletonButton;
    Avatar: typeof SkeletonAvatar;
    Input: typeof SkeletonInput;
    Image: typeof SkeletonImage;
}

Skeleton.Button = SkeletonButton;
Skeleton.Avatar = SkeletonAvatar;
Skeleton.Input = SkeletonInput;
Skeleton.Image = SkeletonImage;

export default Skeleton as SkeletonCom;

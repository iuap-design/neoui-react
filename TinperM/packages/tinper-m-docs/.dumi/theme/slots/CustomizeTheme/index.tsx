import { useRouteMeta, useSiteData } from 'dumi';
import React, { type FC } from 'react';
import './index.less';
import Highlight, { defaultProps, type Language } from 'prism-react-renderer';
import '../../builtins/SourceCode/vsc-dark.css';
import classNames from 'classnames';

const code = `{
    "orange": {
        "50": "#fff7ed", "100": 
        "#ffedd5", "200": "#fed7aa",
        "300": "#fdba74", "400": 
        "#fb923c", "500": "#f97316",
        "600": "#ea580c", "700": 
        "#c2410c", "800": "#9a3412",
        "900": "#7c2d12" 
    },
    "amber": {
        "50": "#fffbeb", "100": 
        "#fef3c7", "200": "#fde68a",
        "300": "#fcd34d", "400":
         "#fbbf24", "500": "#f59e0b",
        "600": "#d97706", "700":
         "#b45309", "800": "#92400e",
         "900": "#78350f" 
    },
    "yellow": {
        "50": "#fefce8", "100":
         "#fef9c3", "200": "#fef08a",
        "300": "#fde047", "400":
         "#facc15", "500": "#eab308",
        "600": "#ca8a04", "700":
         "#a16207", "800": "#854d0e",
        "900": "#713f12" 
    },
    "lime": {
        "50": "#f7fee7", "100":
         "#ecfccb", "200": "#d9f99d",
        "300": "#bef264", "400":
         "#a3e635", "500": "#84cc16",
        "600": "#65a30d", "700":
         "#4d7c0f", "800": "#3f6212",
        "900": "#365314" 
    },
    "green": { 
        "50": "#F0FDF4", "100":
         "#DCFCE7", "200": "#BBF7D0", 
        "300": "#86EFAC", "400":
         "#4ADE80", "500": "#22C55E", 
        "600": "#16A34A", "700":
         "#15803D", "800": "#166534", 
        "900": "#14532D" 
    }
}`

const CustomizeTheme = (props) => {
    const [color, setColor] = React.useState('用友红');

    const { highlightLines = [] } = props;
    const { themeConfig } = useSiteData();
    const { frontmatter } = useRouteMeta();
    if (!('customtheme' in frontmatter)) {
        return null;
    }

    return (
        <div className="fifthPanel">
            <div>
                <h2 className='header-title'>简单、直观的自定义主题</h2>
                {/* <p>个性化的界面风格，满足用户偏好和需求，让用户的设备焕发个性魅力</p> */}
            </div>
            {/* <img src={customization} width="1125" style={{ filter: "brightness(1.1)" }}></img> */}
            <div className='theme-switcher'>
                {['用友红', '冬川蓝', '春秧绿', '秋枫黄', '默认深'].map(item =>
                    <button
                        className={color === item && 'selected-btn'}
                        onClick={() => { setColor(item) }} >
                        {item}
                    </button>
                )}
            </div>
            <div className='theme-design'>
                <div className='display-panel'>
                    <img src={require(`../../../../public/theme/${color}.png`)}></img>
                </div>
                <div className='code-panel'>
                    <div className='code-block-header'>
                    </div>
                    <Highlight
                        {...defaultProps}
                        code={code}
                        language={"json"}
                        theme={undefined}
                    >
                        {({ className, style, tokens, getLineProps, getTokenProps }) => (
                            <pre className={className} style={style}>
                                {tokens.map((line, i) => (
                                    <div
                                        key={String(i)}
                                        className={classNames({
                                            highlighted: highlightLines.includes(i + 1),
                                            wrap: themeConfig.showLineNum,
                                        })}
                                    >
                                        {themeConfig.showLineNum && (
                                            <span className="token-line-num">{i + 1}</span>
                                        )}
                                        <div
                                            {...getLineProps({
                                                line,
                                                key: i,
                                            })}
                                            className={classNames({
                                                'line-cell': themeConfig.showLineNum,
                                            })}
                                        >
                                            {line.map((token, key) => (
                                                // getTokenProps 返回值包含 key
                                                // eslint-disable-next-line react/jsx-key
                                                <span {...getTokenProps({ token, key })} />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </pre>
                        )}
                    </Highlight>
                    {/* <pre>
                        <code contenteditable="false" class="language-json">
                            {code}
                        </code>
                    </pre> */}
                </div>
            </div>
        </div>
    )
}

export default CustomizeTheme;
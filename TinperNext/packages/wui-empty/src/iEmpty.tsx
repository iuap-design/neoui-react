import { CSSProperties, ReactElement } from "react";
import { BaseProps } from "../../wui-core/src/iCore";

export interface EmptyProps extends BaseProps {
    description?: string | ReactElement;
    image?: string | ReactElement;
    imageStyle?: CSSProperties;
    locale?: string;
    // clsPrefix?: string;
    // className?: string;
    // fieldid?: string;
}
import { ReactNode } from "react";
import { BaseProps } from "../../wui-core/src/iCore";

export interface BackTopProps extends BaseProps {
    visibilityHeight: number;
    click: () => void;
    target: () => (HTMLElement | Window);
    // fieldid: string;
    // clsPrefix: string;
    // className: string;
    character: ReactNode;
    dir?: "ltr" | "rtl";
}

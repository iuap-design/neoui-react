import { AlignType, BaseProps, BorderType, SizeType } from "../../wui-core/src/iCore";
import { Locale } from "../../wui-locale/src/iLocale";
import { ModalProps } from "../../wui-modal/src/iModal";

export type Colors = "red" | "pink" | "purple" | "deep-purple" | "indigo" | "blue" | "light-blue" | "cyan" | "teal" | "green" | "light-green" | "lime" | "yellow" | "amber" | "orange" | "deep-orange" | "brown" | "grey" | "blue-grey";
export interface ColorItem {
    key: string;
    name: string;
    scale: string[];
    rgbArr: string[];
}

export interface AutoCalculateArg {
    lighter: string;
    darker: string;
    clor: string;
}
export type AutoCalculate = ({lighter, darker, clor}: AutoCalculateArg) => void;
export interface ColorPickerProps extends BaseProps {
    locale?: Locale;
    modalProps?: ModalProps;
    form?: any;
    size?: SizeType;
    align?: AlignType;
    bordered?: BorderType;
    value: string;
    label: string;
    placeholder: string;
    required: boolean;
    disabled?: boolean;
    disabledAlpha: boolean;
    autoCalculate: AutoCalculate
    onChange: (arg: {class: string; rgba: string; hex: string;}) => void;
    title?: string;
    cacelBtn?: string;
    confirmBtn?: string;
    isParameterArea: boolean;
    disabledModal: boolean;
    disabledInput: boolean;
    // clsPrefix: string;
    // className: string;
    // fieldid: string;
}

export interface ColorPickerState {
    displayColorPicker: boolean,
    selectedColor: Colors,
    selectedScale: string,
    selectedRgbValue: string,
    selectedHexValue: string,
    formValue: string,
    alpha: number | '',
}
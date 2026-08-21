import type {StatusIconProps} from "./DynamicStatusIconProps";

export type ItemButtonProps = {
    text: string;
    statusIcon: StatusIconProps;
    colour: string;
    callback: () => void;
}
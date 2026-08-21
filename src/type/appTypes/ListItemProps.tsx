import type { DynamicStatusIconProps, StatusIconProps } from "./DynamicStatusIconProps";

export type ListItemProps = {
    statusIcon: StatusIconProps;
    textPrimary: string;
    textSecondary: string;
    backgroundColor: string;
};

export type DynamicIconListItemProps = {
    dynamicStatusIcon: DynamicStatusIconProps;
    textPrimary: string;
    textSecondary: string;
    backgroundColor: string;
}
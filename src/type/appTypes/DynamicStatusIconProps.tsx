import type { ReactNode } from "react";
import type { Pair } from "../generalTypes/Pair";

export type StatusIconProps = {
    avatar: ReactNode;
    avatarBackgroundColor: string;
    avatarMainColor: string;
}

export type KeyedStatusIconPair = Pair<string, StatusIconProps>;

export type DynamicStatusIconProps = {
    iconList: KeyedStatusIconPair[],
    selected: string
};
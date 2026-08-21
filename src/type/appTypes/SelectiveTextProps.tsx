import type { Pair } from "../generalTypes/Pair";

export type KeyedTextPair = Pair<string, string>;

export type SelectiveTextProps = {
    textList: KeyedTextPair[],
    selected: string
}
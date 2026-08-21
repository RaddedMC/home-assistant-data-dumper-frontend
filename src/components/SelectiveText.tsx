import type { KeyedTextPair, SelectiveTextProps } from "../type/appTypes/SelectiveTextProps";

export function SelectiveText(props: SelectiveTextProps) {
    // Find the string pair whose key matches the selected string
    const matchedPair = props.textList.find(
        (pair): pair is KeyedTextPair => pair[0] === props.selected
    );
    if (matchedPair) return matchedPair[1];
}
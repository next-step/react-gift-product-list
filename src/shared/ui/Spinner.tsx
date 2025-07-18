import type { CSSProperties } from "react";

import * as Styles from "./Spinner.styled";

export interface SpinnerProps {
    size?: CSSProperties["width"];
    borderWidth?: CSSProperties["borderWidth"];
    color?: CSSProperties["borderColor"];
}

export const Spinner = ({ borderWidth = "4px", size = "48px", color = "#000" }: SpinnerProps) => {
    return <Styles.Spinner borderWidth={borderWidth} size={size} color={color}></Styles.Spinner>;
};

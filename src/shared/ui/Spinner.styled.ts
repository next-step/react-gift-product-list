import { type SpinnerProps } from "@/shared/ui/Spinner";

import styled from "@emotion/styled";

export const Spinner = styled.span<SpinnerProps>`
    width: ${({ size }) => size || "48px"};
    height: ${({ size }) => size || "48px"};

    border: ${({ borderWidth }) => borderWidth || "4px"} solid;
    border-color: ${({ color }) => color};

    border-radius: 50%;
    border-bottom-color: transparent;

    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

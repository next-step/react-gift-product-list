import type { CSSProperties } from "react";

import styled from "@emotion/styled";

export const Container = styled.section<{ backgroundColor?: CSSProperties["backgroundColor"] }>`
    width: 100%;
    height: 128px;

    padding: 26px 16px 22px 16px;

    background-color: ${({ backgroundColor }) => backgroundColor};
    color: #fff;
`;

export const ThemeName = styled.p`
    font-size: ${({ theme }) => theme.typography.label.label1Bold.size};
    font-weight: ${({ theme }) => theme.typography.label.label1Bold.weight};
`;

export const ThemeTitle = styled.h1`
    font-size: ${({ theme }) => theme.typography.title.title1Bold.size};
    font-weight: ${({ theme }) => theme.typography.title.title1Bold.weight};
`;

export const ThemeDescription = styled.p`
    font-size: ${({ theme }) => theme.typography.body.body1Regular.size};
    font-weight: ${({ theme }) => theme.typography.body.body1Regular.weight};

    margin-top: 8px;
`;

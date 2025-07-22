import styled from "@emotion/styled";

export const ThemeTop = styled.div<{ background: string }>`   
    width: 100%;
    padding: 1.625rem 1rem 1.375rem;
    background-color: ${(props) => props.background};
`
export const ThemeName = styled.p`
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.1875rem;
    color: rgb(247, 248, 249);
    margin: 0px;
    text-align: left;
`
export const ThemeTitle = styled.h5`
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.6875rem;
    color: rgb(255, 255, 255);
    margin: 0px;
    text-align: left;
`

export const ThemeDescription = styled.p`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.375rem;
    color: rgb(243, 244, 245);
    margin: 0px;
    text-align: left;
`

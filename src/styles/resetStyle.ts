import { css, type CSSObject } from "@emotion/react";
import reset from "styled-reset";

export const resetStyle = css`
  ${reset as unknown as CSSObject}

  * {
    box-sizing: border-box;
  }

  body {
    font-family: "Pretendard", sans-serif;
    background-color: #fff;
    color: #222;
    line-height: 1.5;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

import styled from "@emotion/styled";
import type { ReactNode } from "react";

const ThemeProductLayout = styled.main(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  backgroundColor: `${theme.color.gray[0]}`,
  minHeight: "100vh",
  paddingBottom: "50px",
}));

export const ThemeProductPageLayout = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <ThemeProductLayout>{children}</ThemeProductLayout>;
};

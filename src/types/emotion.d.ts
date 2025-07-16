import "@emotion/react";
import { AppTheme } from "@/styles/theme";

declare module "@emotion/react" {
  export interface Theme extends AppTheme {
    _dummy?: never; // lint 우회
  }
}

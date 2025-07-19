import '@emotion/react';
import { Theme as EmotionTheme } from '@emotion/react';
import { AppTheme } from './styles/theme';

declare module '@emotion/react' {
  export interface Theme extends EmotionTheme, AppTheme {}
}

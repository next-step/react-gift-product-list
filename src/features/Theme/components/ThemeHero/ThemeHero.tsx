import * as S from './ThemeHero.styles'
import type { ThemeInfo } from '@/features/Theme/types/ThemeTypes'

interface Props {
  themeInfo: ThemeInfo
}

export const ThemeHero = ({ themeInfo }: Props) => {
  return (
    <S.Container backgroundColor={themeInfo.backgroundColor}>
      <S.ThemeName>{themeInfo.name}</S.ThemeName>
      <S.ThemeTitle>{themeInfo.title}</S.ThemeTitle>
      <S.ThemeDescription>{themeInfo.description}</S.ThemeDescription>
    </S.Container>
  )
}

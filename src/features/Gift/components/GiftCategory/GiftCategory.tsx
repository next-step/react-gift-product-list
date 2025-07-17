import { useNavigate } from 'react-router-dom'
import * as S from './GiftCategory.styles'
import Loading from '@/component/Loading/Loading'
import { useThemes } from '@/features/Gift/hooks/useThemes'

const GiftCategory = () => {
  const { themes, loading, error } = useThemes()
  const navigate = useNavigate()

  const handleSelect = (themeId: number) => {
    navigate(`/themes/${themeId}`)
  }

  if (loading) return <Loading />
  if (error || themes.length === 0) return null

  return (
    <S.Container>
      <S.Title>선물 테마</S.Title>
      <S.Grid>
        {themes.map((theme) => (
          <S.Item
            key={theme.themeId}
            onClick={() => handleSelect(theme.themeId)}
          >
            <S.ItemImage src={theme.image} alt={theme.name} />
            <S.ItemName>{theme.name}</S.ItemName>
          </S.Item>
        ))}
      </S.Grid>
    </S.Container>
  )
}

export default GiftCategory

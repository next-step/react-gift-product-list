import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

interface Props {
  name: string
  image: string
  themeId: number
}

export function CategoryItem({ name, image, themeId }: Props) {
  const navigate = useNavigate()
  return (
    <ItemWrapper onClick={() => navigate(`/themes/${themeId}`)}>
      <Image src={image} alt={name} />
      <Label>{name}</Label>
    </ItemWrapper>
  )
}

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  cursor: pointer;
`

const Image = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 50%;
`

const Label = styled.span`
  margin-top: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textDefault};
`

import { cardTemplates, type CardTemplate } from '@/data/cardTemplates'
import {
  CardGrid,
  CardItem,
  Thumb,
  Preview,
} from '@/styles/OrderPage.styles'

interface MessageCardSelectorProps {
  selected: CardTemplate
  onSelect: (card: CardTemplate) => void
}

export default function MessageCardSelector({
  selected,
  onSelect,
}: MessageCardSelectorProps) {
  return (
    <>
      <CardGrid>
        {cardTemplates.map((card) => (
          <CardItem
            key={card.id}
            selected={selected.id === card.id}
            onClick={() => onSelect(card)}
          >
            <Thumb src={card.thumbUrl} alt="카드 썸네일" />
          </CardItem>
        ))}
      </CardGrid>
      <Preview>
        <img src={selected.imageUrl} alt="선택된 카드" />
      </Preview>
    </>
  )
}
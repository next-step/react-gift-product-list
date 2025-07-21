import GiftCardListLayout from "@/components/GiftCardListLayout"
import { useContext, useState, useEffect } from "react"
import { useFormContext } from "react-hook-form"
import type { FormData } from "@/pages/OrderPage"
import Layout from "@/components/Layout"
import type { CardTheme } from "@/context/CardContext"
import { CardContext } from "@/context/CardContext"
import GiftCardStyle from "@/components/GiftCardStyle"
import PreviewCard from "./PreviewCard"
import Blank from "@/components/Blank"
import { OrderMessage } from "@/components/OrderMessage"
interface CardProps {
  card: CardTheme
  selected: boolean
  onSelect: () => void
}

const GiftCard = ({ card, selected, onSelect }: CardProps) => {
  return (
    <GiftCardStyle $selected={selected} onClick={onSelect} type="button">
      <img src={card.thumbUrl} alt={card.defaultTextMessage} key={card.id} />
    </GiftCardStyle>
  )
}
interface ListProps {
  cards: CardTheme[]
  selectedId: number
  onSelect: (id: number) => void
}
const GiftCardList = ({ cards, selectedId, onSelect }: ListProps) => {
  return (
    <GiftCardListLayout>
      {cards.map(function (card) {
        return (
          <GiftCard
            key={card.id}
            card={card}
            selected={card.id === selectedId}
            onSelect={() => onSelect(card.id)}
          />
        )
      })}
    </GiftCardListLayout>
  )
}

const CardThumbnail = () => {
  const cards = useContext(CardContext)
  const { setValue, watch } = useFormContext<FormData>()
  const [selectedId, setSelectedId] = useState<number>(cards[0]?.id ?? 0)

  const currentMessage = watch("message")
  console.log("현재 메시지:", currentMessage)

  useEffect(() => {
    setValue("messageCardId", String(selectedId), { shouldValidate: true })
  }, [selectedId, setValue])

  const handleSelectCard = (id: number) => {
    setSelectedId(id)
    setValue("messageCardId", String(id), { shouldValidate: true }) 
  }

  const selectedCard = cards.find((c) => c.id === selectedId)!
  
  return (
    <Layout height="472.5px">
      <GiftCardList
        cards={cards}
        selectedId={selectedId}
        onSelect={handleSelectCard}
      />
      <PreviewCard card={selectedCard} />
      <Blank height="40px" />
      <OrderMessage
        placeholder={selectedCard.defaultTextMessage}
      />
    </Layout>
  )
}

export default CardThumbnail

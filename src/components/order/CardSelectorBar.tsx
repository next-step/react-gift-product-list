import { cardTemplate } from "@/__mock__";
import styled from "@emotion/styled";
import { useOrderForm, useCardTemplate } from "@/hooks/order";

const CardSelectorContainer = styled.section(({ theme }) => ({
  display: "flex",
  gap: theme.spacing2,
  padding: theme.spacing2,
  overflowX: "auto",
  position: "sticky",
  width: "100%",
  border: "none",
  backgroundColor: theme.color.gray[0],
  zIndex: theme.zIndex.cardSelector,
}));

const CardThumbnail = styled.img<{ isSelected: boolean }>(({ isSelected }) => ({
  width: "76px",
  height: "50px",
  objectFit: "cover",
  borderRadius: "8px",
  flexShrink: 0,
  cursor: "pointer",
  transition: "transform 0.2s ease",

  ...(isSelected && {
    border: "2px solid black",
  }),
}));

export const CardSelectorBar = () => {
  const cards = cardTemplate;
  const { watch } = useOrderForm();
  const { setCardTemplate } = useCardTemplate();
  const currentCardTemplate = watch("cardTemplate");

  return (
    <CardSelectorContainer>
      {cards.map(card => (
        <CardThumbnail
          key={card.id}
          src={card.thumbUrl}
          alt={card.defaultTextMessage}
          onClick={() => setCardTemplate(card)}
          isSelected={card.id === currentCardTemplate?.id}
        />
      ))}
    </CardSelectorContainer>
  );
};

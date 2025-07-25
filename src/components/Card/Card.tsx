import { forwardRef } from "react";
import {
  CardWrapper,
  RankNumber,
  Image,
  Info,
  Brand,
  Name,
  Price,
} from "@/components/Card/Card.style";

export interface CardProps {
  rank?: number;
  imageUrl: string;
  brand: string;
  name: string;
  price: number;
  onClick?: () => void;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { rank, imageUrl, brand, name, price, onClick },
  ref
) {
  return (
    <CardWrapper ref={ref} onClick={onClick} style={{ cursor: "pointer" }}>
      {typeof rank === "number" && rank > 0 && <RankNumber>{rank}</RankNumber>}
      <Image src={imageUrl} />
      <Info>
        <Brand>{brand}</Brand>
        <Name>{name}</Name>
        <Price>
          {price.toLocaleString()}{" "}
          <span style={{ fontWeight: 500, fontSize: "1rem" }}>원</span>
        </Price>
      </Info>
    </CardWrapper>
  );
});

export default Card;

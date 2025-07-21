import styled from "@emotion/styled";
import Spacing from "@/components/Spacing";
import type { ProductInfo } from "@/types/product";
import { getUserFromSession } from "@/utils/getUserFromStorage";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/paths";

interface Props {
  item: ProductInfo;
}

export default function ProductCard({ item }: Props) {
  const navigate = useNavigate();  
  const goToOrder = (itemId: number) => {
      const userInfo = getUserFromSession();
      if (userInfo) navigate(PATH.toORDER(itemId));
      else
        navigate(PATH.LOGIN, {
          state: { from: `/order/${itemId}` },
        });
    };
    
  return (
    <Card onClick={() => goToOrder(item.id)}>
      <Image src={item.imageURL} />
      <Spacing height="12px" />
      <Brand>{item.brandInfo.name}</Brand>
      <Label>{item.name}</Label>
      <Spacing height="4px" />
      <Price>
        {item.price.sellingPrice.toLocaleString()}
        <PriceUnit>원</PriceUnit>
      </Price>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: transparent;
  cursor: pointer;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.gray[200]};
`;

const Brand = styled.p`
  ${({ theme }) => theme.typography.body2Regular};
  color: ${({ theme }) => theme.colors.gray[600]};
  margin: 0px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Label = styled.h6`
  ${({ theme }) => theme.typography.body2Regular};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0px;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Price = styled.p`
  ${({ theme }) => theme.typography.title2Bold};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0px;
  text-align: left;
  word-break: break-word;
`;

const PriceUnit = styled.span`
  ${({ theme }) => theme.typography.subtitle1Regular};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0px;
  text-align: left;
  word-break: break-word;
`;
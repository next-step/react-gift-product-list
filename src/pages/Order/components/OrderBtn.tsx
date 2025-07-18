import useFetch from "@/hooks/useFetch";
import type { OrderFormType } from "@/pages/Order/components/Order";
import type { ProductType } from "@/types/RankingProductType";
import styled from "@emotion/styled";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";

const OrderBtn = () => {
  const { watch } = useFormContext<OrderFormType>();
  const { productId } = useParams();
  const { data } = useFetch<ProductType>(`api/products/${productId}/summary`);
  const product = useMemo(() => data, [data]);
  const recipients = watch("recipients");
  const totalQuantity = recipients.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity;
  }, 0);
  const totalPrice = product ? product.price * totalQuantity : 0;
  return <Button type="submit">{totalPrice}원 주문하기</Button>;
};

export default OrderBtn;

const Button = styled.button`
  background-color: ${({ theme }) => theme.color.kakaoYellow};
  font: ${({ theme }) => theme.typography.label2Bold};
  border: none;
  width: 100%;
  max-width: 720px;
  height: 3.125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  z-index: 999;
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.color.kakaoYellowHover};
  }
  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.color.kakaoYellowActive};
  }
`;

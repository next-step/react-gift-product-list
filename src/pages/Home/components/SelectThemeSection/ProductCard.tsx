import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@/components/common/Typography';

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  brandName: string;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  brandName,
  onClick,
}) => {
  return (
    <Card onClick={onClick}>
      <ImageWrapper>
        <Image src={image} alt={name} />
      </ImageWrapper>
      <Content>
        <Typography as="p" variant="body1Regular" color="gray500">
          {brandName}
        </Typography>
        <Typography as="p" variant="body1Bold" color="default">
          {name}
        </Typography>
        <Typography as="p" variant="body1Regular" color="sub">
          ₩{price.toLocaleString()}
        </Typography>
      </Content>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ImageWrapper = styled.div`
  width: 100%;
  padding-top: 75%; /* 4:3 비율 */
  position: relative;
  background: #f5f5f5;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 12px;
`;

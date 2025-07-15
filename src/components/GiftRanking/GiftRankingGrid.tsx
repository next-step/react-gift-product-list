import { useState } from 'react';
import { Grid, Button } from '@/components/GiftRanking/GiftRanking.styles';
import ProductCard from '@/components/GiftRanking/ProductCard';

type Product = {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
};

type Props = {
  products: Product[];
};

const GiftRankingGrid = ({ products }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const visibleItems = expanded ? products : products.slice(0, 6);

  return (
    <>
      <Grid>
        {visibleItems.map((item, index) => (
          <ProductCard
            key={item.id}
            id={item.id}
            rank={index + 1}
            imageURL={item.imageURL}
            brand={item.brandInfo.name}
            name={item.name}
            price={item.price.sellingPrice}
          />
        ))}
      </Grid>

      {products.length > 6 && (
        <Button onClick={() => setExpanded((prev) => !prev)}>
          {expanded ? '접기' : '더보기'}
        </Button>
      )}
    </>
  );
};

export default GiftRankingGrid;

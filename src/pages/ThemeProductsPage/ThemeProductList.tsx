import ThemeProductCard from './ThemeProductCard';
import { Grid } from '@/components/GiftRanking/GiftRanking.styles';
import { type Product } from './useGetThemeProducts';
import { Box } from './styles';

interface Props {
  products: Product[];
}

const ThemeProductList = ({ products }: Props) => {
  return (
    <Box>
      <Grid>
        {products.map((product) => (
          <ThemeProductCard
            key={product.id}
            id={product.id}
            imageURL={product.imageURL}
            brand={product.brandInfo.name}
            name={product.name}
            price={product.price.sellingPrice}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default ThemeProductList;

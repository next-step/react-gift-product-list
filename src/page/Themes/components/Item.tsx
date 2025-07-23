import styled from '@emotion/styled';
import { generatePath, Link } from 'react-router-dom';
import type { ItemData } from '..';
import { ROUTES } from '@/routes/Routes';

const ItemBox = ({ item }: { item: ItemData }) => {
  if (!item) return null;

  return (
    <Link to={generatePath(ROUTES.ORDER, { id: String(item.id) })} data-discover>
      <ItemOntainer>
        <ItemImg alt={item.name} src={item.imageURL} />
        <ItemBrandInfo>{item.brandInfo.name}</ItemBrandInfo>
        <ItemName>{item.name}</ItemName>
        <ItemPrice>{item.price.basicPrice}</ItemPrice>
      </ItemOntainer>
    </Link>
  );
};

export default ItemBox;

const ItemOntainer = styled.div`
  width: 100%;
`;

const ItemImg = styled.img`
  width: 100%;
  height: 100%;
  min-height: 100%;
  min-width: 100%;
  object-fit: cover;
  object-position: center center;
  border-radius: 4px;
  overflow: hidden;
  background-color: rgb(243, 244, 245);
`;

const ItemBrandInfo = styled.p`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.1875rem;
  color: rgb(176, 179, 186);
  margin: 0px;
  text-align: left;
`;
const ItemName = styled.p`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.1875rem;
  color: rgb(42, 48, 56);
  margin: 0px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const ItemPrice = styled.p`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5rem;
  color: rgb(42, 48, 56);
  margin: 0px;
  text-align: left;
  word-break: break-word;
`;

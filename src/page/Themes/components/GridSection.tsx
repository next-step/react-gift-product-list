import styled from '@emotion/styled';
import type { ItemData } from '..';
import ProductBox from './Item';
import { useEffect, useRef, useState } from 'react';
import { requests } from '@/api/requests';
import { useParams } from 'react-router-dom';

// interface GridSectionProps {
//   themeIdProducts: ThemeIdProductsData;
// }

const GridSection = () => {
  // const { list, cursor, hasMoreList } = themeIdProducts;
  // console.log(cursor, hasMoreList);

  const { id } = useParams<{ id: string }>();
  const index = Number(id);

  const [items, setItems] = useState<ItemData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentCursor, setCurrentCursor] = useState<number>(0);
  const loader = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(myObserverCallback, { threshold: 1.0 });

    const el = loader.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [items, hasMore]);

  const myObserverCallback: IntersectionObserverCallback = async ([entry]) => {
    if (entry.isIntersecting && hasMore) {
      await loadMore();
    }
  };
  const loadMore = async () => {
    try {
      const data = await requests.fetchThemeIdProducts({ index, currentCursor, currentPage });
      const { list, cursor, hasMoreList } = data;

      setItems(prev => [...prev, ...list]);
      setCurrentPage(prev => prev + 1);
      setCurrentCursor(cursor);
      if (hasMoreList === false) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching more items:', error);
    }
  };

  return (
    <Container>
      <GridContainer>
        {items.map((item: ItemData) => (
          <ProductBox key={item.id} item={item} />
        ))}
        <div ref={loader} style={{ height: '20px' }} />
      </GridContainer>
    </Container>
  );
};

export default GridSection;

const Container = styled.div`
  padding: 16px;
  width: 100%;
`;

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 8px;
`;

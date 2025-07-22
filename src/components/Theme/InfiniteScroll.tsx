import { Spinner } from '@/components/Spinner';
import { useState, useEffect, useRef } from 'react';
import { api, IsErrorStatus } from '../../utils/api'
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';

// Item 영역 시작
const RealtimeRankItemWrapperStyle = styled.div`
  width: 100%;
  height: auto;

  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RealtimeRankItemGrid = styled.div`
  width: auto;
  height: auto;
  margin-top: ${({ theme }) => theme.spacing.spacing4};
  margin-bottom: ${({ theme }) => theme.spacing.spacing5};

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: ${({ theme }) => theme.spacing.spacing5};
  column-gap: ${({ theme }) => theme.spacing.spacing3};
  justify-items: center; 
`

const RealtimeRankItem = styled.div`
  width: auto;
  height: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  cursor: pointer;
`;

const RealtimeItemImg = styled.img`
  width: 220px;
  height: auto;
  border-radius: 5px;
  position: relative;
`;

const RealtimeItemTxt = styled.p`
  font-size: ${({ theme }) => theme.typography.label.label1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label.label1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label.label1Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray600};

  padding-top: ${({ theme }) => theme.spacing.spacing2};
`;

const RealtimeItemSubTxt = styled.p`
  font-size: ${({ theme }) => theme.typography.label.label1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label.label1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label.label1Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray1000};

  padding-bottom: ${({ theme }) => theme.spacing.spacing2};
`;

const RealtimeItemPriceTxt = styled.p`
  font-size: ${({ theme }) => theme.typography.body.body1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.body1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.body1Bold.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray1000};
`;

function InfiniteScroll({ themeId }: { themeId: string }) {
    const [infiItem, setInfiItem] = useState([]);
    const [cursor, setCursor] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const loader = useRef(null);

    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !isLoading && hasMore) {
              loadMore();
            }
          },
          { threshold: 1.0 }
        );
    
        const el = loader.current;
        if (el) observer.observe(el);
    
        return () => {
          if (el) observer.unobserve(el);
        };
      }, [isLoading, hasMore]);

      const loadMore = async () => {
        if (!hasMore) return;
        setIsLoading(true);
        try {
            const response = await api.get(`/themes/${themeId}/products?cursor=${cursor}&limit=${20}`); // limit은 한번에 불러올 아이템 갯수를 정하고 cursor는 인덱스임 그러니까 계속 불러올때마다 20씩 증가시켜줘야함
            const { list, cursor: nextCursor, hasMoreList } = response.data.data;

            setInfiItem(prev => [...prev, ...list]);
            setCursor(nextCursor);            
            setHasMore(hasMoreList);
            if(response.data.data.list.length === 0) {
                setIsEmpty(true);
            }
        } catch (error) {
            IsErrorStatus(error, '', navigate);    
        } finally {
            setIsLoading(false);
        }
    };


        // item클릭시 해당 item정보들을 url query로들고 Order페이지로 가는 핸들러
        const handleItemClick = (id: number) => {
            const query = new URLSearchParams({ id: id.toString()}).toString();

            navigate(`/order?${query}`);
        }

        if (isEmpty) return <h1>상품이 없습니다</h1>;
        return (
            <RealtimeRankItemWrapperStyle>
                <RealtimeRankItemGrid>{infiItem.map((item) => (
                    <RealtimeRankItem
                        key={item.id}
                        onClick={() =>
                            handleItemClick(
                                item.id,
                            )
                        }
                    >
                        <RealtimeItemImg
                            src={item.imageURL}
                            alt={item.name}
                        >
                        </RealtimeItemImg>
                        <RealtimeItemTxt>{item.brandInfo.name}</RealtimeItemTxt>
                        <RealtimeItemSubTxt>{item.brandInfo.name}</RealtimeItemSubTxt>
                        <RealtimeItemPriceTxt>
                            {item.price.sellingPrice} 원
                        </RealtimeItemPriceTxt>
                    </RealtimeRankItem>
                ))}</RealtimeRankItemGrid>
                {isLoading && <Spinner />}
                <div ref={loader} style={{ height: '20px' }} />
            </RealtimeRankItemWrapperStyle>
        );
    }

export default InfiniteScroll;
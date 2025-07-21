import { Spinner } from '@/components/Spinner';
import { useState, useEffect, use } from 'react';
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
    const [isLoading, setIsLoading] = useState(true);
    const [infiItem, setInfiItem] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchThemeHero = async () => {
            try {
                const response = await api.get(`/themes/${themeId}/products`);

                setInfiItem(response.data.data.list);
                setIsLoading(false);
            } catch (error) {
                IsErrorStatus(error, '', navigate);
            } finally {

            }
        };

        fetchThemeHero();
    }, [themeId]);

    // item클릭시 해당 item정보들을 url query로들고 Order페이지로 가는 핸들러
    const handleItemClick = (brandInfo: any, id: any, imageURL: any, name: any, price: any) => {
        const query = new URLSearchParams({ brandInfo: brandInfo.name, id: id.toString(), imageURL, name, price: price.basicPrice, }).toString();

        navigate(`/order?${query}`);
    }

    if (isLoading) return <Spinner />;

    return (
        <RealtimeRankItemWrapperStyle>
            <RealtimeRankItemGrid>{infiItem.map((item) => (
                <RealtimeRankItem
                    key={item.id}
                    onClick={() =>
                        handleItemClick(
                            item.brandInfo,
                            item.id,
                            item.imageURL,
                            item.name,
                            item.price,
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
        </RealtimeRankItemWrapperStyle>
    );
}

export default InfiniteScroll;
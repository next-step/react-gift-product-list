import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const RealtimeRankWrapper = styled.div`
  width: auto;
  height: auto;
  padding: ${({ theme }) => theme.spacing.spacing2} ${({ theme }) => theme.spacing.spacing4};
`;

const RealtimeRankTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.title.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title.title1Bold.lineHeight};
`;

// 첫 번째 selector 시작
const UserGroupSelectorWrapper = styled.div`
  width: auto;
  height: auto;
  padding: ${({ theme }) => theme.spacing.spacing4} ${({ theme }) => theme.spacing.spacing2};

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserGroupSelectorItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const UserGroupSelectorBtn = styled.button<{ isSelected?: boolean }>`
  width: ${({ theme }) => theme.spacing.spacing11};
  height: ${({ theme }) => theme.spacing.spacing11};
  border: none;
  border-radius: 16px;
  color: ${({ theme, isSelected }) => isSelected ? theme.colors.gray.gray00 : theme.colors.blue.blue400};
  background-color: ${({ theme, isSelected }) => isSelected ? theme.colors.blue.blue700 : theme.colors.blue.blue100};
  
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${({ theme }) => theme.typography.label.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label.label1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label.label1Bold.lineHeight};
  cursor: pointer;
`;

const UserGroupSelectorTxt = styled.p<{ isSelected?: boolean }>`
  font-size: ${({ theme }) => theme.typography.label.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label.label1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label.label1Bold.lineHeight};
  color: ${({ theme, isSelected }) => isSelected ? theme.colors.blue.blue700 : theme.colors.gray.gray700};
  margin-top: 5px;
`;

// 두 번째 selector 시작
const RankingTypeSelectorWrapper = styled.div`
  width: auto;
  height: auto;
  padding: ${({ theme }) => theme.spacing.spacing3} ${({ theme }) => theme.spacing.spacing4};
  border: 1px solid ${({ theme }) => theme.colors.blue.blue200};
  background-color: ${({ theme }) => theme.colors.blue.blue100};
  border-radius: 7px;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const RankingTypeSelectorBtn = styled.div<{ isSelected?: boolean }>`
  font-size: ${({ theme }) => theme.typography.label.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label.label1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label.label1Bold.lineHeight};
  color: ${({ theme, isSelected }) => isSelected ? theme.colors.blue.blue700 : theme.colors.blue.blue500};
  cursor: pointer;
`;

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

// 더보기버튼 시작
const ExtraBtnWrapper = styled.div`
  width: auto;
  height: auto;
  padding-top: ${({ theme }) => theme.spacing.spacing8};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ExtraBtn = styled.button`
  width: 480px;
  height: ${({ theme }) => theme.spacing.spacing11};
  
  background-color: ${({ theme }) => theme.colors.background.default};
  border: 1px solid ${({ theme }) => theme.colors.gray.gray400};
  border-radius: 5px;

  font-size: ${({ theme }) => theme.typography.label.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label.label1Bold.fontSize};
  line-height: ${({ theme }) => theme.typography.label.label1Bold.fontSize};
  cursor: pointer;
`;

const SpinnerWrapper = styled.div`
  width: auto;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #333;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

function RealtimeRankItemWrapper({selectedGroup, selectedType}: {selectedGroup: string; selectedType: string}) {
  const [ranking, setRanking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigate = useNavigate();

  // 그룹과 타입state가 바뀔때마다 axios로 데이터 요청후 그에맞는 state 세팅
  useEffect(() => {
    const fetchRanking = async () => {
      
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/api/products/ranking?targetType=${selectedGroup}&rankType=${selectedType}`);
        setRanking(response.data.data);
        setIsError(false);
      } catch (error) {
        console.error('Error fetching ranking data:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRanking();
  }, [selectedGroup, selectedType]);

  // 더보기버튼 클릭시 state를 반전해주는 핸들러
  const handleCollapsedClick = () => {
    setIsCollapsed(!isCollapsed);
  }

  // item클릭시 해당 item정보들을 url query로들고 Order페이지로 가는 핸들러
  const handleItemClick = (brandInfo: any, id: any, imageURL: any, name: any, price: any) => {
    const query = new URLSearchParams({ brandInfo: brandInfo.name, id: id.toString(), imageURL, name, price: price.basicPrice, }).toString();

    navigate(`/order?${query}`);
  }
  
  if(isLoading) {
    return <SpinnerWrapper>
        <Spinner/>
    </SpinnerWrapper>
  }

  if(isError || ranking.length === 0) {
    return <div>상품이 없습니다</div>;
  }

  return (
    <RealtimeRankItemWrapperStyle>
        <RealtimeRankItemGrid>{(isCollapsed ? ranking : ranking.slice(0, 6)).map((item) => (
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
  
        {/* 더보기 접기 버튼 */}
        <ExtraBtnWrapper>
          <ExtraBtn
            onClick={() => {
              handleCollapsedClick();
            }}
          >
            {isCollapsed ? '접기' : '더보기'}
          </ExtraBtn>
        </ExtraBtnWrapper>
    </RealtimeRankItemWrapperStyle>
  );
}
const userGroupMock = [
  { key: 0, group: 'ALL', emoji: 'ALL', label: '전체' },
  { key: 1, group: 'FEMALE', emoji: '👩🏻', label: '여성이' },
  { key: 2, group: 'MALE', emoji: '👨🏻', label: '남성이' },
  { key: 3, group: 'TEEN', emoji: '👦🏻', label: '청소년이' },
];

const rankingTypeMock = [
  { key: 0, type: 'MANY_WISH', label: '받고 싶어한' },
  { key: 1, type: 'MANY_RECEIVE', label: '많이 선물한' },
  { key: 2, type: 'MANY_WISH_RECEIVE', label: '위시로 받은' },
];

// 메인 컴포넌트 시작
function RealtimeGiftRank() {
  const [selectedGroup, setSelectedGroup] = useState('ALL');
  const [selectedType, setSelectedType] = useState('MANY_WISH');

  // 최초 랜더링시 sessionStorage에서 선택된 그룹, 타입값을 가져와서 state에 세팅
  useEffect(() => {
    const savedGroup = sessionStorage.getItem('selectedGroup');
    const savedType = sessionStorage.getItem('selectedType');

    if (savedGroup) {
      setSelectedGroup(savedGroup);
    }

    if (savedType) {
      setSelectedType(savedType);
    }
  }, []);

  // 그룹 클릭시 state와 sessionStorage에 저장하는 핸들러
  const handleGroupClick = (group: string) => {
    setSelectedGroup(group);
    sessionStorage.setItem('selectedGroup', group);
  }

  // 타입 클릭시 state와 sessionStorage에 저장하는 핸들러
  const handleTypeClick = (type: string) => {
    setSelectedType(type);
    sessionStorage.setItem('selectedType', type);
  }

  return (
    <RealtimeRankWrapper>
      <RealtimeRankTitle>실시간 급상승 선물랭킹</RealtimeRankTitle>
      {/* 첫 번째 selector */}
      <UserGroupSelectorWrapper>
        {userGroupMock.map(({ key, group, emoji, label }) => (
          <UserGroupSelectorItemWrapper key={key} onClick={() => handleGroupClick(group)} >
            <UserGroupSelectorBtn isSelected={selectedGroup === group}>
              {emoji}
            </UserGroupSelectorBtn>
            <UserGroupSelectorTxt isSelected={selectedGroup === group}>
              {label}
            </UserGroupSelectorTxt>
          </UserGroupSelectorItemWrapper>
        ))}
      </UserGroupSelectorWrapper>

      {/* 두 번째 selector */}
      <RankingTypeSelectorWrapper>
        {rankingTypeMock.map(({ key, type, label }) => (
          <RankingTypeSelectorBtn
            key={key}
            onClick={() => handleTypeClick(type)}
            isSelected={selectedType === type}>
            {label}
          </RankingTypeSelectorBtn>
        ))}
      </RankingTypeSelectorWrapper>

      {/* 아이템 리스트 */}
      <RealtimeRankItemWrapper selectedGroup={selectedGroup} selectedType={selectedType}/>
    </RealtimeRankWrapper>
  );
}

export default RealtimeGiftRank;

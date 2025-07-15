import styled from '@emotion/styled'
import { useState, useMemo } from 'react'
import { ProductItem } from '@/components/Product/ProductItem'
import { useProductRanking } from '@/hooks/useProductRanking'

const genderOptions = ['전체', '여성이', '남성이', '청소년이']
const topicOptions = ['받고 싶어한', '많이 선물한', '위시로 받은']

export function ProductListSection() {
  const {
    products,
    loading,
    error,
    selectedGender,
    selectedTopic,
    selectGender,
    selectTopic,
  } = useProductRanking()

  const [showAll, setShowAll] = useState(false)

  const displayedProducts = useMemo(() => {
    return showAll ? products : products.slice(0, 6)
  }, [showAll, products])

  if (loading) return <p>선물랭킹 로딩중...</p>
  if (error || !products || products.length === 0)
    return <p>상품 목록이 없습니다.</p>

  return (
    <SectionWrapper>
      <SectionTitle>실시간 급상승 선물랭킹</SectionTitle>

      <CategoryTabs>
        {genderOptions.map((option) => (
          <span
            key={option}
            className={selectedGender === option ? 'active' : ''}
            onClick={() => selectGender(option)}
          >
            {getEmoji(option)} {option}
          </span>
        ))}
      </CategoryTabs>

      <SubTab>
        {topicOptions.map((option) => (
          <span
            key={option}
            className={selectedTopic === option ? 'active' : ''}
            onClick={() => selectTopic(option)}
          >
            {option}
          </span>
        ))}
      </SubTab>

      <ProductListWrapper>
        {displayedProducts.map((product, index) => (
          <ProductItem key={product.id} {...product} rank={index + 1} />
        ))}
      </ProductListWrapper>

      <ToggleButton onClick={() => setShowAll(!showAll)}>
        {showAll ? '접기' : '더보기'}
      </ToggleButton>
    </SectionWrapper>
  )
}

function getEmoji(option: string) {
  if (option === '전체') return '🎁'
  if (option === '여성이') return '👩'
  if (option === '남성이') return '👨'
  if (option === '청소년이') return '🧒'
  return ''
}

const SectionWrapper = styled.section`
  width: 100%;
`

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
`

const CategoryTabs = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 24px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray800};
  margin-bottom: 12px;

  span {
    background: ${({ theme }) => theme.colors.blue100};
    padding: 6px 12px;
    border-radius: 16px;
    cursor: pointer;

    &.active {
      background: ${({ theme }) => theme.colors.blue300};
      font-weight: 700;
    }
  }
`

const SubTab = styled.div`
  background: ${({ theme }) => theme.colors.blue100};
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.blue800};
  margin-bottom: 16px;
  border-radius: 8px;

  span {
    cursor: pointer;
    &.active {
      font-weight: 700;
    }
  }
`

const ProductListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`

const ToggleButton = styled.button`
  margin: 24px auto 40px;
  display: block;
  padding: 8px 200px;
  border: 1px solid ${({ theme }) => theme.colors.gray400};
  background-color: white;
  color: black;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
`

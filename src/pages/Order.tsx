import { useNavigate, useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { OrderFormProvider, useOrderForm } from '@/contexts/order'
import { orderCardMock, type CardData } from '@/features/order'
import { ROUTE_PATH } from '@/Router'
import { OrderCardSection, ReceiverSection, SenderSection } from '@/features/order/components'
import { theme } from '@/styles/theme'
import { Button, PageContainer, Typography } from '@/components/ui'
import { NotFound } from '@/pages/NotFound'
import type { ProductSummary } from '@/api/types/product'
import { fetchProductSummary } from '@/api/services/product'
import { useFetch } from '@/hooks/useFetch'
import { STORAGES } from '@/api/constants/storages'
import type { CreateOrderRequest } from '@/api/types/order'
import { createOrder } from '@/api/services/order'
import { toast } from 'react-toastify'

// * 주문하기 페이지 (주문하기 폼 Provider 포함)
export const Order = () => {
  const storedUser = localStorage.getItem(STORAGES.AUTH)
  const userInfo = storedUser ? JSON.parse(storedUser) : null

  return (
    // * Context API를 통해 전역적으로 관리되는 주문하기 폼 적용
    <OrderFormProvider defaultSender={userInfo?.name}>
      <OrderContent />
    </OrderFormProvider>
  )
}

// * 주문하기 컨텐츠
export const OrderContent = () => {
  const navigate = useNavigate()
  // * URL 파라미터로 부터 상품 id 값 가져오기
  const { id } = useParams<{ id: string }>()
  const { data: productInfo, isError } = useFetch<ProductSummary>(
    () => fetchProductSummary(Number(id)),
    [id],
  )

  // * 카드 리스트
  const cardList: CardData[] = orderCardMock

  // * OrderForm 컨텍스트 사용
  const {
    form: {
      handleSubmit,
      formState: { errors },
      watch,
      control,
    },
    handleCardSelect,
    getTotalPrice,
  } = useOrderForm()

  // * 폼 데이터 실시간 추적
  const watchedData = watch()
  const { selectedCard } = watchedData

  // * 폼 제출 핸들러
  const onSubmit = handleSubmit(async (data) => {
    if (!productInfo) return

    if (data.receivers.length === 0) {
      alert('받는 사람이 최소 1명 필요합니다.')
      return
    }

    // * API 요청 데이터 생성
    const orderRequest: CreateOrderRequest = {
      productId: productInfo.id,
      message: data.cardMessage,
      messageCardId: `card${data.selectedCard.id}`,
      ordererName: data.sender,
      receivers: data.receivers.map((r) => ({
        name: r.name,
        phoneNumber: r.phone,
        quantity: r.count,
      })),
    }

    // * 주문하기 API 요청
    const result = await createOrder(orderRequest)

    // * 성공시 홈으로 이동
    if (result.success) {
      toast.success('주문이 완료되었습니다!')
      navigate(ROUTE_PATH.HOME)
    }
  })

  // * 주문 총액 계산
  const totalPrice = productInfo ? getTotalPrice(productInfo.price) : 0

  // * 에러 발생 시 홈으로 이동
  if (isError) {
    navigate(ROUTE_PATH.HOME)
    return null
  }

  // * 상품 정보가 없을 경우 NotFound 페이지로 이동하도록 처리
  if (!productInfo) return <NotFound />

  // * 상품 정보가 있을 경우
  return (
    <OrderContainer>
      {/* 주문하기 카드 섹션 */}
      <OrderCardSection
        cardList={cardList}
        selectedCard={selectedCard}
        control={control}
        onCardSelect={handleCardSelect}
        messageError={errors.cardMessage?.message}
      />

      {/* 보내는 사람 폼 섹션 */}
      <SenderSection control={control} error={errors.sender?.message} />

      {/* 받는 사람 폼 섹션 */}
      <ReceiverSection />

      {/* 상품 정보 섹션 */}
      <ProductInfoSection>
        <SectionTitle variant="title2Bold">상품 정보</SectionTitle>
        <ProductInfo>
          <ProductImage src={productInfo.imageURL} alt={productInfo.name} />
          <ProductDetails>
            <ProductNameContainer>
              <ProductName variant="subtitle2Regular">{productInfo.name}</ProductName>
              <ProductBrand variant="label2Regular">{productInfo.brandName}</ProductBrand>
            </ProductNameContainer>
            <ProductPriceContainer>
              <ProductPriceLabel
                variant="label2Regular"
                css={{
                  color: theme.semanticColors.text.sub,
                  fontSize: '0.875rem',
                  fontWeight: '400',
                  marginRight: theme.spacing.spacing1,
                }}
              >
                상품가
              </ProductPriceLabel>
              <ProductSellingPrice variant="title2Bold">
                {productInfo.price.toLocaleString()}원
              </ProductSellingPrice>
            </ProductPriceContainer>
          </ProductDetails>
        </ProductInfo>
      </ProductInfoSection>

      {/* 주문하기 버튼 */}
      <OrderButtonSection>
        <OrderButton variant="kakao" size="large" onClick={onSubmit}>
          {totalPrice.toLocaleString()}원 주문하기
        </OrderButton>
      </OrderButtonSection>
    </OrderContainer>
  )
}

// * 주문하기 페이지 컨테이너
const OrderContainer = styled(PageContainer)`
  justify-content: start;
  background-color: ${theme.semanticColors.background.disabled};
  gap: ${theme.spacing.spacing2};
`

// * 상품 정보 섹션
const ProductInfoSection = styled.section`
  width: 100%;
  padding: ${theme.spacing.spacing4} ${theme.spacing.spacing4};
  background-color: ${theme.semanticColors.background.default};
  border-bottom: 1px solid ${theme.semanticColors.border.default};

  display: flex;
  flex-direction: column;
`

// * 섹션 제목
const SectionTitle = styled(Typography)`
  margin-bottom: ${theme.spacing.spacing3};
`

// * 상품 정보 컨테이너
const ProductInfo = styled.div`
  padding: ${theme.spacing.spacing4};

  border: 1px solid ${theme.semanticColors.border.disabled};
  border-radius: ${theme.spacing.spacing2};

  display: flex;
  align-items: center;
  gap: ${theme.spacing.spacing3};
`

// * 상품 이미지
const ProductImage = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: ${theme.spacing.spacing1};
  object-fit: cover;
`

// * 상품 상세 정보
const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.spacing1};
`

// * 상품 명 컨테이너
const ProductNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.spacing1};
`

// * 상품명
const ProductName = styled(Typography)`
  color: ${theme.semanticColors.text.default};
`

// * 상품 브랜드
const ProductBrand = styled(Typography)`
  color: ${theme.semanticColors.text.sub};
`

// * 상품 가격 컨테이너
const ProductPriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.spacing1};
  flex-wrap: wrap;
`

// * 상품 가격 라벨
const ProductPriceLabel = styled(Typography)``

// * 상품 판매가
const ProductSellingPrice = styled(Typography)`
  color: ${theme.semanticColors.text.default};
`

// * 주문 버튼 섹션
const OrderButtonSection = styled.section`
  width: 100%;
`

// * 주문 버튼
const OrderButton = styled(Button)`
  font-weight: 700;
`

export default Order

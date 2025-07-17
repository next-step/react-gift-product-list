import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FormProvider } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useOrderForm } from '../hooks/useOrderForm'
import { useProductSummary } from '../hooks/useProductSummary'
import { ROUTE_PATH } from '@/routes/Router'
import { cards } from '@/data/cards'
import CardSelect from '../components/CardSelect/CardSelect'
import CardPreview from '../components/CardPreview/CardPreview'
import MessageInput from '../components/MessageInput/MessageInput'
import SenderInput from '../components/SenderInput/SenderInput'
import ProductInfo from '../components/ProductInfo/ProductInfo'
import BottomPurchaseBar from '../components/BottomPurchaseBar/BottomPurchaseBar'
import ReceiverSection from '../components/ReceiverSection/ReceiverSection'
import Loading from '@/component/Loading/Loading'

const OrderPage = () => {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()

  const idNum = Number(productId)
  const isInvalidId = !productId || isNaN(idNum)

  const { product, loading, error } = useProductSummary(
    isInvalidId ? null : idNum
  )

  const [selectedCardId, setSelectedCardId] = useState<number>(904)
  const selectedCard = cards.find((card) => card.id === selectedCardId)!

  const { methods, onSubmit, totalPrice, confirmReceivers } = useOrderForm({
    productId: isInvalidId ? undefined : idNum,
    defaultMessage: selectedCard.defaultTextMessage,
    productName: product?.name ?? '',
    sellingPrice: product?.price ?? 0,
    selectedCardId,
    selectedCardMessage: selectedCard.defaultTextMessage,
  })

  useEffect(() => {
    if (isInvalidId) {
      toast.error('잘못된 상품 경로입니다.')
      navigate(ROUTE_PATH.GIFT, { replace: true })
    }
  }, [isInvalidId, navigate])

  useEffect(() => {
    if (error) {
      toast.error('상품 정보를 불러오는 데 실패했습니다.')
      navigate(ROUTE_PATH.GIFT, { replace: true })
    }
  }, [error, navigate])

  if (isInvalidId || loading) return <Loading />
  if (!product) return <div>상품 정보를 찾을 수 없습니다.</div>

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <CardSelect
          selectedCardId={selectedCardId}
          setSelectedCardId={setSelectedCardId}
        />
        <CardPreview selectedCardId={selectedCardId} />
        <MessageInput />
        <SenderInput />
        <ReceiverSection onConfirm={confirmReceivers} />
        <ProductInfo product={product} />
        <BottomPurchaseBar handlePurchase={onSubmit} totalPrice={totalPrice} />
      </form>
    </FormProvider>
  )
}

export default OrderPage

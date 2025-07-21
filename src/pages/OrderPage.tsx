import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '@/Layout'
import { cardTemplates, type CardTemplate } from '@/data/cardTemplates'
import { fetchProductSummary, type ProductSummary } from '@/api/product'
import { postOrder } from '@/api/order'
import useOrderForm, { type OrderFormValues } from '@/hooks/useOrderForm'
import RecipientModal from '@/components/RecipientModal'
import { toast } from 'react-toastify'
import { useAuth } from '@/contexts/AuthContext'
import {
  Container,
  CardGrid,
  CardItem,
  Thumb,
  Preview,
  ErrorMessage,
  MessageInput,
  InfoSection,
  Label,
  Input,
  ProductInfo,
  ProductImage,
  Details,
  ProductName,
  Brand,
  Price,
  RecipientHeader,
  EmptyRecipients,
  Divider,
  RecipientTable,
  RecipientTableHeader,
  RecipientRow,
  OrderButton,
} from '@/styles/OrderPage.styles'

export default function OrderPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<ProductSummary | null>(null)
  const { userInfo } = useAuth()

  const [selected, setSelected] = useState<CardTemplate>(cardTemplates[0])
  const [modalOpen, setModalOpen] = useState(false)
  const {
    register,
    setValue,
    handleSubmit,
    errors,
    isValid,
    fields,
    append,
    remove,
    watch,
  } = useOrderForm(cardTemplates[0].defaultTextMessage)

  useEffect(() => {
    if (!id) return

    async function load() {
      try {
        const data = await fetchProductSummary(Number(id))
        setProduct(data)
      } catch (err: any) {
        const code = err?.statusCode ?? 0
        if (code >= 400 && code < 500) {
          toast.error(err.message)
          navigate('/', { replace: true })
        } else {
          toast.error('상품 정보를 불러오지 못했습니다.')
        }
      }
    }

    load()
  }, [id, navigate])

  useEffect(() => {
    if (userInfo) {
      setValue('sender', userInfo.name)
    }
  }, [userInfo, setValue])


  const recipients = watch('recipients')
  const totalQty = recipients.reduce(
    (sum: number, r: { qty: number }) => sum + (r.qty ?? 0),
    0,
  )
  const orderPrice = product ? product.price * totalQty : 0

  const onSubmit = async (data: OrderFormValues) => {
    if (!id || !userInfo) return

    try {
      await postOrder(
        {
          productId: Number(id),
          message: data.message,
          messageCardId: String(selected.id),
          ordererName: data.sender,
          receivers: data.recipients.map((r) => ({
            name: r.name,
            phoneNumber: r.phone,
            quantity: r.qty,
          })),
        },
        userInfo.authToken,
      )
      alert('주문이 완료되었습니다.')
      navigate('/')
    } catch (err: any) {
      const code = err?.statusCode ?? 0
      if (code === 401) {
        toast.error('로그인이 필요합니다.')
        navigate('/login')
      } else if (code >= 400 && code < 500) {
        toast.error(err.message)
      } else {
        toast.error('주문에 실패했습니다.')
      }
    }
  }
  const handleCardSelect = (card: CardTemplate) => {
    setSelected(card)
    setValue('message', card.defaultTextMessage)
  }
  return (
    <Layout>
      <Container as="form" onSubmit={handleSubmit(onSubmit)}>
        <CardGrid>
          {cardTemplates.map((card) => (
            <CardItem
              key={card.id}
              selected={selected.id === card.id}
              onClick={() => handleCardSelect(card)}
            >
              <Thumb src={card.thumbUrl} alt="카드 썸네일" />
            </CardItem>
          ))}
        </CardGrid>

        <Preview>
          <img src={selected.imageUrl} alt="선택된 카드" />
        </Preview>

        <MessageInput
          {...register('message')}
          placeholder="메시지를 입력해주세요."
          maxLength={200}
        />
        {errors.message && (
          <ErrorMessage>{String(errors.message.message)}</ErrorMessage>
        )}
        <InfoSection>
          <Label>보내는 사람</Label>
          <Input
            type="text"
            {...register('sender')}
            placeholder="이름을 입력하세요."
          />
          {errors.sender && (
            <ErrorMessage>{String(errors.sender.message)}</ErrorMessage>)}
          *실제 선물 발송 시 발신자 이름으로 반영되는 정보입니다.
        </InfoSection>

        <InfoSection>
          <RecipientHeader>
            <Label>받는 사람</Label>
            <button type="button" onClick={() => setModalOpen(true)}>
              {fields.length === 0 ? '추가' : '수정'}
            </button>
          </RecipientHeader>
          {fields.length === 0 ? (
            <EmptyRecipients>
              <p>
                받는 사람이 없습니다.
                <br />
                받는 사람을 추가해주세요.
              </p>
            </EmptyRecipients>
          ) : (
            <>
              <Divider />
              <RecipientTable>
                <RecipientTableHeader>
                  <p>이름</p>
                  <p>전화번호</p>
                  <p>수량</p>
                </RecipientTableHeader>
                {watch('recipients').map((r, index) => (
                  <RecipientRow key={fields[index].id}>
                    <p>{r.name}</p>
                    <p>{r.phone}</p>
                    <p>{r.qty}</p>
                  </RecipientRow>
                ))}
              </RecipientTable>
              <Divider />
            </>
          )}
        </InfoSection>
        {product && (
          <ProductInfo>
            <ProductImage src={product.imageURL} alt="상품 이미지" />
            <Details>
              <ProductName>{product.name}</ProductName>
              <Brand>{product.brandName}</Brand>
              <Price>
                <span>상품가 </span>
                {product.price.toLocaleString()}원
              </Price>
            </Details>
          </ProductInfo>
        )}

        <OrderButton type="submit" disabled={!isValid}>
          {product ? `${orderPrice.toLocaleString()}원 주문하기` : '주문하기'}
        </OrderButton>
      </Container>
      <RecipientModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        fields={fields}
        append={append}
        remove={remove}
        register={register}
        watch={watch}
        errors={errors}
        isValid={isValid}
      />
    </Layout>
  )
}
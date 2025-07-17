import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { orderSchema, type Order } from '../schema/orderSchema'
import { useOrderSubmit } from '../hooks/useOrderSubmit'
import { useUserContext } from '@/contexts/UserContext'
import { ROUTE_PATH } from '@/routes/Router'

interface UseOrderFormParams {
  productId: number
  defaultMessage: string
  productName: string
  sellingPrice: number
  selectedCardId: number
  selectedCardMessage: string
}

export const useOrderForm = ({
  productId,
  defaultMessage,
  productName,
  sellingPrice,
  selectedCardId,
  selectedCardMessage,
}: UseOrderFormParams) => {
  const { submitOrder } = useOrderSubmit()
  const navigate = useNavigate()

  const { user } = useUserContext()
  const senderName = user?.nickname

  const methods = useForm<Order>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      message: defaultMessage,
      sender: senderName,
      receivers: [],
    },
    mode: 'onChange',
  })

  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = methods

  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantity, setTotalQuantity] = useState(0)

  const confirmReceivers = () => {
    const confirmed = getValues('receivers') || []
    const price = confirmed.reduce(
      (sum, r) => sum + r.quantity * sellingPrice,
      0
    )
    const quantity = confirmed.reduce((sum, r) => sum + r.quantity, 0)
    setTotalPrice(price)
    setTotalQuantity(quantity)
  }

  useEffect(() => {
    setValue('message', selectedCardMessage || '')
  }, [selectedCardId, selectedCardMessage, setValue])

  const onSubmit = handleSubmit(async (data) => {
    const orderPayload = {
      productId: Number(productId),
      message: data.message || '',
      messageCardId: String(selectedCardId),
      ordererName: data.sender || '',
      receivers: data.receivers.map((r) => ({
        name: r.receiver || '',
        phoneNumber: r.phone || '',
        quantity: Number(r.quantity) || 1,
      })),
    }

    try {
      await submitOrder(orderPayload)
      alert(`주문이 완료되었습니다.
상품명: ${productName}
총 수량: ${totalQuantity}
발신자 이름: ${data.sender}
메시지: ${data.message}`)

      navigate(ROUTE_PATH.GIFT)
    } catch {}
  })

  return {
    methods,
    register,
    onSubmit,
    errors,
    confirmReceivers,
    totalPrice,
    control,
  }
}

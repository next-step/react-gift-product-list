import { FormProvider, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect} from "react"
import PresentGiverForm from "@/components/PresentForm/PresentGiverForm"
import CardThumbnail from "./CardThumbnail"
import OrderLayout from "@/components/OrderLayout"
import ReceiverForm from "@/components/PresentForm/ReceiverForm"
import ProductInfoBar from "./ProductInfo"
import MoreButton from "@/components/MoreButton"
import Loading from "@/components/PresentTheme/Loading"
import { toast } from "react-toastify"
import useProductInfo from "@/hooks/useProductInfo"
import { useOrder } from "@/hooks/useOrder"

export interface Receiver {
  name: string
  phone: string
  quantity: string
}
export interface FormData {
  senderName: string
  receivers: Receiver[]
  message?: string
  messageCardId?: string
}
export type FormField = keyof FormData

const OrderPage = () => {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()

  const { product, loading, error } = useProductInfo(productId)
  const storedName = localStorage.getItem("name") ?? ""

  const methods = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      senderName: storedName,
      receivers: [],
      message: "",
      messageCardId: "",
    },
  })
  useEffect(() => {
    if (error) {
      toast.error("상품 정보를 불러오지 못했습니다.")
      navigate("/", { replace: true })
    }
  }, [error, navigate])

  const { createOrder } = useOrder()

  const handleOrder = async (data: FormData) => {
    try {
      const token = localStorage.getItem("authToken")
      
      if (!token) {
        toast.error("로그인이 필요합니다.")
        navigate("/login")
        return
      }

      if (!product) return

      await createOrder(
        {
          productId: product.id,
          message: data.message ?? "",
          messageCardId: data.messageCardId ?? "",
          ordererName: data.senderName,
          receivers: data.receivers.map((r) => ({
            name: r.name,
            phoneNumber: r.phone,
            quantity: Number(r.quantity),
          })),
        },
        token 
      )
      alert(
        `주문이 완료되었습니다.\n` +
          `상품명: ${product.name}\n` +
          `구매 수량: ${totalQuantity}\n` +
          `발신자 이름: ${data.senderName}\n` +
          `메시지: ${data.message}`
      )

    } catch (e:any) {
      if (e?.response?.status === 401) {
        toast.error("인증이 만료되었습니다. 다시 로그인해주세요.")
        localStorage.removeItem("authToken") 
        navigate("/login")
        return
      }
      alert("주문 실패: " + error)
    }
  }

  if (loading) return <Loading />
  if (!product) return null
  console.log(product)
  const { handleSubmit,reset,  watch } = methods

  const receivers = watch("receivers")
  const totalQuantity = receivers.reduce(
    (sum, r) => sum + Number(r.quantity || 0),
    0
  )
  const totalPrice = totalQuantity * product.price

  
const onSubmit = (data: FormData) => {
  
  handleOrder(data);
  reset(); }
  return (
    <FormProvider {...methods}>
      <OrderLayout
        color="gray100"
        minHeight="100vh"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CardThumbnail />

        <PresentGiverForm />
        <ReceiverForm />

        <ProductInfoBar
          image={product.imageURL}
          name={product.name}
          brand={product.brandName}
          price={product.price}
        />

        <MoreButton
          type="submit"
          background="kakaoYellow"
          borderRadius="spacing0"
        >
          {totalQuantity
            ? `${totalPrice.toLocaleString()}원 주문하기`
            : "0원 주문하기"}
        </MoreButton>
      </OrderLayout>
    </FormProvider>
  )
}

export default OrderPage

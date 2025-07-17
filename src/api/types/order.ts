// * 받는 사람
export interface Receiver {
  name: string
  phoneNumber: string
  quantity: number
}

// * 주문하기 생성
export interface CreateOrderRequest {
  productId: number
  message: string
  messageCardId: string
  ordererName: string
  receivers: Receiver[]
}

// * 주문하기 응답
export interface CreateOrderResponse {
  success: boolean
}

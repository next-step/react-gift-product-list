import { useState } from "react"
import axios from "axios"

export interface OrderRequest {
  productId: number
  message: string
  messageCardId: string
  ordererName: string
  receivers: {
    name: string
    phoneNumber: string
    quantity: number
  }[]
}

export function useOrder() {
  const [orderLoading, setLoading] = useState(false)
  const [orderError, setError] = useState<null | string>(null)
  const [success, setSuccess] = useState(false)
  const baseUrl = import.meta.env.VITE_BASE_URL
  const orderUrl = new URL(`/api/order`, baseUrl).toString()

  const createOrder = async (order: OrderRequest, token: string) => {
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      const res = await axios.post(orderUrl, order, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      setSuccess(true)
      return res.data
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || "주문 실패"
      setError(errorMessage)
      
      if (err?.response?.status === 401) {
        const error401 = new Error(errorMessage)
        error401.name = "401"
        throw error401
      }
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { createOrder, orderLoading, orderError, success }
}

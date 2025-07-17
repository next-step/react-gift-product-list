import { useEffect, useState } from 'react'
import axios from 'axios'
import type { Product } from '@/types/product'

const genderOptions = ['전체', '여성이', '남성이', '청소년이']
const topicOptions = ['받고 싶어한', '많이 선물한', '위시로 받은']

const genderMap: Record<string, string> = {
  전체: 'ALL',
  여성이: 'FEMALE',
  남성이: 'MALE',
  청소년이: 'TEEN',
}

const topicMap: Record<string, string> = {
  '받고 싶어한': 'MANY_WISH',
  '많이 선물한': 'MANY_RECEIVE',
  '위시로 받은': 'MANY_WISH_RECEIVE',
}

export function useProductRanking() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [selectedGender, setSelectedGender] = useState('전체')
  const [selectedTopic, setSelectedTopic] = useState('받고 싶어한')

  const fetchRanking = async (gender: string, topic: string) => {
    try {
      const targetType = genderMap[gender]
      const rankType = topicMap[topic]
      const response = await axios.get<{ data: Product[] }>(
        `${import.meta.env.VITE_API_BASE_URL}/api/products/ranking?targetType=${targetType}&rankType=${rankType}`
      )
      setProducts(response.data.data)
    } catch (err) {
      console.error('테마 목록 불러오기 실패:', err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const savedGender = localStorage.getItem('selectedGender')
    const savedTopic = localStorage.getItem('selectedTopic')
    if (savedGender && genderOptions.includes(savedGender)) {
      setSelectedGender(savedGender)
    }
    if (savedTopic && topicOptions.includes(savedTopic)) {
      setSelectedTopic(savedTopic)
    }
  }, [])

  useEffect(() => {
    fetchRanking(selectedGender, selectedTopic)
  }, [selectedGender, selectedTopic])

  const selectGender = (option: string) => {
    setSelectedGender(option)
    localStorage.setItem('selectedGender', option)
  }

  const selectTopic = (option: string) => {
    setSelectedTopic(option)
    localStorage.setItem('selectedTopic', option)
  }

  return {
    products,
    loading,
    error,
    selectedGender,
    selectedTopic,
    selectGender,
    selectTopic,
  }
}

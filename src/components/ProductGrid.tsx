import { useState, useMemo, useCallback } from "react"
import Grid from "@/components/Grid"
import Card from "@/components/Card"
import Text from "@/components/Text"
import IndexBadge from "@/components/IndexBadge"
import ProductImage from "./ProductImage"
import MoreButton from "./MoreButton"
import theme from "@/styles/theme"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/constants/routes"
import getRoute from "@/functions/getRoute"
import useQueryState from "@/hooks/useQueryState"
import Loading from "./PresentTheme/Loading"
import useFetch from "@/hooks/useFetch"

const VISIBLE_COUNT = 6

interface Price {
  basicPrice: number
  sellingPrice: number
  discountRate: number
}
interface BrandInfo {
  id: number
  name: string
  imageURL: string
}
export interface Product {
  id: number
  name: string
  price: Price
  imageURL: string
  brandInfo: BrandInfo
}
interface ProductsResponse {
  data: Product[]
}

const ProductGrid = () => {
  const [showAll, setShowAll] = useState(false)

  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()

  const [rankType] = useQueryState<string>("rankType", "MANY_WISH_RECEIVE")
  const [targetType] = useQueryState<string>("targetType", "ALL")
  console.log(rankType, targetType)
  const handleGoOrder = useCallback(
    (id: number) => {
      if (!isLoggedIn) {
        navigate(ROUTES.LOGIN)
      } else {
        navigate(getRoute(ROUTES.ORDER, { id }))
      }
    },
    [isLoggedIn, navigate]
  )
  const baseUrl = import.meta.env.VITE_BASE_URL
  const rankingUrlObj = new URL("/api/products/ranking", baseUrl)
  rankingUrlObj.searchParams.set("targetType", targetType)
  rankingUrlObj.searchParams.set("rankType", rankType)

  const rankingUrl = rankingUrlObj.toString()
  const { data: productsData, loading } = useFetch<ProductsResponse>(
    rankingUrl,
    {
      dependencies: [rankType, targetType],
      onSuccess: (data) => {
        console.log("Products fetched:", data)
      },
      onError: (error) => {
        console.log("Error fetching products:", error)
      },
    }
  )
  const products = productsData?.data || []
  const visibleProducts = useMemo(() => {
    const count = showAll ? products.length : VISIBLE_COUNT
    return products.slice(0, count)
  }, [products, showAll])

  if (loading) return <Loading />

  if (!products.length)
    return <p style={{ textAlign: "center" }}>상품 목록이 없습니다.</p>

  return (
    <>
      <Grid gap="spacing2">
        {visibleProducts.map((item, idx) => (
          <Card
            key={item.id}
            borderRadius="spacing02"
            onClick={() => handleGoOrder(item.id)}
          >
            <IndexBadge backGroundColor={idx < 3 ? "critical" : "gray400"}>
              {idx + 1}
            </IndexBadge>

            <ProductImage
              src={item.imageURL}
              alt={item.name}
              borderTopLeftRadius="spacing3"
              borderTopRightRadius="spacing3"
            />

            <div style={{ padding: theme.space.spacing3 }}>
              <Text
                variant="subtitle2Regular"
                color="textSub"
                margin="spacing0"
                padding="spacing0"
              >
                {item.brandInfo.name}
              </Text>
              <Text
                variant="subtitle2Regular"
                margin="spacing0"
                padding="spacing0"
              >
                {item.name}
              </Text>
              <Text variant="title2Bold" margin="spacing0" padding="spacing0">
                {item.price.sellingPrice.toLocaleString()} 원
              </Text>
            </div>
          </Card>
        ))}
      </Grid>

      {products.length > VISIBLE_COUNT && (
        <MoreButton
          borderRadius="spacing2"
          background="gray00"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "접기" : "더보기"}
        </MoreButton>
      )}
    </>
  )
}

export default ProductGrid

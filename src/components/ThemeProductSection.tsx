import Grid from "./Grid"
import Card from "./Card"
import Text from "./Text"
import ProductImage from "./ProductImage"
import ThemeNotFound from "./PresentTheme/ThemeNotFound"
import Loading from "./PresentTheme/Loading"
import theme from "@/styles/theme"
import { Product } from "@/interfaces/Product"
import useThemeProduct from "@/hooks/useThemeProduct"
import useInfiniteScrolling from "@/hooks/useInfiniteScrolling"

import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/constants/routes"
import getRoute from "@/functions/getRoute"
import { useAuth } from "@/context/AuthContext"

async function fetchThemeProducts(
  themeId: string,
  cursor: number | null,
  limit = 12,
) {
  const base = import.meta.env.VITE_BASE_URL
  const url = new URL(`/api/themes/${themeId}/products`, base)
  if (cursor !== null) url.searchParams.append("cursor", String(cursor))
  url.searchParams.append("limit", String(limit))

  const res = await fetch(url.toString()).then(r => r.json())
  return res.data
}


const ThemeProductSection = ({ themeId }: { themeId: string }) => {

  const [products, setProducts] = useState<Product[]>([])
  const [cursor, setCursor]     = useState<number | null>(null)
  const [hasMore, setHasMore]   = useState(true)
  const [isFetching, setIsFetching] = useState(false)
  const [observerRef, setObserverRef] =
    useState<null | HTMLDivElement>(null)

  const {
    list: initialList,
    cursor: initialCursor,
    hasMore: initialHasMore,
    loading,
    error,
  } = useThemeProduct(themeId) 

  useEffect(() => {
    if (initialList.length) {
      setProducts(initialList)
      setCursor(initialCursor ?? null)
      setHasMore(initialHasMore)
    }
  }, [initialList, initialCursor, initialHasMore])


  const fetchMore = useCallback(async () => {
    if (!hasMore || isFetching) return      
    setIsFetching(true)
    try {
    const res = await fetchThemeProducts(themeId, cursor)
    setProducts(prev => [...prev, ...res.list])
    setCursor(res.cursor)
    setHasMore(res.hasMoreList)
}
    finally {
        setIsFetching(false)                 
    }
  }, [themeId, cursor, hasMore])


  useInfiniteScrolling({ observerRef, fetchMore, hasMore: hasMore && !isFetching, })


  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  const handleGoOrder = useCallback(
    (id: number) => {
      if (!isLoggedIn) navigate(ROUTES.LOGIN)
      else             navigate(getRoute(ROUTES.ORDER, { id }))
    },
    [isLoggedIn, navigate]
  )

  if (loading)           return <Loading />
  if (error)             return <ThemeNotFound />
  if (!products.length)  return <ThemeNotFound />

  return (
    <>
      <Grid gap="spacing2">
        {products.map(item => (
          <Card
            key={item.id}
            borderRadius="spacing2"
            onClick={() => handleGoOrder(item.id)}
          >
            <ProductImage
              src={item.imageURL}
              alt={item.name}
              borderTopLeftRadius="spacing0"
              borderTopRightRadius="spacing0"
            />
            <div style={{ padding: theme.space.spacing3 }}>
              <Text variant="subtitle2Regular" margin="spacing0" padding="spacing0">
                {item.brandInfo.name}
              </Text>
              <Text variant="subtitle2Regular" margin="spacing0" padding="spacing0">{item.name}</Text>
              <Text variant="title2Bold" margin="spacing0" padding="spacing0">
                {item.price.sellingPrice.toLocaleString()} 원
              </Text>
            </div>
          </Card>
        ))}
      </Grid>
      {isFetching && <Loading />}
      <div style={{ height: 8 }} ref={setObserverRef} />
    </>
  )
}

export default ThemeProductSection

import Grid from "./Grid"
import Card from "./Card"
import Text from "./Text"
import ProductImage from "./ProductImage"
import ThemeNotFound from "./PresentTheme/ThemeNotFound"
import Loading from "./PresentTheme/Loading"
import theme from "@/styles/theme"
import useThemeProduct from "@/hooks/useThemeProduct"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/constants/routes"
import getRoute from "@/functions/getRoute"
import { useAuth } from "@/context/AuthContext"
import useInView from "@/hooks/useInView"
import { useEffect } from "react"
const ThemeProductSection = ({ themeId }: { themeId: string }) => {
  const { products, hasMore, loadingInitial, error, isFetching, fetchMore } =
    useThemeProduct(themeId)

  const [sentinelRef, inView] = useInView()
  useEffect(() => {
    if (inView && hasMore && !isFetching) fetchMore()
  }, [inView, hasMore, isFetching, fetchMore])

  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  const handleGoOrder = useCallback(
    (id: number) => {
      if (!isLoggedIn) navigate(ROUTES.LOGIN)
      else navigate(getRoute(ROUTES.ORDER, { id }))
    },
    [isLoggedIn, navigate]
  )

  if (loadingInitial) return <Loading />
  if (error) return <ThemeNotFound />
  if (!products.length) return <ThemeNotFound />

  return (
    <>
      <Grid gap="spacing2">
        {products.map((item) => (
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
              <Text
                variant="subtitle2Regular"
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
      {isFetching ? <Loading /> : <div style={{ height: 40 }} />}
      <div style={{ height: 8 }} ref={sentinelRef} />
    </>
  )
}

export default ThemeProductSection

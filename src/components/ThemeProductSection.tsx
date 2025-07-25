import useThemeProduct from "@/hooks/useThemeProduct"
import Grid from "./Grid"
import Card from "./Card"
import Text from "./Text"
import ThemeNotFound from "./PresentTheme/ThemeNotFound"
import ProductImage from "./ProductImage"
import theme from "@/styles/theme"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/constants/routes"
import getRoute from "@/functions/getRoute"
import { useAuth } from "@/context/AuthContext"
import Loading from "./PresentTheme/Loading"

const ThemeProductSection = ({ themeId }: { themeId: string }) => {
    const {themeProducts,loading,error} =useThemeProduct(themeId)
    const navigate = useNavigate()
    const { isLoggedIn } = useAuth()
    console.log(themeId)
    console.log(themeProducts)

    if (loading) return <Loading/>

    if (error) return <ThemeNotFound/>

    if (!themeProducts || themeProducts.list.length === 0) {
        return <ThemeNotFound/>
      }
      
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
      if (!themeProducts) return (<ThemeNotFound/>)

    return ( <Grid gap="spacing2">
        {themeProducts.list.map((item) => (
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
)
}

export default ThemeProductSection
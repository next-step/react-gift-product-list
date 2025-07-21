import { useParams, useNavigate } from 'react-router-dom'
import { useThemeInfo } from '../hooks/useThemeInfo'
import { ThemeHero } from '../components/ThemeHero/ThemeHero'
import { ROUTE_PATH } from '@/routes/Router'
import Loading from '@/component/Loading/Loading'
import ThemeProducts from '../components/ThemeProducts/ThemeProducts'

const ThemePage = () => {
  const { themeId } = useParams()
  const navigate = useNavigate()
  const themeIdNum = Number(themeId)

  const { themeInfo, loading: infoLoading } = useThemeInfo(
    Number.isNaN(themeIdNum) ? null : themeIdNum
  )

  const handleProductSelect = (product: any) => {
    navigate(ROUTE_PATH.ORDER.replace(':productId', String(product.id)))
  }

  if (infoLoading) return <Loading />

  if (!themeInfo) {
    navigate(ROUTE_PATH.GIFT, { replace: true })
    return null
  }

  return (
    <>
      <ThemeHero themeInfo={themeInfo} />
      {themeIdNum && (
        <ThemeProducts
          themeId={themeIdNum}
          onProductSelect={handleProductSelect}
        />
      )}
    </>
  )
}

export default ThemePage

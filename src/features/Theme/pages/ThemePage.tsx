import { useParams, useNavigate } from 'react-router-dom'
import { useThemeInfo } from '../hooks/useThemeInfo'
import { ThemeHero } from '../components/ThemeHero/ThemeHero'
import { ROUTE_PATH } from '@/routes/Router'
import Loading from '@/component/Loading/Loading'
import ThemeProducts from '../components/ThemeProducts/ThemeProducts'
import type { Product } from '../types/ThemeTypes'

const ThemePage = () => {
  const navigate = useNavigate()

  const { themeId } = useParams<{ themeId: string }>()
  const themeIdNum = themeId && !isNaN(Number(themeId)) ? Number(themeId) : null
  const { themeInfo, loading } = useThemeInfo(themeIdNum)

  const handleProductSelect = (product: Product) => {
    navigate(ROUTE_PATH.ORDER.replace(':productId', String(product.id)))
  }

  if (loading) return <Loading />

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

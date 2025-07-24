import { useParams } from "react-router-dom"
import ThemeNotFound from "@/components/PresentTheme/ThemeNotFound"
import Loading from "@/components/PresentTheme/Loading"
import useThemeInfo from "@/hooks/useThemeInfo"
import ThemeHero from "@/components/ThemeHeader"
import ThemeProductSection from "@/components/ThemeProductSection"

const ThemeInfoPage = ()=>{

    const { themeId } = useParams<{ themeId: string }>()
    if (!themeId) return <ThemeNotFound/>
    const {theme,loading,error} = useThemeInfo(themeId)
    console.log(theme)

    if (loading)
        return <Loading/>
    if (error)
        return <ThemeNotFound/>
return (
    <div>
        <ThemeHero {...theme}/>
        <ThemeProductSection themeId = {themeId}/>
    </div>
    )
}
export default ThemeInfoPage
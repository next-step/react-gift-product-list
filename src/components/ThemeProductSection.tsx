import useThemeInfo from "@/hooks/useThemeInfo";
import useThemeProduct from "@/hooks/useThemeProduct"

const ThemeProductSection = ({ themeId }: { themeId: string }) => {
    const {themeProducts} =useThemeProduct(themeId)
    console.log(themeId)
    console.log(themeProducts)
    return (<div>hi</div>)
}

export default ThemeProductSection
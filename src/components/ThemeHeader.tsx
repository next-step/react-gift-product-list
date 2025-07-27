import { ThemeInfo } from "@/interfaces/ThemeInfo"
import styled from "@emotion/styled"
import Text from "./Text"
import theme from "@/styles/theme"
import Blank from "./Blank"

const ThemeHeroStyle = styled.div<ThemeInfo>`
    width: auto;
    background-color: ${(props) => props.backgroundColor};
    padding-left: ${theme.space.spacing4};
    padding-right: ${theme.space.spacing4};
    padding-top: ${theme.space.spacing26};
    padding-bottom: ${theme.space.spacing22};
`

const ThemeHero = (data:ThemeInfo)=>{
    console.log(data.title)
    console.log(data.name)
    console.log(data.description)
    console.log(data.backgroundColor)
    return (
    <ThemeHeroStyle {...data}>
        <Text variant="body2Bold" margin="spacing0" padding="spacing0" color="gray00">
            {data.name}
        </Text>
        <Blank height="8px"/>
        <Text variant="title1Bold" margin="spacing0" padding="spacing0" color="gray00">
            {data.title}
        </Text>
        <Blank height="4px"/>
        <Text variant="body1Regular" margin="spacing0" padding="spacing0" color="gray00">
            {data.description}
        </Text>
    </ThemeHeroStyle>
    )
}
export default ThemeHero
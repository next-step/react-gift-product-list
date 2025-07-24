import { useParams } from "react-router-dom";

import { useGetGiftThemeInfo } from "@/features/theme/services/getGiftThemeInfo";

import { VerticalSpacing } from "@/widgets/layouts/Spacing.styled";

import * as Styles from "./ThemeInfoBanner.styled";

export const ThemeInfoBanner = () => {
    const { id } = useParams();
    const { isPending, data } = useGetGiftThemeInfo(Number(id));

    if (isPending || !data) return <VerticalSpacing size="128px" />;

    return (
        <Styles.Container backgroundColor={data.backgroundColor}>
            <Styles.ThemeName>{data.name}</Styles.ThemeName>
            <VerticalSpacing size="8px" />
            <Styles.ThemeTitle>{data.title}</Styles.ThemeTitle>
            <Styles.ThemeDescription>{data.description}</Styles.ThemeDescription>
        </Styles.Container>
    );
};

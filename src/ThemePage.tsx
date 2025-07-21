import { useParams, useNavigate } from "react-router";
import PageContainer from "@/components/PageContainer";
import { useEffect, useState } from "react";
import { getThemeInfo, type ThemeID, type ThemeInfo } from "@/apis/theme";
import { AxiosError, HttpStatusCode } from "axios";
import ThemeHeroSection from "@/sections/ThemeSection/ThemeHeroSection";
import ThemeProductSection from "@/sections/ThemeSection/ThemeProductSection"

export default function ThemePage() {
    const { themeId } = useParams<{ themeId: ThemeID}>();
    const navigate = useNavigate();
    const [themeInfo, setThemeInfo] = useState<ThemeInfo | null>(null);

    useEffect(() => {
        if (!themeId) {
            navigate("/");
            return;
        }

        const fetchData = async () => {
            try {
                const data = await getThemeInfo(themeId);
                setThemeInfo(data);
            } catch (error) {
                if (error instanceof AxiosError && error.response?.status === HttpStatusCode.NotFound) {
                    navigate("/");
                }
            }
        };
        fetchData();
    }, [themeId, navigate]);

    if (!themeInfo || !themeId) return null;

    return (
        <PageContainer>
            <ThemeHeroSection
                name={themeInfo.name}
                title={themeInfo.title}
                description={themeInfo.description}
                backgroundColor={themeInfo.backgroundColor}
            />
            <ThemeProductSection themeId={themeId} />
        </PageContainer>
    );
}
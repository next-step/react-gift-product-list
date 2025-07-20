import { useParams, useNavigate } from "react-router";
import PageContainer from "@/components/PageContainer";
import { useEffect, useState } from "react";
import { getThemeInfo, type ThemeInfo } from "@/apis/theme";
import { AxiosError } from "axios";
import ThemeHeroSection from "@/sections/ThemeSection/ThemeHeroSection";

export default function ThemePage() {
    const { themeId } = useParams();
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
                if (error instanceof AxiosError && error.response?.status === 404) {
                    navigate("/");
                }
            }
        };
        fetchData();
    }, [themeId, navigate]);

    if (!themeInfo) return <PageContainer>상품이 없습니다.</PageContainer>

    return (
        <PageContainer>
            <ThemeHeroSection
                name={themeInfo.name}
                title={themeInfo.title}
                description={themeInfo.description}
                backgroundColor={themeInfo.backgroundColor}
            />
        </PageContainer>
    );
}
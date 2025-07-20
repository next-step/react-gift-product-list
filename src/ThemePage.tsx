import { useParams, useNavigate } from "react-router";
import PageContainer from "@/components/PageContainer";
import { useEffect } from "react";

export default function ThemePage() {
  const { themeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!themeId) {
      navigate("/");
    }
  }, [themeId, navigate]);

  return (
    <PageContainer>
      <h1>Theme Page: {themeId}</h1>
    </PageContainer>
  );
}
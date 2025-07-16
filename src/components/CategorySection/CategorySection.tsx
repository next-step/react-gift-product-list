/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import CategoryItem from "@/components/CategorySection/CategoryItem";
import { useApiRequest } from "@/hooks/useApiRequest";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { API_ENDPOINTS } from "@/utils/API_ENDPOINTS";

type Theme = {
  themeId: number;
  name: string;
  image: string;
};

export default function CategorySection() {
  const { data: themes, status } = useApiRequest<Theme[]>({
    url: API_ENDPOINTS.THEMES,
  });
  const navigate = useNavigate();

  if (status === "loading") return <LoadingSpinner />;
  if (status === "error" || !themes || themes.length === 0) return null;

  const handleClick = (themeId: number) => {
    navigate(`/themes/${themeId}`);
  };

  return (
    <>
      <SectionTitle>선물 테마</SectionTitle>
      <Container>
        {themes.map(({ themeId, name, image }) => (
          <div
            key={themeId}
            onClick={() => handleClick(themeId)}
            style={{ cursor: "pointer" }}
          >
            <CategoryItem name={name} image={image} />
          </div>
        ))}
      </Container>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px 8px;
  padding: 16px 0;
`;

const SectionTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.title1Regular.fontSize};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textDefault};
  padding: 16px 16px;
`;

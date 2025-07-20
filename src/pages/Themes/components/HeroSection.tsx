import Loading from "@/components/common/Loading";
import { ROUTE_PATH } from "@/components/routes/routePath";
import useFetch from "@/hooks/useFetch";
import { showFetchErrorToast } from "@/utils/showFetchToast";
import styled from "@emotion/styled";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface HeroSectionData {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

const HeroSection = () => {
  const navigate = useNavigate();
  const goHome = useCallback(() => navigate(ROUTE_PATH.HOME), [navigate]);
  const { themesId } = useParams();
  const { data, isLoading, error } = useFetch<HeroSectionData>(`/api/themes/${themesId}/info`);

  if (isLoading) {
    return <Loading height="127.2px" />;
  }

  if (error || !data) {
    if (error?.statusCode === 404) {
      showFetchErrorToast(error.statusCode, error.message, goHome);
    } else {
      showFetchErrorToast(error?.statusCode ?? 500, error?.message ?? "잠시 후 다시 시도해주세요.");
    }
    return null;
  }

  return (
    <Container $backgroundColor={data.backgroundColor}>
      <Name>{data.name}</Name>
      <Title>{data.title}</Title>
      <Description>{data.description}</Description>
    </Container>
  );
};

export default HeroSection;

const Container = styled.section<{ $backgroundColor: string }>`
  width: 100%;
  padding: 1.625rem 1rem 1.375rem;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: ${({ theme }) => theme.color.gray100};
`;
const Name = styled.p`
  font: ${({ theme }) => theme.typography.label1Bold};
`;
const Title = styled.h3`
  font: ${({ theme }) => theme.typography.title1Bold};
  margin-top: 0.5rem;
  margin-bottom: 0.2rem;
`;
const Description = styled.p`
  font: ${({ theme }) => theme.typography.body1Regular};
`;

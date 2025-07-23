import LoadingSpinner from '@components/common/LoadingSpinner';
import styled from '@emotion/styled';
import useFetch from '@hooks/useFetch';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ThemeInfo {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

const ThemeHero = ({ id }: { id: string }) => {
  const { data, loading, error } = useFetch<ThemeInfo>(`/themes/${id}/info`);
  console.log(data);

  const navigate = useNavigate();
  useEffect(() => {
    if (error && axios.isAxiosError(error)) {
      const status = error.status;
      if (status === 404) {
        toast.error('해당 테마와 일치하는 데이터가 없습니다.', {
          autoClose: 2000,
          onClose: () => navigate('/'),
        });
      } else {
        toast.error(error.message);
      }
    }
  }, [error, navigate]);

  if (loading) return <LoadingSpinner />;

  return (
    <Banner color={data?.backgroundColor}>
      <Name>{data?.name}</Name>
      <Title>{data?.title}</Title>
      <Description>{data?.description}</Description>
    </Banner>
  );
};

export default ThemeHero;

const Banner = styled.div(({ theme, color }) => ({
  backgroundColor: color,
  color: 'white',
  padding: theme.spacing.spacing6,
}));

const Name = styled.p(({ theme }) => ({
  ...theme.typography.label1Bold,
}));

const Title = styled.h1(({ theme }) => ({
  ...theme.typography.title1Bold,
  margin: `${theme.spacing.spacing2} 0`,
}));

const Description = styled.p(({ theme }) => ({
  ...theme.typography.body1Regular,
}));

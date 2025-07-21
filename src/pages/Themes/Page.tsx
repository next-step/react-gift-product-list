import { useRead } from '@/hooks/useRead';
import { getThemeInfo } from '@/apis/domain/themes/getThemeInfo';
import { useParams } from 'react-router';
import styled from '@emotion/styled';
import { Spinner } from '@/components/common/Spinner';
import { useEffect } from 'react';
import { ROUTE_PATH } from '../Routes';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { ThemeHeroSection } from './components/ThemeHeroSection';
import { ThemeProductListSection } from './components/ThemeProductListSection';

const ThemesPage = () => {
  const navigate = useNavigate();

  const { themeId = '' } = useParams();
  const { data, error, isLoading, isError } = useRead({
    fetch: getThemeInfo,
    initFetchParams: { themeId },
  });

  useEffect(() => {
    if (isError) {
      const message = error?.message;
      if (message) {
        toast.error(message);
      }

      navigate(ROUTE_PATH.HOME);
    }
  }, [isError]);

  if (isLoading || isError)
    return (
      <LoadingWrapper>
        <Spinner size='large' color='kakaoBrown' />
      </LoadingWrapper>
    );

  const themeInfo = data?.data;

  return (
    <Wrapper>
      <ThemeHeroSection themeInfo={themeInfo!} />
      <ThemeProductListSection themeId={themeId} />
    </Wrapper>
  );
};

export default ThemesPage;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 2.75rem);
  display: flex;
  align-items: center;
  justify-content: center;
`;

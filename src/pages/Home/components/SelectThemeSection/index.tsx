import styled from '@emotion/styled';

import { SelectThemeSectionListItem } from './ListItem';
import { Typography } from '@/components/common/Typography';
import { useRead } from '@/hooks/useRead';
import { getThemes } from '@/apis/domain/themes/getThemes';
import { Spinner } from '@/components/common/Spinner';
import { Link } from 'react-router';
import { getPath } from '@/pages/Routes';

export const SelectThemeSection = () => {
  const {
    data: themesData,
    isLoading,
    isError,
  } = useRead({
    fetch: getThemes,
    initFetchParams: {},
  });

  if (isError) return null;

  const themes = themesData?.data ?? [];

  return (
    <Section>
      <TitleWrapper>
        <Typography as='h3' variant='title1Bold' color='default' width='100%'>
          선물 테마
        </Typography>
      </TitleWrapper>
      {isLoading ? (
        <Wrapper>
          <LoadingWrapper>
            <Spinner size='large' color='kakaoBrown' />
          </LoadingWrapper>
        </Wrapper>
      ) : (
        <Wrapper>
          {themes.map((theme) => (
            <Link to={getPath.themes(theme.themeId)} key={theme.themeId}>
              <SelectThemeSectionListItem
                key={theme.themeId}
                label={theme.name}
                image={theme.image}
              />
            </Link>
          ))}
        </Wrapper>
      )}
    </Section>
  );
};

const Section = styled.section(({ theme }) => ({
  padding: `0${theme.spacing.spacing2}`,
}));

const TitleWrapper = styled.div(({ theme }) => ({
  padding: `0 ${theme.spacing.spacing2} ${theme.spacing.spacing5}`,
}));

const Wrapper = styled.div(({ theme }) => ({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: `${theme.spacing.spacing5} ${theme.spacing.spacing1}`,
}));

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 15.625rem;
  grid-column: span 5;
`;

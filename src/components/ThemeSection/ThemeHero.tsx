import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { useThemeInfo } from '@/hooks/useThemeInfo';
import { ERROR_MESSAGES } from '@/constants/validation';
import { loading } from '@/components/common/Loading';

const ThemeHero = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const { themeInfo, error } = useThemeInfo(themeId);

  if (error)
    return <ErrorText>{ERROR_MESSAGES.FAILED_TO_LOAD_THEMES}</ErrorText>;
  if (!themeInfo) return loading;

  return (
    <Section style={{ backgroundColor: themeInfo.backgroundColor }}>
      <TagText>{themeInfo.name}</TagText>
      <Title>{themeInfo.title}</Title>
      {themeInfo.description && (
        <Description>{themeInfo.description}</Description>
      )}
    </Section>
  );
};

export default ThemeHero;

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const TagText = styled.p`
  ${({ theme }) => theme.typography.subtitle.subtitle2Bold};
  color: ${({ theme }) => theme.color.gray[0]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const Title = styled.h5`
  ${({ theme }) => theme.typography.title.title1Bold};
  color: ${({ theme }) => theme.color.gray[0]};
`;

const Description = styled.p`
  ${({ theme }) => theme.typography.body.body1Regular};
  color: ${({ theme }) => theme.color.gray[0]};
  margin-top: ${({ theme }) => theme.spacing[2]};
`;

const ErrorText = styled.p`
  padding: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.color.red[500]};
  text-align: center;
`;

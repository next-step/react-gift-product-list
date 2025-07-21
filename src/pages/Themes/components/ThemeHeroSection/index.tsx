import type { ThemeInfo } from '@/apis/domain/themes/type';
import { HorizontalSpacing } from '@/components/common/Spacing/HorizontalSpacing';
import { Typography } from '@/components/common/Typography';
import styled from '@emotion/styled';

type Props = {
  themeInfo: ThemeInfo;
};

export const ThemeHeroSection = ({ themeInfo }: Props) => {
  const { backgroundColor, name, title, description } = themeInfo;

  return (
    <Wrapper backgroundColor={backgroundColor}>
      <Typography as='p' variant='label1Bold' color='gray100'>
        {name}
      </Typography>
      <HorizontalSpacing size='spacing2' />
      <Typography as='h5' variant='title1Bold' color='gray00'>
        {title}
      </Typography>
      {description && (
        <>
          <HorizontalSpacing size='spacing1' />
          <Typography as='p' variant='body1Regular' color='gray200'>
            {description}
          </Typography>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section<{ backgroundColor: string }>`
  width: 100%;
  padding: 1.625rem 1rem 1.375rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

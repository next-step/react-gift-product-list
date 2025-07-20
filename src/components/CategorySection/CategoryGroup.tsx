import styled from '@emotion/styled';
import CategoryContent from '@/components/CategorySection/CategoryContent';

const CategoryGroup = () => {
  return (
    <Section>
      <TitleWrapper>
        <Title>선물 테마</Title>
      </TitleWrapper>
      <CategoryContent />
    </Section>
  );
};

export default CategoryGroup;

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const TitleWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => `${theme.spacing[0]} ${theme.spacing[1]}`};
`;

const Title = styled.h3`
  ${({ theme }) => theme.typography.title.title1Bold};
`;

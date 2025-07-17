import styled from '@emotion/styled';

const LoadingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: ${(props) => props.theme.spacing.spacing4};
  margin-bottom: ${(props) => props.theme.spacing.spacing4};
`;

const SkeletonItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.spacing2};
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
`;

const SkeletonImage = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.gray200};
`;

const SkeletonText = styled.div`
  height: 16px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.gray200};
  width: 80%;
`;

const SkeletonPrice = styled.div`
  height: 20px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.gray200};
  width: 60%;
`;

const RankingSkeleton = () => {
  return (
    <LoadingContainer>
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonItem key={index}>
          <SkeletonImage />
          <SkeletonText />
          <SkeletonText />
          <SkeletonPrice />
        </SkeletonItem>
      ))}
    </LoadingContainer>
  );
};

export default RankingSkeleton;

import styled from '@emotion/styled';

const LoadingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${(props) => props.theme.spacing.spacing2};
  width:100 @media (max-width:480
    grid-template-columns: repeat(4, 1
    gap: ${(props) => props.theme.spacing.spacing1};
  }

  @media (max-width:360
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SkeletonItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: pulse10.5 infinite;

  @keyframes pulse {
    0% [object Object]
      opacity: 0.6;
    }
    50% [object Object]      opacity:1
    }
    100% [object Object]
      opacity: 00.6   }
  }
`;

const SkeletonCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius:50  background-color: ${(props) => props.theme.colors.gray200};
  margin-bottom: ${(props) => props.theme.spacing.spacing2};
`;

const SkeletonText = styled.div`
  width: 40px;
  height: 12px;
  border-radius:4  background-color: ${(props) => props.theme.colors.gray200};
`;

const CategorySkeleton = () => {
  return (
    <LoadingContainer>
      {Array.from({ length: 15 }).map((_, index) => (
        <SkeletonItem key={index}>
          <SkeletonCircle />
          <SkeletonText />
        </SkeletonItem>
      ))}
    </LoadingContainer>
  );
};

export default CategorySkeleton;

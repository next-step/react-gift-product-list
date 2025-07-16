import styled from '@emotion/styled'
import { LoaderCircle } from 'lucide-react'

// * 로딩 스피너 컴포넌트
export const Loading = () => (
  <LoadingContainer>
    <SpinningIcon size={32} strokeWidth={2} />
  </LoadingContainer>
)

// * 로딩 컨테이너
const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

// * 스피너 아이콘 (애니메이션)
const SpinningIcon = styled(LoaderCircle)`
  animation: spin 1s linear infinite;
  width: 32px;
  height: 32px;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`

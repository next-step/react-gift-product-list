import * as S from './styles';

interface LoadingProps {
  height?: string;
  message?: string;
}

const Loading = ({ height = '100vh', message = 'Loading...' }: LoadingProps) => {
  return (
    <S.Container height={height}>
      <S.Spinner />
      <S.Text>{message}</S.Text>
    </S.Container>
  );
};

export default Loading; 
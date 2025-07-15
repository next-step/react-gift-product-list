import * as S from './styles';

interface ErrorMessageProps {
  height?: string;
  message?: string;
}

const ErrorMessage = ({ height = '100vh', message = 'Error loading data.' }: ErrorMessageProps) => {
  return (
    <S.Container height={height}>
      {message}
    </S.Container>
  );
};

export default ErrorMessage; 
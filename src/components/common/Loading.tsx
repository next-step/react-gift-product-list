import styled from "@emotion/styled";
import Spinner from "@/assets/spinner.gif";

interface LoadingProps {
  height: string;
}
const Loading = ({ height }: LoadingProps) => {
  return (
    <Background height={height}>
      <img alt="Loading..." src={Spinner} width="6%" />
    </Background>
  );
};

export default Loading;

const Background = styled.div<LoadingProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => height};
`;

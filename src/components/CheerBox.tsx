import styled from '@emotion/styled';

const Wrapper = styled.div`
  margin: 16px ${({ theme }) => theme.spacing.spacing4};
  padding: ${({ theme }) => theme.spacing.spacing4};
  background: ${({ theme }) => theme.colors.semantic.kakaoYellow};
  border-radius: 16px;
`;

const SubText = styled.p`
  ${({ theme }) => theme.typography.label2Regular};
  color: ${({ theme }) => theme.colors.gray[700]};
`;

const CheerText = styled.p`
  ${({ theme }) => theme.typography.body2Bold};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
`;

export default function CheerBox() {
  return (
    <Wrapper>
      <SubText>카카오테크 캠퍼스 3기여러분</SubText>
      <CheerText>프론트엔드 2단계 과제 화이팅! 🎉</CheerText>
    </Wrapper>
  );
}

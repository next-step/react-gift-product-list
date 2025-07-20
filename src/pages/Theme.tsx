import { useParams } from 'react-router-dom';
import { useThemeInfo } from '@/hooks/useThemeInfo';
import NavigationBar from '@/common/NavigationBar';
import styled from '@emotion/styled';
import Text from '@/common/Text';

const Theme = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const { themeInfo, loading } = useThemeInfo(themeId ?? '');

  if (loading) return <div>로딩 중...</div>;
  if (!themeInfo) return null;

  return (
    <Layout>
      <NavigationBar />
      <Content backgroundColor={themeInfo?.backgroundColor}>
        <TextLine>
          <Text size="label1" weight="bold" color="#ffffff">
            {themeInfo?.name}
          </Text>
        </TextLine>
        <TextLine>
          <Text size="title1" weight="bold" color="#ffffff">
            {themeInfo?.title}
          </Text>
        </TextLine>
        <Text size="title2" weight="regular" color="#ffffff">
          {themeInfo?.description}
        </Text>
      </Content>
    </Layout>
  );
};

export default Theme;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 44px;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  gap: 24px;
`;
const Content = styled.div<{ backgroundColor?: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor || '#ffffff'};
  width: 100%;
  max-width: 720px;
  padding: 20px;
`;
const TextLine = styled.div`
  margin-bottom: 12px;
`;

import GlobalStyle from '@/styles/global';
import { theme } from '@/theme/theme';
import NavigationBar from '@components/NavigationBar';
import HeroSection from '@components/ThemeProduct/HeroSection';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';

const Wrapper = styled.div(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  WebkitBoxAlign: 'center',
  alignItems: 'center',
  WebkitBoxPack: 'start',
  justifyContent: 'flex-start',
  backgroundColor: theme.semanticColors.background.default,
}));

const Container = styled.div`
  max-width: 720px;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: ${theme.semanticColors.background.default};
  padding-top: 2.75rem;
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
`;
const ThemeProductList = () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Wrapper>
          <NavigationBar />
          <Container>
            <Main>
              <HeroSection />
            </Main>
          </Container>
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

export default ThemeProductList;

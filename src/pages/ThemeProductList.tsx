import GlobalStyle from '@/styles/global';
import { theme } from '@/theme/theme';
import NavigationBar from '@components/NavigationBar';
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

const ThemeProductList = () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Wrapper>
          <NavigationBar />
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

export default ThemeProductList;

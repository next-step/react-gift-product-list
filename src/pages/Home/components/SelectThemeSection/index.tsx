// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ThemeHero } from './ThemeHero';
// import axios, { AxiosResponse, AxiosError } from 'axios';
// import styled from '@emotion/styled';
// import { keyframes } from '@emotion/react';
// import { SelectThemeSectionListItem } from './ListItem';
// import { Typography } from '@/components/common/Typography';

// interface Theme {
//   themeId: number;
//   name: string;
//   image: string;
// }

// export const SelectThemeSection: React.FC = () => {
//   const [themes, setThemes] = useState<Theme[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<boolean>(false);
//   const navigate = useNavigate();

//   const [selectedThemeId, setSelectedThemeId] = useState<number | null>(null);

//   useEffect(() => {
//     axios
//       // 로컬에서 직접 호출하는 경우 절대 URL 사용
//       .get<{ data: Theme[] }>('http://localhost:3000/api/themes')
//       .then((res: AxiosResponse<{ data: Theme[] }>) => {
//         setThemes(res.data.data);
//         setLoading(false);
//       })
//       .catch((err: AxiosError) => {
//         console.error('테마 목록 로드 실패:', err);
//         setError(true);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
      
//       <Section>
//         <SpinWrapper>
//           <Loader />
//         </SpinWrapper>
//       </Section>
//     );
//   }

//   if (error || themes.length === 0) {
//     return null;
//   }

//   return (
//     <Section>
//       <TitleWrapper>
//         <Typography as="h3" variant="title1Bold" color="default" width="100%">
//           선물 테마
//         </Typography>
//       </TitleWrapper>
//       <Wrapper>
//         {themes.map((theme) => (
//           <SelectThemeSectionListItem
//             key={theme.themeId}
//             label={theme.name}
//             image={theme.image}
//             onClick={() => {
//               navigate(`/themes/${theme.themeId}/products`);
//             }}
//           />
//         ))}
//       </Wrapper>
//     </Section>
//   );
// };

// // Spin animation keyframes
// const spin = keyframes`
//   to { transform: rotate(360deg); }
// `;

// // Loader spinner
// const Loader = styled.div`
//   width: 48px;
//   height: 48px;
//   border: 4px solid rgba(0,0,0,0.1);
//   border-top-color: rgba(0,0,0,0.7);
//   border-radius: 50%;
//   animation: ${spin} 1s linear infinite;
// `;

// // Center wrapper for spinner
// const SpinWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 150px;
// `;

// const Section = styled.section(({ theme }) => ({
//   padding: `0 ${theme.spacing.spacing2}`,
// }));

// const TitleWrapper = styled.div(({ theme }) => ({
//   padding: `0 ${theme.spacing.spacing2} ${theme.spacing.spacing5}`,
// }));

// const Wrapper = styled.div(({ theme }) => ({
//   width: '100%',
//   display: 'grid',
//   gridTemplateColumns: 'repeat(5, 1fr)',
//   gap: `${theme.spacing.spacing5} ${theme.spacing.spacing1}`,
// }));
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeHero } from './ThemeHero';
import axios, { AxiosResponse, AxiosError } from 'axios';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { SelectThemeSectionListItem } from './ListItem';
import { Typography } from '@/components/common/Typography';

interface Theme {
  themeId: number;
  name: string;
  image: string;
}

export const SelectThemeSection: React.FC = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  // ① 클릭된 테마 ID를 저장할 state
  const [selectedThemeId, setSelectedThemeId] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<{ data: Theme[] }>('http://localhost:3000/api/themes')
      .then((res: AxiosResponse<{ data: Theme[] }>) => {
        setThemes(res.data.data);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        console.error('테마 목록 로드 실패:', err);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Section>
        <SpinWrapper><Loader /></SpinWrapper>
      </Section>
    );
  }

  if (error || themes.length === 0) {
    return null;
  }

  return (
    <>
      {/* ② selectedThemeId가 세팅되면 Hero 출력 */}
      {selectedThemeId !== null && (
        <ThemeHero themeId={selectedThemeId} />
      )}

      <Section>
        <TitleWrapper>
          <Typography as="h3" variant="title1Bold" color="default">
            선물 테마
          </Typography>
        </TitleWrapper>
        <Wrapper>
          {themes.map((theme) => (
            <SelectThemeSectionListItem
              key={theme.themeId}
              label={theme.name}
              image={theme.image}
              onClick={() => {
                // ③ 클릭 시 hero에 사용할 ID 세팅
                setSelectedThemeId(theme.themeId);
                // (원한다면) 상품 목록 페이지로 이동
                navigate(`/themes/${theme.themeId}/products`);
              }}
            />
          ))}
        </Wrapper>
      </Section>
    </>
  );
};



// Spin animation keyframes
const spin = keyframes`
  to { transform: rotate(360deg); }
`;

// Loader spinner
const Loader = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid rgba(0,0,0,0.1);
  border-top-color: rgba(0,0,0,0.7);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

// Center wrapper for spinner
const SpinWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
`;

const Section = styled.section(({ theme }) => ({
  padding: `0 ${theme.spacing.spacing2}`,
}));

const TitleWrapper = styled.div(({ theme }) => ({
  padding: `0 ${theme.spacing.spacing2} ${theme.spacing.spacing5}`,
}));

const Wrapper = styled.div(({ theme }) => ({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: `${theme.spacing.spacing5} ${theme.spacing.spacing1}`,
}));


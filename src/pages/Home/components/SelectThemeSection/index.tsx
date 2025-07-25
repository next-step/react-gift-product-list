// import styled from '@emotion/styled';
// import { MOCK_THEME_LIST } from './mock';
// import { SelectThemeSectionListItem } from './ListItem';
// import { Typography } from '@/components/common/Typography';

// export const SelectThemeSection = () => {
//   return (
//     <Section>
//       <TitleWrapper>
//         <Typography as='h3' variant='title1Bold' color='default' width='100%'>
//           선물 테마
//         </Typography>
//       </TitleWrapper>
//       <Wrapper>
//         {MOCK_THEME_LIST.map((theme) => (
//           <SelectThemeSectionListItem key={theme.themeId} label={theme.name} image={theme.image} />
//         ))}
//       </Wrapper>
//     </Section>
//   );
// };

// const Section = styled.section(({ theme }) => ({
//   padding: `0${theme.spacing.spacing2}`,
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
import axios, { AxiosResponse, AxiosError } from 'axios';
import styled from '@emotion/styled';
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

  useEffect(() => {
    axios
      // 로컬에서 직접 호출하는 경우 절대 URL 사용
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
        <Typography as="p" variant="body1Regular" color="default">
          로딩 중…
        </Typography>
      </Section>
    );
  }

  if (error || themes.length === 0) {
    return null;
  }

  return (
    <Section>
      <TitleWrapper>
        <Typography as="h3" variant="title1Bold" color="default" width="100%">
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
              // 클릭 시 상세 페이지 이동 또는 상품 조회 로직 추가
            }}
          />
        ))}
      </Wrapper>
    </Section>
  );
};

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

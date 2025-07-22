import { fetchThemesInfo } from "@/api/themesInfo";
import styled from "@emotion/styled";
import type { ThemeInfo } from "@/types/theme";
import useApiRequest from "@/hooks/useApiRequest";
import { useCallback } from "react";

type ThemesInfoProps = {
  id: string | undefined;
};

const ThemesInfo = ({ id }: ThemesInfoProps) => {
  const requestFn = useCallback(
    () => fetchThemesInfo({ themeId: Number(id) }),
    [id],
  );

  const {
    data: themeInfoData,
    isLoading,
    isError,
  } = useApiRequest<ThemeInfo>({
    requestFn,
  });

  if (!themeInfoData && isLoading && !isError) {
    return null;
  }

  return (
    <InfoSection backgroundColor={themeInfoData?.backgroundColor}>
      {themeInfoData && (
        <>
          <NameP>{themeInfoData.name}</NameP>
          <TitleH5>{themeInfoData.title}</TitleH5>
          <DescriptionP>{themeInfoData.description}</DescriptionP>
        </>
      )}
    </InfoSection>
  );
};

export default ThemesInfo;

const InfoSection = styled.section<{ backgroundColor?: string }>`
  margin: 0px;
  padding: ${({ theme }) =>
    `${theme.spacing.spacing7} ${theme.spacing.spacing4} ${theme.spacing.spacing6}`};
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor || theme.colors.semantic.background.default};
`;

const NameP = styled.p`
  font-size: ${({ theme }) => theme.typography.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Bold.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray100};
`;

const TitleH5 = styled.h5`
  margin: ${({ theme }) =>
    `${theme.spacing.spacing2} 0 ${theme.spacing.spacing1}`};
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title1Bold.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray00};
`;

const DescriptionP = styled.p`
  margin: 0px;
  padding: 0px;
  font-size: ${({ theme }) => theme.typography.subtitle1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.subtitle1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.subtitle1Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray200};
`;

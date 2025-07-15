import type { ThemeType } from "@/types/theme";
import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { SectionContainer, SectionTitle } from "../../Common/SectionLayout";
import { getThemes } from "@/api/themes";
import styled from "@emotion/styled";
import ThemeItem from "./ThemeItem";
import { ClipLoader } from "react-spinners";

const ThemeSection = () => {
  const [themes, setThemes] = useState<ThemeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const res = await getThemes();
        setThemes(res.data.data);
      } catch (err) {
        console.error(err);
        setError("에러");
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  if (error) {
    return <></>;
  }

  return (
    <SectionContainer>
      <SectionTitle>선물 테마</SectionTitle>
      {loading ? (
        <ClipLoader
          color="#000000"
          loading={loading}
          cssOverride={override}
          size={35}
          data-testid="loader"
        />
      ) : (
        <ThemeGrid>
          {themes.map((t) => (
            <ThemeItem key={t.themeId} name={t.name} image={t.image} />
          ))}
        </ThemeGrid>
      )}
    </SectionContainer>
  );
};

export default ThemeSection;

const ThemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing4};
  margin-top: ${({ theme }) => theme.spacing.spacing4};
`;

const override: CSSProperties = {
  display: "block",
  margin: "100px auto",
};

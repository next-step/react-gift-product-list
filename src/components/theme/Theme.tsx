import { useRequestHandler } from "@/hooks/useRequestHandler";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routePath";

type ThemeInfo = {
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
};

const Theme = () => {
  const { themeId } = useParams();
  const { fetchData } = useRequestHandler();
  const [themeInfo, setThemeInfo] = useState<ThemeInfo | null>(null);
  const navigate = useNavigate();
  const { MAIN } = ROUTE_PATHS;

  useEffect(() => {
    fetchData({
      fetcher: () =>
        axios.get(`${import.meta.env.VITE_API_BASE_URL_THEME}/${themeId}/info`),
      onSuccess: (data) => {
        setThemeInfo(data.data.data);
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          if (status == 404) {
            navigate(MAIN);
          }
        }
      },
    });
  }, [themeId]);

  if (!themeInfo) {
    return (
      <div css={spinnerWrapperStyle}>
        <ClipLoader color="#333" size={40} />
      </div>
    );
  }

  return (
    <div css={themeHeroAreaStyle(themeInfo.backgroundColor)}>
      <h3>{themeInfo.name}</h3>
      <h2>{themeInfo.title}</h2>
      <p>{themeInfo.description}</p>
    </div>
  );
};

export default Theme;

const spinnerWrapperStyle = css`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const themeHeroAreaStyle = (backgroundColor: string) => css`
  background-color: ${backgroundColor};
  padding: 20px;
  color: #fff;
`;

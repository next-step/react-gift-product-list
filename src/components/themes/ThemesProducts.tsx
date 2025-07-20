import { fetchThemesProducts } from "@/api/themesProducts";
import useApiRequest from "@/hooks/useApiRequest";
import { useCallback, useEffect } from "react";

type ThemesProductsProps = {
  id: string | undefined;
};

const ThemesProducts = ({ id }: ThemesProductsProps) => {
  const requestFn = useCallback(
    () => fetchThemesProducts({ themeId: Number(id) }),
    [id],
  );
  const {
    data: themeProductsData,
    isError,
    isLoading,
  } = useApiRequest({
    requestFn,
  });

  useEffect(() => {
    if (!themeProductsData && !isLoading && isError) {
      console.error("Failed to fetch theme products");
    }
  }, [themeProductsData, isError, isLoading]);

  return (
    <div>
      {themeProductsData && (
        <ul>
          {themeProductsData.list.map(product => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThemesProducts;

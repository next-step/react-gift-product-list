import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getRankingProduct } from "@/api/product";
import type { ProductType } from "@/types";
import { TAB_DATA, TAGS } from "@/constants";
import { parseUrlParam } from "@/utils";
import { useApiStatus } from "@/hooks/common/useApiStatus";

export const useRankingProducts = () => {
  const [searchParams] = useSearchParams();
  const {
    data: products,
    loading,
    error,
    execute,
  } = useApiStatus<ProductType[]>();
  const selectedTag = parseUrlParam(
    searchParams.get("targetType"),
    TAGS,
    "ALL",
  );
  const selectedTab = parseUrlParam(
    searchParams.get("rankType"),
    TAB_DATA,
    "MANY_WISH",
  );
  useEffect(() => {
    execute(() =>
      getRankingProduct({
        targetType: selectedTag,
        rankType: selectedTab,
      }),
    );
  }, [execute, selectedTab, selectedTag]);

  return {
    products: products || [],
    loading,
    error,
    isEmpty: products?.length === 0,
  };
};

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getRankingProduct } from "@/api/product";
import type { ProductType } from "@/types";
import type {
  RankingRankType,
  RankingTargetType,
} from "@/api/product/get-ranking-products";

export const useRankingProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  const selectedTag: RankingTargetType = (searchParams.get("targetType") ||
    "ALL") as RankingTargetType;
  const selectedTab: RankingRankType = (searchParams.get("rankType") ||
    "MANY_WISH") as RankingRankType;

  useEffect(() => {
    const fetchRankingProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getRankingProduct({
          targetType: selectedTag as RankingTargetType,
          rankType: selectedTab as RankingRankType,
        });

        setProducts(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "데이터를 불러오는 중 오류가 발생했습니다.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRankingProducts();
  }, [selectedTag, selectedTab]);

  return {
    products,
    loading,
    error,
    isEmpty: products.length === 0,
  };
};

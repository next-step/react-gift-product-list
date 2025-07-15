import { useEffect, useState } from "react";
import {
  fetchProductRanking,
  type Product,
  type RankType,
  type TargetType,
} from "@/api/product";
import { ERROR_MESSAGES } from "@/constants/messages";

export const useProductRanking = (
  targetType: TargetType,
  rankType: RankType,
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProductRanking(targetType, rankType);
        setProducts(data);
      } catch {
        setError(ERROR_MESSAGES.PRODUCT.FAIL_TO_LOAD);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [targetType, rankType]);

  return { products, loading, error };
};

import { useEffect, useState } from "react";
import { type ProductSummary, fetchProductSummary } from "@/api/product";
import { ERROR_MESSAGES } from "@/constants/messages";

export const useProductSummary = (productId: number | undefined) => {
  const [product, setProduct] = useState<ProductSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    (async () => {
      try {
        const data = await fetchProductSummary(productId);
        setProduct(data);
      } catch {
        setError(ERROR_MESSAGES.PRODUCT.FAIL_TO_LOAD);
      } finally {
        setLoading(false);
      }
    })();
  }, [productId]);

  return { product, loading, error };
};

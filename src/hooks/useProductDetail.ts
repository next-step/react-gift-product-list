import { useEffect, useState } from "react";
import { fetchProductById } from "@/api/product";
import type { Product } from "@/api/product";
import { ERROR_MESSAGES } from "@/constants/messages";

export const useProductDetail = (productId: number | undefined) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    (async () => {
      try {
        const data = await fetchProductById(productId);
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

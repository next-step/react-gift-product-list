import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductInfo } from "@/data/api";
import type { ProductInfoSummary } from "../components/ProductInfo/ProductInfo";

export function useProductInfo(): {
  product: ProductInfoSummary | null;
  loading: boolean;
} {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductInfoSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setProduct(null);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await getProductInfo(id);
        setProduct(productData);
      } catch (error) {
        console.error("상품 없음:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading };
}

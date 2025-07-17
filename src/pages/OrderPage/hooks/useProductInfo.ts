import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductInfo } from "@/data/api";
import type { ProductInfoSummary } from "@/types/ProductInfoSummary";
import { toast } from "react-toastify";
import { ROUTES } from "@/constants/routes";
import { AxiosError } from "axios";

export function useProductInfo(): {
  product: ProductInfoSummary | null;
  loading: boolean;
} {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductInfoSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        if (error instanceof AxiosError) {
          const errorStatus = error.response?.status;

          if (errorStatus && errorStatus >= 400 && errorStatus < 500) {
            toast.error("현재 없는 상품입니다");
          }

          setProduct(null);
          navigate(ROUTES.HOME);
        }
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  return { product, loading };
}

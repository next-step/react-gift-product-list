import { useCallback, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  PRODUCT_SUMMARY_CODE,
  fetchProductSummary
} from "@src/apis/BackEnd/apiList";
import useFetchState from "@src/hooks/useFetchState";
import PendingSpinner from "@src/components/shared/PendingSpinner";
import OrderForm from "@src/components/OrderPanels/OrderForm";
import ToastContext from "@src/contexts/ToastContext";

export type ProductData = {
  imageURL: string;
  id: number;
  name: string;
  brandName: string;
  price: number;
};

function OrderPage() {
  const toastContext = useContext(ToastContext);
  const navigate = useNavigate();
  const productId = useParams().id ?? "";
  const update = useCallback(async () => {
    const response = await fetchProductSummary(productId);
    return response;
  }, [productId]);

  const productData = useFetchState<ProductData>(update);

  useEffect(() => {
    if (
      productData.status === "error" &&
      productData.error?.status === PRODUCT_SUMMARY_CODE.NO_PRODUCT
    ) {
      toastContext?.message.setValue(productData.error.message);
      navigate(`/`);
    }
  }, [productData.status]);

  return (
    <>
      {productData.status === "pending" && <PendingSpinner />}
      {productData.status === "done" && (
        <OrderForm productData={productData.data!} />
      )}
    </>
  );
}

export default OrderPage;

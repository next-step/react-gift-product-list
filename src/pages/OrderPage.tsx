import { useCallback, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductSummary } from "@src/apis/BackEnd/apiList";
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
    const response = await fetchProductSummary(productId + 1);
    if (!response) {
      console.error("fetchProductSummary에 실패하였습니다.");
      return;
    }

    if (response.status >= 400 && response.status < 500) {
      toastContext?.message.setValue(response.data.data.message);
      navigate(`/`);
      return;
    }

    return response;
  }, [productId]);

  const productData = useFetchState<ProductData>(update);

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

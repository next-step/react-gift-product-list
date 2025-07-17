import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrder } from "@/api/order";
import type { OrderRequest } from "@/api/order";

export const useOrder = () => {
  const navigate = useNavigate();

  const submitOrder = async (payload: OrderRequest) => {
    try {
      await createOrder(payload);

      toast.success("주문이 완료되었습니다!");
      navigate("/");
    } catch (error) {
      toast.error(String(error));
    }
  };

  return { submitOrder };
};

import { client } from "./client";
import type { OrderFormValues } from "@/validations/orderSchema";

export const postCreateOrder = async (
  form: OrderFormValues,
  productId: number,
  token: string
) => {
  return client.post(
    "/api/order",
    {
      productId,
      message: form.message,
      senderName: form.senderName,
      selectedCardId: form.selectedCardId,
      receivers: form.receivers.map((r) => ({
        name: r.name,
        phoneNumber: r.phone,
        quantity: r.quantity,
      })),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


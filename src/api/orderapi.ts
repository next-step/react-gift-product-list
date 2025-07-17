import { client } from "./client";
import type { OrderFormValues } from "@/validations/orderSchema";

export const createOrder = async (
  form: OrderFormValues,
  productId: number,
  token: string
): Promise<void> => {
  const payload = {
    productId,
    message: form.message,
    messageCardId: String(form.selectedCardId), 
    ordererName: form.senderName,
    receivers: form.receivers.map((r) => ({
      name: r.name,
      phoneNumber: r.phone, 
      quantity: r.quantity,
    })),
  };


  await client.post("/api/order", payload, {
    headers: {
      Authorization: token,
    },
  });
};

export type DeliveryType = "tbilisi" | "region";

export interface CreateOrderItemPayload {
  productId: string;
  quantity: number;
}

export interface CreateOrderPayload {
  name: string;
  surname: string;
  personalId: string;
  phone: string;
  address: string;
  deliveryType: DeliveryType;
  items: CreateOrderItemPayload[];
  userId?: string;
}

export interface OrderResponse {
  _id: string;
  status: "pending" | "failed" | "paid";
  total: number;
}

export interface CreatePaymentResponse {
  response?: {
    url?: string;
    checkout_url?: string;
  };
  url?: string;
  checkout_url?: string;
}

export interface OrderStatusResponse {
  status: "pending" | "failed" | "paid";
}


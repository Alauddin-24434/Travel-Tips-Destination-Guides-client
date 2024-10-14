import { TUser } from ".";

export interface IPayment {
  _id: string;
  user: TUser;
  amount: number;
  paymentMethod?: string;
  status: "Active" | "Expired";
  transactionId: string;
  planTitle: string;
  planPrice: number;
  expiryDate: Date;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

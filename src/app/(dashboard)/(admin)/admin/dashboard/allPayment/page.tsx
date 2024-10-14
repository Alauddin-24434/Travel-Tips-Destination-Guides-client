"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Chip } from "@nextui-org/chip";
import { Avatar } from "@nextui-org/avatar";
import { format } from "date-fns";
import Loading from "@/components/ui/Loading";
import { useGetAllPaymentQuery } from "@/redux/features/payment/paymentApi";
import { IPayment } from "@/types/payment.type";



const columns = [
  { name: "NAME", uid: "name" },
  { name: "PAYMENT AMOUNT", uid: "amount" },
  { name: "TRANSACTION ID", uid: "transactionId" },
  { name: "PLAN TITLE", uid: "planTitle" },
  { name: "EXPIRY DATE", uid: "expiryDate" },
  { name: "STATUS", uid: "paymentStatus" },
];

const PaymentHistory = () => {
  const { data: getAllPayment, isLoading: paymentLoading } =
    useGetAllPaymentQuery(undefined);

  const payments: IPayment[] = getAllPayment?.data || [];

  const renderCell = (payment: IPayment, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-2">
            <Avatar src={payment.user?.profileImage}>
              {payment.user?.name}
            </Avatar>
            <p className="text-xs">{payment.user?.name}</p>
          </div>
        );
      case "amount":
        return <p className="text-xs">${payment?.amount}</p>;
      case "transactionId":
        return <p className="text-xs">{payment?.transactionId}</p>;
      case "planTitle":
        return <p className="text-xs">{payment?.planTitle}</p>;
      case "expiryDate":
        return (
          <p className="text-xs">
            {" "}
            {format(new Date(payment?.createdAt), "MMM dd, yyyy")}
          </p>
        );
      case "paymentStatus":
        return (
          <Chip
            className="text-white"
            color={payment?.status === "Active" ? "success" : "danger"}
            size="sm"
          >
            {payment?.status}
          </Chip>
        );
      default:
        return <p>N/A</p>;
    }
  };

  if (paymentLoading) {
    return <Loading />;
  }

  if (payments.length === 0) {
    return (
      <div className="text-3xl font-semibold text-center">
        No Payment History Available
      </div>
    );
  }

  return (
    <>
      <div className=" max-w-full overflow-x-auto pt-16">
        <Table
          aria-label="All Users Payment History"
          classNames={{
            base: "min-w-[640px]",
            table: "min-w-full",
            th: "bg-default-100 text-default-800 py-3 px-4",
            td: "py-3 px-4",
          }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={payments}>
            {(payment) => (
              <TableRow key={payment._id}>
                {(columnKey) => (
                  <TableCell>{renderCell(payment, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default PaymentHistory;

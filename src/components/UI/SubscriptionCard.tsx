"use client";

import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { useCreatePaymentMutation } from "@/redux/features/payment/paymentApi";
import { useAppSelector } from "@/redux/hook";
import { useCurrentUser } from "@/redux/features/auth/authSlice";

interface SubscriptionCardProps {
  title: string;
  price: string;
  features: string[];
  expiry: string;
  isAvailable: boolean; // Corrected typo from isAvailavle
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  title,
  price,
  features,
  expiry,
  isAvailable, // Use isAvailable for logic
}) => {
  const [createPayment] = useCreatePaymentMutation();
  const user = useAppSelector(useCurrentUser);

  const handlePayment = async () => {
    const subscriptionData = {
      user: user?._id,
      title,
      price,
      expiry,
    };

    const res = await createPayment(subscriptionData);

    if (res) {
      window.location.href = res?.data?.data?.payment_url;
    }
  };

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xs"
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      whileHover={isAvailable ? { scale: 1.05 } : {}} // Only scale if available
    >
      <Card className="w-full" shadow="lg">
        <CardHeader className="flex flex-col items-center pb-0 pt-2 px-4">
          <h2 className="text-2xl font-bold text-[#1CD15D]">{title}</h2>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <div className="flex justify-center items-baseline my-8">
            <span className="text-5xl font-extrabold">${price}</span>
            <span className="text-xl text-default-500 ml-1">/{expiry}</span>
          </div>
          <ul className="space-y-4 mb-6">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -50 }}
                transition={{ delay: index * 0.1 }}
              >
                <FaCheck className="text-[#1CD15D]" />
                <span className="break-words"> {feature}</span>
              </motion.li>
            ))}
          </ul>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            className={`w-full ${isAvailable ? 'bg-[#1CD15D]' : 'bg-gray-400 cursor-not-allowed'}`}
            color="primary"
            size="lg"
            onClick={handlePayment}
            disabled={!isAvailable} // Disable button if not available
          >
            {isAvailable ? "Subscribe Now" : "Not Available"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SubscriptionCard;

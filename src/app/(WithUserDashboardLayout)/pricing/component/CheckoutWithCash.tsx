"use client";

import { Card, Typography, Button } from "antd";
import { useAppDispatch } from "@/redux/hooks";
import { setSubscriptionPlan } from "@/redux/features/subscription/subscriptionSlice";
import { useState } from "react";

const { Title, Text } = Typography;

const CheckoutWithCash = ({ amount }: { amount: number }) => {
  const dispatch = useAppDispatch();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirmCashPayment = () => {
    // Here, you could add additional logic like sending a confirmation to the server if needed.
    dispatch(setSubscriptionPlan("Premium"));
    setIsConfirmed(true);
  };

  return (
    <Card bordered style={{ textAlign: "center", marginTop: 16 }}>
      <Title level={4}>Cash Payment</Title>
      <Text>
        You have chosen to pay ${amount} by cash. Please visit our office or wait for our representative to contact you
        for further instructions.
      </Text>

      {isConfirmed ? (
        <Text style={{ display: "block", marginTop: 16, color: "#52c41a" }}>
          Your upgrade request has been confirmed. Please complete the payment at the earliest.
        </Text>
      ) : (
        <Button
          type="primary"
          onClick={handleConfirmCashPayment}
          style={{ marginTop: 16 }}
        >
          Confirm Cash Payment
        </Button>
      )}
    </Card>
  );
};

export default CheckoutWithCash;

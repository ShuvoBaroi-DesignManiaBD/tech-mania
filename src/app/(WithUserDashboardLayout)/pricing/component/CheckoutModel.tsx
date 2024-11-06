"use client";
import TokenProvider from "@/lib/providers/antDesign/TokenProvider";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Elements } from "@stripe/react-stripe-js";
import { List, Modal, Radio, Typography } from "antd";
import Title from "antd/es/typography/Title";
import CheckoutPage from "./CheckoutPage";
import SSLCommerzCheckout from "./CheckoutSSL";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
  }
  
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CheckoutModel = ({isModalVisible, setIsModalVisible}:{isModalVisible: boolean, setIsModalVisible: CallableFunction}) => {
    const premiumAmount = 20;
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
    
    const handlePaymentSelect = (e: any) => {
        setSelectedPaymentMethod(e.target.value);
      };
      const premiumPlanFeatures = [
        "Verified badge",
        "Unlimited post submissions",
        "Access to all features",
        "View all user profiles"
      ];
    return (
        <Modal
        title={<Typography.Title level={2} style={{ color: TokenProvider().colorPrimary, textAlign: "center" }}>Upgrade to Premium</Typography.Title>} // {"Upgrade to Premium Plan"}
        visible={isModalVisible}
        styles={{body: {padding: 12}}}
        // onOk={handleUpgrade}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        // okText="Confirm Upgrade"
        // cancelText="Cancel"
        okButtonProps={{ disabled: !selectedPaymentMethod }}
      >
        <p className="text-center mb-8">Upgrade to Premium for $20/month and enjoy:</p>
        <List
          dataSource={premiumPlanFeatures}
          className="!mb-6"
          renderItem={(item) => (
            <List.Item>
              <CheckCircleOutlined style={{ color: "#faad14", marginRight: 8 }} />
              {item}
            </List.Item>
          )}
        />
        <Title level={5} className="!mb-4">Select Payment Method:</Title>
        <Radio.Group onChange={handlePaymentSelect} value={selectedPaymentMethod}>
          <Radio value="Stripe">Stripe</Radio>
          <Radio value="SSLCommerz">SSLCommerz</Radio>
          {/* <Radio value="Cash on Delivery">Cash on Delivery</Radio> */}
        </Radio.Group>

        {selectedPaymentMethod === "Stripe" && (
          <Elements stripe={stripePromise} options={{ mode: "payment", amount: convertToSubcurrency(premiumAmount), currency: "usd" }}>
            <CheckoutPage amount={premiumAmount} />
          </Elements>
        )}

        {selectedPaymentMethod === "SSLCommerz" && (
          <SSLCommerzCheckout amount={premiumAmount} currency="USD" />
        )}
      </Modal>
    );
};

export default CheckoutModel;
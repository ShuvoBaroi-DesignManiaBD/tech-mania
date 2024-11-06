"use client";

import { Card, Button, Col, Row, Typography, Modal, Radio, List } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSubscriptionPlan, selectCurrentPlan } from "@/redux/features/subscription/subscriptionSlice";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import TokenProvider from "@/lib/providers/antDesign/TokenProvider";
import dynamic from "next/dynamic";
import envConfig from "@/config";
import { selectCurrentUserData } from "@/redux/features/auth/authSlice";

const CheckoutPage = dynamic(() => import("./component/CheckoutPage").then((mod) => mod.default), { ssr: false });
const SSLCommerzCheckout = dynamic(() => import("./component/CheckoutSSL").then((mod) => mod.default), { ssr: false });

const { Title, Text } = Typography;


if (!envConfig.stripe_public_key) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(envConfig.stripe_public_key as string);

const PricingPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const currentUserData = useAppSelector(selectCurrentUserData);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const currentPlan = useAppSelector(selectCurrentPlan);
  const colorText = TokenProvider()?.colorText;

  const premiumAmount = 20;

  const handleSelectPlan = (plan: "Free" | "Premium") => {
    if (plan === "Premium") {
      setIsModalVisible(true);
    } else {
      dispatch(setSubscriptionPlan("Free"));
    }
  };

  const handlePaymentSelect = (e: any) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleUpgrade = () => {
    if (selectedPaymentMethod) {
      dispatch(setSubscriptionPlan("Premium"));
      setIsModalVisible(false);
    }
  };

  const freePlanFeatures = [
    "Submit up to 3 posts",
    "Follow up to 3 users",
    "No access to advanced features",
    "Cannot view verified user profiles"
  ];

  const premiumPlanFeatures = [
    "Verified badge",
    "Unlimited post submissions",
    "Access to all features",
    "View all user profiles"
  ];

  return (
    <div className="pricing-page-container">
      <Title level={2} className="text-center mb-8">Choose Your Plan</Title>
      <Row gutter={24} justify="center">
        <Col xs={24} sm={12} md={8}>
          <Card title="Free Plan" bordered>
            <div style={{ textAlign: "left" }}>
              <Title level={3} style={{ textAlign: "left" }}>$0 / month</Title>
              <Text style={{ textAlign: "left", display: "block" }}>Basic features for individuals.</Text>
              <List
                dataSource={freePlanFeatures}
                renderItem={(item) => (
                  <List.Item style={{ textAlign: "left" }}>
                    <CheckCircleOutlined style={{ color: "#52c41a", marginRight: 8 }} />
                    {item}
                  </List.Item>
                )}
              />
              <Button
                type={currentUserData?.verified === false ? "default" : "primary"}
                disabled={currentUserData?.verified === false}
                onClick={() => handleSelectPlan("Free")}
                style={{ marginTop: "16px", width: "100%" }}
              >
                {currentUserData?.verified === false ? "Current Plan" : "Select Free Plan"}
              </Button>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card title="Premium Plan" bordered>
            <div style={{ textAlign: "left" }}>
              <Title level={3} style={{ textAlign: "left" }}>$20 / month</Title>
              <Text style={{ textAlign: "left", display: "block" }}>Advanced features for professionals.</Text>
              <List
                dataSource={premiumPlanFeatures}
                renderItem={(item) => (
                  <List.Item style={{ textAlign: "left" }}>
                    <CheckCircleOutlined style={{ color: "#faad14", marginRight: 8 }} />
                    {item}
                  </List.Item>
                )}
              />
              <Button
                type={currentUserData?.verified === true  ? "default" : "primary"}
                disabled={currentUserData?.verified === true }
                onClick={() => handleSelectPlan("Premium")}
                style={{ marginTop: "16px", width: "100%", backgroundColor: currentUserData?.verified === true  ? TokenProvider().colorBgBlur : TokenProvider().colorPrimary}}
              >
                {currentUserData?.verified === true ? "Current Plan" : "Upgrade to Premium"}
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

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
          <Radio value="Cash on Delivery">Cash on Delivery</Radio>
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
    </div>
  );
};

export default PricingPage;

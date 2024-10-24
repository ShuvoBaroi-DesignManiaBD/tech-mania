"use client";
import { Card, Button, Col, Row, Typography } from "antd";
// import { useAppSelector } from "@/redux/hooks";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks"; // Assuming Redux is used for managing state
// import { setSubscriptionPlan } from "@/redux/features/subscriptionSlice"; // An example action to set subscription plan

const { Title, Text } = Typography;

/**
 * PricingPage component displaying Free and Premium plans.
 */
const PricingPage = () => {
//   const dispatch = useAppDispatch();
//   const currentPlan = useAppSelector(selectCurrentPlan); // Get the current plan from the Redux store

  // Function to handle selecting a plan
//   const handleSelectPlan = (plan: string) => {
//     dispatch(setSubscriptionPlan(plan)); // Assuming an action to set subscription
//   };

  return (
    <div className="pricing-page-container">
      <Title level={2} className="text-center mb-8">Choose Your Plan</Title>
      <Row gutter={24} justify="center">
        {/* Free Plan */}
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Free Plan"
            bordered
            style={{ textAlign: "center" }}
          >
            <Title level={3}>$0 / month</Title>
            <Text>Basic features for individuals.</Text>
            <ul className="plan-features">
              <li>Access to free content</li>
              <li>Basic support</li>
              <li>Limited storage</li>
            </ul>
            <Button
              type='default'
            //   type={currentPlan === "Free" ? "default" : "primary"}
            //   disabled={currentPlan === "Free"}
              disabled={true}
            //   onClick={() => handleSelectPlan("Free")}
            >
              {/* {currentPlan === "Free" ? "Current Plan" : "Select Free Plan"} */}
              Current Plan
            </Button>
          </Card>
        </Col>

        {/* Premium Plan */}
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Premium Plan"
            bordered
            style={{ textAlign: "center" }}
          >
            <Title level={3}>$29.99 / month</Title>
            <Text>Advanced features for professionals.</Text>
            <ul className="plan-features">
              <li>Access to all premium content</li>
              <li>Priority support</li>
              <li>Unlimited storage</li>
            </ul>
            <Button
              type="default"
            //   type={currentPlan === "Premium" ? "default" : "primary"}
            //   disabled={currentPlan === "Premium"}
              disabled={false}
            //   onClick={() => handleSelectPlan("Premium")}
            >
              "Upgrade to Premium"
              {/* {currentPlan === "Premium" ? "Current Plan" : "Upgrade to Premium"} */}
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PricingPage;

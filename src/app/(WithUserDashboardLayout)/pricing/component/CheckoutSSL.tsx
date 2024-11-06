// component/SSLCommerzCheckout.tsx
import { useState } from "react";
import { Button, Spin, Alert } from "antd";
import { navigate } from "@/actions/navigate";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUserData } from "@/redux/features/auth/authSlice";

interface SSLCommerzCheckoutProps {
  amount: number;
  currency: string;
}

const SSLCommerzCheckout: React.FC<SSLCommerzCheckoutProps> = ({ amount, currency }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentUser = useAppSelector(selectCurrentUserData);

  const paymentData = {
    method: 'SSL',
    subscriptionStatus: 'active',
    subscriptionStartDate: new Date(),
    subscriptionEndDate: new Date(),
    cardInfo: null,
  };


  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/create-ssl-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency, data: paymentData, userId: currentUser?._id }),
      });
      const data = await response.json();
      console.log(data);
      
      if (data && data.url) {
        // Redirect to SSLCommerz payment gateway page
        // window.location.href = data.url;
        return navigate(data?.url)
      } else {
        throw new Error("Failed to initiate SSLCommerz payment.");
      }
    } catch (error) {
      setError("Error initiating payment. Please try again.");
      console.error("SSLCommerz payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 space-y-4">
      {error && <Alert message={error} type="error" showIcon />}
      <p>Total amount: ${amount}</p>
      <Button type="primary" onClick={handlePayment} disabled={loading}>
        {loading ? <Spin /> : "Proceed with SSLCommerz"}
      </Button>
    </div>
  );
};

export default SSLCommerzCheckout;

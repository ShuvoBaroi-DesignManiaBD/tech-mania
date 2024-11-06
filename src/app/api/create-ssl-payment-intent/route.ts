import envConfig from "@/config";
import { useVerifyAUserMutation as verifyAUserMutation } from "@/redux/features/users/userApi";
import { SslCommerzPayment } from "sslcommerz";

export async function POST(req: Request) {
  console.log("req ===>", envConfig.SSL_STORE_ID, envConfig.SSL_STORE_PASSWORD);

  const TXNId = `TXN-${Date.now()}`;
  // const TXNId = `${Date.now()}`
  const sslcz = new SslCommerzPayment(
    envConfig.SSL_STORE_ID,
    envConfig.SSL_STORE_PASSWORD,
    false
  );

  const { amount, currency, data, userId } = await req.json();
  const [verifyAUser] = verifyAUserMutation();
  console.log(amount, currency);

  const transactionData = {
    total_amount: amount || 20,
    currency: "USD",
    tran_id: TXNId,
    success_url: `${envConfig.siteURL}/payment-success?gateway=sslcommerz&payment_intent=${TXNId}`,
    fail_url: `${envConfig.siteURL}/api/sslcommerz/fail`, // Update BASE_URL reference
    cancel_url: `${envConfig.siteURL}/api/sslcommerz/cancel`,
    ipn_url: `http://localhost:3030/ipn`, // Replace with your actual IPN URL in production
    product_name: "Premium Subscription",
    product_category: "Subscription",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "Customer Address",
    cus_city: "Dhaka",
    cus_postcode: "1212",
    cus_country: "Bangladesh",
    cus_phone: "01234567890",
    shipping_method: "Courier",
    ship_name: "N/A",
    ship_add1: "order.address?.street",
    ship_add2: "N/A",
    ship_city: "order.address?.city",
    ship_state: "order.address?.city",
    ship_postcode: "order.address?.zip",
    ship_country: "order.address?.country",
  };

  try {
    const response = await sslcz.init(transactionData);
    console.log(response, response?.redirectGatewayURL, response?.GatewayPageURL);

    if (response?.GatewayPageURL) {
      await verifyAUser({userId: userId, updatedData: data});
      return new Response(JSON.stringify({ url: response.GatewayPageURL }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ error: "Gateway URL not found" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Payment initialization error:", error);
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

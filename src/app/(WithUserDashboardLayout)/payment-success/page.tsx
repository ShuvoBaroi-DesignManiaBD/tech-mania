// export default function PaymentSuccess({
//     searchParams: { amount },
//   }: {
//     searchParams: { amount: string };
//   }) {
//     return (
//       <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
//         <div className="mb-10">
//           <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
//           <h2 className="text-2xl">You successfully sent</h2>

//           <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
//             ${amount}
//           </div>
//         </div>
//       </main>
//     );
//   }

// app/payment-success/page.js
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const [paymentVerified, setPaymentVerified] = useState<undefined | boolean>(undefined);
  const amountFromParams = searchParams?.get("amount");
  const [amount, setAmount] = useState(amountFromParams || "0");
  const gateway = searchParams.get("gateway");
  const paymentIntentId = searchParams.get("payment_intent");
  const paymentIntentClientSecret =
    searchParams.get("payment_intent_client_secret") || null;

  useEffect(() => {
    async function verifyPayment() {
      if (gateway && paymentIntentId) {
        const response = await fetch("/api/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payment_intent: paymentIntentId,
            payment_intent_client_secret: paymentIntentClientSecret,
            gateway,
          }),
        });

        const result = await response.json();
        setPaymentVerified(result.verified);
        if(result.amount) setAmount(result.amount && String(result.amount));
      } else {
        // Automatically verified for non-Stripe payments
        setPaymentVerified(false);
      }
    }

    verifyPayment();
  }, [gateway, paymentIntentId, paymentIntentClientSecret]);

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        {paymentVerified && gateway === "stripe" && (
          <>
            <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
            <h2 className="text-2xl">Your Stripe payment was successful!</h2>
            <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
              ${amount}
            </div>
          </>
        )}

        {!paymentVerified && gateway === "stripe" && (
          <>
            <h1 className="text-4xl font-extrabold mb-2">Sorry!</h1>
            <h2 className="text-2xl">Your Stripe payment was unsuccessful!</h2>
            <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
              ${amount}
            </div>
          </>
        )}

        {paymentVerified && gateway === "sslcommerz" && (
          <>
            <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
            <h2 className="text-2xl">
              Your SSLCommerze payment was successful!
            </h2>
            <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
              {amount} BDT 
            </div>
          </>
        )}

        {!paymentVerified && gateway === "sslcommerz" && (
          <>
            <h1 className="text-4xl font-extrabold mb-2">Sorry!</h1>
            <h2 className="text-2xl">Your SSLCommerze payment was unsuccessful!</h2>
            <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
            {amount} BDT 
            </div>
          </>
        )}
      </div>
    </main>
  );
}

// app/api/verify-payment/route.js
import Stripe from "stripe";
import { NextResponse } from "next/server";
import envConfig from "@/config";
import { SslCommerzPayment } from "sslcommerz";

const stripe = new Stripe(envConfig.stripe_secret_key as string);

export async function POST(req) {
  const { payment_intent, payment_intent_client_secret, gateway } =
    await req.json();
  console.log(payment_intent, payment_intent_client_secret);

  if (!payment_intent || !gateway) {
    console.log("failed01");

    return NextResponse.json({ verified: false, error: "Missing parameters" });
  }

  try {
    if (gateway === "sslcommerz") {
      const sslcz = new SslCommerzPayment(
        envConfig.SSL_STORE_ID,
        envConfig.SSL_STORE_PASSWORD,
        false
      );

      const data = {
        tran_id: payment_intent,
      };
      // Await the transaction query
      const isOrderCreatedInSSL = await sslcz.transactionQueryByTransactionId(
        data
      );
      console.log(isOrderCreatedInSSL, isOrderCreatedInSSL.element[isOrderCreatedInSSL?.element?.length - 1]?.status);

      if (isOrderCreatedInSSL.no_of_trans_found > 0 && isOrderCreatedInSSL.element[isOrderCreatedInSSL?.element?.length - 1].status === "VALIDATED") {
        return NextResponse.json({ verified: true, amount: isOrderCreatedInSSL.element[isOrderCreatedInSSL?.element?.length - 1].amount });
      } else {
        return NextResponse.json({ verified: false });
      }
    } else if (gateway === "stripe") {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        payment_intent
      );
      console.log("payemntIntent ==>", paymentIntent);
      const isVerified =
        paymentIntent.client_secret === payment_intent_client_secret &&
        paymentIntent.status === "succeeded";

      return NextResponse.json({ verified: isVerified });
    } else {
      return NextResponse.json({ verified: false, error: "Invalid gateway" });}
  } catch (error) {
    return NextResponse.json({ verified: false, error: error });
  }
}

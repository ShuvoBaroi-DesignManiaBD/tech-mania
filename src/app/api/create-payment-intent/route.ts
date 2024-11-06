// /* eslint-disable @typescript-eslint/no-require-imports */
// import { useVerifyAUserMutation as verifyAUserMutation } from "@/redux/features/users/userApi";
// import { NextRequest, NextResponse } from "next/server";
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// export async function POST(request: NextRequest) {
//   const [verifyAUser] = verifyAUserMutation();
//   try {
//     const { amount, data, userId:userId } = await request.json();

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: "usd",
//       automatic_payment_methods: { enabled: true },
//     });

//     verifyAUser({userId:userId, updatedData: data});
//     console.log(paymentIntent);
    
//     return NextResponse.json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error("Internal Error:", error);
//     // Handle other errors (e.g., network issues, parsing errors)
//     return NextResponse.json(
//       { error: `Internal Server Error: ${error}` },
//       { status: 500 }
//     );
//   }
// }




import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import envConfig from "@/config";

const stripe = new Stripe(envConfig.stripe_secret_key as string);

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    

    // Return the client secret to the client
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Error:", error);

    // Handle specific Stripe errors
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: `Stripe Error: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}

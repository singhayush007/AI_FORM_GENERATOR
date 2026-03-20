import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, currency, plan } = body;

    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: "Missing Razorpay keys" }, { status: 500 });
    }

    if (!amount || amount < 1) {
      return NextResponse.json({ error: "Invalid payment amount" }, { status: 400 });
    }

    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
      amount: Math.round(amount * 100),
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`,
      notes: { plan },
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

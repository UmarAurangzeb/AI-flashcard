"use client";
// import { Homepage } from "@/components/component/homepage";
import Signup from "@/components/component/Signup";
import Image from "next/image";
import { signIn } from "@/auth";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);
export default function Home() {
  return (
    <>
      <Elements stripe={stripePromise}>
        <Signup />
      </Elements>
    </>
  );
}

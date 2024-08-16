"use client";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { StripeCardElementOptions } from "@stripe/stripe-js";

const CheckoutForm: React.FC = ({ }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const response = await fetch("/api/checkout_sessions", {
      method: "POST", // Ensure the correct method is used
      headers: {
        "Content-Type": "application/json", // Set content type
      },
      body: JSON.stringify({
        /* Include any necessary data here */
      }),
    });

    if (!response.ok) {
      console.error("Error fetching session:", response.statusText);
      return; // Early return on error
    }

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error("Error redirecting to checkout:", result.error.message);
    }
  };

  const cardElementOptions: StripeCardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  return (
    <form className="flex flex-col text-sm  md:w-2/3" onSubmit={handleSubmit}>
      <button
        className="bg-zinc-900 mt-4  my-3 border-[1px] rounded-sm hover:bg-zinc-950 py-2"
        type="submit"
        disabled={!stripe}
      >
        Subscribe
      </button>
    </form>
  );
};

export default CheckoutForm;

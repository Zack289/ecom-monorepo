"use client";

import { ShippingFormInputs } from "@repo/types";
import { PaymentElement, useCheckout } from "@stripe/react-stripe-js";
import { ConfirmError } from "@stripe/stripe-js";
import { useState } from "react";

const CheckoutForm = ({
  shippingForm,
}: {
  shippingForm: ShippingFormInputs;
}) => {
  const checkout = useCheckout();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ConfirmError | null>(null);

  const handleClick = async () => {
    setLoading(true);
    await checkout.updateEmail(shippingForm.email);
    await checkout.updateShippingAddress({
      name: "shipping_address",
      address: {
        line1: shippingForm.address,
        city: shippingForm.city,
        country: "US",
      },
    });

    const res = await checkout.confirm();
    if (res.type === "error") {
      setError(res.error);
    }
    setLoading(false);
  };

  return (
    <form className="flex items-center justify-center flex-col">
      <PaymentElement options={{ layout: "accordion" }} className="w-full"/>

      <button
        disabled={loading}
        onClick={handleClick}
        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded disabled:opacity-50 mt-6"
      >
        {loading && (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        )}
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {error && <div className="">{error.message}</div>}
    </form>
  );
};

export default CheckoutForm;

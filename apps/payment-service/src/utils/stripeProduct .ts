import { stripeProductType } from "@repo/types";
import stripe from "./stripe";

export const createStripeProduct = async (item:stripeProductType) => {
  try {
    const res = await stripe.products.create({
      id: item.id,
      name: item.name,
      default_price_data: {
        currency: "usd",
        unit_amount: item.price * 100,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//for the product price
export const createStripeProductPrice = async (productId: number) => {
  try {
    const res = await stripe.prices.list({
      product: "123",
    });

    return res.data[0]?.unit_amount;
  } catch (error) {
    console.log(error);
    return error;
  }
};

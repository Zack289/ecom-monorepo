import { consumer } from "./kafka";
import { createStripeProduct, delateStripeProduct } from "./stripeProduct ";

export const runKafkaSubscription = async () => {
  consumer.suscribe("product-created", async (message) => {
    const product = message.value;
    console.log("Received message: product.created", product);

    await createStripeProduct(product);
  });

  consumer.suscribe("product-created", async (message) => {
    const productId = message.value;
    console.log("Received message: product.deleated", productId);

    await delateStripeProduct(productId);
  });
};

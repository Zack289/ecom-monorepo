import { consumer } from "./kafka";
import { createOrder } from "./order";

export const runKafkaSubscription = async () => {
  consumer.suscribe("payment.successfull", async (message) => {
    console.log("Received message: payment.successfull", message);

    const order = message.value;
    await createOrder(order);
  });
};

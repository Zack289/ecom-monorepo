import { consumer } from "./kafka";

export const runKafkaSubscription = async () => {
  consumer.suscribe("payment.successfull", async (message) => {
    console.log("Received message: payment.successfull", message);
  });
};

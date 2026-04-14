import type { Kafka, Consumer } from "kafkajs";

export const createConsumer = (kafka: Kafka, groupId: string) => {
  const consumer: Consumer = kafka.consumer({ groupId }); //creating the Consumer instance from kafka

  const connect = async () => {
    await consumer.connect();
    console.log("Kafka consumer connnected:" + groupId);
  };

  const suscribe = async (
    topic: string,
    handeler: (message: any) => Promise<void>,
  ) => {
    await consumer.subscribe({
      topic,
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const value = message.value?.toString();

          if (value) {
            await handeler(JSON.parse(value));
          }
        } catch (error) {
          console.log("Error while processing message", error);
        }
      },
    });
  };

  const disconnect = async () => {
    await consumer.disconnect();
  };

  return { connect, suscribe, disconnect };
};

import type { Kafka, Producer } from "kafkajs";

export const createProducer = (kafka: Kafka) => {
  const producer: Producer = kafka.producer(); //creating the producer instance from kafka

  const connect = async () => {
    await producer.connect();
  };

  const sendMsg = async (topic: string, message: object) => {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  };

  const disconnect = async () => {
    await producer.disconnect();
  };

  return { connect, sendMsg, disconnect };
};

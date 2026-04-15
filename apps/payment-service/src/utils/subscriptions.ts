import { consumer } from "./kafka"

export const kafkaSubscription = async ()=>{
    consumer.suscribe("product-created", async (message)=>{
         const product = message.value;
        console.log("Received message: product.created", product);
    })
}
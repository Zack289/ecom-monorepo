import { Order } from "@repo/order-db";
import { OrderType } from "@repo/types";
import { producer } from "./kafka";

export const createOrder  = async (order: OrderType)=>{
    const newOrder = new Order(order);

    try {
        await newOrder.save();
    } catch (error) {
        console.log(error);
        throw error;
    }
}
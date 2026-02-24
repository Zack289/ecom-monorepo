import "dotenv/config";
import Fastify from "fastify";
import { clerkPlugin, getAuth } from "@clerk/fastify";
import { shouldBeUser } from "./middleware/authMiddleware";

import { connectOrderDB } from "@repo/order-db";
import { orderRoute } from "./routes/order";

const fastify = Fastify({ logger: true });

fastify.register(clerkPlugin);

fastify.get("/health", (request, reply) => {
  return reply.status(200).send({
    status: "ok",
    uptime: process.uptime(),
    timeStamp: Date.now(),
  });
});

fastify.get("/test", { preHandler: shouldBeUser }, (request, reply) => {
  return reply.send({
    message: "Order service in authenticated",
    userid: request.userId,
  });
});

fastify.register(orderRoute);

const start = async () => {
  try {
    await connectOrderDB()
    console.log("Connected to MongoDB");
    await fastify.listen({ port: 8001 });
    console.log("Order service is running on port 8001");
  } catch (err) {
    console.log(err);
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

import { getAuth } from "@clerk/fastify";
import { FastifyReply, FastifyRequest } from "fastify";

declare module "fastify"{
    interface FastifyRequest{
        userId?: string;
    }
}

//we dont need next function for fastify
export const shouldBeUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId } = getAuth(request);

  if (!userId) {
    return reply.send({ message: "You are not logged in" });
  };

  request.userId = userId;
};

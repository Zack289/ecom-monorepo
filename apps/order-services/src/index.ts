import 'dotenv/config';
import Fastify from "fastify";
import { clerkPlugin, getAuth } from "@clerk/fastify";

const fastify = Fastify({ logger: true })

fastify.register(clerkPlugin);


fastify.get("/health", (request, reply) => {
  return reply.status(200).send({
    status: "ok",
    uptime:process.uptime(),
    timeStamp:Date.now(),
  })

});

fastify.get("/test", (request, reply) => {
  const {userId} = getAuth(request);

  if(!userId){
    return reply.send({message: "You are not logged in"});
  };

  return reply.send({message: "Order service in authenticated"});
});

// fastify.get('/protected', async (request, reply) => {
//   try {
//     // Use `getAuth()` to access `isAuthenticated` and the user's ID
//     const { isAuthenticated, userId } = getAuth(request)

//     // If user isn't authenticated, return a 401 error
//     if (!isAuthenticated) {
//       return reply.code(401).send({ error: 'User not authenticated' })
//     }

//     // Use `clerkClient` to access Clerk's JS Backend SDK methods
//     // and get the user's User object
//     const user = await clerkClient.users.getUser(userId)

//     return reply.send({
//       message: 'User retrieved successfully',
//       user,
//     })
//   } catch (error) {
//     fastify.log.error(error)
//     return reply.code(500).send({ error: 'Failed to retrieve user' })
//   }
// })

const start = async () => {
  try {
    await fastify.listen({ port: 8001 });
    console.log("Order service is running on port 8001");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

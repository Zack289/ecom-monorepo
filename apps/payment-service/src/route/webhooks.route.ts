import { Hono } from "hono";
import Stripe from "stripe";
import stripe from "../utils/stripe";

const webhookSecret = process.env.STRIPRE_WEBHOOK_SECRET as string;
const webhookRoute = new Hono();

webhookRoute.post("/stripe", async (c) => {
  const body = await c.req.text();
  const signature = c.req.header("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature!, webhookSecret);
  } catch (error) {
    console.log("Webhooks verification failed");
    return c.json({ error: "Webhooks verification failed" }, 400);
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;

      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
      );

      //   TODO: CREATE OREDER
      console.log("Webhook Received", session);
      break;

    default:
      break;
  }

  return c.json({ received: true });
});

export default webhookRoute;

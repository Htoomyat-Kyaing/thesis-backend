import e from "express";
import dotenv from "dotenv";

import Stripe from "stripe";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// console.log(process.env.STRIPE_SECRET_KEY);

const router = e.Router();
router.post("/create", async (req, res) => {
  const cart = req.body;
  const lineItems = cart.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
      },
      unit_amount: item.sellPrice * 100,
    },
    quantity: item.amount,
  }));
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/",
    cancel_url: "http://localhost:3000/cart",
  });

  // res.redirect(session.url);
  // console.log(session);
  res.json({ id: session.id });
});

export default router;

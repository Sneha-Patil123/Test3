import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

app.post('/create-priority-session', async (req, res) => {
  try {
    const { title, email, amount } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: `Priority Submission - ${title}` },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe Error:', error);
    res.status(500).json({ error: 'Payment failed' });
  }
});

app.post('/create-vote-pack-session', async (req, res) => {
  try {
    const { pack, amount, email } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: `Vote Pack - ${pack} Votes` },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe Error:', error);
    res.status(500).json({ error: 'Vote pack payment failed' });
  }
});

app.get('/vote-pack-status', (req, res) => {
  const { user } = req.query;
  res.json({ credits: 5 }); 
});

app.post('/pro-trial', (req, res) => {
  res.json({
    success: true,
    trialEnds: '2025-08-30' 
  });
});

app.post('/create-subscription-session', async (req, res) => {
  try {
    const { email } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email,
      line_items: [
        {
          price: 'price_1RpXNhRsHB7xLQvkfygRR0gO', 
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Subscription error:', err.message);
    res.status(500).json({ error: 'Subscription failed' });
  }
});

app.get('/user-status', (req, res) => {
  res.json({ isPro: true });
});

app.get('/pro-metrics', (req, res) => {
  res.json({
    trials: 12,
    activeSubs: 8,
    nextBillingDate: '2025-08-30',
  });
});

app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});

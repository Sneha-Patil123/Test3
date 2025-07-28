import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

export async function POST(req) {
  try {
    const { title, email, amount } = await req.json();

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
      success_url: 'https://test3-rrdi.vercel.app/success',
      cancel_url: 'https://test3-rrdi.vercel.app/cancel',
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Stripe Error:', error);
    return new Response(JSON.stringify({ error: 'Payment failed' }), {
      status: 500,
    });
  }
}

import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/auth';
import { stripe } from '@/app/shared/services/stripe/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, nextAuthOptions);

  if (session?.user && session.user.id) {
    const { plan, customer, locale } = JSON.parse(req.body);
    try {
      const prices = await stripe.prices.list({
        limit: 16,
      });

      const price = prices.data.find(
        (price) =>
          price.nickname === plan &&
          (locale === 'Português'
            ? price.currency === 'brl'
            : price.currency === 'usd')
      );
      if (!price) throw new Error('Price not found');

      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        customer,
        success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/`,
        cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/`,
        allow_promotion_codes: true,
      });
      res.status(200).json({ url: session.url });
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export default handler;

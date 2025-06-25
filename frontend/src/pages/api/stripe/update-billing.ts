import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/auth';
import { stripe } from '@/app/shared/services/stripe/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, nextAuthOptions);

  if (session?.user && session.user.id) {
    const { customer } = JSON.parse(req.body);
    try {
      const session = await stripe.billingPortal.sessions.create({
        customer,
        return_url: `${process.env.NEXT_PUBLIC_DOMAIN}/settings`,
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

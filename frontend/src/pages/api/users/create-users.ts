import { signAwsRequest } from '@/app/shared/utils/signAwsRequest';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const url = `${process.env.API_USERS_URL}/production/users`;
    const signedReq = await signAwsRequest({
      url: url,
      method: 'POST',
      body: req.body,
      region: process.env.REGION as string,
      accessKeyId: process.env.AWS_KEY_ID as string,
      secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY as string,
    });
    const result = await fetch(url, {
      method: 'POST',
      headers: signedReq.headers,
      body: req.body,
    });
    await result.json();

    res.status(result.status).json({ message: 'success' });
  } catch (error) {
    res.status(500).json({ error: 'error' });
  }
};

export default handler;

export const runtime = 'edge';

import { signAwsRequest } from '@/app/shared/utils/signAwsRequest';
import { headers } from 'next/headers';

export async function PUT() {
  try {
    const headersList = headers();
    const tenantId = headersList.get('tenantId');

    if (!tenantId) {
      return Response.error();
    }

    const body = JSON.stringify({ is_confirmed: true });
    const url = `${process.env.API_USERS_URL}/production/users`;

    const signedReq = await signAwsRequest({
      url: url,
      method: 'PUT',
      region: process.env.REGION as string,
      accessKeyId: process.env.AWS_KEY_ID as string,
      secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY as string,
      tenantId: tenantId,
      body,
    });
    await fetch(url, {
      method: 'PUT',
      headers: signedReq.headers,
      body,
    });

    return Response.json(true);
  } catch (error) {
    console.log(error);
    return Response.error();
  }
}

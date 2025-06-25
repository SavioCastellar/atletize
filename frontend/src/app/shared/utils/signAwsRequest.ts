import { Sha256 } from '@aws-crypto/sha256-js';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { SignatureV4 } from '@aws-sdk/signature-v4';

export const signAwsRequest = async ({
  url,
  method,
  queryParams,
  body,
  region,
  accessKeyId,
  secretAccessKey,
  tenantId,
}: {
  tenantId?: string;
  url: string;
  method: string;
  body?: string;
  queryParams?: any;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}): Promise<any> => {
  const sigv4 = new SignatureV4({
    service: 'execute-api',
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    sha256: Sha256,
  });

  const { hostname, pathname: path } = new URL(url);

  const request = new HttpRequest({
    hostname,
    path,
    method: method,
    query: { ...queryParams },
    body: body,
    headers: {
      ['x-tenant-id']: tenantId ?? '',
      host: hostname,
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const signed = await sigv4.sign(request, { signingDate: new Date() });

  return signed;
};

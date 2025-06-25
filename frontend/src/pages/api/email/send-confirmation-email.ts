import type { NextApiRequest, NextApiResponse } from 'next';
import { ConfirmationEmailTemplate } from '../../../app/shared/emails/ConfirmationEmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_KEY as string);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { firstName, email, id, subject, intlEmail } = JSON.parse(req.body);

  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM as string,
    to: [email],
    subject: subject,
    react: ConfirmationEmailTemplate({
      firstName: firstName,
      email: email,
      confirmationUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/confirmation-email/${id}`,
      intlEmail: intlEmail,
      domain: process.env.EMAIL_DOMAIN as string,
    }),
    text: '',
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(req.body);
};
export default handler;

import { getTranslations } from 'next-intl/server';
import { IEmailToConfirmationOfAccountIntl } from '../domain/interfaces/IEmailToConfirmationOfAccountIntl';

export const useConfirmationEmailInternationalization = async () => {
  const internationalization = await getTranslations('Shared');

  const subject = internationalization('confirmationEmail.subject');
  const headerTitle = internationalization('confirmationEmail.headerTitle');
  const title = internationalization('confirmationEmail.title');
  const hello = internationalization('confirmationEmail.hello');
  const message = internationalization('confirmationEmail.message');
  const textLink = internationalization('confirmationEmail.textLink');
  const warningMessage = internationalization(
    'confirmationEmail.warningMessage'
  );
  const textWarningMessageLink = internationalization(
    'confirmationEmail.textWarningMessageLink'
  );
  const beforeFooter = internationalization('confirmationEmail.beforeFooter');
  const afterFooter = internationalization('confirmationEmail.afterFooter');
  const textFooterLink = internationalization(
    'confirmationEmail.textFooterLink'
  );
  const textLogin = internationalization('confirmationEmail.textLogin');
  const textPrivacy = internationalization('confirmationEmail.textPrivacy');
  const textTerms = internationalization('confirmationEmail.textTerms');

  const confirmationEmailIntl: IEmailToConfirmationOfAccountIntl = {
    subject,
    headerTitle,
    title,
    hello,
    message,
    textLink,
    warningMessage,
    textWarningMessageLink,
    beforeFooter,
    afterFooter,
    textFooterLink,
    textLogin,
    textPrivacy,
    textTerms,
  };

  return {
    confirmationEmailIntl,
  };
};

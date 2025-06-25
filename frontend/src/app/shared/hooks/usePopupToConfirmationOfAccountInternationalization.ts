import { getTranslations } from 'next-intl/server';
import { IPopupToConfirmationOfAccountIntl } from '../domain/interfaces/IPopupToConfirmationOfAccountIntl';

export const usePopupToConfirmationOfAccountInternationalization = async () => {
  const internationalization = await getTranslations('Shared');

  const title = internationalization('userConfirmationAccount.title');
  const hello = internationalization('userConfirmationAccount.hello');
  const message = internationalization('userConfirmationAccount.message');
  const warningMessage = internationalization(
    'userConfirmationAccount.warningMessage'
  );
  const button1 = internationalization('userConfirmationAccount.button1');
  const button2 = internationalization('userConfirmationAccount.button2');
  const verifyMessage = internationalization(
    'userConfirmationAccount.verifyMessage'
  );
  const awaitMessage1 = internationalization(
    'userConfirmationAccount.awaitMessage1'
  );
  const awaitMessage2 = internationalization(
    'userConfirmationAccount.awaitMessage2'
  );

  const popupToConfirmationOfAccountIntl: IPopupToConfirmationOfAccountIntl = {
    title,
    hello,
    message,
    warningMessage,
    button1,
    button2,
    verifyMessage,
    awaitMessage1,
    awaitMessage2,
  };

  return {
    popupToConfirmationOfAccountIntl,
  };
};

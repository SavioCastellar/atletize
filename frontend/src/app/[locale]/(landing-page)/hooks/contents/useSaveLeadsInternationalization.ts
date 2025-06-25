import { getTranslations } from 'next-intl/server';
import { ISaveLeadsIntl } from '../../domain/interfaces/ISaveLeads';

export const useSaveLeadsInternationalization = async () => {
  const internationalization = await getTranslations('LandingPage');

  const callToActionButton = internationalization(
    'saveLeads.callToActionButton'
  );
  const successMessage = internationalization('saveLeads.successMessage');
  const errorMessageToValidateEmail = internationalization(
    'saveLeads.errorMessageToValidateEmail'
  );

  const saveLeadsIntl: ISaveLeadsIntl = {
    callToActionButton,
    successMessage,
    errorMessageToValidateEmail,
  };

  return {
    saveLeadsIntl,
  };
};

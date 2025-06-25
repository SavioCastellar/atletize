import { getTranslations } from 'next-intl/server';
import { ISettingsIntl } from '../domain/interfaces/ISettingsIntl';
import { IEmailConfirmationIntl } from '../domain/interfaces/IEmailConfirmationIntl';

export const useInternationalizationUser = async () => {
  const internationalization = await getTranslations('Dashboard');

  //### SETTINGS ###
  const settingsTitle = internationalization('user.settings.title');
  const settingsMenuItem1 = internationalization('user.settings.menu.item1');

  const settingsProfileTitle = internationalization(
    'user.settings.profile.title'
  );
  const settingsLabelName = internationalization(
    'user.settings.profile.labels.name'
  );
  const settingsLabelEmail = internationalization(
    'user.settings.profile.labels.email'
  );

  //### PAGE EMAIL CONFIRMATION ###
  const confirmationEmailMetadataTitle = internationalization(
    'user.confirmationEmail.metadata.title'
  );
  const confirmationEmailTitle = internationalization(
    'user.confirmationEmail.title'
  );
  const confirmationEmaildescription = internationalization(
    'user.confirmationEmail.description'
  );

  const confirmationEmailTextButton = internationalization(
    'user.confirmationEmail.textButton'
  );

  const intlConfirmationEmail: IEmailConfirmationIntl = {
    metadata: {
      title: confirmationEmailMetadataTitle,
    },
    title: confirmationEmailTitle,
    description: confirmationEmaildescription,
    textButton: confirmationEmailTextButton,
  };

  const intlSettings: ISettingsIntl = {
    title: settingsTitle,
    menu: {
      item1: settingsMenuItem1,
    },
    profile: {
      title: settingsProfileTitle,
      label: {
        name: settingsLabelName,
        email: settingsLabelEmail,
      },
    },
  };

  return {
    intlSettings,
    intlConfirmationEmail,
  };
};

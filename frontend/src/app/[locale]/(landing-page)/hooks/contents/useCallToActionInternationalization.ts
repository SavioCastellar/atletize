import { getTranslations } from 'next-intl/server';

export const useCallToActionInternationalization = async () => {
  const internationalization = await getTranslations('LandingPage');

  const title = internationalization('callToAction.title');
  const description = internationalization('callToAction.description');
  const firstButton = internationalization('callToAction.firstButton');
  const secondButton = internationalization('callToAction.secondButton');
  const imageUrl = internationalization('callToAction.imageUrl');

  const callToActionIntl = {
    title,
    description,
    firstButton,
    secondButton,
    imageUrl,
  };

  return {
    callToActionIntl,
  };
};

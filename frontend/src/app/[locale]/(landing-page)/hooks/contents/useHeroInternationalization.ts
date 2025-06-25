import { getTranslations } from 'next-intl/server';
import { IHeroIntl } from '../../domain/interfaces/IHeroIntl';

export const useHeroInternationalization = async () => {
  const internationalization = await getTranslations('LandingPage');

  const title = internationalization('hero.title');
  const titleWithEffect = internationalization('hero.titleWithEffect');
  const subtitle = internationalization('hero.subtitle');
  const callToActionButton = internationalization('hero.callToActionButton');
  const testimonialsText = internationalization('hero.testimonials.text');
  const testimonialsNumberOfClients = internationalization(
    'hero.testimonials.numberOfClients'
  );

  const heroIntl: IHeroIntl = {
    title,
    titleWithEffect,
    subtitle,
    callToActionButton,
    testimonials: {
      text: testimonialsText,
      numberOfClients: parseInt(testimonialsNumberOfClients),
    },
  };

  return {
    heroIntl,
  };
};

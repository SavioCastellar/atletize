import { getTranslations } from 'next-intl/server';
import { IPricingIntl } from '../../domain/interfaces/IPricingIntl';
import { useSharedInternationalization } from '@/app/shared/hooks/useSharedInternationalization';

export const usePricingInternationalization = async () => {
  const internationalization = await getTranslations('LandingPage');
  const { language } = await useSharedInternationalization();

  const headerTitle = internationalization('pricing.headerTitle');
  const title = internationalization('pricing.title');
  const subtitle = internationalization('pricing.subtitle');
  const textOfMostPopular = internationalization('pricing.textOfMostPopular');
  const callToAction = internationalization(`pricing.callToAction`);
  const cancel = internationalization(`pricing.cancel`);
  const footerDescription = internationalization(`pricing.footerDescription`);

  const pricing = ['price1', 'price2'].map((item, index) => ({
    id: `${index}`,
    name: internationalization(`pricing.${item}.name`),
    description: internationalization(`pricing.${item}.description`),
    nextPrice: internationalization(`pricing.${item}.nextPrice`),
    price: internationalization(`pricing.${item}.price`),
    moreInfoOfPrice: internationalization(`pricing.${item}.moreInfoOfPrice`),

    mostPopular:
      internationalization(`pricing.${item}.mostPopular`).toLowerCase() ===
      'true',
    features: ['feature1', 'feature2', 'feature3', 'feature4', 'feature5'].map(
      (feature) => internationalization(`pricing.${item}.${feature}`)
    ),
  }));

  const pricingIntl: IPricingIntl = {
    headerTitle,
    title,
    subtitle,
    callToAction,
    footerDescription,
    textOfMostPopular,
    pricing,
    language,
    cancel,
  };

  return {
    pricingIntl,
  };
};

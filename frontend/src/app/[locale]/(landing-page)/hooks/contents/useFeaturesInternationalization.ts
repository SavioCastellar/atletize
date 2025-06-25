import { getTranslations } from 'next-intl/server';
import { IFeaturesIntl } from '../../domain/interfaces/IFeaturesIntl';

export const useFeaturesInternationalization = async () => {
  const internationalization = await getTranslations('LandingPage');

  const headerTitle = internationalization('features.headerTitle');
  const beforeTitle = internationalization('features.beforeTitle');
  const titleWithEffect = internationalization('features.titleWithEffect');
  const afterTitle = internationalization('features.afterTitle');
  const subtitle = internationalization('features.subtitle');

  const features = [
    'feature1',
    'feature2',
    'feature3',
    'feature4',
    'feature5',
  ].map((item, index) => ({
    id: `${index}`,
    title: internationalization(`features.${item}.title`),
    description: internationalization(`features.${item}.description`),
    icon: internationalization(`features.${item}.icon`),
    image: internationalization(`features.${item}.image`),
  }));

  const featuresIntl: IFeaturesIntl = {
    headerTitle,
    beforeTitle,
    titleWithEffect,
    afterTitle,
    subtitle,
    features,
  };

  return {
    featuresIntl,
  };
};

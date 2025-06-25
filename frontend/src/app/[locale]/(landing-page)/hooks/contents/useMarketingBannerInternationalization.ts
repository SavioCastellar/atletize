import { getTranslations } from 'next-intl/server';
import { IMarketingBannerIntl } from '../../domain/interfaces/IMarketingBannerIntl';

export const useMarketingBannerInternationalization = async () => {
  const internationalization = await getTranslations('LandingPage');

  const content = internationalization('banner.content');
  const leftText = internationalization('banner.leftText');
  const rightText = internationalization('banner.rightText');

  const marketingBannerIntl: IMarketingBannerIntl = {
    content,
    leftText,
    rightText,
  };

  return {
    marketingBannerIntl,
  };
};

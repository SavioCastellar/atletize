import { getTranslations } from 'next-intl/server';
import { ICookieBannerIntl } from '../../domain/interfaces/ICookieBannerIntl';

export const useCookieBannerInternationalization = async () => {
  const internationalization = await getTranslations('LandingPage');

  const content = internationalization('cookies.content');
  const acceptButton = internationalization('cookies.acceptButton');
  const refuseButton = internationalization('cookies.refuseButton');
  const moreInfo = internationalization('cookies.moreInfo');

  const cookieBannerIntl: ICookieBannerIntl = {
    content,
    acceptButton,
    refuseButton,
    moreInfo,
  };

  return {
    cookieBannerIntl,
  };
};

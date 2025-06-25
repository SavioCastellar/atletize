import { getTranslations } from 'next-intl/server';
import { IFooterIntl } from '../../domain/interfaces/IFooter';

export const useFooterInternationalization = async () => {
  const internationalization = await getTranslations('LandingPage');

  const description = internationalization('footer.description');
  const menuTitle1 = internationalization('footer.menuTitle1');
  const menuTitle2 = internationalization('footer.menuTitle2');
  const menuTitle3 = internationalization('footer.menuTitle3');

  const copyright = internationalization('footer.copyright');

  const support = ['item1', 'item2', 'item3'].map((item) => ({
    name: internationalization(`footer.navigation.support.${item}.name`),
    href: internationalization(`footer.navigation.support.${item}.href`),
  }));

  const company = ['item1', 'item2', 'item3', 'item4', 'item5'].map((item) => ({
    name: internationalization(`footer.navigation.company.${item}.name`),
    href: internationalization(`footer.navigation.company.${item}.href`),
  }));
  const legal = ['item1', 'item2', 'item3'].map((item) => ({
    name: internationalization(`footer.navigation.legal.${item}.name`),
    href: internationalization(`footer.navigation.legal.${item}.href`),
  }));
  const social = ['item1', 'item2', 'item3'].map((item) => ({
    name: internationalization(`footer.navigation.social.${item}.name`),
    href: internationalization(`footer.navigation.social.${item}.href`),
  }));

  const footerIntl: IFooterIntl = {
    description,
    menuTitle1,
    menuTitle2,
    menuTitle3,
    navigation: {
      support,
      company,
      legal,
      social,
    },
    copyright,
  };

  return {
    footerIntl,
  };
};

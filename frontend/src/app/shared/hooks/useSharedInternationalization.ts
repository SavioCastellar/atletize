import { getTranslations } from 'next-intl/server';

export const useSharedInternationalization = async () => {
  const internationalization = await getTranslations('Shared');

  const language = internationalization('language');

  const bottomNavItem1 = internationalization('sidebar.bottomNavigation.item1');
  const bottomNavItem2 = internationalization('sidebar.bottomNavigation.item2');

  // #### Main Navigation ####
  const mainNavItem1Title = 'Dashboard';
  const mainNavItem2Title = 'Products';

  const mainNavItem1Icon = 'dashboard';
  const mainNavItem2Icon = 'package';

  const mainNavItem1Link = 'home';
  const mainNavItem2Link = 'products';

  const intlMainNavigation = {
    item1: {
      title: mainNavItem1Title,
      icon: mainNavItem1Icon,
      link: mainNavItem1Link,
    },
    item2: {
      title: mainNavItem2Title,
      icon: mainNavItem2Icon,
      link: mainNavItem2Link,
    },
  };

  const intlBottomNavigation = {
    item1: bottomNavItem1,
    item2: bottomNavItem2,
  };

  return {
    language,
    intlMainNavigation,
    intlBottomNavigation,
  };
};

import { getTranslations } from 'next-intl/server';
import { IHeaderIntl } from '../../domain/interfaces/IHeaderIntl';
import { useSharedInternationalization } from '@/app/shared/hooks/useSharedInternationalization';

export const useHeaderInternationalization = async () => {
  // const internationalization = await getTranslations('LandingPage');
  // const { language } = await useSharedInternationalization();

  // const menuOption1 = internationalization('header.menu.option1');
  // const menuOption2 = internationalization('header.menu.option2');
  // const menuOption3 = internationalization('header.menu.option3');
  // const menuOption4 = internationalization('header.menu.option4');
  const menuOption1 = 'Loja';
  const menuOption2 = 'Eventos';
  const menuOption3 = 'Hall da Fama';
  const menuOption4 = 'Nossa História';

  // const buttonsOption1 = internationalization('header.buttons.option1');
  // const buttonsOption2 = internationalization('header.buttons.option2');
  // const buttonsOption3 = internationalization('header.buttons.option3');
  const socialIcon1 = 'facebook';
  const socialIcon2 = 'instagram';
  const socialIcon3 = 'whatsapp';

  const socialLink1 = '';
  const socialLink2 = '';
  const socialLink3 = '';

  const headerIntl: IHeaderIntl = {
    menu: {
      option1: menuOption1,
      option2: menuOption2,
      option3: menuOption3,
      option4: menuOption4,
    },
    socials: {
      option1: {
        icon: socialIcon1,
        link: socialLink1,
      },
      option2: {
        icon: socialIcon2,
        link: socialLink2,
      },
      option3: {
        icon: socialIcon3,
        link: socialLink3,
      },
    },
    // language: language,
  };

  return {
    headerIntl,
  };
};

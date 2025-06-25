import { getTranslations } from 'next-intl/server';
import { IProblemsIntl } from '../../domain/interfaces/IProblemsIntl';

export const useProblemsInternationalization = async () => {
  const internationalization = await getTranslations('LandingPage');

  const headerTitle = internationalization('problems.headerTitle');
  const title = internationalization('problems.title');
  const subtitle = internationalization('problems.subtitle');

  const option1Emoji = internationalization('problems.problems.option1.emoji');
  const option1Text = internationalization('problems.problems.option1.text');

  const option2Emoji = internationalization('problems.problems.option2.emoji');
  const option2Text = internationalization('problems.problems.option2.text');

  const option3Emoji = internationalization('problems.problems.option3.emoji');
  const option3Text = internationalization('problems.problems.option3.text');

  const problemsIntl: IProblemsIntl = {
    headerTitle,
    title,
    subtitle,
    problems: {
      option1: {
        text: option1Text,
        emoji: option1Emoji,
      },
      option2: {
        text: option2Text,
        emoji: option2Emoji,
      },
      option3: {
        text: option3Text,
        emoji: option3Emoji,
      },
    },
  };

  return {
    problemsIntl,
  };
};

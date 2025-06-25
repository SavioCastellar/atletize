import { getTranslations } from 'next-intl/server';
import { IStatsIntl } from '../../domain/interfaces/IStatsIntls';

export const useStatsInternationalization = async () => {
  const internationalization = await getTranslations('LandingPage');

  const statsHeaderTitle = internationalization('stats.headerTitle');
  const statsTitle = internationalization('stats.title');
  const statsSubtitle = internationalization('stats.subtitle');

  const stats = ['stats1', 'stats2', 'stats3', 'stats4'].map((item, index) => ({
    id: index.toString(),
    title: internationalization(`stats.${item}.title`),
    value: internationalization(`stats.${item}.value`),
  }));

  const statsIntl: IStatsIntl = {
    headerTitle: statsHeaderTitle,
    title: statsTitle,
    subtitle: statsSubtitle,
    stats: stats,
  };

  return {
    statsIntl,
  };
};

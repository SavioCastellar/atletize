import { getTranslations } from 'next-intl/server';

export const useCookiePolicyInternationalization = async () => {
  const internationalization = await getTranslations('Compliance');

  const metadataTitle = internationalization('cookie.metadata.title');
  const title = internationalization('cookie.title');
  const lastUpdated = internationalization('cookie.lastUpdated');

  const sections = [
    'introduction',
    'usage',
    'thirdPartyCookies',
    'cookieManagement',
    'cookiePolicy',
    'policyUpdates',
    'contact',
  ].map((sectionKey) => {
    const title = internationalization(`cookie.${sectionKey}.title`);
    const content = internationalization(`cookie.${sectionKey}.content`);

    return { title, content };
  });

  const cookiePolicyIntl = {
    metadata: {
      title: metadataTitle,
    },
    title,
    lastUpdated,
    sections,
  };

  return {
    cookiePolicyIntl,
  };
};

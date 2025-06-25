import { getTranslations } from 'next-intl/server';

export const useTermsAndConditionsInternationalization = async () => {
  const internationalization = await getTranslations('Compliance');

  const metadataTitle = internationalization('terms&conditions.metadata.title');
  const title = internationalization('terms&conditions.title');
  const lastUpdated = internationalization('terms&conditions.lastUpdated');
  const sections = Array.from({ length: 15 })
    .map((_, index) => {
      const sectionNumber = index + 1;
      const sectionKey = `section${sectionNumber}`;

      return {
        title: internationalization(`terms&conditions.${sectionKey}.title`),
        content: internationalization(`terms&conditions.${sectionKey}.content`),
      };
    })

    .filter((section) => section.title && section.content);

  const termsAndConditionsIntl = {
    metadata: {
      title: metadataTitle,
    },
    title,
    lastUpdated,
    sections,
  };

  return {
    termsAndConditionsIntl,
  };
};

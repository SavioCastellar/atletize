import { getTranslations } from 'next-intl/server';

export const usePrivacyPolicyInternationalization = async () => {
  const internationalization = await getTranslations('Compliance');

  const metadataTitle = internationalization('privacyPolicy.metadata.title');
  const title = internationalization('privacyPolicy.title');
  const lastUpdated = internationalization('privacyPolicy.lastUpdated');

  const subsectionsMap = {
    dataTransparency: [
      'providedInformation',
      'automaticallyCollectedInformation',
    ],
    analysisTools: ['cookiePolicy'],
  };

  const getSubsections = (sectionKey: string) => {
    const subsectionKeys =
      subsectionsMap[sectionKey as keyof typeof subsectionsMap] || [];
    return subsectionKeys.reduce(
      (
        acc: { [x: string]: { title: string; content: string } },
        key: string | number
      ) => {
        const title = internationalization(
          `privacyPolicy.${sectionKey}.subsections.${key}.title`
        );
        const content = internationalization(
          `privacyPolicy.${sectionKey}.subsections.${key}.content`
        );
        if (title && content) {
          acc[key] = { title, content };
        }
        return acc;
      },
      {}
    );
  };

  const sections = [
    'introduction',
    'privacyCommitment',
    'dataTransparency',
    'informationAccuracy',
    'personalDataDefinition',
    'dataUse',
    'dataSharing',
    'dataControllerRole',
    'dataProcessingUse',
    'analysisTools',
    'dataRetentionDuration',
    'policyChanges',
    'userRights',
    'contact',
  ].map((sectionKey) => {
    const title = internationalization(`privacyPolicy.${sectionKey}.title`);
    const content = internationalization(`privacyPolicy.${sectionKey}.content`);
    const subsections = getSubsections(sectionKey);

    return Object.keys(subsections).length > 0
      ? { title, content, subsections }
      : { title, content };
  });

  const privacyPolicyIntl = {
    metadata: {
      title: metadataTitle,
    },
    title,
    lastUpdated,
    sections,
  };

  return {
    privacyPolicyIntl,
  };
};

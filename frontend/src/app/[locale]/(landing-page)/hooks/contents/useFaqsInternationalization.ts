import { getTranslations } from 'next-intl/server';
import { IFaqIntl } from '../../domain/interfaces/IFaqIntl';

export const useFaqsInternationalization = async () => {
  const internationalization = await getTranslations('LandingPage');

  const faqHeaderTitle = internationalization('faq.headerTitle');
  const faqTitle = internationalization('faq.title');
  const faqSubtitle = internationalization('faq.subtitle');

  const faqs = ['faq1', 'faq2', 'faq3', 'faq4', 'faq5', 'faq6', 'faq7'].map(
    (faq) => ({
      question: internationalization(`faq.questions&Answers.${faq}.question`),
      answer: internationalization(`faq.questions&Answers.${faq}.answer`),
    })
  );

  const faqsIntl: IFaqIntl = {
    headerTitle: faqHeaderTitle,
    title: faqTitle,
    subtitle: faqSubtitle,
    faqs,
  };

  return {
    faqsIntl,
  };
};

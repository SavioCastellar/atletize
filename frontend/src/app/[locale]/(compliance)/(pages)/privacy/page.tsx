import { Metadata } from 'next';
import { Fragment } from 'react';
import { usePrivacyPolicyInternationalization } from '../../hooks/usePrivacyPolicyInternationalization';

export let metadata: Metadata = {};

export default async function Privacy() {
  const { privacyPolicyIntl } = await usePrivacyPolicyInternationalization();

  metadata.title = privacyPolicyIntl.metadata.title;

  return (
    <main className='mb-14 flex justify-center'>
      <article className='w-full max-w-2xl p-4 text-justify'>
        <h1 className='mb-14 text-center text-xl font-bold'>
          {privacyPolicyIntl.title}
        </h1>
        <p className='mt-4 text-center text-sm text-gray-500'>
          {privacyPolicyIntl.lastUpdated}
        </p>
        {privacyPolicyIntl.sections.map((section, index) => (
          <Fragment key={index}>
            <h2 className='mb-1 mt-6 font-bold'>{section.title}</h2>
            <p>{section.content}</p>
            {section.subsections &&
              Object.entries(section.subsections).map(
                ([_key, subsection], subIndex) => (
                  <Fragment key={subIndex}>
                    <h3 className='mb-1 ml-6 mt-6 font-semibold'>
                      {subsection.title}
                    </h3>
                    <p className='ml-6'>{subsection.content}</p>
                  </Fragment>
                )
              )}
          </Fragment>
        ))}
      </article>
    </main>
  );
}

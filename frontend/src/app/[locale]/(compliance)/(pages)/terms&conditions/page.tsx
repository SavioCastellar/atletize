import { Metadata } from 'next';
import { Fragment } from 'react';
import { useTermsAndConditionsInternationalization } from '../../hooks/useTermsAndConditionsInternationalization';

export let metadata: Metadata = {};

export default async function TermsAndConditions() {
  const { termsAndConditionsIntl } =
    await useTermsAndConditionsInternationalization();

  metadata.title = termsAndConditionsIntl.metadata.title;

  return (
    <main className='mb-4 flex justify-center'>
      <article className='w-full max-w-2xl p-4 text-justify'>
        <h1 className='mb-4 text-center text-xl font-bold'>
          {termsAndConditionsIntl.metadata.title}
        </h1>
        <p className='mt-4 text-center text-sm text-gray-500'>
          {termsAndConditionsIntl.lastUpdated}
        </p>
        {termsAndConditionsIntl.sections.map((section, index) => (
          <Fragment key={index}>
            <h2 className='mb- mt-6 font-bold'>{section.title}</h2>
            <p>{section.content}</p>
          </Fragment>
        ))}
      </article>
    </main>
  );
}

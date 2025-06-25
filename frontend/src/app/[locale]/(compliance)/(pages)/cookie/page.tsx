import { Metadata } from 'next';
import { Fragment, Key } from 'react';
import { useCookiePolicyInternationalization } from '../../hooks/useCookiePolicyInternationalization';

export let metadata: Metadata = {};

export default async function Cookies() {
  const { cookiePolicyIntl } = await useCookiePolicyInternationalization();

  metadata.title = cookiePolicyIntl.metadata.title;

  const renderTextWithLineBreaks = (text: string) => {
    return text.split('\n').map((line: string, index, array) => (
      <Fragment key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </Fragment>
    ));
  };

  return (
    <main className='mb-4 flex justify-center'>
      <article className='w-full max-w-2xl p-4 text-justify'>
        <h1 className='mb-4 text-center text-xl font-bold'>
          {cookiePolicyIntl?.title}
        </h1>
        <p className='mt-4 text-center text-sm text-gray-500'>
          {cookiePolicyIntl?.lastUpdated}
        </p>
        {cookiePolicyIntl?.sections.map(
          (section: { title: string; content: string }, index: Key) => (
            <Fragment key={index}>
              <h2 className='mb- mt-6 font-bold'>{section.title}</h2>
              <p>{renderTextWithLineBreaks(section.content)}</p>
            </Fragment>
          )
        )}
      </article>
    </main>
  );
}

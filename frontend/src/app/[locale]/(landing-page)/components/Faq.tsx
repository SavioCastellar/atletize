'use client';
import { Disclosure } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { IFaqIntl } from '../domain/interfaces/IFaqIntl';

interface FaqProps {
  intl: IFaqIntl;
}

export function Faq({ intl }: FaqProps) {
  return (
    <div id='doubts' className='bg-gray/100 pt-16'>
      <motion.div
        initial={{
          scale: 0.1,
        }}
        whileInView={{
          scale: 1.0,
          transition: {
            type: 'spring',
            stiffness: 260,
            damping: 20,
          },
        }}
        className='max-w-2xl md:mx-auto md:text-center xl:max-w-none'
      >
        <div className='flex w-full flex-col items-center justify-center text-center'>
          <h2 className='text-lg font-semibold leading-8 tracking-tight text-primary/600'>
            {intl?.headerTitle}
          </h2>
          <h2 className='text-4xl font-bold tracking-tight text-gray-800 sm:text-4xl md:text-5xl'>
            {intl?.title}
          </h2>
          <p className='mt-6 w-3/4 max-w-2xl text-lg tracking-tight text-gray-600'>
            {intl?.subtitle}
          </p>
        </div>
      </motion.div>
      <motion.div
        initial={{
          scale: 0.4,
        }}
        whileInView={{
          scale: 1.0,
          transition: {
            type: 'spring',
            stiffness: 260,
            damping: 20,
          },
        }}
        className='mx-auto px-6 pt-20 lg:px-8 '
      >
        <div className='relative isolate mx-auto max-w-4xl divide-y divide-gray-900/10 overflow-hidden px-6'>
          <dl className='mt-10 space-y-6 divide-y divide-gray-900/10'>
            {intl?.faqs.map((faq, index) => (
              <Disclosure as='div' key={faq.question} className='pt-6'>
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className='flex w-full items-start justify-between text-left text-gray-900'>
                        <span className='text-base font-medium leading-7'>
                          <span className='font-bold text-primary/600'>
                            0{index + 1}.
                          </span>{' '}
                          {faq.question}
                        </span>
                        <span className='ml-6 flex h-7 items-center'>
                          {open ? (
                            <Minus className='h-6 w-6' aria-hidden='true' />
                          ) : (
                            <Plus className='h-6 w-6' aria-hidden='true' />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as='dd' className='mt-2 pr-12'>
                      <p className='text-base leading-7 text-gray-600'>
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </motion.div>
    </div>
  );
}

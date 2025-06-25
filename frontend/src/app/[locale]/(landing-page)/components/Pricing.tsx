'use client';
import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { IPricingIntl } from '../domain/interfaces/IPricingIntl';
import { useContextSelector } from 'use-context-selector';
import { UsersContext } from '@/app/shared/contexts/UsersContext';
import { usePlans } from '../hooks/usePlans';
import Link from 'next/link';
import { ReactNode } from 'react';

interface PricingProps {
  intl: IPricingIntl;
  callToActionToSaveLeads?: ReactNode;
}

export function Pricing({ intl, callToActionToSaveLeads }: PricingProps) {
  const user = useContextSelector(UsersContext, (context) => context.user);

  const { urls, billingPortal, userWithoutPlan } = usePlans(
    user,
    intl.language
  );

  return (
    <div id='pricing' className='isolate overflow-hidden bg-primary/600'>
      <div className='mx-auto max-w-7xl px-6 pb-96 pt-24 text-center sm:pt-32 lg:px-8'>
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
              delay: 0.1,
            },
          }}
          className='mx-auto max-w-4xl'
        >
          <h2 className='text-base font-semibold leading-7 text-primary/100'>
            {intl.headerTitle}
          </h2>
          <p className='mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl'>
            {intl.title}
          </p>
        </motion.div>
        <div className='relative mt-6'>
          <p className='mx-auto max-w-2xl text-lg leading-8 text-white/60'>
            {intl.subtitle}
          </p>
          <svg
            viewBox='0 0 1208 1024'
            className='absolute -top-10 left-1/2 -z-10 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0'
          >
            <ellipse
              cx={604}
              cy={512}
              fill='url(#6d1bd035-0dd1-437e-93fa-59d316231eb0)'
              rx={604}
              ry={512}
            />
            <defs>
              <radialGradient id='6d1bd035-0dd1-437e-93fa-59d316231eb0'>
                <stop stopColor='#fff' />
                <stop offset={1} stopColor='#fff' />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className='flow-root bg-gray/100 pb-24 sm:pb-32'>
        <div className='-mt-80'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2'>
              {intl.pricing.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{
                    scale: 0.1,
                  }}
                  whileInView={{
                    scale: 1.0,
                    transition: {
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 * index,
                    },
                  }}
                  data-mostPopular={item.mostPopular}
                  className='flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 data-[mostPopular=true]:border-4 data-[mostPopular=true]:border-solid data-[mostPopular=true]:border-primary/800 sm:p-10'
                >
                  <div>
                    <div className='flex items-center justify-between gap-x-4'>
                      <h3
                        id={item.name}
                        className='text-base font-semibold leading-7 text-primary/600'
                      >
                        {item.name}
                      </h3>

                      {item.mostPopular ? (
                        <span className='rounded-full bg-primary/600 px-2.5 py-1 text-xs font-semibold leading-5 text-white'>
                          {intl.textOfMostPopular}
                        </span>
                      ) : null}
                    </div>
                    <div className='mt-4 flex items-baseline gap-x-2'>
                      <span className='text-5xl font-bold tracking-tight text-gray-900'>
                        {item.price}
                      </span>
                      <span className='text-base font-semibold leading-7 text-gray-600'>
                        {item.moreInfoOfPrice}
                      </span>
                    </div>
                    <p className='mt-6 text-base leading-7 text-gray-600'>
                      {item.description}
                    </p>
                    <ul
                      role='list'
                      className='mt-10 space-y-4 text-sm leading-6 text-gray-600'
                    >
                      {item.features.map((feature) => (
                        <li key={feature} className='flex gap-x-3'>
                          <CheckIcon
                            className='h-6 w-5 flex-none text-primary/600'
                            aria-hidden='true'
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className='flex flex-col '>
                    {!callToActionToSaveLeads ? (
                      user.email ? (
                        <a
                          href={
                            userWithoutPlan ? urls[item.name] : billingPortal
                          }
                          aria-describedby={item.name}
                          className='mt-8 block rounded-md bg-primary/600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary/700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/600'
                        >
                          {userWithoutPlan ? intl.callToAction : intl.cancel}
                        </a>
                      ) : (
                        <Link
                          href={'/signup'}
                          aria-describedby={item.name}
                          className='mt-8 block rounded-md bg-primary/600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary/700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/600'
                        >
                          {intl.callToAction}
                        </Link>
                      )
                    ) : (
                      callToActionToSaveLeads
                    )}

                    <div className='mt-2 flex items-center justify-center'>
                      <span className='text-sm text-gray-400'>
                        {intl.footerDescription}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

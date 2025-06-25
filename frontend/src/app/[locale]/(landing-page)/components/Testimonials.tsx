'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { ITestimonialsIntl } from '../domain/interfaces/ITestimonials';

interface TestimonialsProps {
  intl: ITestimonialsIntl;
}

export function Testimonials({ intl }: TestimonialsProps) {
  return (
    <div
      id='testimonials'
      className='relative isolate bg-gray/100 pb-32 pt-24 sm:pt-32'
    >
      <div
        className='absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl'
        aria-hidden='true'
      >
        <div
          className='ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-primary/400 to-primary/600'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div
        className='absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end'
        aria-hidden='true'
      >
        <div
          className='ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-primary/400 to-primary/600 xl:ml-0 xl:mr-[calc(50%-12rem)]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-xl text-center'>
          <h3 className='text-lg font-semibold leading-8 tracking-tight text-primary/600'>
            {intl?.headerTitle}
          </h3>
          <h2 className='mt-2 text-4xl font-bold tracking-tight text-gray-800 sm:text-4xl'>
            {intl?.title}
          </h2>
        </div>
        <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4'>
          <motion.figure
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
            className='rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1'
          >
            <blockquote className='p-6 text-lg font-semibold leading-7 tracking-tight text-gray-900 sm:p-12 sm:text-xl sm:leading-8'>
              <p>{`“${intl?.principalTestimonial.body}”`}</p>
            </blockquote>

            <figcaption className='flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap'>
              <Image
                className='h-10 w-10 flex-none rounded-full bg-gray-50'
                src={intl?.principalTestimonial.author.imageUrl}
                alt={intl?.principalTestimonial.author.name}
                width={10}
                height={10}
              />
              <div className='flex-auto'>
                <div className='font-semibold'>
                  {intl?.principalTestimonial.author.name}
                </div>
                <div className='text-gray-600'>{`${intl?.principalTestimonial.author.handle}`}</div>
              </div>
            </figcaption>
          </motion.figure>

          {intl?.testimonials.map((columnGroup, columnGroupIdx) => (
            <div
              key={columnGroupIdx}
              className='space-y-8 xl:contents xl:space-y-0'
            >
              {columnGroup.map((column, columnIdx) => (
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
                  key={columnIdx}
                  className={twMerge(
                    (columnGroupIdx === 0 && columnIdx === 0) ||
                      (columnGroupIdx === intl?.testimonials.length - 1 &&
                        columnIdx === columnGroup.length - 1)
                      ? 'xl:row-span-2'
                      : 'xl:row-start-1',
                    'space-y-8'
                  )}
                >
                  {column.map((testimonial) => (
                    <figure
                      key={testimonial.author.handle}
                      className='rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5'
                    >
                      <blockquote className='text-gray-900'>
                        <p>{`“${testimonial.body}”`}</p>
                      </blockquote>
                      <figcaption className='mt-6 flex items-center gap-x-4'>
                        <Image
                          className='h-10 w-10 flex-none rounded-full bg-gray-50'
                          src={testimonial.author.imageUrl}
                          alt={testimonial.author.name}
                          width={10}
                          height={10}
                        />
                        <div>
                          <div className='font-semibold'>
                            {testimonial.author.name}
                          </div>
                          <div className='text-gray-600'>{`${testimonial.author.handle}`}</div>
                        </div>
                      </figcaption>
                    </figure>
                  ))}
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

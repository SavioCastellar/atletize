'use client';
import * as Accordion from '@radix-ui/react-accordion';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { IFeaturesIntl } from '../domain/interfaces/IFeaturesIntl';
import { Container } from './Container';

interface FeaturesProps {
  intl: IFeaturesIntl;
}

export function Features({ intl }: FeaturesProps) {
  const [currentImage, setCurrentImage] = useState(intl.features[0].image);

  const handleFeatureClick = (image: string) => {
    setCurrentImage(image);
  };

  return (
    <div id='features' className='bg-gray/100'>
      <Container className='pb-16 pt-20 lg:pt-12'>
        <div className='mb-20 mt-10 flex flex-col items-center justify-center px-12 text-center md:px-52'>
          <h3 className='text-lg font-semibold leading-8 tracking-tight text-primary/500'>
            {intl?.headerTitle}
          </h3>
          <h2 className='text-4xl font-bold text-gray-800'>
            {intl?.beforeTitle}{' '}
            <span className='relative whitespace-nowrap text-primary/600'>
              <svg
                aria-hidden='true'
                viewBox='0 0 418 42'
                className='absolute left-0 top-2/3 h-[0.58em] w-full fill-primary/300/70'
                preserveAspectRatio='none'
              >
                <path d='M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z' />
              </svg>
              <span className='relative'>{intl?.titleWithEffect}</span>
            </span>{' '}
            {intl?.afterTitle}
          </h2>
          <p className='mb-8 mt-4 text-lg text-gray-600'>{intl?.subtitle}</p>
        </div>

        <div className='flex flex-col md:flex-row'>
          <motion.div
            initial={{
              x: -300,
            }}
            whileInView={{
              x: 0,
              transition: {
                type: 'spring',
                bounce: 0.2,
                duration: 0.8,
              },
            }}
            className='mt-8 w-full px-4 md:mt-0 md:w-1/2 md:px-8'
          >
            <img
              src={currentImage}
              alt='Selected Feature'
              className='w-full rounded-lg shadow-lg'
            />
          </motion.div>
          <div className='mt-6 w-full px-4 md:mt-0 md:w-1/2'>
            <Accordion.Root
              type='single'
              defaultValue={intl.features[0].id}
              collapsible
            >
              {intl.features.map((feature, index) => (
                <Accordion.Item
                  key={feature.id}
                  value={feature.title}
                  className='mb-4'
                >
                  <Accordion.Header className='w-full'>
                    <Accordion.Trigger
                      className='accordion-trigger flex w-full cursor-pointer items-center justify-between rounded-lg px-6 pt-4'
                      onClick={() => handleFeatureClick(feature.image)}
                    >
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
                            delay: 0.1 * index,
                          },
                        }}
                        className='flex items-center'
                      >
                        <span className='mr-4 text-3xl'>{feature.icon}</span>
                        <span className='text-2xl font-semibold'>
                          {feature.title}
                        </span>
                      </motion.div>
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
                            delay: 0.1 * index,
                          },
                        }}
                      >
                        <Plus className='ml-4' />
                      </motion.div>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <motion.div className='flex items-center'>
                    <Accordion.Content className='accordion-content w-full rounded-lg px-8 py-6'>
                      {feature.description}
                    </Accordion.Content>
                  </motion.div>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </div>
      </Container>
    </div>
  );
}

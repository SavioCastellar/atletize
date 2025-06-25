'use client';
import { motion } from 'framer-motion';
import { IStatsIntl } from '../domain/interfaces/IStatsIntls';

interface StatsProps {
  intl: IStatsIntl;
}

export function Stats({ intl }: StatsProps) {
  return (
    <div className='bg-gray/100 p-10'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:max-w-none'>
          <div className='text-center'>
            <h2 className='text-lg font-semibold leading-8 tracking-tight text-primary/600'>
              {intl?.headerTitle}
            </h2>
            <h2 className='text-4xl font-bold tracking-tight text-gray-800 sm:text-4xl'>
              {intl?.title}
            </h2>
            <p className='mt-4 text-lg leading-8 text-gray-600'>
              {intl?.subtitle}
            </p>
          </div>
          <dl className='mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center shadow sm:grid-cols-2 lg:grid-cols-4'>
            {intl?.stats.map((stat) => (
              <div key={stat.id} className='flex flex-col bg-primary/100 p-8 '>
                <motion.dt
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
                  className='text-sm font-semibold leading-6 text-primary/500'
                >
                  {stat.title}
                </motion.dt>
                <motion.dd
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
                  className='order-first text-3xl font-semibold tracking-tight text-primary/800'
                >
                  {stat.value}
                </motion.dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

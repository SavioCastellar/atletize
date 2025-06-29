'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';

export interface TabItemProps {
  value: string;
  title: string;
  isSelected?: boolean;
}

export function TabItem({ value, title, isSelected = false }: TabItemProps) {
  return (
    <Tabs.Trigger
      value={value}
      className='relative px-1 pb-4 text-sm font-medium text-zinc-500 hover:text-primary/700 data-[state=active]:text-primary/700'
    >
      <span>{title}</span>

      {isSelected && (
        <motion.div
          layoutId='activeTab'
          className='absolute -bottom-px left-0 right-0 h-0.5 bg-primary/700'
        />
      )}
    </Tabs.Trigger>
  );
}

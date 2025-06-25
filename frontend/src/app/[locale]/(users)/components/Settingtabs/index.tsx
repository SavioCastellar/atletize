'use client';
import { ISettingsIntl } from '@/app/[locale]/(users)/domain/interfaces/ISettingsIntl';
import { TabItem } from '@/app/shared/components/TabItem';
import * as Tabs from '@radix-ui/react-tabs';
import { useState } from 'react';
import { ProfileContent } from './ProfileContent';

interface ISettingsTabsProps {
  profile: {
    email: string;
    name: string;
  };
  intl: ISettingsIntl;
}

export function SettingsTabs({
  profile: { name, email },
  intl,
}: ISettingsTabsProps) {
  const [currentTab, setCurrentTab] = useState('tab1');

  return (
    <>
      <Tabs.Root value={currentTab} onValueChange={setCurrentTab}>
        <Tabs.List className='mt-6 flex w-full items-center gap-4 border-b border-zinc-200'>
          <TabItem
            value='tab1'
            title={intl.menu.item1}
            isSelected={currentTab === 'tab1'}
          />
        </Tabs.List>

        {/* Profile */}
        <Tabs.Content className='TabsContent' value='tab1'>
          <ProfileContent intl={intl} profile={{ email, name }} />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
}

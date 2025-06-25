'use client';
import { Input } from '@/app/shared/components/Input';
import { Mail, UserCircle } from 'lucide-react';
import { ISettingsIntl } from '../../../domain/interfaces/ISettingsIntl';

interface ISettingsTabsProps {
  profile: {
    email: string;
    name: string;
  };
  intl: ISettingsIntl;
}

export function ProfileContent({
  profile: { name, email },
  intl,
}: ISettingsTabsProps) {
  return (
    <div className='mt-10 w-full rounded-lg rounded-bl-[100px] rounded-tr-[100px] bg-white p-6 shadow-md lg:max-w-lg'>
      <div className='ml-5 lg:max-w-md'>
        <div className='flex flex-col'>
          <h2 className='mb-4 text-xl font-semibold'>{intl.profile.title}</h2>
          <form className='w-full space-y-4 px-8'>
            <img
              src='https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Aneka&backgroundColor=bfdbfe&eyes=happy'
              className='h-14 w-14 rounded-full'
              alt={''}
            ></img>
            <Input.Root>
              <Input.Label>{intl.profile.label.name}</Input.Label>
              <Input.Wrapper disabled={true}>
                <Input.Icon icon={UserCircle} />
                <Input.PlaceHolder type='text' disabled placeholder={name} />
              </Input.Wrapper>
            </Input.Root>
            <Input.Root>
              <Input.Label>{intl.profile.label.email}</Input.Label>
              <Input.Wrapper disabled={true}>
                <Input.Icon icon={Mail} />
                <Input.PlaceHolder type='text' disabled placeholder={email} />
              </Input.Wrapper>
            </Input.Root>
          </form>
        </div>
      </div>
    </div>
  );
}

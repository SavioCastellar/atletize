import { LucideIcon } from 'lucide-react';

interface NavIconRightProps {
  Icon: LucideIcon;
}

export function NavIconRight({ Icon }: NavIconRightProps) {
  return (
    <Icon className='size-4 text-black/25 group-hover:text-black/50 group-data-[active=true]:text-black'/>
  );
}

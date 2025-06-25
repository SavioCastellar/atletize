import useScreenSize from '@/app/shared/hooks/useScreenSize';
import dynamic from 'next/dynamic';

const Gestao = dynamic(() => import('./Gestao'));
const GestaoMobile = dynamic(() => import('./GestaoMobile'));

const GestaoPage = (props: any) => {
  return useScreenSize() ? <GestaoMobile {...props} /> : <Gestao {...props} />;
};

export default GestaoPage;

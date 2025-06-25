import { BottomNavLinks } from './BottomNavLinks';
import { useSharedInternationalization } from '@/app/shared/hooks/useSharedInternationalization';

export async function BottomNavigation() {
  const { intlBottomNavigation } = await useSharedInternationalization();

  return <BottomNavLinks item1={intlBottomNavigation.item1} />;
}

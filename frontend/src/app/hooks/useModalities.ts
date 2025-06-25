import { useQuery } from '@tanstack/react-query';
import { Database } from '../../../utils/database.types';
import { supabase } from '../api/auth/supabase/client';


type Modality = Database['public']['Tables']['modalities']['Row'];
type TournamentModality = Database['public']['Tables']['tournaments_modalities']['Row'];

interface ModalityData {
  id: string;
  icon: string;
  name: string;
  status: boolean;
  totalGold: number;
  totalSilver: number;
  totalBronze: number;
  achievementsSum: number;
  tournamentsCount: number;
}

const fetchModalitiesData = async (): Promise<ModalityData[]> => {
  const { data, error } = await supabase
    .from('modalities')
    .select(`
      id,
      icon,
      name,
      status,
      tournaments_modalities (
        tournament_id,
        gold,
        silver,
        bronze
      )
    `);

  if (error) throw new Error(error.message);

  const modalitiesData: ModalityData[] = data.map((modality) => {
    const achievements = (modality.tournaments_modalities || []) as TournamentModality[];

    const totalGold = achievements.reduce((sum, item) => sum + (item.gold || 0), 0);
    const totalSilver = achievements.reduce((sum, item) => sum + (item.silver || 0), 0);
    const totalBronze = achievements.reduce((sum, item) => sum + (item.bronze || 0), 0);
    const achievementsSum = totalGold + totalSilver + totalBronze;
    const tournamentsCount = new Set(achievements.map((item) => item.tournament_id)).size;

    return {
      id: modality.id,
      icon: modality.icon,
      name: modality.name,
      status: modality.status,
      totalGold,
      totalSilver,
      totalBronze,
      achievementsSum,
      tournamentsCount,
    };
  });

  return modalitiesData;
};

export const useModalitiesData = () => {
  return useQuery<ModalityData[], Error>({
    queryKey: ['modalities'],
    queryFn: fetchModalitiesData,
  });
};

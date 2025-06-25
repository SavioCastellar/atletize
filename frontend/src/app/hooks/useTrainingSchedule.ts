import { useQuery } from '@tanstack/react-query';
import { Database } from '../../../utils/database.types';
import { supabase } from '../api/auth/supabase/client';

type TrainingSchedule = Database['public']['Tables']['training_schedule']['Row'];

const fetchTrainingSchedule = async (modalityId: string): Promise<TrainingSchedule> => {
  const { data, error } = await supabase
    .from('training_schedule')
    .select('id, modality_id, sun, mon, tue, wed, thu, fri, sat')
    .eq('modality_id', modalityId)
    .single();

  if (error) throw new Error(error.message)
  return data
};

export const useTrainingSchedule = (modalityId: string | null) => {
  return useQuery<TrainingSchedule, Error>({
    queryKey: ['training_schedule', modalityId],
    queryFn: () => fetchTrainingSchedule(modalityId as string),
    enabled: !!modalityId,
  });
};

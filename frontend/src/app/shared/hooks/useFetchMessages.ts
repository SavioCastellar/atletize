import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/app/api/auth/supabase/client';
import { Message } from '@/app/[locale]/(detalhes)/(pages)/detalhes/domain/interfaces/IMessage';

const useFetchMessages = (athleteId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from('messages')
      .select('id, user_id, name, message, created_at')
      .eq('user_id', athleteId)

    if (error) {
      setError('Error fetching messages: ' + error.message);
      console.error(error);
    } else {
      setMessages(data);
    }

    setLoading(false);
  }, [athleteId]);

  useEffect(() => {
    if (athleteId) {
      fetchMessages();
    }
  }, [fetchMessages]);

  return { messages, loading, error };
};

export default useFetchMessages;

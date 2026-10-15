import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTour } from '../services/api';

export function useTour() {
  const { slug } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['tour', slug],
    queryFn: () => getTour(slug),
    enabled: Boolean(slug),
    staleTime: 60 * 1000,
  });

  return { data, isLoading, error };
}

import { useQuery } from '@tanstack/react-query';
import { getTours } from '../services/api';

export function useTours() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['tours'],
    queryFn: getTours,
    // data be available for on minute and return fetching
    staleTime: 60 * 1000,
  });

  return { data, isLoading, error };
}

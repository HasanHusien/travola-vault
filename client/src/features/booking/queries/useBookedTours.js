import { useQuery } from '@tanstack/react-query';
import { getBookedTours } from '../api/api';

export function useBookedTours() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['booking'],
    queryFn: getBookedTours,
    staleTime: 60 * 1000,
  });

  return { data, isLoading, error };
}

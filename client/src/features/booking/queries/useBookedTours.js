import { useQuery } from '@tanstack/react-query';
import { getBookedTours } from '../api/api';

export function useBookedTours() {
  const { data, isLoading } = useQuery({
    queryFn: getBookedTours,
    queryKey: ['booking'],
  });

  return { data, isLoading };
}


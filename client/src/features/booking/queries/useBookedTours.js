import { useQuery } from '@tanstack/react-query';
import { getBookedTours } from '../api/api';

export function useBookedTours() {
  const { data, isLoading, error } = useQuery({
    queryFn: getBookedTours,
    queryKey: ['booking'],
  });
console.log(data)
  return { data, isLoading, error };
}

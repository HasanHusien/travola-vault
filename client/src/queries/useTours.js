import { useQuery } from '@tanstack/react-query';
import { getTours } from '../services/api';

export function useTours() {
  const isLoggedOut = localStorage.getItem('isLoggedOut') === 'true';

  const { data, isLoading, error } = useQuery({
    queryKey: ['tours', isLoggedOut],
    queryFn: getTours,
    refetchOnMount: true,
  });
  return { data, isLoading, error };
}

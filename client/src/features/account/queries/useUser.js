import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../api/api';

export function useUser() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    // don't ask again if res return no data
    retry: false,
    staleTime: 60 * 1000,
  });

  return { user, isLoading, error };
}

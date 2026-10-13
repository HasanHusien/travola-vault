import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../api/api';

export function useUser() {
  const isLoggedOut = localStorage.getItem('isLoggedOut') === 'true';
  const { data, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    // enabled: !isLoggedOut,
    // refetchOnMount: true,
  });
  console.log(data);

  return { data, isLoading, error };
}

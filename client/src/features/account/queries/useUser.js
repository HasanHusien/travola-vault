import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser } from '../api/api';

export function useUser() {
  const queryClient = useQueryClient();
  const isLoggedOut = localStorage.getItem('isLoggedOut') === 'true';

  const { data, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    enabled: !isLoggedOut,
    refetchOnMount: true,
    onSuccess: () => {
      queryClient.getQueryData(['user']);
    },
  });

  console.log(data);

  return { data, isLoading, error };
}

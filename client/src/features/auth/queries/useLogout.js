import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../api/api';
export function useLogout() {
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationKey: ['logout'],
    mutationFn: logoutApi,

    onSuccess: () => {
      queryClient.removeQueries();
      window.location.replace('/login');
      // navigate('/login');
    },
  });

  return { logout, isLoading };
}

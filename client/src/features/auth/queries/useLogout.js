import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../api/api';
export function useLogout() {
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      window.location.replace('/login');
      localStorage.setItem('isLoggedOut', true);
    },
  });

  return { logout, isLoading };
}

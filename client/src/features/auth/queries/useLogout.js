import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../api/api';
import { replace, useNavigate } from 'react-router-dom';
export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/login', { replace: true });
      // setTimeout(() => window.location.replace('/'), 4000);
      localStorage.setItem('isLoggedOut', true);
    },
  });

  return { logout, isLoading };
}

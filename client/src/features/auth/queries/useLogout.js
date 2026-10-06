import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../api/api';
import { useNavigate } from 'react-router-dom';
export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      // navigate('/login');
      window.location.replace('/login');
      localStorage.setItem('isLoggedOut', true);
    },
  });

  return { logout, isLoading };
}

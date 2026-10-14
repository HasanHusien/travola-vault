import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../api/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      toast.success('logged in successfully');
      navigate('/', { replace: true });
      // localStorage.removeItem('isLoggedOut');
    },
    onError: () => {
      toast.error('Incorrect email or password ');
    },
  });

  return { login, isLoading, error };
}
